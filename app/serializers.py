from rest_framework import serializers
from .models import BannerSlider,Product,Category,productImage,Brand,CustomerAddress,OrderPlaced,SerachSuggestions
from django.contrib.auth.models import User
class BannerSliderSer(serializers.Serializer):
    banner_id = serializers.IntegerField()
    banner_img  = serializers.ImageField(max_length=None, allow_empty_file=False,use_url=True)
    active = serializers.IntegerField()

class CategorySer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"
class ProductSer(serializers.ModelSerializer):
    class Meta:
        model = Product
        exclude = ["description","brand","category"]

class ProductOrderSer(serializers.ModelSerializer):
    class Meta:
        model = Product
        exclude = ["description","brand","category","pro_stock"]
class Category_product_list(serializers.ModelSerializer):
    class Meta:
        model = Product
        exclude = ["description","brand","category","pro_stock"]

class cart_product_list(serializers.ModelSerializer):
    class Meta:
        model =Product
        exclude = ["description","category"]

class ProductImage(serializers.ModelSerializer):
    class Meta:
        model = productImage
        fields = "__all__"

class ProductDetails(serializers.ModelSerializer):
    class Meta:
        model = Product
        exclude = ["category","pro_stock"]

class BrandSer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = "__all__"
# for customer registration
class CustomerModelSer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()
    firstname = serializers.CharField()
    lastname = serializers.CharField()
    mobile_no = serializers.IntegerField()

    def validate_email(self,value):
        print("ser email : ",value)
        qs_cust = User.objects.filter(username=value)
        if qs_cust.count() > 0:
            print("email already registered please try another email.")
            raise serializers.ValidationError("email already registered please try another email.")
        return value
class CustomerAddressSer(serializers.ModelSerializer):
    class Meta:
        model = CustomerAddress
        fields = "__all__"

class OrderPlacedSer(serializers.ModelSerializer):
    class Meta:
        model = OrderPlaced
        fields = "__all__"

class CustomerInsertAddressSer(serializers.ModelSerializer):
    CustomerAddress_r_name = OrderPlacedSer(many=True,read_only=True)
    class Meta:
        model = CustomerAddress
        exclude = ["user",]


class UserModelSer(serializers.ModelSerializer):
    cadd_user_r_name= CustomerInsertAddressSer(many=True,read_only=True)
    class Meta:
        model = User
        fields = ["first_name","email","cadd_user_r_name"]

class SerachSuggestionsSer(serializers.ModelSerializer):
    class Meta:
        model = SerachSuggestions
        exclude  = ["ss_id"]
