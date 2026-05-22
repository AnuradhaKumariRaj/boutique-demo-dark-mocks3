from django.db import models


class SiteSettings(models.Model):
    brand_name = models.CharField(max_length=120, default='Fashion Bootique Noir')
    brand_tagline = models.CharField(max_length=180, default='For women without limits')
    footer_description = models.TextField(
        default='A premium dark-mode concept for clients who want stronger contrast, couture energy, and a bold luxury storefront.'
    )
    hero_eyebrow = models.CharField(max_length=120, default='Couture bridal edits and bold event dressing')
    hero_heading = models.CharField(
        max_length=220,
        default='Luxury-focused looks for clients who want the boutique to feel unforgettable.',
    )
    trust_eyebrow = models.CharField(max_length=120, default='Luxury reassurance')
    trust_heading = models.CharField(
        max_length=220,
        default='Premium buying signals that make a bold brand feel trustworthy from the first scroll.',
    )
    testimonial_eyebrow = models.CharField(max_length=120, default='Spotlight reviews')
    testimonial_heading = models.CharField(
        max_length=220,
        default='A bold concept that feels premium, editorial, and instantly memorable.',
    )
    contact_heading = models.CharField(
        max_length=220,
        default='Talk to the boutique team for orders, customisation, and delivery updates.',
    )
    cta_eyebrow = models.CharField(max_length=120, default='Private styling desk')
    cta_heading = models.CharField(
        max_length=220,
        default='Offer a concierge-style WhatsApp consultation for VIP picks, fittings, and urgent occasion orders.',
    )
    contact_location = models.CharField(max_length=180, default='Eros Sampoornam, Noida Extension')
    contact_map_link = models.URLField(default='https://maps.google.com/?q=Eros+Sampoornam+Noida+Extension')
    contact_phone = models.CharField(max_length=30, default='+91 92112 61727')
    contact_hours = models.CharField(max_length=180, default='Support on WhatsApp, Monday to Saturday')
    contact_email = models.EmailField(default='hello@bootique-demo.com')

    def __str__(self):
        return 'Site settings'


class HeroSlide(models.Model):
    title = models.CharField(max_length=120, blank=True)
    alt_text = models.CharField(max_length=255)
    image = models.FileField(upload_to='hero/')
    sort_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['sort_order', 'id']

    def __str__(self):
        return self.title or self.alt_text


class Collection(models.Model):
    heading = models.CharField(max_length=120, unique=True)
    slug = models.SlugField(unique=True)
    sort_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['sort_order', 'id']

    def __str__(self):
        return self.heading


class Product(models.Model):
    collection = models.ForeignKey(Collection, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=120)
    price = models.CharField(max_length=40)
    tag = models.CharField(max_length=80, blank=True)
    alt_text = models.CharField(max_length=255, blank=True)
    image = models.FileField(upload_to='products/')
    sort_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['sort_order', 'id']

    def __str__(self):
        return f'{self.collection.heading} - {self.name}'
