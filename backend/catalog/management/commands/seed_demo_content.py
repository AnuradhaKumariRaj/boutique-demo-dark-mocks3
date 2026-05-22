from pathlib import Path

from django.core.files import File
from django.core.management.base import BaseCommand
from django.db import transaction
from django.utils.text import slugify

from catalog.models import Collection, HeroSlide, Product, SiteSettings


HERO_SLIDES = [
    ('bridal-hero.jpg', 'Luxury bridal couture image for a dark premium boutique homepage'),
    ('bridal-gown.jpg', 'Bold couture gown photography for a black red fashion boutique concept'),
    ('bridal-anarkali-cream.jpg', 'Premium anarkali editorial image for a luxury dark mode boutique demo'),
    ('bridal_anarkali.jpg', 'High fashion bridal boutique visual with dramatic luxury styling'),
]

COLLECTIONS = {
    'Bride to be': [
        ('Brown Gown', 'Rs. 2,790', 'Bride to be', 'brown-gown.jpg'),
        ('Gray Gown', 'Rs. 3,780', 'Bride to be', 'gray-gwon.jpg'),
        ('Multi Color Gown', 'Rs. 3,560', 'Bride to be', 'multi-color-gown.jpg'),
        ('White Gown', 'Rs. 2,990', 'Bride to be', 'white-gown.jpg'),
        ('Creame Gown', 'Rs. 3,590', 'Bride to be', 'creamegown.jpg'),
        ('Green Gown', 'Rs. 5,990', 'Bride to be', 'green-gown.jpg'),
        ('Lightorange Gown', 'Rs. 6,990', 'Bride to be', 'light-orange.jpg'),
        ('Mahroon Gown', 'Rs. 9,990', 'Bride to be', 'mahroon.jpeg'),
        ('Sequece Gown', 'Rs. 11,990', 'Bride to be', 'sequece.jpg'),
    ],
    'Mom to be': [
        ('Blue Chiffon Look', 'Rs. 2,690', 'Mom to be', 'mom-to-be-blue-chiffon.jpg'),
        ('Brown Occasion Wear', 'Rs. 3,190', 'Mom to be', 'mom-to-be-brown.jpg'),
        ('Yellow Celebration Look', 'Rs. 2,890', 'Mom to be', 'mom-tobe-yellow.jpg'),
        ('Multi Color Look', 'Rs. 1,890', 'Mom to be', 'multi-color-gown.jpg'),
        ('Creame Look', 'Rs. 1,200', 'Mom to be', 'creame.jpg'),
        ('Simple Yellow Look', 'Rs. 890', 'Mom to be', 'yellow.jpg'),
        ('Orange Gown Look', 'Rs. 2,000', 'Mom to be', 'orange-gown.jpg'),
    ],
}


class Command(BaseCommand):
    help = 'Seed Django admin with the current premium dark demo hero slides and products.'

    def handle(self, *args, **options):
        frontend_assets = Path(__file__).resolve().parents[4] / 'src' / 'assets'

        with transaction.atomic():
            SiteSettings.objects.all().delete()
            HeroSlide.objects.all().delete()
            Product.objects.all().delete()
            Collection.objects.all().delete()

            SiteSettings.objects.create()

            for sort_order, (filename, alt_text) in enumerate(HERO_SLIDES, start=1):
                source = frontend_assets / filename
                slide = HeroSlide(title=filename.rsplit('.', 1)[0].replace('-', ' ').title(), alt_text=alt_text, sort_order=sort_order)
                with source.open('rb') as image_handle:
                    slide.image.save(source.name, File(image_handle), save=True)

            for collection_index, (heading, products) in enumerate(COLLECTIONS.items(), start=1):
                collection = Collection.objects.create(
                    heading=heading,
                    slug=slugify(heading),
                    sort_order=collection_index,
                )

                for product_index, (name, price, tag, filename) in enumerate(products, start=1):
                    source = next(frontend_assets.rglob(filename))
                    product = Product(
                        collection=collection,
                        name=name,
                        price=price,
                        tag=tag,
                        alt_text=f'{name} for {heading} premium dark boutique mockup',
                        sort_order=product_index,
                    )
                    with source.open('rb') as image_handle:
                        product.image.save(source.name, File(image_handle), save=True)

        self.stdout.write(self.style.SUCCESS('Premium dark demo content seeded successfully.'))
