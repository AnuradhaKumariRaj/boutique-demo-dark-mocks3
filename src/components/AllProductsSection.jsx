export function AllProductsSection({ products, onProductSelect }) {
  return (
    <section className="section-block" id="all-products">
      <div className="section-heading">
        <div>
          <p className="eyebrow">All products</p>
          <h1>Browse the full boutique edit in one place.</h1>
        </div>
      </div>

      <div className="all-products-grid">
        {products.map((product) => (
          <article className="all-products-card" key={`${product.name}-gallery`}>
            <button
              className="product-image-button"
              type="button"
              onClick={() => onProductSelect(product)}
              aria-label={`Open details for ${product.name}`}
            >
              <div className="product-image-wrap">
                <img src={product.image} alt={product.name} />
                <span className="product-tag">{product.tag}</span>
              </div>
            </button>
            <div className="product-card-body">
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <button className="product-link-button" type="button" onClick={() => onProductSelect(product)}>
                View details
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
