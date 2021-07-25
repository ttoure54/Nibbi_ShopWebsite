from django.db import models
from django.contrib.auth.models import User

# Create your models here.
#Image processing : Pillow lib 



CATEGORIES_CHOICES = (
    ('T', 'Top'),
    ('B', 'Bottom'),
    ('A', 'Accessories')
)



class Item(models.Model):
    #item_id = models.IntegerField()
    title = models.CharField(max_length=200)
    #img = models.CharField(max_length=200)
    image = models.ImageField(null=True, blank=True)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    discount_price = models.IntegerField()
    #digital = models.BooleanField(default = False, null= True, Blank = False)
    slug = models.SlugField()
    categorie = models.CharField(max_length=200, choices = CATEGORIES_CHOICES)

    def __str__(self):
        return self.title
    
    @property 
    def imageURL(self):
        try:
            url = self.image.url
        except:
            url = ''
        return url 
"""

class User(models.Model):
    username = models.OneToOneField(User, on_delete=models.CASCADE, blank=True)
    first_name = models.CharField(max_length=200, null=True)
    last_name = models.CharField(max_length=200, null=True)
    mail = models.CharField(max_length=200, null=True)

    def __str__(self):
         return self.username
    
"""
class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True)
    name = models.CharField(max_length=200, null=True)
    mail = models.CharField(max_length=200, null=True)

    def __str__(self):
         return self.name


class Order(models.Model):
    transaction_id=models.CharField(max_length=100, null=True)
    customer =models.ForeignKey(Customer, on_delete = models.SET_NULL, null=True, blank=True)
    #item = models.ManyToManyField(OrderItem)
    completed = models.BooleanField(default=False)
    order_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id)
    
    @property
    def get_cart_total(self):
        orderitems=self.orderitem_set.all()
        total= sum([item.get_total for item in orderitems])
        return total

    @property
    def get_cart_items(self):
        orderitems=self.orderitem_set.all()
        total= sum([item.quantity for item in orderitems])
        return total
    
    @property
    def shipping(self):
        shipping = False
        orderitems = self.orderitem_set.all()
        for i in orderitems:
            shipping = True 
        return shipping 
    

class OrderItem(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    quantity = models.IntegerField(default=0, null=True, blank=True)
    date_added = models.DateTimeField(auto_now_add=True)

    """
    def __str__(self):
         return f"{self.quantity} of {self.item.title}"
         orderitems.False=
    """

    @property
    def get_total(self):
        total=self.quantity*self.item.price
        return total









#Classes for tests purposes 

class Item_test():
    title : str
    img : str
    price : int
    discount_price : int 


"""
class OrderItem(models.Model):
    user =models.ForeignKey(User, on_delete = models.CASCADE)
    items = models.ForeignKey(Item, on_delete=models.CASCADE)
    ordered = models.BooleanField(default=False)
    quantity = models.IntegerField(default=1)


    def _str_(self):
         return f"{self.quantity} of {self.item.title}"


class Order(models.Model):
    user =models.ForeignKey(User, on_delete = models.CASCADE)
    items = models.ManyToManyField(OrderItem)
    ordered = models.BooleanField(default=False)
    start_date = models.DateTimeField()
    ordered_date = models.DateTimeField()

    def _str_(self):
        return self.user.username
"""