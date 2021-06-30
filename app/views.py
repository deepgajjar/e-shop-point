from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Product,OrderPlaced,BannerSlider,Category,Brand,productImage,CustomerOtherDetails,CustomerAddress,SerachSuggestions
from django.contrib.auth.models import User
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken,AccessToken
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import check_password
from rest_framework import status
# from .serializers import BannerSliderSer,ProductSer,CategorySer,Category_product_list,ProductImage,ProductDetails
from . import serializers
from rest_framework.decorators import api_view
from django.db.models import Q
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
# for email send 
from django.conf import settings
from django.core.mail import send_mail
import random
import json
import razorpay
from datetime import datetime
# razorpay payment gateway object
client = razorpay.Client(auth=('rzp_test_xUPvX2FfVbTVZt','8qs6s39GfG7XLbNxqmgd3qnb'))

# render homepage
def home(request):
 return render(request, 'app/home.html')

# render all category page
def allproductpage(request):
 return render(request, 'app/mobile.html')
# main working area start

# hambergermenu category code start here
@api_view(["GET"])
def hammenu(request):
    hamberger_cat_data = dict()
    category_list = Category.objects.all()
    category_list_ser=serializers.CategorySer(category_list,many=True)
    hamberger_cat_data["categories_ham"] = category_list_ser.data
    return Response(hamberger_cat_data)
# hambergermenu category code end here

# serach suggestions function
@api_view(["POST"])
def Search_suggestions(request):
    ss_data = SerachSuggestions.objects.filter(ss_name__icontains=request.data["searchsuggestion"])
    ss_data =serializers.SerachSuggestionsSer(ss_data,many=True)
    print(ss_data.data)
    return Response(ss_data.data)


# Home page coding start here
class HomePage(APIView):
    def get(self,request,**kwargs):
        homepage = dict()
        # banner slider code start here
        data = BannerSlider.objects.all()
        ser_data = serializers.BannerSliderSer(data,many=True)
        homepage['bannerslider'] = ser_data.data
        # banner slider code end here

        # Mobiles slider code start here
        mobiles_slider = Category.objects.get(cat_id=1)
        mobile_products = mobiles_slider.category_name.all().order_by('?')[:6]
        mobile_sliderSer = serializers.ProductSer(mobile_products,many=True)
        homepage["mobile_slider"] = mobile_sliderSer.data
        Trending_pro_slider = Product.objects.all().order_by('?')[:6]
        Trending_pro_sliderSer = serializers.ProductSer(Trending_pro_slider,many=True)
        homepage["trending_pro_slider"] = Trending_pro_sliderSer.data

        # Mobiles slider code end here here

        return Response(homepage)
       


# Home page coding end here

# product details page code start here
class ProductDetails(APIView):
    def get(self,request,**kwargs):
        product_det_dict = dict()
        product_details = Product.objects.get(pid=kwargs["pk"])
        product_detailsSer = serializers.ProductDetails(product_details)
        product_img_list = productImage.objects.filter(pid=product_details.pid)
        print("___________________________________")
        print(product_img_list)
        product_img_listSer = serializers.ProductImage(product_img_list,many=True)
        product_det_dict["main_details"] = product_detailsSer.data
        product_det_dict["images"] = product_img_listSer.data
        return Response(product_det_dict)

# product details page code end here

# category vise product list code start
class CategoryProductList(APIView):
    def get(self,request,**kwargs):
        if "filter" not in kwargs: 
            cat_vise_pro_list = dict()
            # get all product category vise
            catpro_list=Product.objects.filter(category=kwargs["catid"]).order_by("?")
            catpro_list_ser = serializers.Category_product_list(catpro_list,many=True)
            cat_vise_pro_list["catpro_list"] = catpro_list_ser.data
            # get all brands data by category
            brand_list_cat_vise=Brand.objects.filter(brand_rq_name__category=kwargs["catid"])
            print(brand_list_cat_vise.query)
            brand_list_cat_vise_ser = serializers.BrandSer(brand_list_cat_vise,many=True)
            cat_vise_pro_list["brand_list_cat_vise"] = brand_list_cat_vise_ser.data
            return Response(cat_vise_pro_list)
        if(kwargs["filter"] == "above" or kwargs["filter"] == "belove"):
            cat_vise_pro_list = dict()
            if(kwargs["filter"] == "above"): 
                # above 10000 code 
                catpro_list_filtered = Product.objects.filter(Q(category=kwargs["catid"]) & Q(discounted_price__gte=10000)).order_by("?")
                catpro_list_filtered_ser = serializers.Category_product_list(catpro_list_filtered,many=True)
                cat_vise_pro_list["catpro_list"] = catpro_list_filtered_ser.data
                return Response(cat_vise_pro_list)
            else:
                # below 10000 code
                catpro_list_filtered = Product.objects.filter(Q(category=kwargs["catid"]) & Q(discounted_price__lte=10000)).order_by("?")
                catpro_list_filtered_ser = serializers.Category_product_list(catpro_list_filtered,many=True)
                cat_vise_pro_list["catpro_list"] = catpro_list_filtered_ser.data
                return Response(cat_vise_pro_list)
        if(kwargs["filter"] == "brand"):
            # filter by brands
            cat_vise_pro_list = dict()
            catpro_list_filtered = Product.objects.filter(Q(category=kwargs["catid"]) & Q(brand=kwargs["brand_id"])).order_by("?")
            catpro_list_filtered_ser = serializers.Category_product_list(catpro_list_filtered,many=True)
            cat_vise_pro_list["catpro_list"] = catpro_list_filtered_ser.data
            return Response(cat_vise_pro_list)
# category vise product list code end

# customer registration  manually

# @method_decorator(csrf_exempt, name='dispatch')
# class customerRegistration(APIView):
#     def get(self,request,**kwargs):
#         return render(request, 'app/customerregistration.html')

#     def post(self,request,**kwargs):
#         print(request.data)
#         print(request.session.items())
#         print("____________________")
#         reg_ser = serializers.CustomerModelSer(data=request.data)
#         if  reg_ser.is_valid():
#             print("-----------------")
#             print("current working area")
#             print(reg_ser.data["email"])
#             CustomerModel.objects.create(email=reg_ser.data["email"],password=reg_ser.data["password"],firstname=reg_ser.data["firstname"],
#             lastname=reg_ser.data["lastname"],mobile_no=int(reg_ser.data["mobile_no"]),)
#             return Response({"success":True})
#         else:
#             print(dict(reg_ser.errors))
#             verrors =  reg_ser.errors
#             verrors["success"] =False
#             return Response(verrors)
#         print("____________________")
    
#     def put(self,request,**kwargs):
#         print(request.headers)
#         print(request.session.items())
#         return Response({"session":request.session.get("email")})


# customer registration  jwt using django authentication

@method_decorator(csrf_exempt, name='dispatch')
class customerRegistration(APIView):
    def get(self,request,**kwargs):
        return render(request, 'app/customerregistration.html')

    def post(self,request,**kwargs):
        print(request.data)
        print(request.session.items())
        print("____________________")
        reg_ser = serializers.CustomerModelSer(data=request.data)
        if  reg_ser.is_valid():
            print("-----------------")
            print("current working area")
            print(reg_ser.data["email"])
            # CustomerModel.objects.create(email=reg_ser.data["email"],password=reg_ser.data["password"],firstname=reg_ser.data["firstname"],
            # lastname=reg_ser.data["lastname"],mobile_no=int(reg_ser.data["mobile_no"]),)
            user_obj = User.objects.create_user(username=reg_ser.data["email"],email=reg_ser.data["email"],password=reg_ser.data["password"],
            first_name=reg_ser.data["firstname"],last_name=reg_ser.data["lastname"])
            user_obj.save()
            print(user_obj.id)
            CustomerOtherDetails.objects.create(mobileno=reg_ser.data["mobile_no"],user=user_obj)
            print("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
            print(CustomerOtherDetails.objects.all().values())
            return Response({"success":True})
        else:
            print(dict(reg_ser.errors))
            verrors =  reg_ser.errors
            verrors["success"] =False
            return Response(verrors)
        print("____________________")


# customer login
class CustomerLogin(APIView):
    def get(self,request,**kwargs):
        return render(request, 'app/login.html')
    
# customer logout code 
class CustomerLogout(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self,request,**kwargs):    
            print(request.user)
            try:
                refresh_token = request.data["refresh_token"]
                print(refresh_token)
                token =RefreshToken(refresh_token)
                token.blacklist()
                return Response({'success':"logutcode","user":request.user.username},status.HTTP_205_RESET_CONTENT)
            except Exception as e:
                return Response(status.HTTP_400_BAD_REQUEST)

# user profile code 
class CustomerProfileData(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self,request,**kwargs):
        print(request.user.id)
        user_data =User.objects.get(username=request.user.username)
        print(user_data.id)
        mobile_no = user_data.user_r_name.all().values()
        print(mobile_no)
        # print(CustomerOtherDetails.objects.filter(user_rq_name_id__exact=user_data.id))
        return Response({"username":request.user.username,"firstname":request.user.first_name,"lastname":request.user.last_name,
        "mobileno":mobile_no[0]["mobileno"]})
    
    def post(self,request,**kwargs):
        print(kwargs)
        if kwargs["getall"] == "getall_addresses":
            print("psot request comed")
            print(request.user.username)
            address_qs = request.user.cadd_user_r_name.all()
            address_qs_ser = serializers.CustomerAddressSer(address_qs,many=True)
            print(address_qs_ser.data)
            return Response(address_qs_ser.data)
        elif kwargs["getall"] == "insert_address":
            print(request.user)
            print(request.data)
            ins_add_data_ser = serializers.CustomerInsertAddressSer(data=request.data)
            if ins_add_data_ser.is_valid():
                print("all data are validated ")
                print(ins_add_data_ser.data)
                CustomerAddress.objects.create(country=request.data["country"],name=request.data["name"],
                mobile_no=request.data["mobile_no"],pinocde=request.data["pinocde"],
                flat_house_building_company_apartment_no=request.data["flat_house_building_company_apartment_no"],
                area_colony_street_sector_village=request.data["area_colony_street_sector_village"],
                landmark=request.data["landmark"],town_city=request.data["town_city"],
                state_province_region=request.data["state_province_region"],user=request.user)
                return Response({"insert_address":True})
            else:
                 return Response(ins_add_data_ser.errors)
        elif kwargs["getall"] == "edit_cust_add_by_add_id":
                print(request.data)
                print(request.user)
                address_qs = request.user.cadd_user_r_name.get(pk=request.data["add_id"])
                address_qs_ser = serializers.CustomerAddressSer(address_qs)
                print(address_qs_ser.data)
                return Response(address_qs_ser.data)
        elif kwargs["getall"] == "update_address":
            ins_add_data_ser = serializers.CustomerInsertAddressSer(data=request.data)
            if ins_add_data_ser.is_valid():
                print("all data are validated ")
                print(ins_add_data_ser.data)
                CustomerAddress.objects.filter(custadd_id=kwargs["add_id"]).update(country=request.data["country"],name=request.data["name"],
                mobile_no=request.data["mobile_no"],pinocde=request.data["pinocde"],
                flat_house_building_company_apartment_no=request.data["flat_house_building_company_apartment_no"],
                area_colony_street_sector_village=request.data["area_colony_street_sector_village"],
                landmark=request.data["landmark"],town_city=request.data["town_city"],
                state_province_region=request.data["state_province_region"])
                return Response({"update_address":True})
            else:
                return Response(ins_add_data_ser.errors)
            print("this is update_address")
        elif kwargs["getall"] == "delete_address":
            print(kwargs["add_id"])
            CustomerAddress.objects.filter(custadd_id=kwargs["add_id"]).delete()
            return Response({"add_deleted":True})
        else:
            return Response({"address":"not found"})
    
    def put(self,request,**kwargs):
        print(kwargs)
        if kwargs["change_name"] == "name":
            print("name")
            print(request.data)
            print(request.user)
            User.objects.filter(username=request.user.username).update(first_name=request.data["first_name"],
            last_name=request.data["last_name"])
            return Response({'name_changed':True})
        elif kwargs["change_name"] == "email":
            print("email")
            User.objects.filter(username=request.user.username).update(username=request.data["email"],email=request.data["email"])
            return Response({'email_changed':True})
        elif kwargs["change_name"] == "mobileno":
            print("mobileno")
            print(request.user)
            print(request.data)
            print("CustomerProfile put request run")
            user_data = request.user.user_r_name.all().update(mobileno=request.data["mobile_no"])
            print(user_data)
            return Response({'mobileno_changed':True})
        elif kwargs["change_name"] == "changepassword" :
            print("this is",request.data)
            print(request.user)
            currentpassword =request.user.password
            check_pass = check_password(request.data["oldpassword"],currentpassword)
            print(check_pass)
            if check_pass:
                user_qs3 = User.objects.get(username__exact=request.user.username)
                user_qs3.set_password(request.data["newpassword"])
                user_qs3.save()
                return Response({'password_changed':True})
            else:
                 return Response({'password_changed':False})

# product search code 
class ProductSearch(APIView):
    def get(self,request,**kwargs):
       print(request.data)
       return Response({'cart':"success"})
    def post(self,request,**kwargs):
        print(request.data)
        sr_qs = Product.objects.filter(search_keywords__icontains=request.data["searchkw"])
        print(sr_qs.count())
        if sr_qs.count() > 0:
           return Response({"serch_avail":True})
        else:
            return Response({"serch_avail":False})
    #    sr_qsSer = serializers.Category_product_list(sr_qs,many=True)
    def put(self,request,**kwargs):
        print(request.data)
        sr_qs = Product.objects.filter(search_keywords__icontains=request.data["searchkw"])
        print(sr_qs.count())
        if sr_qs.count() > 0:
            sr_qsSer = serializers.Category_product_list(sr_qs,many=True)
            return Response(sr_qsSer.data)
        else:
            return Response({"seacrh_notfound":True})
    #    sr_qsSer = serializers.Category_product_list(sr_qs,many=True)
       

# cart product send code
class Cart(APIView):
    def get(self,request,**kwargs):
        return Response({'cart':"success"})
    def post(self,request,**kwargs):
        print(request.data)
        cart_pro = Product.objects.filter(pid__in=request.data)
        cart_pro_ser = serializers.cart_product_list(cart_pro,many=True)
        return Response(cart_pro_ser.data)

# pay on delivery order code 
import time
class PayOnDelivery(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self,request,**kwargs):
        print("get request")
    def post(self,request,**kwargs):
        order_details = list()
        products_message = ""
        print(request.data)
        order_total_price = 0
        cart_det = request.data["cart_detail"] 
        address_id = request.data["addressid"]
        for i in cart_det:
           product =  Product.objects.get(pid=i["pid"])
           productser = serializers.ProductOrderSer(product)
           prodict = productser.data
           products_message += str(prodict["title"])+"          "+str(i["qty"])+"   "+str(i["qty"]*prodict["discounted_price"])+"\n"
           prodict.update({"qty":i["qty"]})
           order_details.append(prodict)
        print("__________________________________________________")
        print(order_details)
        # customer address object
        customer_address_obj = CustomerAddress.objects.get(custadd_id=address_id)
        # order total price counting
        print(customer_address_obj.custadd_id,address_id)
        for i in order_details:
            print(i)
            order_total_price += i["qty"]*i["discounted_price"]
        order_total_price+=50
        print(order_total_price)
        # convert all order detail in json
        order_details_json = json.dumps(order_details)
        days_in_sec = 1*60*60*24*4
        
        delivery_date = datetime.fromtimestamp(datetime.now().timestamp()+days_in_sec)
        porder = OrderPlaced.objects.create(user=request.user, customeraddress=customer_address_obj,cart=order_details_json,total_price=order_total_price,
        payment_type="pay_on_deliver",delivery_date=delivery_date)

        subject = "E-Shop order"
        message = "Your order placed successfully it will be deliver before "+str(delivery_date) +"\n"+"your order id is : "+str(porder.orderid)+" \n"+"productname          qty   price"+"\n"+products_message+"\n"+"delivery charge                 "+str(50.00)+"\n\n"+"Total price :               "+str(order_total_price)+"\n"+"Payment Type:         pay on delivery"
        email_from = settings.EMAIL_HOST_USER
        print(request.user.email)
        recipient_list = [request.user.email,]
        send_mail(subject,message,email_from,recipient_list)
        return Response({"pay_on_delivery_order_placed":True})



class PayOnline(APIView):   
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self,request,**kwargs):
        # order code  start
        order_details = list()
        products_message = ""
        print(request.data)
        order_total_price = 0
        cart_det = request.data["cart_detail"] 
        address_id = request.data["addressid"]
        for i in cart_det:
           product =  Product.objects.get(pid=i["pid"])
           productser = serializers.ProductOrderSer(product)
           prodict = productser.data
           products_message += str(prodict["title"])+"          "+str(i["qty"])+"   "+str(i["qty"]*prodict["discounted_price"])+"\n"
           prodict.update({"qty":i["qty"]})
           order_details.append(prodict)
        print("______________________________________________")
        print(order_details)
        # customer address object
        customer_address_obj = CustomerAddress.objects.get(custadd_id=address_id)
        # order total price counting
        print(customer_address_obj.custadd_id,address_id)
        for i in order_details:
            print(i)
            order_total_price += i["qty"]*i["discounted_price"]
        order_total_price+=50
        print(order_total_price)
        # convert all order detail in json
        order_details_json = json.dumps(order_details)
        days_in_sec = 1*60*60*24*4
        
        delivery_date = datetime.fromtimestamp(datetime.now().timestamp()+days_in_sec)
        # order code end 
        # generating payment order id code 
        print(request.user)
        receipt_no = random.randint(9999,9999999999)
        DATA= {
        'amount':order_total_price*100,
        'currency':'INR',
        'receipt':str(receipt_no),
        }
        coid = client.order.create(data=DATA)
        print(coid)
        contact_no = request.user.user_r_name.all().values()
        print("contact object",contact_no)
        user_details = {"name":request.user.first_name+" "+request.user.last_name,"contact_no":contact_no[0]["mobileno"],"email":request.user.email}
        print(user_details)
        return Response({"pay_online_order_placed":True,"payment_ord_details":coid,"user_details_for_pay":user_details})
    
    def put(self,request,**kwargs):
        print(request.data)

        order_details = list()
        products_message = ""
        print(request.data)
        order_total_price = 0
        payment_success_data =  request.data['success_payment_data']
        cart_det = request.data['order_details']["cart_detail"]
        address_id = request.data['order_details']["addressid"]
        print("cart_det",cart_det)
        print("_______________",address_id)
        print("______________",payment_success_data)
        if client.utility.verify_payment_signature(payment_success_data) == None:
            print("payment verified success fully")
            for i in cart_det:
                product =  Product.objects.get(pid=i["pid"])
                productser = serializers.ProductOrderSer(product)
                prodict = productser.data
                products_message += str(prodict["title"])+"          "+str(i["qty"])+"   "+str(i["qty"]*prodict["discounted_price"])+"\n"
                prodict.update({"qty":i["qty"]})
                order_details.append(prodict)
            print("______________________________________________")
            print(order_details)
            # customer address object
            customer_address_obj = CustomerAddress.objects.get(custadd_id=address_id)
            # order total price counting
            print(customer_address_obj.custadd_id,address_id)
            for i in order_details:
                print(i)
                order_total_price += i["qty"]*i["discounted_price"]
            order_total_price+=50
            print(order_total_price)
            # convert all order detail in json
            order_details_json = json.dumps(order_details)
            days_in_sec = 1*60*60*24*4
            
            delivery_date = datetime.fromtimestamp(datetime.now().timestamp()+days_in_sec)
            porder = OrderPlaced.objects.create(user=request.user, customeraddress=customer_address_obj,cart=order_details_json,total_price=order_total_price,
            payment_type="pay_online",delivery_date=delivery_date,razorpay_order_id=payment_success_data["razorpay_order_id"],
            razorpay_payment_id= payment_success_data["razorpay_payment_id"],razorpay_signature=payment_success_data["razorpay_signature"])

            subject = "E-Shop order"
            message = "Your order placed successfully it will be deliver before "+str(delivery_date) +"\n"+"your order id is : "+str(porder.orderid)+" \n"+"productname          qty   price"+"\n"+products_message+"\n"+"delivery charge                 "+str(50.00)+"\n\n"+"Total price :               "+str(order_total_price) +"\n"+"Payment Type:          online payment"+"\n"+"payment status           paid"
            email_from = settings.EMAIL_HOST_USER
            print(request.user.email)
            recipient_list = [request.user.email,]
            send_mail(subject,message,email_from,recipient_list)
            return Response({"pay_online_success":True})
        else:
            return Response({"pay_online_success":False})



# get all customer orders details
class GetAllCusOrder(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self,request,**kwargs):
        print("Get all Orders")
        print(request.user)
        order_qs_li = []
        qs = OrderPlaced.objects.filter(user=request.user).order_by("-orderid")
        print(qs.count())
        if(qs.count()>0):
            qs_ser = serializers.OrderPlacedSer(qs,many=True)
            for i in qs_ser.data:
                dict_data = i
                print("_________________________________________________________")
                cust_addr = CustomerAddress.objects.get(custadd_id=i["customeraddress"])
                custadd_ser = serializers.CustomerAddressSer(cust_addr)
                dict_data.update({"customeraddress_obj":custadd_ser.data})
                order_qs_li.append(dict_data)
                print("Customer address obj_________________")

                
            # print(qs_ser.data)
        return Response(order_qs_li)
    def post(self,request,**kwargs):
        print(kwargs["order_type"])
        if kwargs["order_type"] == "get_all_open_orders":
            order_qs_li = []
            qs = OrderPlaced.objects.filter(Q(user=request.user) & Q(status__in=["Accepted","Pending","Packed","On The Way"])).order_by("-orderid")
            print(qs.count())
            if(qs.count()>0):
                qs_ser = serializers.OrderPlacedSer(qs,many=True)
                for i in qs_ser.data:
                    dict_data = i
                    print("_________________________________________________________")
                    cust_addr = CustomerAddress.objects.get(custadd_id=i["customeraddress"])
                    custadd_ser = serializers.CustomerAddressSer(cust_addr)
                    dict_data.update({"customeraddress_obj":custadd_ser.data})
                    order_qs_li.append(dict_data)
                    print("Customer address obj_________________")
            return Response(order_qs_li)

        elif kwargs["order_type"] == "get_all_cancelled_orders":
            order_qs_li = []
            qs = OrderPlaced.objects.filter(Q(user=request.user) & Q(status__exact="Cancelled")).order_by("-orderid")
            print(qs.count())
            if(qs.count()>0):
                qs_ser = serializers.OrderPlacedSer(qs,many=True)
                for i in qs_ser.data:
                    dict_data = i
                    print("_________________________________________________________")
                    cust_addr = CustomerAddress.objects.get(custadd_id=i["customeraddress"])
                    custadd_ser = serializers.CustomerAddressSer(cust_addr)
                    dict_data.update({"customeraddress_obj":custadd_ser.data})
                    order_qs_li.append(dict_data)
                    print("Customer address obj_________________")
            return Response(order_qs_li)

    def delete(self,request,**kwargs):
        print(kwargs)
        if "remove_product" in kwargs:
            rm_ord_id = request.data["rmorderid"]
            rm_pro_id = request.data["rmproductid"]
            rm_order = OrderPlaced.objects.get(orderid=rm_ord_id)
            # not run when if status is Cancel
            if rm_order.status != "Cancelled":
                # if status is not cancel
                rm_order_ser = serializers.OrderPlacedSer(rm_order)
                total_price_of_order = rm_order_ser.data["total_price"]
                cart_data = json.loads(rm_order_ser.data["cart"])
                print("cart data : ",len(cart_data))
                # check cart list length if length is greater than 1
                if len(cart_data) > 1:
                    product_title = ""
                    for i in cart_data:
                        # find product list by pid
                        if i["pid"] == int(rm_pro_id):
                            cal_pro_price = i["qty"]*i["discounted_price"]
                            total_price_of_order -= cal_pro_price
                            product_title =i["title"]
                            cart_data.remove(i)
                    OrderPlaced.objects.filter(orderid=rm_ord_id).update(cart=json.dumps(cart_data),total_price=total_price_of_order)
                    subject = "E-Shop order"
                    message = "Product : "+product_title+" successfully removed from "+"your order id : "+str(rm_ord_id)+" \n"
                    email_from = settings.EMAIL_HOST_USER
                    recipient_list = [request.user.email,]
                    send_mail(subject,message,email_from,recipient_list)
                    return Response({"remove_particullar_pro":True})
                    # run when if 1 product in cart
                elif len(cart_data) == 1:
                        cancell_ord = OrderPlaced.objects.filter(orderid=rm_ord_id).update(status="Cancelled")
                        subject = "E-Shop order"
                        message = "Your order Cancelled successfully"+"\n"+"your order id is : "+str(rm_ord_id)+" \n"
                        email_from = settings.EMAIL_HOST_USER
                        recipient_list = [request.user.email,]
                        send_mail(subject,message,email_from,recipient_list)
                        return Response({"remove_pro_cancelled_order":True})
            else:
                return Response({"product_is_already_cancelled":True})
        else:
            cancell_ord = OrderPlaced.objects.filter(orderid=request.data["ord_id"]).update(status="Cancelled")
            subject = "E-Shop order"
            message = "Your order Cancelled successfully"+"\n"+"your order id is : "+str(request.data["ord_id"])+" \n"
            email_from = settings.EMAIL_HOST_USER
            recipient_list = [request.user.email,]
            send_mail(subject,message,email_from,recipient_list)
            return Response({"cancelled_order":True})
# main working area end


def paymentView(request):
    DATA= {
    'amount':100*10,
    'currency':'INR',
    'receipt':'order_rcptid_11',
    'notes':{'Shipping address': 'Bommanahalli, Bangalore'}   # OPTIONAL
    }
    coid = client.order.create(data=DATA)
    print(coid)
    return render(request,'app/payment.html')
@api_view(['GET'])
def showOrders(request):
    print(client.utility)
    return Response({"success":"success"})

# @api_view(['GET'])
# def show_ord(request):
#     qs_d = User.objects.get(username="kalpesh@gmail.com")
#     qs_dser =serializers.UserModelSer(qs_d)
#     return Response(qs_dser.data)

def serach_result_page(request):
    return render(request,'app/searchresult.html')
def payment_options(request):
    return render(request,'app/paymentoptions.html')
def product_detail(request):
 return render(request, 'app/productdetail.html')

def add_to_cart(request):
 return render(request, 'app/addtocart.html')

def buy_now(request):
 return render(request, 'app/buynow.html')


def profile(request):
 return render(request, 'app/profile.html')

def address(request):
 return render(request, 'app/address.html')

def orders(request):
 return render(request, 'app/orders.html')

def change_password(request):
 return render(request, 'app/changepassword.html')

def userdata_change(request):
    return render(request,'app/userchangeview.html')

# def mobile(request):
#  return render(request, 'app/mobile.html')

# def login(request):
#  return render(request, 'app/login.html')

# def customerregistration(request):
#  return render(request, 'app/customerregistration.html')

def checkout(request):
 return render(request, 'app/checkout.html')
