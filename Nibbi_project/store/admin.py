from django.contrib import admin
from .models import Item, Order, OrderItem, Customer

# Register your models here.



class ItemsAdmin(admin.ModelAdmin):

    prepopulated_fields = {'slug':('title',)}
    list_display = [
        'title',
        'price',
        'discount_price'

    ]

admin.site.register(Item, ItemsAdmin)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Customer)
#admin.site.register(User)