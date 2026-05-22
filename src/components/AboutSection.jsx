export function AboutSection({ about }) {
  return (
    <section className="about-section" id="story">
      <div className="about-copy">
        <p className="eyebrow">Who we are</p>
        <h2>{about.lead}</h2>
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}

        <div className="stat-row" aria-label="Brand highlights">
          {about.stats.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="about-image-wrap">
        <img src={about.image} alt="Styled boutique clothing rack with premium fashion pieces" />
      </div>
    </section>
  )
}
