from django.http import JsonResponse

from .models import Collection, HeroSlide, SiteSettings


def _absolute_media_url(request, field_file):
    if not field_file:
        return ''
    return request.build_absolute_uri(field_file.url)


def storefront_data(request):
    settings = SiteSettings.objects.first()

    hero_slides = [
        {
            'title': slide.title,
            'alt': slide.alt_text,
            'image': _absolute_media_url(request, slide.image),
        }
        for slide in HeroSlide.objects.filter(is_active=True)
    ]

    collections = []
    for collection in Collection.objects.filter(is_active=True).prefetch_related('products'):
        products = [
            {
                'name': product.name,
                'price': product.price,
                'tag': product.tag,
                'image': _absolute_media_url(request, product.image),
                'alt': product.alt_text or product.name,
            }
            for product in collection.products.filter(is_active=True)
        ]
        collections.append(
            {
                'heading': collection.heading,
                'slug': collection.slug,
                'products': products,
            }
        )

    return JsonResponse(
        {
            'siteSettings': {
                'brandName': settings.brand_name if settings else 'Fashion Bootique Noir',
                'brandTagline': settings.brand_tagline if settings else 'For women without limits',
                'footerDescription': settings.footer_description
                if settings
                else 'A premium dark-mode concept for clients who want stronger contrast, couture energy, and a bold luxury storefront.',
                'heroEyebrow': settings.hero_eyebrow if settings else 'Couture bridal edits and bold event dressing',
                'heroHeading': settings.hero_heading
                if settings
                else 'Luxury-focused looks for clients who want the boutique to feel unforgettable.',
                'trustEyebrow': settings.trust_eyebrow if settings else 'Luxury reassurance',
                'trustHeading': settings.trust_heading
                if settings
                else 'Premium buying signals that make a bold brand feel trustworthy from the first scroll.',
                'testimonialEyebrow': settings.testimonial_eyebrow if settings else 'Spotlight reviews',
                'testimonialHeading': settings.testimonial_heading
                if settings
                else 'A bold concept that feels premium, editorial, and instantly memorable.',
                'ctaEyebrow': settings.cta_eyebrow if settings else 'Private styling desk',
                'ctaHeading': settings.cta_heading
                if settings
                else 'Offer a concierge-style WhatsApp consultation for VIP picks, fittings, and urgent occasion orders.',
                'contactHeading': settings.contact_heading
                if settings
                else 'Talk to the boutique team for orders, customisation, and delivery updates.',
                'contact': {
                    'location': settings.contact_location if settings else 'Eros Sampoornam, Noida Extension',
                    'mapLink': settings.contact_map_link
                    if settings
                    else 'https://maps.google.com/?q=Eros+Sampoornam+Noida+Extension',
                    'phone': settings.contact_phone if settings else '+91 92112 61727',
                    'hours': settings.contact_hours if settings else 'Support on WhatsApp, Monday to Saturday',
                    'email': settings.contact_email if settings else 'hello@bootique-demo.com',
                },
            },
            'heroSlides': hero_slides,
            'arrivalCollections': collections,
        }
    )
