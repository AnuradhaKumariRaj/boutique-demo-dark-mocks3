export function TestimonialsSection({
  testimonials,
  eyebrow = 'Spotlight reviews',
  heading = 'A bold concept that feels premium, editorial, and instantly memorable.',
}) {
  return (
    <section className="section-block spotlight-section" id="spotlight">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{heading}</h1>
        </div>
      </div>

      <div className="spotlight-grid">
        {testimonials.map((testimonial) => (
          <article className="spotlight-card" key={testimonial.name}>
            <div className="avatar-circle" aria-hidden="true">
              {testimonial.name
                .split(' ')
                .map((part) => part[0])
                .join('')
                .slice(0, 2)}
            </div>
            <p className="spotlight-role">{testimonial.role}</p>
            <h3>{testimonial.name}</h3>
            <p className="testimonial-quote">{testimonial.quote}</p>
            <small>{testimonial.rating}</small>
          </article>
        ))}
      </div>
    </section>
  )
}
