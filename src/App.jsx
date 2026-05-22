import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { about, arrivalCollections, contact, promoHighlights, testimonials, trustPoints } from './data/siteData'
import { AboutSection } from './components/AboutSection'
import { AllProductsSection } from './components/AllProductsSection'
import { ContactSection } from './components/ContactSection'
import { CtaSection } from './components/CtaSection'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { HeroSection } from './components/HeroSection'
import { ProductDetailPage } from './components/ProductDetailPage'
import { SavedProductsPage } from './components/SavedProductsPage'
import { ServicesSection } from './components/ServicesSection'
import { TestimonialsSection } from './components/TestimonialsSection'
import { TrustSection } from './components/TrustSection'

const STORAGE_KEYS = {
  cart: 'boutique-demo-cart',
  wishlist: 'boutique-demo-wishlist',
}
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? 'http://127.0.0.1:8000/api/storefront/'
const DEFAULT_SITE_SETTINGS = {
  brandName: 'Fashion Bootique Noir',
  brandTagline: 'For women without limits',
  footerDescription: 'A premium dark-mode concept for clients who want stronger contrast, couture energy, and a bold luxury storefront.',
  heroEyebrow: 'Couture bridal edits and bold event dressing',
  heroHeading: 'Luxury-focused looks for clients who want the boutique to feel unforgettable.',
  trustEyebrow: 'Luxury reassurance',
  trustHeading: 'Premium buying signals that make a bold brand feel trustworthy from the first scroll.',
  testimonialEyebrow: 'Spotlight reviews',
  testimonialHeading: 'A bold concept that feels premium, editorial, and instantly memorable.',
  ctaEyebrow: 'Private styling desk',
  ctaHeading: 'Offer a concierge-style WhatsApp consultation for VIP picks, fittings, and urgent occasion orders.',
  contactHeading: 'Talk to the boutique team for orders, customisation, and delivery updates.',
  contact,
}

const CATEGORY_OPTIONS = {
  'Bride to be': {
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Champagne', 'Ivory', 'Rose Gold', 'Wine'],
    trustPoints: ['Custom fitting support', 'Priority bridal dispatch', 'Easy exchange within 5 days'],
  },
  'Mom to be': {
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Pastel Yellow', 'Sky Blue', 'Peach', 'Mocha'],
    trustPoints: ['Comfort-first fits', 'Soft fabric guidance', 'Fast support on WhatsApp'],
  },
}

function readStoredItems(key) {
  if (typeof window === 'undefined') {
    return []
  }

  const savedValue = window.localStorage.getItem(key)

  if (!savedValue) {
    return []
  }

  try {
    return JSON.parse(savedValue)
  } catch {
    return []
  }
}

function buildProductMeta(collection, product, index) {
  const categorySettings = CATEGORY_OPTIONS[collection.heading] ?? CATEGORY_OPTIONS['Bride to be']
  const gallery = [
    product.image,
    ...collection.products.filter((item) => item.name !== product.name).map((item) => item.image),
  ].slice(0, 4)

  return {
    ...product,
    id: `${collection.heading.toLowerCase().replace(/\s+/g, '-')}-${index + 1}`,
    category: collection.heading,
    gallery,
    sizes: categorySettings.sizes,
    colors: categorySettings.colors,
    trustPoints: categorySettings.trustPoints,
    shipping: 'Ships in 2 to 4 business days across India',
    returnPolicy: 'Easy exchange available within 5 days for eligible orders',
    inventoryNote: index % 2 === 0 ? 'Only a few left in this style' : 'Fast moving piece this week',
    description: `${product.name} is part of our ${collection.heading} collection, styled for modern celebrations, fittings, and boutique moments that need to look premium both online and offline.`,
  }
}

function parsePrice(price) {
  return Number(price.replace(/[^\d.]/g, '')) || 0
}

function buildWhatsAppHref(phone, message) {
  const digits = phone.replace(/\D/g, '')
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}

function App() {
  const [dynamicStorefront, setDynamicStorefront] = useState({
    siteSettings: DEFAULT_SITE_SETTINGS,
    heroSlides: [],
    arrivalCollections: [],
  })

  useEffect(() => {
    let isMounted = true

    async function loadStorefront() {
      try {
        const response = await fetch(BACKEND_URL)

        if (!response.ok) {
          throw new Error('Storefront API unavailable')
        }

        const payload = await response.json()

        if (isMounted) {
          setDynamicStorefront({
            siteSettings: payload.siteSettings ?? DEFAULT_SITE_SETTINGS,
            heroSlides: payload.heroSlides ?? [],
            arrivalCollections: payload.arrivalCollections ?? [],
          })
        }
      } catch {
        if (isMounted) {
          setDynamicStorefront({
            siteSettings: DEFAULT_SITE_SETTINGS,
            heroSlides: [],
            arrivalCollections: [],
          })
        }
      }
    }

    loadStorefront()

    return () => {
      isMounted = false
    }
  }, [])

  const sourceCollections =
    dynamicStorefront.arrivalCollections.length > 0 ? dynamicStorefront.arrivalCollections : arrivalCollections

  const collectionsWithMeta = useMemo(
    () =>
      sourceCollections.map((collection) => ({
        ...collection,
        products: collection.products.map((product, index) => buildProductMeta(collection, product, index)),
      })),
    [sourceCollections],
  )

  const allProducts = useMemo(
    () => collectionsWithMeta.flatMap((collection) => collection.products),
    [collectionsWithMeta],
  )

  const [activeView, setActiveView] = useState('home')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cartItems, setCartItems] = useState(() => readStoredItems(STORAGE_KEYS.cart))
  const [wishlistItems, setWishlistItems] = useState(() => readStoredItems(STORAGE_KEYS.wishlist))
  const effectiveContact = dynamicStorefront.siteSettings.contact ?? contact
  const whatsappPhone = effectiveContact.phone
  const cartTotal = cartItems.reduce((sum, item) => sum + parsePrice(item.price), 0)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(wishlistItems))
  }, [wishlistItems])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activeView, selectedProduct])

  const openProduct = (product) => {
    setSelectedProduct(product)
    setActiveView('product')
  }

  const showHome = () => {
    setSelectedProduct(null)
    setActiveView('home')
  }

  const showSection = (sectionId) => {
    showHome()

    window.setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  const addUniqueItem = (items, product) => {
    if (items.some((item) => item.id === product.id)) {
      return items
    }

    return [...items, product]
  }

  const addToCart = (product) => {
    setCartItems((items) => addUniqueItem(items, product))
  }

  const addToWishlist = (product) => {
    setWishlistItems((items) => addUniqueItem(items, product))
  }

  const removeFromCart = (productId) => {
    setCartItems((items) => items.filter((item) => item.id !== productId))
  }

  const removeFromWishlist = (productId) => {
    setWishlistItems((items) => items.filter((item) => item.id !== productId))
  }

  const productWhatsAppHref = selectedProduct
    ? buildWhatsAppHref(
        whatsappPhone,
        `Hi, I want to order ${selectedProduct.name} from the ${selectedProduct.category} collection. Please share size availability and next steps.`,
      )
    : '#'
  const cartWhatsAppHref = buildWhatsAppHref(
    whatsappPhone,
    cartItems.length > 0
      ? `Hi, I want to confirm my boutique order for: ${cartItems.map((item) => item.name).join(', ')}. Please help me with checkout.`
      : 'Hi, I want help choosing an outfit from your boutique collection.',
  )

  return (
    <div className="page-shell">
      <Header
        promoHighlights={promoHighlights}
        cartCount={cartItems.length}
        wishlistCount={wishlistItems.length}
        onHomeClick={showHome}
        onSectionClick={showSection}
        onWishlistClick={() => setActiveView('wishlist')}
        onCartClick={() => setActiveView('cart')}
      />
      <main className="site-shell">
        {activeView === 'home' ? (
          <>
            <HeroSection
              slides={dynamicStorefront.heroSlides}
              eyebrow={dynamicStorefront.siteSettings.heroEyebrow}
              heading={dynamicStorefront.siteSettings.heroHeading}
            />
            <ServicesSection collections={collectionsWithMeta} onProductSelect={openProduct} />
            <AllProductsSection products={allProducts} onProductSelect={openProduct} />
            <TrustSection
              trustPoints={trustPoints}
              eyebrow={dynamicStorefront.siteSettings.trustEyebrow}
              heading={dynamicStorefront.siteSettings.trustHeading}
            />
            <TestimonialsSection
              testimonials={testimonials}
              eyebrow={dynamicStorefront.siteSettings.testimonialEyebrow}
              heading={dynamicStorefront.siteSettings.testimonialHeading}
            />
            <AboutSection about={about} />
            <CtaSection
              eyebrow={dynamicStorefront.siteSettings.ctaEyebrow}
              heading={dynamicStorefront.siteSettings.ctaHeading}
            />
            <ContactSection
              contact={effectiveContact}
              heading={dynamicStorefront.siteSettings.contactHeading}
            />
          </>
        ) : null}

        {activeView === 'product' && selectedProduct ? (
          <ProductDetailPage
            product={selectedProduct}
            isInCart={cartItems.some((item) => item.id === selectedProduct.id)}
            isInWishlist={wishlistItems.some((item) => item.id === selectedProduct.id)}
            onAddToCart={addToCart}
            onAddToWishlist={addToWishlist}
            onBack={showHome}
            whatsappHref={productWhatsAppHref}
          />
        ) : null}

        {activeView === 'cart' ? (
          <SavedProductsPage
            title="Cart"
            emptyMessage="Your cart is empty right now."
            items={cartItems}
            onBack={showHome}
            onProductSelect={openProduct}
            onRemoveItem={removeFromCart}
            summaryLabel="Cart total"
            summaryValue={`Rs. ${cartTotal.toLocaleString('en-IN')}`}
            actionHref={cartWhatsAppHref}
            actionLabel="Checkout on WhatsApp"
          />
        ) : null}

        {activeView === 'wishlist' ? (
          <SavedProductsPage
            title="Wishlist"
            emptyMessage="Your wishlist is empty right now."
            items={wishlistItems}
            onBack={showHome}
            onProductSelect={openProduct}
            onRemoveItem={removeFromWishlist}
            actionHref={buildWhatsAppHref(
              whatsappPhone,
              wishlistItems.length > 0
                ? `Hi, I saved these styles in my wishlist: ${wishlistItems.map((item) => item.name).join(', ')}. Please guide me on availability.`
                : 'Hi, I want recommendations from your boutique collection.',
            )}
            actionLabel="Ask on WhatsApp"
          />
        ) : null}
      </main>
      <Footer
        contact={effectiveContact}
        onSectionClick={showSection}
        brandName={dynamicStorefront.siteSettings.brandName}
        footerDescription={dynamicStorefront.siteSettings.footerDescription}
      />
    </div>
  )
}

export default App
