import brandLogo from '../assets/logo.jpg'

export function Footer({
  contact,
  onSectionClick,
  brandName = 'Fashion Bootique Noir',
  footerDescription = 'A premium dark-mode concept for clients who want stronger contrast, couture energy, and a bold luxury storefront.',
}) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-shell">
        <div className="footer-brand">
          <div className="footer-brand-lockup">
            <img className="footer-logo" src={brandLogo} alt="Boutique logo" />
            <div>
              <h2>{brandName}</h2>
              <p>{footerDescription}</p>
            </div>
          </div>
        </div>

        <div className="footer-links">
          <h3>Explore</h3>
          <button type="button" onClick={() => onSectionClick('new-arrivals')}>New arrivals</button>
          <button type="button" onClick={() => onSectionClick('all-products')}>All products</button>
          <button type="button" onClick={() => onSectionClick('spotlight')}>Client love</button>
          <button type="button" onClick={() => onSectionClick('contact')}>Contact</button>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>
          <p className="footer-contact-line">Location: {contact.location}</p>
          <a href={contact.mapLink} target="_blank" rel="noreferrer">View on map</a>
          <a href={`tel:${contact.phone.replace(/\s+/g, '')}`}>{contact.phone}</a>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <p className="footer-contact-line">Availability: {contact.hours}</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright © {currentYear} Fashion Bootique. All rights reserved.</p>
      </div>
    </footer>
  )
}
