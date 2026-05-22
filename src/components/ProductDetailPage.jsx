import { useEffect, useState } from 'react'

export function ProductDetailPage({
  product,
  isInCart,
  isInWishlist,
  onAddToCart,
  onAddToWishlist,
  onBack,
  whatsappHref,
}) {
  const [activeImage, setActiveImage] = useState(product.gallery[0] ?? product.image)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] ?? '')
  const [selectedColor, setSelectedColor] = useState(product.colors[0] ?? '')

  useEffect(() => {
    setActiveImage(product.gallery[0] ?? product.image)
    setSelectedSize(product.sizes[0] ?? '')
    setSelectedColor(product.colors[0] ?? '')
  }, [product])

  return (
    <section className="product-detail-page section-block">
      <button className="back-link-button" type="button" onClick={onBack}>
        Back to shopping
      </button>

      <div className="product-detail-layout">
        <article className="product-detail-image-card">
          <img src={activeImage} alt={product.name} />
          <div className="product-detail-thumbs">
            {product.gallery.map((image) => (
              <button
                key={image}
                className={`product-thumb-button ${image === activeImage ? 'is-active' : ''}`}
                type="button"
                onClick={() => setActiveImage(image)}
                aria-label={`View another image of ${product.name}`}
              >
                <img src={image} alt={product.name} />
              </button>
            ))}
          </div>
        </article>

        <div className="product-detail-copy">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="product-detail-price">{product.price}</p>
          <p className="product-detail-note">{product.inventoryNote}</p>
          <p className="product-detail-description">{product.description}</p>

          <div className="product-option-group">
            <span className="product-option-label">Size</span>
            <div className="product-option-list">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`product-option-chip ${size === selectedSize ? 'is-selected' : ''}`}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="product-option-group">
            <span className="product-option-label">Color</span>
            <div className="product-option-list">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={`product-option-chip ${color === selectedColor ? 'is-selected' : ''}`}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="product-detail-actions">
            <button className="primary-button" type="button" onClick={() => onAddToCart(product)}>
              {isInCart ? 'Added to cart' : 'Add to cart'}
            </button>
            <button className="secondary-button" type="button" onClick={() => onAddToWishlist(product)}>
              {isInWishlist ? 'Saved to wishlist' : 'Add to wishlist'}
            </button>
            <a className="whatsapp-button" href={whatsappHref} target="_blank" rel="noreferrer">
              Order on WhatsApp
            </a>
          </div>

          <div className="product-trust-panel">
            <div className="product-trust-row">
              <strong>Selected</strong>
              <span>{selectedSize} / {selectedColor}</span>
            </div>
            <div className="product-trust-row">
              <strong>Delivery</strong>
              <span>{product.shipping}</span>
            </div>
            <div className="product-trust-row">
              <strong>Exchange</strong>
              <span>{product.returnPolicy}</span>
            </div>
            <ul className="product-trust-list">
              {product.trustPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
