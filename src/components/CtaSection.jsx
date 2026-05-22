export function CtaSection({
  eyebrow = 'Private styling desk',
  heading = 'Offer a concierge-style WhatsApp consultation for VIP picks, fittings, and urgent occasion orders.',
}) {
  return (
    <section className="cta-panel">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{heading}</h1>
      </div>
      <div className="cta-actions">
        <a className="primary-button" href="https://wa.me/919211261727?text=Hi%2C%20I%20want%20help%20choosing%20an%20outfit%20from%20your%20boutique." target="_blank" rel="noreferrer">
          Book a private consult
        </a>
        <a className="secondary-button" href="#new-arrivals">
          Browse new arrivals
        </a>
      </div>
    </section>
  )
}
