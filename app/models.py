from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator,MinValueValidator
from django.contrib.auth.models import User

class BannerSlider(models.Model):
    banner_id = models.BigAutoField(primary_key=True)
    banner_img = models.ImageField(upload_to="bannerimg")
    active = models.IntegerField(default=0)
# Create your models here.
STATE_CHOICES = (
    ("Andman & Nicobar Island","Andman & Nicobar Island"),
    ("Aandhra Pradesh","Aandhra Pradesh"),
    ("Gujarat","Gujarat"),
    ("Rajeshthan","Rajeshthan"),
    ("Punjab","Punjab"),
    ("Dadra & Nagar Haveli","Dadra & Nagar Haveli"),
    ("Karnatak","Karnatak"),
    ("Bihar","Bihar")
)
# CUSTOMER MODEL
# class CustomerModel(models.Model):
#     user = models.ForeignKey(User,on_delete=models.CASCADE,related_name="cust_user_r_name",
#     related_query_name="cust_user_rq_name")
#     cust_id = models.BigAutoField(primary_key=True)
#     locality =models
#     mobile_no = models.BigIntegerField()
# Customer model for jwt auth 
class CustomerOtherDetails(models.Model):
    cust_oid = models.BigAutoField(primary_key=True)
    mobileno = models.BigIntegerField()
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name="user_r_name",related_query_name="user_rq_name")
# address model
class CustomerAddress(models.Model):
    custadd_id = models.BigAutoField(primary_key=True)
    country = models.CharField(max_length=200,default="India")
    name = models.CharField(max_length=200)
    mobile_no = models.BigIntegerField()
    pinocde = models.CharField(max_length=30)
    flat_house_building_company_apartment_no = models.CharField(max_length=200)
    area_colony_street_sector_village = models.CharField(max_length=230)
    landmark = models.CharField(max_length=230)
    town_city = models.CharField(max_length=230)
    state_province_region = models.CharField(max_length=230)
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_query_name="cadd_user_rq_name",
    related_name="cadd_user_r_name")

    def __str__(self):
        return str(self.name)

# Category model
class Category(models.Model):
    cat_id = models.BigAutoField(primary_key=True)
    cat_name = models.CharField(max_length=230)

    def __str__(self):
        return str(self.cat_name)

# brand model
class Brand(models.Model):
    brand_id = models.BigAutoField(primary_key=True)
    brand_name = models.CharField(max_length=200)

    def __str__(self):
        return str(self.brand_name)
# PRODUCT MODEL
class Product(models.Model):
    pid = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=200)
    selling_price = models.FloatField()
    discounted_price = models.FloatField()
    description = models.TextField()
    brand = models.ForeignKey(Brand,on_delete=models.CASCADE,
    related_name="brand_r_name",
    related_query_name="brand_rq_name"
    )
    category = models.ForeignKey(Category,on_delete=models.CASCADE,
    related_name="category_name",
    related_query_name="category_q_name")
    pro_stock = models.BigIntegerField()
    product_img = models.ImageField(upload_to='productimg')
    search_keywords = models.TextField(blank=True)

    def __str__(self):
        return str(self.pid)
# product Images model
class productImage(models.Model):
    img_id = models.BigAutoField(primary_key=True)
    pid = models.ForeignKey(Product,on_delete=models.CASCADE,
    related_name="product_img_name",
    related_query_name="product_img_q_name")
    oimg = models.ImageField(upload_to='productimg')


# CART MODEL
# class Cart(models.Model):
#     cart_id = models.BigAutoField(primary_key=True)
#     user = models.ForeignKey(User,on_delete=models.CASCADE,
#     related_name="cart_r",
#     related_query_name="cart_qr")
#     product = models.ForeignKey(Product,on_delete=models.CASCADE,
#     related_name="cart_r",
#     related_query_name="cart_qr")
#     quantity = models.PositiveIntegerField(default=1)

#     def __str__self(self):
#         return str(self.cart_id)

STATUS_CHOICES = (
    ("Accepted","Accepted"),
    ("Pending","Pending"),
    ('Delivered','Delivered'),
    ("Packed","Packed"),
    ("On The Way","On The Way"),
    ("Cancelled","Cancelled")
)
# OrderPlaced MODEL
class OrderPlaced(models.Model):
    orderid = models.BigAutoField(primary_key=True)
    user=models.ForeignKey(User,on_delete=models.CASCADE,
    related_query_name="order_qr",
    related_name="order_r"
    )
    customeraddress = models.ForeignKey(CustomerAddress,on_delete=models.CASCADE,related_name="CustomerAddress_r_name",
    related_query_name="CustomerAddress_rq_name")
    cart = models.TextField()
    total_price = models.BigIntegerField()
    ordered_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=200,choices=STATUS_CHOICES,default="Accepted")
    payment_type = models.CharField(max_length=100)
    delivery_date = models.DateTimeField()
    razorpay_order_id = models.TextField(null=True,blank=True)
    razorpay_payment_id = models.TextField(null=True,blank=True)
    razorpay_signature = models.TextField(null=True,blank=True)

class SerachSuggestions(models.Model):
    ss_id = models.BigAutoField(primary_key=True)
    ss_name = models.TextField()

class Otp_temp(models.Model):
    otp_id = models.BigAutoField(primary_key=True)
    email_add = models.CharField(max_length=170)
    otp = models.BigIntegerField()