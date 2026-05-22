from django.contrib import admin

from .models import Collection, HeroSlide, Product, SiteSettings


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    fieldsets = (
        ('Brand', {'fields': ('brand_name', 'brand_tagline', 'footer_description')}),
        ('Hero', {'fields': ('hero_eyebrow', 'hero_heading')}),
        ('Trust Section', {'fields': ('trust_eyebrow', 'trust_heading')}),
        ('Testimonials Section', {'fields': ('testimonial_eyebrow', 'testimonial_heading')}),
        ('CTA Section', {'fields': ('cta_eyebrow', 'cta_heading')}),
        ('Contact', {'fields': ('contact_heading', 'contact_location', 'contact_map_link', 'contact_phone', 'contact_hours', 'contact_email')}),
    )

    def has_add_permission(self, request):
        return not SiteSettings.objects.exists()


@admin.register(HeroSlide)
class HeroSlideAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'sort_order', 'is_active')
    list_editable = ('sort_order', 'is_active')
    search_fields = ('title', 'alt_text')


class ProductInline(admin.TabularInline):
    model = Product
    extra = 0
    fields = ('name', 'price', 'tag', 'sort_order', 'is_active')
    ordering = ('sort_order', 'id')


@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    list_display = ('heading', 'slug', 'sort_order', 'is_active')
    list_editable = ('sort_order', 'is_active')
    prepopulated_fields = {'slug': ('heading',)}
    inlines = [ProductInline]


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'collection', 'price', 'sort_order', 'is_active')
    list_filter = ('collection', 'is_active')
    list_editable = ('sort_order', 'is_active')
    search_fields = ('name', 'tag', 'collection__heading')

# Register your models here.
