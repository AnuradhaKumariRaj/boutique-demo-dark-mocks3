import { useEffect, useRef } from 'react'

export function ServicesSection({ collections, onProductSelect }) {
  const sliderRefs = useRef({})

  const scrollCollection = (heading, direction) => {
    const slider = sliderRefs.current[heading]

    if (!slider) {
      return
    }

    const scrollAmount = slider.clientWidth * 0.85
    slider.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      collections.forEach((collection) => {
        const slider = sliderRefs.current[collection.heading]

        if (!slider) {
          return
        }

        const scrollAmount = slider.clientWidth * 0.85
        const maxScrollLeft = slider.scrollWidth - slider.clientWidth
        const currentScrollLeft = slider.scrollLeft
        const nextScrollLeft = currentScrollLeft + scrollAmount

        if (maxScrollLeft <= 0) {
          return
        }

        slider.scrollTo({
          left: currentScrollLeft >= maxScrollLeft - 4 ? 0 : Math.min(nextScrollLeft, maxScrollLeft),
          behavior: 'smooth',
        })
      })
    }, 4000)

    return () => window.clearInterval(intervalId)
  }, [collections])

  return (
    <section className="section-block" id="new-arrivals">
      <div className="section-heading">
        <div>
          <p className="eyebrow">New arrivals</p>
          <h1>New couture-inspired arrivals built for standout celebrations and premium styling pitches.</h1>
        </div>
      </div>

      {collections.map((collection) => (
        <div className="product-collection" key={collection.heading}>
          <div className="product-collection-bar">
            <h3 className="product-collection-heading">{collection.heading}</h3>
            <div className="product-slider-controls" aria-label={`${collection.heading} slider controls`}>
              <button
                className="slider-button"
                type="button"
                onClick={() => scrollCollection(collection.heading, 'prev')}
                aria-label={`Show previous ${collection.heading} products`}
              >
                Prev
              </button>
              <button
                className="slider-button"
                type="button"
                onClick={() => scrollCollection(collection.heading, 'next')}
                aria-label={`Show next ${collection.heading} products`}
              >
                Next
              </button>
            </div>
          </div>
          <div
            className="product-slider"
            ref={(node) => {
              sliderRefs.current[collection.heading] = node
            }}
          >
            {collection.products.map((service) => (
              <article className="product-card" key={service.name}>
                <button
                  className="product-image-button"
                  type="button"
                  onClick={() => onProductSelect(service)}
                  aria-label={`Open details for ${service.name}`}
                >
                  <div className="product-image-wrap">
                    <img src={service.image} alt={service.name} />
                  </div>
                </button>
                <div className="product-card-body">
                  <h3>{service.name}</h3>
                  <p>{service.price}</p>
                  <button className="product-link-button" type="button" onClick={() => onProductSelect(service)}>
                    View details
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
