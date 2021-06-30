from django.contrib import admin
from .models import Product,Category,OrderPlaced,BannerSlider,Brand,productImage,CustomerOtherDetails,CustomerAddress,SerachSuggestions,Otp_temp
# Register your models here.
# admin.site.site_header = 'e-shop dahsboard'

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["pid","title","selling_price","discounted_price","category","brand","product_img"]

@admin.register(OrderPlaced)
class OrderPlacedAdmin(admin.ModelAdmin):
    list_display = ["orderid","customeraddress","payment_type","user","status" ,"ordered_date","delivery_date"]


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["cat_id","cat_name"]

@admin.register(BannerSlider)
class BannerSliderAdmin(admin.ModelAdmin):
    list_display = ["banner_id","banner_img","active"]

@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ["brand_id","brand_name"]
@admin.register(productImage)
class productImageAdmin(admin.ModelAdmin):
    list_display = ['img_id','pid','oimg']
@admin.register(CustomerOtherDetails)
class CustomerOtherDetailsAdmin(admin.ModelAdmin):
    list_display = ["cust_oid","mobileno","user"]

@admin.register(CustomerAddress)
class CustomerAddressAdmin(admin.ModelAdmin):
    list_display = ["custadd_id","user","country","name","pinocde","mobile_no","flat_house_building_company_apartment_no"
    ,"area_colony_street_sector_village","landmark","town_city","state_province_region"]

@admin.register(SerachSuggestions)
class SerachSuggestionsAdmin(admin.ModelAdmin):
    list_display = ["ss_id","ss_name"]

@admin.register(Otp_temp)
class Otp_tempAdmin(admin.ModelAdmin):
    list_display = ["otp_id","email_add","otp"]
    