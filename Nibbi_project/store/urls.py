from django.contrib import admin
from django.urls import path
from . import views



urlpatterns = [
    path('', views.home, name='home'),
    path('products/',views.products, name= 'products'),
    path('cart/', views.cart, name="cart"),
    path('checkout/', views.checkout, name="checkout"),

    path('update_item/', views.updateItem, name="update_item"),
    path('payment/', views.processOrder, name="process_order")
]