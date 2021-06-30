from django.urls import path
from app import views
from django.conf import settings
from django.conf.urls.static import static
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView,TokenVerifyView
urlpatterns = [
    # base route
    path('', views.home,name="home"),
    # below route return hamberger category list
    path('hamitem/',views.hammenu,name="hammenu_cat"),
    # below route return home page data
    path('home/',views.HomePage.as_view(),name="homerest"),
    # below route return product details 
    path('product-detail/<int:pk>',views.ProductDetails.as_view(),name="productDetails"),
    # below route render product dtail page
    path('productdetail/', views.product_detail, name='product-detail'),
    # below route render cat_all product list
    path('cat_products/', views.allproductpage, name='mobile'),
    # below route return category vise product list
    path("cat_products_list/<int:catid>/",views.CategoryProductList.as_view(),name="cat_products_list"),
    # below route return category vise product list by filters above and belove
    path("cat_products_list/<int:catid>/<filter>/",views.CategoryProductList.as_view(),name="cat_products_list"),
    # below route return category vise product list by brands
    path("cat_products_list/<int:catid>/<filter>/<brand_id>/",views.CategoryProductList.as_view(),name="cat_products_list"),
    # below route return cart page
    path('cart/', views.add_to_cart, name='add-to-cart'),
    path('cart_data/',views.Cart.as_view(),name="cart_data"),
    path('buy/', views.buy_now, name='buy-now'),
    # below route render customer profile page
    path('profile/', views.profile, name='profile'),
    # below route render customer profile data
    path('profile_data/',views.CustomerProfileData.as_view(),name="profile_data"),
    # below route return customer address detail
    path('customer_address/<getall>/',views.CustomerProfileData.as_view(),name="get_cust_address"),
    path('customer_address/<getall>/<add_id>/',views.CustomerProfileData.as_view(),name="update_cust_address"),

    path('address/', views.address, name='address'),
    path('orders/', views.orders, name='orders'),
    # below route render user change data page
    path('userdata_change/',views.userdata_change,name="userdata_change"),
    # below route get a put request for changing first nad last name of user
    path('userdata_change/<change_name>/',views.CustomerProfileData.as_view(),name="userdata_change"),
    # path('user_email_change/<email>/',views.CustomerProfileData.as_view(),name="user_email_change"),
    # path('user_mobileno_change/<mobileno>/',views.CustomerProfileData.as_view(),name="user_mobileno_change"),
    path('changepassword/', views.change_password, name='changepassword'),
    #below route render login page
    path('login/', views.CustomerLogin.as_view(), name='login'),
    path('registration/', csrf_exempt(views.customerRegistration.as_view()), name='customerregistration'),
    path('checkout/', views.checkout, name='checkout'),
    path('logout/',views.CustomerLogout.as_view(),name="logout"),
    path('gettoken/',TokenObtainPairView.as_view(),name="gettoken"),
    path('refreshtoken/',TokenRefreshView.as_view(),name="refreshtoken"),
    path('verifytoken/',TokenVerifyView.as_view(),name="verifytoken"),
    # below route return payment option html page
    path('paymentoptions_for_pay/',views.payment_options,name="paymentoptions_for_pay"),
    # below route get order detail for placed order
    path('payondelivery/',views.PayOnDelivery.as_view(),name="payondelivery"),
    # below route return get post and put req for online payment
    path('payonline/',views.PayOnline.as_view(),name="payonline"),
    path('payment/',views.paymentView,name='payment'),
    path('search_result_page/',views.serach_result_page,name="serach_result_page"),
    path("getallorders/",views.GetAllCusOrder.as_view(),name="getallorders"),
    path("getallorders/<order_type>/",views.GetAllCusOrder.as_view(),name="getallorders_type"),
    path("search_products/",views.ProductSearch.as_view(),name="search_products"),
    path('get_all_or/',views.showOrders,name='getall'),
    path('remove_pro_from_ord/<remove_product>/',views.GetAllCusOrder.as_view(),name="remove_product_from_ord"),
    path("searchsuggestions/",views.Search_suggestions,name="searchsuggestions"),
    # path("ord_det_testing/",views.show_ord,name="test_ord_get"),

] + static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
