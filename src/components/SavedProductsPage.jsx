export function SavedProductsPage({
  title,
  emptyMessage,
  items,
  onBack,
  onProductSelect,
  onRemoveItem,
  summaryLabel,
  summaryValue,
  actionHref,
  actionLabel,
}) {
  return (
    <section className="saved-products-page section-block">
      <div className="saved-products-header">
        <div>
          <p className="eyebrow">{title}</p>
          <h1>{title} items</h1>
        </div>
        <button className="secondary-button" type="button" onClick={onBack}>
          Continue shopping
        </button>
      </div>

      {items.length === 0 ? (
        <div className="saved-empty-state">
          <p>{emptyMessage}</p>
        </div>
      ) : (
        <div className="saved-products-layout">
          <div className="all-products-grid">
            {items.map((product) => (
              <article className="all-products-card" key={`${title}-${product.id}`}>
                <button
                  className="product-image-button"
                  type="button"
                  onClick={() => onProductSelect(product)}
                  aria-label={`Open details for ${product.name}`}
                >
                  <div className="product-image-wrap">
                    <img src={product.image} alt={product.name} />
                  </div>
                </button>
                <div className="product-card-body">
                  <h3>{product.name}</h3>
                  <p>{product.price}</p>
                  <button
                    className="remove-item-button"
                    type="button"
                    onClick={() => onRemoveItem(product.id)}
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>

          {actionHref ? (
            <aside className="saved-products-summary">
              {summaryLabel && summaryValue ? (
                <div className="saved-summary-row">
                  <strong>{summaryLabel}</strong>
                  <span>{summaryValue}</span>
                </div>
              ) : null}
              <p>{title === 'Cart' ? 'Ready to confirm your order? Share your cart on WhatsApp and close the sale faster.' : 'Shortlist saved. Ask for availability, customisation, and styling help instantly.'}</p>
              <a className="whatsapp-button" href={actionHref} target="_blank" rel="noreferrer">
                {actionLabel}
              </a>
            </aside>
          ) : null}
        </div>
      )}
    </section>
  )
}
