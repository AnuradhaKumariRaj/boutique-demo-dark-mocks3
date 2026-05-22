from django.urls import path

from .views import storefront_data

urlpatterns = [
    path('storefront/', storefront_data, name='storefront-data'),
]
