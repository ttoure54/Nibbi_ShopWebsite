import json
from .models import *



def cookieCart(request):

        try:
            cart= json.loads(request.COOKIES['cart'])
        except:
            #cart={} 
            print("json loads failure ")

        print('cart cookies', cart)
        
        
        items = []
        order = {'get_cart_total':0, 'get_cart_items':0, 'shipping':False}
        cartItems = order['get_cart_items']

        for i in cart:
            try:
                cartItems += cart[i]['quantity']

                item = Item.objects.get(id=i) 
                total = (item.price*cart[i]['quantity'])

                order['get_cart_total'] += total
                order['get_cart_items'] += cart[i]['quantity']

                item_dic = {
                    'item':{
                        'id':item.id,
                        'title':item.title,
                        'price':item.price,
                        'imageURL':item.imageURL,},
                    'quantity':cart[i]['quantity'],
                    'get_total':total
                }

                items.append(item_dic)
                order['shipping'] = True
            except:
                console.log("item not found in database")
    

        context = {}
        return {"items" : items, "order" : order, "cartItems": cartItems}


def cartData(request):
        
    if request.user.is_authenticated:
        customer = request.user.customer
        order, created = Order.objects.get_or_create(customer=customer, completed=False)    
        items = order.orderitem_set.all()
        cartItems = order.get_cart_items    
    else:
        cookieData = cookieCart(request)
        cartItems = cookieData['cartItems'] 
        order = cookieData['order']
        items = cookieData['items']

    return {"items" : items, "order" : order, "cartItems": cartItems}


def guestOrder(data, request):

    print('user not login')

    print('COOKIES', request.COOKIES)
    name = data['form']['name']
    email = data['form']['email']

    cookieData = cookieCart(request)
    items = cookieData['items']

    customer, created = Customer.objects.get_or_create(email=email,)
    customer.name = name
    customer.save()

    order = Order.objects.get_or_create(customer= customer, completed = False)

    for item in items:
        product = Item.objects.get(id=item['product']['id'])
        orderItem = OrderItem.object.create(product=product, order=order, quantity=item['quantity'])



    return order, customer

    