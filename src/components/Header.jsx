import brandLogo from '../assets/logo.jpg'

export function Header({
  promoHighlights,
  cartCount,
  wishlistCount,
  onHomeClick,
  onSectionClick,
  onWishlistClick,
  onCartClick,
}) {
  return (
    <header className="header-shell">
      <div className="promo-strip" aria-label="Store announcements">
        {promoHighlights.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <div className="topbar">
        <button className="brand-lockup brand-button" type="button" onClick={onHomeClick} aria-label="Bootique home">
          <img className="brand-logo" src={brandLogo} alt="Boutique logo" />
          <div className="brand-copy">
            <span className="brand-wordmark">BOOTIQUE</span>
            <span className="brand-tagline">Make it simple, but significant</span>
          </div>
        </button>

        <nav className="topnav" aria-label="Primary navigation">
          <button className="header-link-button" type="button" onClick={() => onSectionClick('new-arrivals')}>
            New arrivals
          </button>
          <button className="header-link-button" type="button" onClick={() => onSectionClick('all-products')}>
            View all products
          </button>
          <button className="header-link-button" type="button" onClick={() => onSectionClick('spotlight')}>
            Spotlight
          </button>
          <button className="header-link-button" type="button" onClick={() => onSectionClick('story')}>
            Our story
          </button>
          <button className="header-link-button" type="button" onClick={() => onSectionClick('contact')}>
            Contact
          </button>
        </nav>

        <div className="header-tools" aria-label="Quick actions">
          <button className="header-link-button" type="button" onClick={onWishlistClick}>
            Wishlist {wishlistCount}
          </button>
          <button className="header-link-button" type="button" onClick={() => onSectionClick('contact')}>
            Account
          </button>
          <button className="cart-pill" type="button" onClick={onCartClick}>
            Cart {cartCount}
          </button>
        </div>
      </div>
    </header>
  )
}
