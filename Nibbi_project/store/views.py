from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.

from .models import *
from .utils import cookieCart, cartData, guestOrder

import datetime 
import json

# Create your views here.




def home(request):
    context ={}
    return render(request, 'store/home.html', context)


def products(request):

    products_list = Item.objects.all()

    """

    data = cartData(request)
    cartItems = data['cartItems'] 
    order = data['order']
    items = data['items']

    items1 = Item_test()
    items2 = Item_test()
    items3 = Item_test()
  

    items1.title = "Article 1"
    items2.title = "Article 2"
    items3.title = "Article 3"

    items1.price = "39€"
    items2.price = "43€"
    items3.price = "56€"

    items1.img = "img1"
    items2.img = "img2"
    items3.img = "img3"

    

    products_list = {items1, items2, items3}

    """

    context = {}
    return render(request, 'store/products.html',{'products_list':products_list})


def cart(request):


    #Check Authentification of the user
    data = cartData(request)
    cartItems = data['cartItems'] 
    order = data['order']
    items = data['items']

    context = {}
    return render(request, 'store/cart.html', {"items" : items, "order" : order, "cartItems": cartItems})


        


def checkout(request):

    data = cartData(request)
    cartItems = data['cartItems'] 
    order = data['order']
    items = data['items']

    

    context = {}
    return render(request, 'store/checkout.html', {"items" : items, "order" : order, "cartItems": cartItems})



def updateItem(request):


    data = json.loads(request.body)
    productId = data['productId']
    action = data['action']

    print('Action', action)
    print('productId', productId)

    customer = request.user.customer
    product = Item.objects.get(id=productId)
    order, created = Order.objects.get_or_create(customer=customer, completed=False)

    orderItem, created = OrderItem.objects.get_or_create(order=order, item=product)

    if action =='add':
        orderItem.quantity = (orderItem.quantity + 1)
    elif action =='remove':
        orderItem.quantity = (orderItem.quantity - 1)
    
    orderItem.save()

    if orderItem.quantity <= 0:
        orderItem.delete()


    return JsonResponse('Item added:', safe=False)


def processOrder(request):

    print('Data:', request.body)

    transactionId= datetime.datetime.now().timestamp()
    data = json.loads(request.body)

    if request.user.is_authenticated: 
        customer = request.user.customer
        order, created = Order.objects.get_or_create(customer=customer, completed=False)

    else:
        order, customer = guestOrder(data, request)

    total = float(data['form']['total'])
    order.transactionId = transactionId

    if total == order.get_cart_total:
        order.completed =True
        
    order.save()

    if order.shipping == True :
            shippingAdress.objects.create(
                customer =customer,
                order =order,
                adress= data['shipping']['address'],
                state= data['shipping']['state'],
                zipcode= data['shipping']['zipcode']
            )


    return JsonResponse('Payment completed', safe = False)