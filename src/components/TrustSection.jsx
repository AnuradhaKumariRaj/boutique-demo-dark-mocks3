export function TrustSection({
  trustPoints,
  eyebrow = 'Luxury reassurance',
  heading = 'Premium buying signals that make a bold brand feel trustworthy from the first scroll.',
}) {
  return (
    <section className="section-block trust-section">
      <div className="section-heading narrow-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{heading}</h1>
        </div>
      </div>

      <div className="trust-grid">
        {trustPoints.map((point) => (
          <article className="trust-card" key={point.title}>
            <span className="trust-badge">{point.accent}</span>
            <h3>{point.title}</h3>
            <p>{point.detail}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
