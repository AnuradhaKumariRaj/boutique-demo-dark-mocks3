import { useEffect, useState } from 'react'
import bridalAnarkaliCream from '../assets/bridal-anarkali-cream.jpg'
import bridalHero from '../assets/bridal-hero.jpg'
import bridalAnarkali from '../assets/bridal_anarkali.jpg'
import bridalPanjabi from '../assets/bridal-panjabi.jpg'
import bridalSrara from '../assets/bridal-srara.jpg'
import indianBridalDupattaStyles from '../assets/indian-bridal-dupatta-styles-1.jpg'
import bridalGown from '../assets/bridal-gown.jpg'

const defaultHeroImages = [
    {
      src: bridalHero,
      alt: 'Luxury bridal couture image for a dark premium boutique homepage',
    },
    {
      src: bridalGown,
      alt: 'Bold couture gown photography for a black red fashion boutique concept',
    },
    {
      src: bridalAnarkaliCream,
      alt: 'Premium anarkali editorial image for a luxury dark mode boutique demo',
    },
    {
      src: bridalAnarkali,
      alt: 'High fashion bridal boutique visual with dramatic luxury styling',
    },
    {
      src: bridalPanjabi,
      alt: 'Bold bridal ceremony look for a premium couture storefront concept',
    },
    {
      src: bridalSrara,
      alt: 'Luxury celebrationwear image for a dramatic red black boutique homepage',
    },
    {
      src: indianBridalDupattaStyles,
      alt: 'Editorial dupatta styling shot for a premium and bold boutique demo',
    },
]

export function HeroSection({
  slides = defaultHeroImages,
  eyebrow = 'Couture bridal edits and bold event dressing',
  heading = 'Luxury-focused looks for clients who want the boutique to feel unforgettable.',
}) {
  const heroImages = slides.length > 0 ? slides : defaultHeroImages
  const normalizedHeroImages = heroImages.map((image) => ({
    src: image.src ?? image.image,
    alt: image.alt ?? image.alt_text,
  }))

  const [activeImageIndex, setActiveImageIndex] = useState(0)

  useEffect(() => {
    setActiveImageIndex(0)
  }, [normalizedHeroImages.length])

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveImageIndex((currentIndex) => (currentIndex + 1) % normalizedHeroImages.length)
    }, 5000)

    return () => window.clearInterval(intervalId)
  }, [normalizedHeroImages.length])

  return (
    <section className="hero-section" id="top">
      <div className="hero-visual hero-visual-full">
        <article className="hero-feature-card">
          {normalizedHeroImages.map((image, index) => (
            <img
              key={image.src}
              className={`hero-feature-image ${index === activeImageIndex ? 'is-active' : ''}`}
              src={image.src}
              alt={image.alt}
            />
          ))}
        </article>
      </div>

      <div className="hero-copy hero-copy-below">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{heading}</h1>
        <ul className="hero-metrics" aria-label="Store highlights">
          <li>
            <strong>100+</strong>
            <span>high-impact signature styles</span>
          </li>
          <li>
            <strong>4.9/5</strong>
            <span>premium styling approval</span>
          </li>
          <li>
            <strong>Pan India</strong>
            <span>private WhatsApp concierge</span>
          </li>
        </ul>
      </div>
    </section>
  )
}
