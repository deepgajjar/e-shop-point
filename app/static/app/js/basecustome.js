$(document).ready(function(){

var mainurl = "http://127.0.0.1:8000";
var searchBarSuggestionTextBoxRef = "";
search_suggestions_main_container_id_for_largescreen = "";
console.log(pagetitle);
console.log(mainurl+"/home/");

// home page logo link code start
$(document).on("click","#websitelogo",function(e){
    e.preventDefault();
    window.location = mainurl;
});
// home page logo link code end
// function start
function add_items_in_catvise_pro_list(data){
    $("#cat_products_card_container").html("");
    $.each(data,function(k,v){
        console.log(k,v);
        $("#cat_products_card_container").append(
            "<div class='col-sm-4' id='product_list_card'>"+
            "<div class='card' style='width: 15rem;'>"+
               "<a href='' data-pid='"+v.pid+"'><img src='"+v.product_img+"' class='card-img-top' alt='...'></a>"
            +"<div class='card-body'> "+
            "<p class='text-center' id='card_title'>"+v.title+"</p>"+
            "<p class='card-text text-center' id='pro_list_card_checked_price'><i class='fas fa-rupee-sign'></i> "+v.selling_price+"</p>"
            +"<p class='card-text text-center' id='pro_list_card_text'><i class='fas fa-rupee-sign'></i> "+v.discounted_price+" </p>"
            +"</div>" 
            +"</div>"
            +"</div>"
        );
    // $.each close
    });
}
// 2 start
function is_user_login(){
        var access_tok = window.localStorage.getItem("access_token");
        console.log("base page : ",access_tok);
        var acc_obj = {token:access_tok};
        var acc_obj_json = JSON.stringify(acc_obj);
        console.log(acc_obj_json);
        $.ajax({
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            url:mainurl+"/verifytoken/",
            type:"POST",
            dataType:"json",
            data:acc_obj_json,
            success:function(data){
                // run when if access token verification is success
                console.log("user is successfully logged : ",data);
                window.location = mainurl+"/profile/";
            }
    
        });

    }


// 2 end    

// 3 start 

function cart_item_no_disp(){
    if("cart_details" in window.localStorage){
        var cart_data = JSON.parse(window.localStorage.getItem("cart_details")); // getting cart data
        $("#cart_btn #cart_badge_no").html(cart_data.length);
    }
}

// 3 end 
// 4 start

function if_user_not_login(){
    if("access_token" in window.localStorage){
        var access_tok = window.localStorage.getItem("access_token");
        console.log("base page : ",access_tok);
        var acc_obj = {token:access_tok};
        var acc_obj_json = JSON.stringify(acc_obj);
        console.log(acc_obj_json);
        $.ajax({
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            url:mainurl+"/verifytoken/",
            type:"POST",
            dataType:"json",
            data:acc_obj_json,
            success:function(data){
                // run when if access token verification is success
                console.log("user is successfully logged : ",data);
            },
            statusCode:{
                401:function(data){
                    window.location = mainurl+"/login/";
                },
                400:function(data){
                    window.location = mainurl+"/login/";
                }
            }
    
        });

    }
    else{
        window.location = mainurl+"/login/";
    }
 
}

// 4 end

// 5 start
if("username" in window.localStorage){
    $("#my_profile_btn").html("<b>"+window.localStorage.getItem("username")+"</b>");
}
// 5 end

// 6 start

function insert_order_details_cards(data){


    $("#all_disp_orders_container").html('');
    $.each(data,function(k_main,v_main){

        console.log(v_main.cart);
        console.log(v_main);
        console.log("Order date ",v_main.ordered_date);
        // placed order date conversions start
        var pl_or_timedate = v_main.ordered_date;
        var pl_or_split_time_date = pl_or_timedate.split("T");
        var pl_or_dateparts = pl_or_split_time_date[0].split("-");
        var pl_or_timeparts = pl_or_split_time_date[1].split(":");
        var pl_or_date = new Date(pl_or_dateparts[0], pl_or_dateparts[1]-1, pl_or_dateparts[2]);
        var pl_or_proper_date = pl_or_date.toString().split(" ");
        var pl_or_date_fordisp = ""+pl_or_proper_date[2]+" "+pl_or_proper_date[1]+" "+pl_or_proper_date[3];
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",pl_or_split_time_date,pl_or_dateparts,pl_or_timeparts,pl_or_date,pl_or_proper_date,pl_or_date_fordisp);
        // placed order date conversions end
        var dl_or_timedate = v_main.delivery_date;
        var dl_or_split_time_date = dl_or_timedate.split("T");
        var dl_or_dateparts = dl_or_split_time_date[0].split("-");
        var dl_or_timeparts = dl_or_split_time_date[1].split(":");
        var dl_or_date = new Date(dl_or_dateparts[0], dl_or_dateparts[1]-1, dl_or_dateparts[2]);
        var dl_or_proper_date = dl_or_date.toString().split(" ");
        var dl_or_date_fordisp = ""+dl_or_proper_date[2]+" "+dl_or_proper_date[1]+" "+dl_or_proper_date[3];
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",dl_or_split_time_date,dl_or_dateparts,dl_or_timeparts,dl_or_date,dl_or_proper_date,dl_or_date_fordisp);

        // delivery date conversion start

        var address_appear_object = JSON.stringify(v_main.customeraddress_obj);
        
        // delivery date conversion end
        var order_products_data = JSON.parse(v_main.cart);
        console.log(order_products_data);
        $("#all_disp_orders_container").append("<div class='col-sm-12'><div>"+


        "<div class='container-fluid'>"+
         "<div class='row'>"+
             "<div class='col-sm-4'>"+
                "<h6 class='mb-3 text-muted'>Order id : "+v_main.orderid+"</h6>"+
             "</div>"+
             "<div class='col-sm-4'>"+
                "<h6 class='mb-3 text-muted'>Total : Rs. <span class='text-danger'>"+v_main.total_price+"</span></h6>"+
             "</div>"+
             "<div class='col-sm-4'>"+
                "<h6 class='mb-3 text-muted'>Order status : <span class='text-success'>"+v_main.status+"</span></h6>"+
             "</div>"+
         "</div>"+
        "</div>"+
        "<div class='container-fluid'>"+
        "<div class='row' id='order_products_list_append_con'>"
        );

        $.each(order_products_data,function(k_ordpro,v_ordpro){
            console.log(v_ordpro);
            $("#all_disp_orders_container").append(
                
                "<div class='col-sm-6 offset-sm-0 offset-2 col-8 pb-2'>"+
                "<div class='card mb-3' style='max-width: 540px;'>"+
                "<div class='container-fluid g-0'><div class='row g-0'><div class='col-sm-1 col-2 offset-sm-11 offset-10 text-muted text-center mt-1'><i class='fas fa-times product_del_from_order' data-delpropid='"+v_ordpro.pid+"' data-delproordid='"+v_main.orderid+"'></i></div></div></div>"+
                    "<div class='row g-0'>"+
                      "<div class='col-sm-3'>"+
                        "<a href='#' data-pid='"+v_ordpro.pid+"' id='order_det_card_img_width'><img src='"+mainurl+v_ordpro.product_img+"'   alt='not found' ></a>"+
                      "</div>"+
                      "<div class='col-md-9'>"+
                        "<div class='card-body text-left'>"+
                          "<h6 class='card-title'><span class='text-danger'>"+v_ordpro.title+"</span></h6>"+
                          "<p class='card-text'>Qty : "+v_ordpro.qty+"</p>"+
                        "</div>"+
                      "</div>"+
                    "</div>"+
                  "</div>"+ 
            "</div>"

            );


        });


        $("#all_disp_orders_container").append("</div></div><div class='container-fluid'>"+
        "<div class='row'>"+
            "<div class='col-sm-4'>"+
               "<h6 class='mb-3 text-muted'>ORDER PLACED AT <span class='text-primary'>"+pl_or_date_fordisp+"</span></h6>"+
            "</div>"+
            "<div class='col-sm-4'>"+
               "<h6 class='mb-3 text-muted'>ORDER DELIVER AT <span class='text-primary'>"+dl_or_date_fordisp+"</span></h6>"+
            "</div>"+
            "<div class='col-sm-4'>"+
               "<h6 class='mb-3 text-muted'>SHIP TO <span id='shiping_address_name_hover_for_disp_address' class='text-primary' data-addressdatafordisp='"+address_appear_object+"'>"+v_main.customeraddress_obj.name+"<i class='fas fa-chevron-down' style='font-size:13px; margin-left:10px;'></i>"+"</span></h6>"+
               "<div id='address_name_popover_div' class='' style='display:none;'>"+
                "<p  style='font-weight:bold; '>"+v_main.customeraddress_obj.name+"</p>"+
                "<p>"+v_main.customeraddress_obj.flat_house_building_company_apartment_no+"</p>"+
                "<p>"+v_main.customeraddress_obj.area_colony_street_sector_village+"</p>"+
                "<p>"+v_main.customeraddress_obj.landmark+"</p>"+
                "<p>"+v_main.customeraddress_obj.town_city+", "+v_main.customeraddress_obj.state_province_region+" "+v_main.customeraddress_obj.pinocde+"</p>"+
                "<p>"+v_main.customeraddress_obj.country+"</p>"+
                "<p>Phone: "+v_main.customeraddress_obj.mobile_no+"</p>"+
                
               "</div>"+
            "</div>"+
        "</div>"+
    "</div>");
    if(v_main.status == "Cancelled"){

    }
    else{
        $("#all_disp_orders_container").append(
            "<div class='container-fluid my-3'>"+
            "<div class='row'>"+
                "<div class='col-sm-6 offset-3 text-center'>"+
                    "<button type='button' class='btn btn-outline-secondary' id='whole_order_cancell_button' data-orderidforcancellord='"+v_main.orderid+"'>Cancel Order</button>"+
                "</div>"+
            "</div>"+
        "</div>"
        );
    }
   
        
    $("#all_disp_orders_container").append("</div></div><hr class='text-muted my-5'>");
        
    });


} // function end

// 6 end
// 7.1 start

$(document).on("keyup","#search_bar_input_tag",function(e){
    var search_keywords = $(this).val();
    searchBarSuggestionTextBoxRef = this;
    var search_suggestions_main_container_id_for_largescreen =$(this).parent().next();
    console.log(search_suggestions_main_container_id_for_largescreen);
    if(search_keywords.length > 0){
        $.ajax({
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            url:mainurl+"/searchsuggestions/",
            type:"POST",
            dataType:"JSON",
            data:JSON.stringify({searchsuggestion:search_keywords}),
            success:function(data){
                console.log(data);
                if(data.length > 0){
                    console.log($(searchBarSuggestionTextBoxRef).parent().next().children().children().children().html(""));
                    $(searchBarSuggestionTextBoxRef).parent().next().children().children().children().html("")
                    search_suggestions_main_container_id_for_largescreen.css({"display":"block"});
                    $.each(data, function(k,v){
                        $(searchBarSuggestionTextBoxRef).parent().next().children().children().children().append("<li>"+v.ss_name+"</li>");
                    });
                    
                }
                else{
                    search_suggestions_main_container_id_for_largescreen.css({"display":"none"});
                }
            }
        });
    }
    else{
        search_suggestions_main_container_id_for_largescreen.css({"display":"none"});
    }
    console.log(search_keywords);

});

$(document).on("click","#search_suggestions_ul_list li",function(e){
    e.preventDefault();
    // alert($(this).html());
    $(searchBarSuggestionTextBoxRef).val($(this).html());
    console.log();
    $(searchBarSuggestionTextBoxRef).parent().next().css({"display":"none"});
    // $("#search_suggestions_main_container").css({"display":"none"});
});



// 7.1 end

// 7 search bar code start

$(document).on("click","#search_bar_button",function(e){
    e.preventDefault();
    var search_kw = $(this).prev("#search_bar_input_tag").val();
    // alert(search_kw);
    if(search_kw.length > 0){
         var serch_obj = {searchkw:search_kw};
        $.ajax({
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            url:mainurl+"/search_products/",
            type:"POST",
            dataType:"JSON",
            data:JSON.stringify(serch_obj),
            success:function(data){
                console.log(data);
                if(data.serch_avail){
                    window.localStorage.setItem('searched_keyword',search_kw);
                    window.location = mainurl+"/search_result_page/";

                }
                else{
                    alert("search not found");
                }
            }
        });
    }
});

// 7 search bar code end
// function end

// cart item number displaying code start
cart_item_no_disp();
// cart item number displaying code start


// cart button click code start
$(document).on("click","#cart_btn",function(e){
    window.location = mainurl+"/cart/";
    // alert("cart page button clicked");
});
// cart button click code end

// search page code start

if(pagetitle == "SearchResultPage"){
    if("searched_keyword" in window.localStorage){

        var search_kw = window.localStorage.getItem("searched_keyword");
        if(search_kw.length > 0){
             var serch_obj = {searchkw:search_kw};
            $.ajax({
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json' 
                },
                url:mainurl+"/search_products/",
                type:"PUT",
                dataType:"JSON",
                data:JSON.stringify(serch_obj),
                success:function(data){
                    console.log(data);
                    // if(data.serch_avail){
                    //     window.localStorage.setItem('searched_keyword',search_kw);
                    //     window.location = mainurl+"/search_result_page/";
    
                    // }
                    // add_items_in_catvise_pro_list(data);

                    $("#cat_products_card_container").html("");
                    $.each(data,function(k,v){
                        console.log(k,v);
                        $("#cat_products_card_container").append(
                            "<div class='col-sm-3' id='product_list_card'>"+
                            "<div class='card' style='width: 15rem;'>"+
                               "<a href='' data-pid='"+v.pid+"'><img src='"+v.product_img+"' class='card-img-top' alt='...'></a>"
                            +"<div class='card-body'> "+
                            "<p class='text-center' id='card_title'>"+v.title+"</p>"+
                            "<p class='card-text text-center' id='pro_list_card_checked_price'><i class='fas fa-rupee-sign'></i> "+v.selling_price+"</p>"
                            +"<p class='card-text text-center' id='pro_list_card_text'><i class='fas fa-rupee-sign'></i> "+v.discounted_price+" </p>"
                            +"</div>" 
                            +"</div>"
                            +"</div>"
                        );
                    // $.each close
                    });


                    
                }
            });
        }


    }
    else{
        alert("nothing for search");
    }

     // product details code start for click

     $(document).on("click","#cat_products_card_container a",function(e){
        e.preventDefault();
        window.localStorage.setItem("product_pid",$(this).attr("data-pid"));
        console.log(window.localStorage.getItem("product_pid"));
        window.location = mainurl +'/productdetail';
    });
    
     // product details code start for click


} // search page end


// search page code end

// access token verifications 
if("access_token" in window.localStorage){
    // check if access_token is in localstorage if yes then go below
    console.log("Base page : ","access_token" in window.localStorage);
    var access_tok = window.localStorage.getItem("access_token");
    console.log("base page : ",access_tok);
    var acc_obj = {token:access_tok};
    var acc_obj_json = JSON.stringify(acc_obj);
    console.log(acc_obj_json);
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
        url:mainurl+"/verifytoken/",
        type:"POST",
        dataType:"json",
        data:acc_obj_json,
        success:function(data){
            // run when if access token verification is success
            console.log("access_token not expirted : ",data);
            $("#my_profile_btn").css({"display":"block"});
            $("#Login_nav_button").css({"display":"none"});
            $("#Logout_nav_button").css({"display":"block"});
            $("#my_orderpage_landing_btn").css({"display":"block"});
        },
        statusCode:{
            401:function(data){
                // run when if access token is expired
                console.log("access_token expired");
                if("refresh_token" in window.localStorage){
                    // check refresh_token is in localStorage if yes then go below
                    console.log("yes refresh token avilable");
                    var refresh_tok = window.localStorage.getItem("refresh_token");
                    var reff_obj = {token:refresh_tok};
                    var reff_obj_json = JSON.stringify(reff_obj);
                    console.log("refresh token",reff_obj_json);
                    $.ajax({
                        headers:{
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        url:mainurl+"/verifytoken/",
                        type:"POST",
                        dataType:"JSON",
                        data:reff_obj_json,
                        success:function(data){
                            // run when if refresh token is not expired or dead
                            console.log("refresh token verified success fully",data);
                            // verify refresh token is stil alive or not
                            var reff_obj2 = {refresh:refresh_tok};
                            var reff_obj2_json = JSON.stringify(reff_obj2);
                            $.ajax({
                                headers:{
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                url:mainurl+"/refreshtoken/",
                                type:"POST",
                                dataType:"JSON",
                                data:reff_obj2_json,
                                success:function(data){
                                    console.log("new access token : ",data);
                                    // if refresh token is alive 
                                    // get new refresh and access token
                                    window.localStorage.setItem("access_token",data.access);
                                    window.localStorage.setItem("refresh_token",data.refresh);
                                    $("#my_profile_btn").css({"display":"block"});
                                    $("#Login_nav_button").css({"display":"none"});
                                    $("#Logout_nav_button").css({"display":"block"});
                                    $("#my_orderpage_landing_btn").css({"display":"block"});
                                }
                            });
                        },
                        statusCode:{
                            401:function(){
                                console.log("refresh token expired");
                                // run when refresh token expired
                                window.localStorage.removeItem("access_token");
                                window.localStorage.removeItem("refresh_token");
                                $("#Login_nav_button").css({"display":"block"});
                                $("#Logout_nav_button").css({"display":"none"});
                                $("#my_profile_btn").css({"display":"none"});
                                $("#my_orderpage_landing_btn").css({"display":"none"});
                            }
                        }
                    });

                }
            }
        }


    });
}
else{
    $("#Login_nav_button").css({"display":"block"});
    $("#Logout_nav_button").css({"display":"none"});
    $("#my_profile_btn").css({"display":"none"});
    $("#my_orderpage_landing_btn").css({"display":"none"});
}
// logout button code start
    $(document).on("click",'#Logout_nav_button',function(e){
        e.preventDefault();
        var acc_token = window.localStorage.getItem("access_token");
        var ref_token = window.localStorage.getItem("refresh_token");
        var ref_token_obj = JSON.stringify({refresh_token:ref_token});
        $.ajax({
            headers:{
                Authorization:'Bearer '+acc_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            url:mainurl+"/logout/",
            type:"POST",
            dataType:"json",
            data:ref_token_obj,
            success:function(data){
                console.log("logout request ",data);
            },
            statusCode:{
                401:function(data){
                    console.log("401 aai log out ma");
                },
                205:function(){
                    // run when usrer log out code run correctly
                    console.log("logout successfully");
                    window.localStorage.removeItem("access_token");
                    window.localStorage.removeItem("refresh_token");
                    window.location = mainurl;

                }
            }

        
        });
    });
// logout button code end


// this code run 3 hours after particullar page refreshed start
    // and it will be run after every 3 hours
setInterval(function(){
    if("refresh_token" in window.localStorage){
         console.log("true for refresh setinterval");
         var reftokenfor_get_new_acc = window.localStorage.getItem("refresh_token");
         var reftokenobj = {refresh:reftokenfor_get_new_acc};
         var reftokenjson = JSON.stringify(reftokenobj);
         console.log("ref token in json :::::"+reftokenjson);
         console.log(reftokenfor_get_new_acc);
                            
        $.ajax({
            url:+mainurl+"/refreshtoken/",
            type:"POST",
            data:reftokenjson,
            dataType:"json",
            contentType:"application/json",
            success:function(data){
                console.log("_________________________________________");
                console.log(data);
                window.localStorage.setItem("access_token",data.access);
                window.localStorage.setItem("refresh_token",data.access);
            }
                    
            });
        }
},7200000);

// this code run 3 hours after particullar page refreshed stop


// base hamberger menu code start
$.ajax({
    url:mainurl+"/hamitem/",
    type:"GET",
    dataType:"json",
    success:function(data){
        console.log("this is base ham get request");
        console.log(data);
        //    hamberger menu category code start
        var category_list =data.categories_ham;
        console.log(category_list);
        $.each(category_list,function(k,v){
            $('.ham_cat_list #list_ul').append(
                "<li><a href='' id='ham_cat_list_btn' data-catid='"+v.cat_id+"'>"+v.cat_name+
                "</a></li>");
        });
        //    hamberger menu category code end
    }
});
// base hamberger menu code end


// home page get data script start
if(pagetitle == "home"){
    console.log(true);

    $.ajax({
        url:mainurl+"/home/",
        type:"GET",
        dataType:"json",
        success:function(data){
            console.log(data)
            // slider loop code start here
            var banner_data = data.bannerslider;
            $.each(banner_data,function(key,value){
                $("#bannercarouselItems").append(
                    "<div class='carousel-item'>"+
                    "<img src="+mainurl+value.banner_img+" class='d-block w-100' alt='...'>"
                    +"</div>"
                );
            });
           $(".carousel-item:nth-child(1)").addClass("active");
           // slider loop code end here
    
           // mobile slider code start here
                var mobile_slider_data = data.mobile_slider;
                console.log(mobile_slider_data[0].product_img);
            
                $("#slider1 #slider1_btn1 div img").attr('src',mainurl+mobile_slider_data[0].product_img);
                $("#slider1 #slider1_btn1").attr('data-pid',mobile_slider_data[0].pid);
                $("#slider1 #slider1_btn1 div .sc_title").html(mobile_slider_data[0].title);
                $("#slider1 #slider1_btn1 div .sc_price").html(mobile_slider_data[0].discounted_price);
    
                $("#slider1 #slider1_btn2 div img").attr('src',mainurl+mobile_slider_data[1].product_img);
                $("#slider1 #slider1_btn2").attr('data-pid',mobile_slider_data[1].pid);
                $("#slider1 #slider1_btn2 div .sc_title").html(mobile_slider_data[1].title);
                $("#slider1 #slider1_btn2 div .sc_price").html(mobile_slider_data[1].discounted_price);
    
                $("#slider1 #slider1_btn3 div img").attr('src',mainurl+mobile_slider_data[2].product_img);
                $("#slider1 #slider1_btn3").attr('data-pid',mobile_slider_data[2].pid);
                $("#slider1 #slider1_btn3 div .sc_title").html(mobile_slider_data[2].title);
                $("#slider1 #slider1_btn3 div .sc_price").html(mobile_slider_data[2].discounted_price);
    
                $("#slider1 #slider1_btn4 div img").attr('src',mainurl+mobile_slider_data[3].product_img);
                $("#slider1 #slider1_btn4").attr('data-pid',mobile_slider_data[3].pid);
                $("#slider1 #slider1_btn4 div .sc_title").html(mobile_slider_data[3].title);
                $("#slider1 #slider1_btn4 div .sc_price").html(mobile_slider_data[3].discounted_price);
    
                $("#slider1 #slider1_btn5 div img").attr('src',mainurl+mobile_slider_data[4].product_img);
                $("#slider1 #slider1_btn5").attr('data-pid',mobile_slider_data[4].pid);
                $("#slider1 #slider1_btn5 div .sc_title").html(mobile_slider_data[4].title);
                $("#slider1 #slider1_btn5 div .sc_price").html(mobile_slider_data[4].discounted_price);
                
                $("#slider1 #slider1_btn6 div img").attr('src',mainurl+mobile_slider_data[5].product_img);
                $("#slider1 #slider1_btn6").attr('data-pid',mobile_slider_data[5].pid);
                $("#slider1 #slider1_btn6 div .sc_title").html(mobile_slider_data[5].title);
                $("#slider1 #slider1_btn6 div .sc_price").html(mobile_slider_data[5].discounted_price);
    
    
           // mobile slider code end here

           // mobile slider code start here
           var trending_slider_data = data.trending_pro_slider;
           console.log(trending_slider_data[0].product_img);
       
           $("#slider2 #slider1_btn1 div img").attr('src',mainurl+trending_slider_data[0].product_img);
           $("#slider2 #slider1_btn1").attr('data-pid',trending_slider_data[0].pid);
           $("#slider2 #slider1_btn1 div .sc_title").html(trending_slider_data[0].title);
           $("#slider2 #slider1_btn1 div .sc_price").html(trending_slider_data[0].discounted_price);

           $("#slider2 #slider1_btn2 div img").attr('src',mainurl+trending_slider_data[1].product_img);
           $("#slider2 #slider1_btn2").attr('data-pid',trending_slider_data[1].pid);
           $("#slider2 #slider1_btn2 div .sc_title").html(trending_slider_data[1].title);
           $("#slider2 #slider1_btn2 div .sc_price").html(trending_slider_data[1].discounted_price);

           $("#slider2 #slider1_btn3 div img").attr('src',mainurl+trending_slider_data[2].product_img);
           $("#slider2 #slider1_btn3").attr('data-pid',trending_slider_data[2].pid);
           $("#slider2 #slider1_btn3 div .sc_title").html(trending_slider_data[2].title);
           $("#slider2 #slider1_btn3 div .sc_price").html(trending_slider_data[2].discounted_price);

           $("#slider2 #slider1_btn4 div img").attr('src',mainurl+trending_slider_data[3].product_img);
           $("#slider2 #slider1_btn4").attr('data-pid',trending_slider_data[3].pid);
           $("#slider2 #slider1_btn4 div .sc_title").html(trending_slider_data[3].title);
           $("#slider2 #slider1_btn4 div .sc_price").html(trending_slider_data[3].discounted_price);

           $("#slider2 #slider1_btn5 div img").attr('src',mainurl+trending_slider_data[4].product_img);
           $("#slider2 #slider1_btn5").attr('data-pid',trending_slider_data[4].pid);
           $("#slider2 #slider1_btn5 div .sc_title").html(trending_slider_data[4].title);
           $("#slider2 #slider1_btn5 div .sc_price").html(trending_slider_data[4].discounted_price);
           
           $("#slider2 #slider1_btn6 div img").attr('src',mainurl+trending_slider_data[5].product_img);
           $("#slider2 #slider1_btn6").attr('data-pid',trending_slider_data[5].pid);
           $("#slider2 #slider1_btn6 div .sc_title").html(trending_slider_data[5].title);
           $("#slider2 #slider1_btn6 div .sc_price").html(trending_slider_data[5].discounted_price);


      // mobile slider code end here
    
        }
    });

}

// home page get data script end




//  product details page script start

$(document).on("click","#slider1 a,#slider2 a",function(e){
    e.preventDefault();
    window.localStorage.setItem("product_pid",$(this).attr("data-pid"));
    console.log(window.localStorage.getItem("product_pid"));
    window.location = mainurl +'/productdetail';
});

if(pagetitle == "productdetail"){
    console.log("local storage : ",window.localStorage.getItem("product_pid"));
    pro_pid = window.localStorage.getItem("product_pid");
    console.log(mainurl+"/product-detail/"+pro_pid);
    $.ajax({
        url:mainurl+"/product-detail/"+pro_pid,
        type:'GET',
        dataType:'JSON',
        success:function(data){
            console.log(data);
            var mainpro_det = data.main_details;
            var pro_imgs = data.images
            console.log(mainpro_det);
            console.log("___________________________________")
            console.log(pro_imgs);
            $("#pro_title").append(mainpro_det.title);
            $.each(mainpro_det.description.split("|||"),function(k,v){
                $("#pro_description").append("<li style='margin-bottom:5px;'>"+v+"</li>");
            });
            
            $("#pro_price").append("<span style='color:crimson; margin-right:10px;'><i class='fas fa-rupee-sign'></i> "+mainpro_det.discounted_price+ " </span><small class='fw-light text-decoration-line-through'> <i class='fas fa-rupee-sign'></i> "+mainpro_det.selling_price+"</small>");
            $("#Add_to_cart_btn").attr("data-pidforcart",mainpro_det.pid);
            $("#Buy_now_btn").attr("data-pidforbuynow",mainpro_det.pid);
            $("#big_img").attr("src",mainurl+mainpro_det.product_img);
            $("#det_img_small_slider_list").append("<li  class='d-sm-block d-inline-block text-center'><img src='"+mainurl+mainpro_det.product_img+"' alt='' id='small_img'></li>");

            $.each(pro_imgs,function(k,v){
                $("#det_img_small_slider_list").append("<li  class='d-sm-block d-inline-block'><img src='"+mainurl+v.oimg+"' alt='' id='small_img'></li>");
            });
            
        }
    });


    // add to cart button code start here
        $(document).on("click","#Add_to_cart_btn",function(e){
            // add to cart button event start
            e.preventDefault();
            var cart_name = window.btoa("cart_details");
            var prod_id_cart = parseInt($(this).attr("data-pidforcart"));
            console.log(typeof(prod_id_cart));
            // below code run when if cart_details available in storage
            if("cart_details" in window.localStorage){
                var product_ids_arr = []
                var cart_data = JSON.parse(window.localStorage.getItem("cart_details")); // getting cart data
                console.log(cart_data);
                // getting all product id in one array
                $.each(cart_data,function(k,v){
                    console.log(v.pid);
                    product_ids_arr.push(v.pid);

                });
                console.log(product_ids_arr.includes(prod_id_cart));
                // check for comed product id is available in cart or not

                // below code run when if product already in cart
                if(product_ids_arr.includes(prod_id_cart)){
                    alert("product alredy in cart");
                }
                // below code run when if product id not in cart
                else{
                    var cart_obj = {"pid":prod_id_cart,"qty":1};
                    cart_data.push(cart_obj);
                    var cart_data_json = JSON.stringify(cart_data);
                    window.localStorage.setItem("cart_details",cart_data_json);
                    cart_item_no_disp();
                    alert("product added successfully into cart");
                }
                console.log(product_ids_arr);
            }
            else{
                // new cart or fresh cart create code
                var cart_create_arr = [];
                console.log(cart_create_arr);
                var cart_obj = {"pid":prod_id_cart,"qty":1};
                cart_create_arr.push(cart_obj);
                var cart_create_arr_json = JSON.stringify(cart_create_arr);
                // console.log(window.btoa(cart_create_arr_json));
                // console.log(window.atob("W3sicGlkIjoiNyIsInF0eSI6MX1d"));
                window.localStorage.setItem("cart_details",cart_create_arr_json);
                cart_item_no_disp();
                alert("product added successfully into cart");
            }
        }); // add to cart button event close

    // add to cart button code end here


}
// product details page script end



// hamberger menu items click code start

    $(document).on("click","#item1 li a",function(e){
        e.preventDefault();
        console.log($(this).attr("data-catid"));
        window.localStorage.setItem("hamberger_cat_change_catid",$(this).attr("data-catid"));
        console.log( mainurl+'/cat_products/');
        window.location = mainurl+'/cat_products/'
        // alert($(this).attr("data-catid"))
    });

    if(pagetitle == "hamberger_click_return_page"){
        var cat_list_catid = window.localStorage.getItem("hamberger_cat_change_catid");
        console.log(cat_list_catid);
        $.ajax({
            url:mainurl + "/cat_products_list/"+cat_list_catid,
            type:"GET",
            dataType:"json",
            success:function(data){
                console.log("Current working data __________________________________________");
                console.log(data);
                console.log(data.catpro_list.length);
               // if condition start
                if(data.catpro_list.length > 0){
                    console.log(data.length);
                    // $.each(data.catpro_list,function(k,v){
                    //     console.log(k,v);
                    //     $("#cat_products_card_container").append(
                    //         "<div class='col-sm-4' id='product_list_card'>"+
                    //         "<div class='card' style='width: 15rem;'>"+
                    //            "<a href='' data-pid='"+v.pid+"'><img src='"+v.product_img+"' class='card-img-top' alt='...'></a>"
                    //         +"<div class='card-body'> "+
                    //         "<p class='text-center' id='card_title'>"+v.title+"</p>"+
                    //         "<p class='card-text text-center' id='pro_list_card_checked_price'><i class='fas fa-rupee-sign'></i> "+v.selling_price+"</p>"
                    //         +"<p class='card-text text-center' id='pro_list_card_text'><i class='fas fa-rupee-sign'></i> "+v.discounted_price+" </p>"
                    //         +"</div>" 
                    //         +"</div>"
                    //         +"</div>"
                    //     );
                    // // $.each close
                    // });
                    add_items_in_catvise_pro_list(data.catpro_list);
                }
                else{
                    $("#cat_products_card_container").append("<div class='alert alert-warning text-center' role='alert'>"+
                    "<h4> Products Not Available </h4></div>");
                }
                // start filter code here
                if(data.brand_list_cat_vise.length > 0){
                    console.log(data.brand_list_cat_vise);
                    $.each(data.brand_list_cat_vise,function(k,v){
                        $("#list_group_filters").append("<a href='#' class='list-group-item list-group-item-action' data-brandid='"+v.brand_id+"' data-filter='brand'>"+v.brand_name+"</a>");
                    });
                    
                }
                // end filter code here
            // success function end
            }
        //  ajax function end
        });

        // product details code start for category product list click

        $(document).on("click","#cat_products_card_container a",function(e){
            e.preventDefault();
            window.localStorage.setItem("product_pid",$(this).attr("data-pid"));
            console.log(window.localStorage.getItem("product_pid"));
            window.location = mainurl +'/productdetail';
        });
        
         // product details code start for category product list click


        // category products filter click code start
        $(document).on("click","#list_group_filters a",function(e){
            e.preventDefault();
                $("#list_group_filters a").removeClass("active");
                $(this).addClass("active");
                var cat_list_catid = window.localStorage.getItem("hamberger_cat_change_catid");
                console.log(typeof($(this).attr("data-all")) !== "undefined");
                if(typeof($(this).attr("data-all")) !== "undefined"){
                   window.location = mainurl+'/cat_products/';

                }
                // above belove filter ajax code
                else if($(this).attr("data-filter") == "above" || $(this).attr("data-filter") == "belove"){
                    console.log($(this).attr("data-filter"));
                     // get request code start for above below filter
                    $.ajax({
                        url:mainurl+"/cat_products_list/"+cat_list_catid+"/"+$(this).attr("data-filter"),
                        type:"GET",
                        dataType:"JSON",
                        success:function(data){
                            console.log(data);
                            add_items_in_catvise_pro_list(data.catpro_list);
                        }
                    });
                    // get request code end for above below filter
                }
                else{
                    console.log($(this).attr("data-brandid"),$(this).attr("data-filter"));
                    $.ajax({
                        url:mainurl+"/cat_products_list/"+cat_list_catid+"/"+$(this).attr("data-filter")+"/"+$(this).attr("data-brandid"),
                        type:"GET",
                        dataType:"JSON",
                        success:function(data){
                            console.log(data);
                            add_items_in_catvise_pro_list(data.catpro_list);
                        }
                    });
                }


            
        });
        // category products filter click code end

        // filter display button code in mobile screen start
        $(document).on("click","#mobile_responsive_filter_menu_btn_product_filter",function(){
            $("#list_group_filters").slideToggle(200);
        });

        // filter display button code in mobile screen end
           
        
    // main if end
    }
// hamberger menu items click code end

// User Registration code start

if(pagetitle == "customer_registration"){
// main if start

is_user_login();

console.log(pagetitle);
$(document).on("keypress","#mobile_no",function(e){
    if($("#mobile_no").val().length > 9){
        e.preventDefault();
    }
});
$(document).on("click","#userregistration_btn",function(e){
    e.preventDefault();
    var first_name = $("#first_name").val();
    var last_name = $("#last_name").val();
    var email_add = $("#inputEmail").val();
    var mobileno = $("#mobile_no").val();
    var password1 = $("#inputPassword1").val();
    var password2 = $("#inputPassword2").val();
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    console.log(first_name+" "+last_name+" "+email_add+" "+mobileno+" "+password1+" "+password2);
    if(first_name == ""){
        alert("Please enter your first name");
        $("#first_name").focus();
    }
    else if(last_name == ""){
        alert("Please enter your last name");
        $("#last_name").focus();
    }
    else if(email_add == ""){
        alert("Please enter your email");
        $("#inputEmail").focus();
    }
    else if(mobileno == ""){
        alert("Please enter your mobile no");
        $("#mobile_no").focus();
    }
    else if(password1 == ""){
        alert("Please enter your password");
        $("#inputPassword1").focus();
    }
    else if(password1.length < 8){
        alert("Your password must contain at least 8 characters.");
        $("#inputPassword1").focus();
    }
    else if(password2 == ""){
        alert("Please enter your confirm password");
        $("#inputPassword2").focus();
    }
    else if(!email_add.match(mailformat))
    {
    alert("You have entered a invalid email address please fix it");    //The pop up alert for a valid email address
    $("#inputEmail").focus();
    }
    else if(password1 !== password2){
        alert("confirm password is not matching with password");
        $("#inputPassword2").focus();
    }
    else
    {
    
    // alert("registered success"); 
    // var prompt_data = prompt("Please enter your name:", "Harry Potter");  
    // console.log(prompt_data);
    var user_data = {firstname:first_name,lastname:last_name,mobile_no:mobileno,email:email_add,password:password1};
    console.log(user_data);
    var user_data_json = JSON.stringify(user_data);
    console.log(user_data_json)
    $.ajax({
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
        url:mainurl+"/registration/",
        type:"POST",
        data:user_data_json,
        success:function(data){
            console.log(data.success);
            if(data.success){
                console.log("user registerd successfully");
                alert("Registeration completed...");
            }
            else{
                console.log(data);
                alert(data.email[0]);
                $("#inputEmail").focus();
            }
         }
    });
        
    }

});

// main if end
}

// User Registration code end


// user login code start

if(pagetitle == "loginpage"){
    // main login page if start
    console.log("This is login page");

    // check user is logged in or not code start

    is_user_login();
    //  check user is logged in or not code end

    $(document).on("click","#login_btn",function(e){
        // login btn event start

        e.preventDefault();
        // alert("login btn clicked");
        var email_login = $("#email_login").val();
        var password_login = $("#password_login").val();
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        console.log(email_login," : ",password_login);
        if(email_login == ""){
            alert("Please enter your email");
            $("#email_login").focus();
        }
        else if(password_login == ""){
            alert("Please enter your password");
            $("#password_login").focus();
        }
        else if(!email_login.match(mailformat))
        {
          alert("You have entered a invalid email address please fix it");    //The pop up alert for a valid email address
          $("#email_login").focus();
        }
        else if(password_login.length < 8){
            alert("Your password must contain at least 8 characters.");
            $("#password_login").focus();
        }
        else{
            var login_obj = {username:email_login,password:password_login};
            var login_obj_json = JSON.stringify(login_obj);
            console.log(login_obj_json);
            $.ajax({
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                url:mainurl+"/gettoken/",
                type:"POST",
                dataType:"json",
                data:login_obj_json,
                success:function(data){
                    console.log(data);
                    window.localStorage.setItem("access_token",data.access);
                    window.localStorage.setItem("refresh_token",data.refresh);
                    window.location = mainurl+"/profile/";

                },
                statusCode:{
                    401:function(data){
                        console.log("401 aai loda");
                        alert("Please enter correct email and password");
                        
                    }
                }
            });
        }




        // login btn event end
    });
    // main login page if end
}

// user login code end


// user profile page code start

if(pagetitle == "profilepage"){
    // profile page main if start
    console.log("this is profile page");
    console.log("check for toke : ","access_token" in window.localStorage);
    if("access_token" in window.localStorage){
        // accesss token if start
        var acc_token = window.localStorage.getItem("access_token");
        console.log("access_token available for profile page",acc_token);
        $.ajax({
            headers:{
                Authorization:'Bearer '+acc_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            url:mainurl+'/profile_data/',
            type:"GET",
            dataType:"json",
            success:function(data){
                console.log(data)
                $("#full_name_of_user").val(data.firstname+" "+data.lastname).attr("data-emailadd",data.username);
                $("#profile_welcome_name").html("welcome "+data.firstname+" "+data.lastname);
                $("#inputEmailforuser").val(data.username).attr("data-emailadd",data.username);
                $("#name_edit_button,#emailid_edit_button,#mobileno_edit_button").attr("data-emailadd",data.username);
                $("#mobilenoforuser").val(data.mobileno); //.attr("data-emailadd",data.username)
                window.localStorage.setItem("useremailid",data.username);
                window.localStorage.setItem("user_mobileno",data.mobileno);
                window.localStorage.setItem("username",data.firstname+" "+data.lastname);
                $("#my_profile_btn").html("<b>"+window.localStorage.getItem("username")+"</b>");

            },
            statusCode:{
                401:function(data){
                    console.log('401 aai profile data ma');
                    window.location = mainurl+"/login/";
                }
            }
        });
        // accesss token if end
    }
    else{
        window.location = mainurl+"/login/";
    }
// user name email mobile no change code start
    $(document).on("click","#name_edit_button,#emailid_edit_button,#mobileno_edit_button",function(e){
        e.preventDefault();
        // alert($(this).attr("data-btnname"));
        var userdata_change = {"change_btn_name":$(this).attr("data-btnname"),"user_email":$(this).attr("data-emailadd")};
        var userdata_change_json = JSON.stringify(userdata_change);
        console.log(userdata_change_json);
        window.localStorage.setItem("userdata_changedata",userdata_change_json);
        window.location = mainurl+"/userdata_change/";
    });

// user name email mobile no change code end

// add address button code start here

$(document).on("click","#add_address_btn",function(e){
    e.preventDefault();
     var userdata_change_json = JSON.stringify({"change_btn_name":"add_address_btn"});
     window.localStorage.setItem("userdata_changedata",userdata_change_json);
    window.location = mainurl+"/userdata_change/";
});
    
   
// add address button code end here




// profile change password button tab clicked code  and address button click code start
    $(document).on("click","#profile_address_tab_btn,#profile_changepassword_btn",function(e){
        e.preventDefault();
        $("#profile_page_menutab li .btn-primary").removeClass("btn-primary");
        $(this).addClass("btn-primary");
        if($(this).attr("data-btntype") == "address"){
            console.log("address page");
            $("#main_profile_tab,#profile_change_password_tab").css({"display":"none"});
            $("#profile_address_tab").css({"display":"block"});
            var acc_token = window.localStorage.getItem("access_token");
        // console.log("access_token available for profile page",acc_token);
        $.ajax({
            headers:{
                Authorization:'Bearer '+acc_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            url:mainurl+'/customer_address/getall_addresses/',
            type:"POST",
            dataType:"json",
            success:function(data){
                    console.log(data);
                    $("#profile_page_address_lists").html("");
                $.each(data,function(k,v){
                    console.log("V",v);
                    
                    $("#profile_page_address_lists").append(
                        "<div class='col-sm-6 mb-3' id='profile_page_address_list_container'>"+
                        "<div class='' id='address_container'>"+
                        "<h6>"+v.name+"</h6>"+
                        "<p>"+v.flat_house_building_company_apartment_no+"</p>"+
                        "<p>"+v.area_colony_street_sector_village+"</p>"+
                        "<p>"+v.landmark+"</p>"+
                        "<p>"+v.town_city+", "+v.state_province_region+" "+v.pinocde+"</p>"+
                        "<p>"+v.country+"</p>"+
                        "<p>Phone number : "+v.mobile_no+"</p>"+
                        "<div><a href='#' id='address_edit_btn' data-custadd_id='"+v.custadd_id+"'>Edit</a> <span>|</span> <a href='#' id='address_remove_btn' data-custadd_id='"+v.custadd_id+"'>Remove</a></div>"+
                        "</div>"
                        +"</div>"

                    );



                });


                }

            }); // ajax function end
            

        } //else if end
        else if($(this).attr("data-btntype") == "changepassword"){
            $("#main_profile_tab,#profile_address_tab").css({"display":"none"});
            $("#profile_change_password_tab").css({"display":"block"});
        
        }
        
    });
// profile change password button tab clicked code end

// change password button click code start

$(document).on("click","#user_change_pass_sbtn",function(e){
        e.preventDefault();
        var old_pass = $("#user_old_pass").val();
        var new_pass = $("#user_new_pass").val();
        var conf_pass = $("#user_conf_pass").val();
        if(old_pass == ""){
            alert("please enter your old password.");
            $("#user_old_pass").focus();
        }
        else if(new_pass == ""){
            alert("please enter your new password.");
            $("#user_new_pass").focus();
        }
        else if(conf_pass == ""){
            alert("please enter your confirm password.");
            $("#user_conf_pass").focus();
        }
        else if(old_pass.length < 8){
            alert("Your password must contain at least 8 characters.");
            $("#user_old_pass").focus();
        }
        else if(new_pass.length < 8){
            alert("Your password must contain at least 8 characters.");
            $("#user_new_pass").focus();
        }
        else if(new_pass !== conf_pass){
            alert("Confirm password not matching with new password.");
            $("#user_conf_pass").focus();
        }
        else{
            var passjson_data = JSON.stringify({oldpassword:old_pass,newpassword:new_pass,useremail:window.localStorage.getItem("useremailid")});
            // alert(passjson_data);
            var acc_token = window.localStorage.getItem("access_token");

            $.ajax({
                headers:{
                    Authorization:'Bearer '+acc_token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                url:mainurl+"/userdata_change/"+"changepassword/",
                type:"PUT",
                dataType:"json",
                data:passjson_data,
                success:function(data){
                    console.log(data);
                    if(data.password_changed){
                        alert("password updated successfully");
                        window.location = mainurl+"/profile/";
                    }
                    else{
                        alert("old password is wrong please try with correct password");
                    }
                }
            });
        // else suit end
        }
        
});


// change password button click code end
// address edit button code start 
$(document).on("click","#address_edit_btn",function(e){
    e.preventDefault();
    var cust_add_id = $(this).attr("data-custadd_id");
    var userdata_change_json = JSON.stringify({change_btn_name:"edit_address_btn",customer_address_eidt_id:cust_add_id});
    window.localStorage.setItem("userdata_changedata",userdata_change_json);
    window.location = mainurl+"/userdata_change/";
    // alert("edit button clicked"+cust_add_id);
    // window.localStorage.setItem("customer_address_eidt_id",cust_add_id);
});
// address edit button code end 

// address remove button code start here
    $(document).on("click","#address_remove_btn",function(e){
        e.preventDefault();
        // alert("address remove btn clicked");
        var btn_ref = $(this);
        var add_delete_id = $(this).attr("data-custadd_id");
        // alert(add_delete_id);
            var acc_token = window.localStorage.getItem("access_token");

            $.ajax({
                headers:{
                    Authorization:'Bearer '+acc_token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                url:mainurl+"/customer_address/"+"delete_address/"+add_delete_id+"/",
                type:"POST",
                dataType:"json",
                data:JSON.stringify({}),
                success:function(data){
                    console.log(data);
                    if(data.add_deleted){
                        btn_ref.parents("#address_container").hide(200);
                    }
                }
            
            });

    });
// address remove button code end here

// profile page main if end
}

// user profile page code end

if(pagetitle == "userchangeview"){
    // user change data page main if start
    console.log("This is userchangeview");
    var userchange_data = JSON.parse(window.localStorage.getItem("userdata_changedata"));
    console.log(userchange_data);
    if(userchange_data.change_btn_name == "edit_name_btn"){
        console.log("edit_name_btn clicked");
        $("#name_change_form").css({"display":"block"});
    }
    else if(userchange_data.change_btn_name == "edit_email_btn"){
        console.log("edit_email_btn clicked");
        $("#emailadd_change_form").css({"display":"block"});
        $("#email_change_current").val(userchange_data.user_email);
    }
    else if(userchange_data.change_btn_name == "edit_mobileno_btn"){
        console.log("edit_mobileno_btn clicked");
        $("#current_change_mobileno").val(window.localStorage.getItem("user_mobileno"));
        $("#mobileno_change_form").css({"display":"block"});
    }
    // add address code  start here 
    else if(userchange_data.change_btn_name == "add_address_btn"){
        console.log("add_address_btn clicked");
        $("#address_add_form").css({"display":"block"});
        
        $(document).on("keypress","#address_mobileno",function(e){
            if($("#address_mobileno").val().length > 9){
                e.preventDefault();
            }
        });
        $(document).on("keypress","#address_pincode",function(e){
            if($("#address_pincode").val().length > 5){
                e.preventDefault();
            }
        });

        $(document).on("click","#Add_address_submitbtn",function(e){
            e.preventDefault();
            var cust_name = $("#address_customer_name").val();
            var cust_country = $("#address_country").val();
            var cust_mobno = $("#address_mobileno").val();
            var cust_pincode = $("#address_pincode").val();
            var cust_houseno = $("#address_houseno").val();
            var cust_area_colony = $("#address_area_colony").val();
            var cust_landmark = $("#address_landmark").val();
            var cust_town_city = $("#address_town_city").val();
            var cust_state_region = $("#address_state_region").val();
            
            
            if(cust_name == ""){
                alert("Please enter your full name");
                $("#address_customer_name").focus();
            }
            else if(cust_country == ""){
                alert("Please enter your country name");
                $("#address_country").focus();
            }
            else if(cust_mobno == ""){
                alert("Please enter your mobile no");
                $("#address_country").focus();
            }
            else if(cust_mobno.length < 9){
                alert("enter 10 digit mobile no");
                $("#address_country").focus();
            }
            else if(cust_pincode == ""){
                alert("Please enter your pin code/zip code");
                $("#address_country").focus();
            }
            else if(cust_pincode.length < 5){
                alert("enter 6 digit pin code/zip code");
                $("#address_country").focus();
            }
            else if(cust_houseno == ""){
                alert("Please enter your Flat, House no., Building, Company, Apartment name/no");
                $("#address_country").focus();
            }
            else if(cust_area_colony == ""){
                alert("Please enter your area,colony,street,sector,village name");
                $("#address_country").focus();
            }
            else if(cust_landmark == ""){
                alert("Please enter your landmarks");
                $("#address_country").focus();
            }
            else if(cust_town_city == ""){
                alert("Please enter your town,city name");
                $("#address_country").focus();
            }
            else if(cust_state_region == ""){
                alert("Please enter your state name");
                $("#address_country").focus();
            }
            else{
                // alert(cust_name+" : "+cust_country+" : "+cust_mobno+" : "+cust_pincode+" : "+cust_houseno+" : "+cust_area_colony+" : "+cust_landmark+" : "+cust_town_city+" : "+cust_state_region);
                var address_data_json = JSON.stringify({name:cust_name,country:cust_country,mobile_no:cust_mobno
                    ,pinocde:cust_pincode,flat_house_building_company_apartment_no:cust_houseno,
                    area_colony_street_sector_village:cust_area_colony,landmark:cust_landmark,
                    town_city:cust_town_city,state_province_region:cust_state_region});
                    console.log(address_data_json);
                    var acc_token = window.localStorage.getItem("access_token");

                    $.ajax({
                        headers:{
                            Authorization:'Bearer '+acc_token,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        url:mainurl+"/customer_address/"+"insert_address/",
                        type:"POST",
                        dataType:"json",
                        data:address_data_json,
                        success:function(data){
                            console.log(data)
                            window.location = mainurl+"/profile/";
                        }
                    });


            }
            
            // alert("add address submit btn clicked");
        });
    } // add address code  end here 
    else if(userchange_data.change_btn_name == "edit_address_btn"){
        // edit address code start here
        var add_uniid = userchange_data.customer_address_eidt_id;
        $("#update_add_form").css({"display":"block"});
        var add_data_json = JSON.stringify({add_id:add_uniid});
        var acc_token = window.localStorage.getItem("access_token");
        $.ajax({
            headers:{
                Authorization:'Bearer '+acc_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            url:mainurl+"/customer_address/"+"edit_cust_add_by_add_id/",
            type:"POST",
            dataType:"json",
            data:add_data_json,
            success:function(data){
                console.log(data.name);
                $("#update_add_form #address_customer_name").val(data.name);
                $("#update_add_form #address_country").val(data.country);
                $("#update_add_form #address_mobileno").val(data.mobile_no);
                $("#update_add_form #address_pincode").val(data.pinocde);
                $("#update_add_form #address_houseno").val(data.flat_house_building_company_apartment_no);
                $("#update_add_form #address_area_colony").val(data.area_colony_street_sector_village);
                $("#update_add_form #address_landmark").val(data.landmark);
                $("#update_add_form #address_town_city").val(data.town_city);
                $("#update_add_form #address_state_region").val(data.state_province_region);
            }
        });


        $(document).on("keypress","#update_add_form #address_mobileno",function(e){
            if($("#update_add_form #address_mobileno").val().length > 9){
                e.preventDefault();
            }
        });
        $(document).on("keypress","#update_add_form #address_pincode",function(e){
            if($("#update_add_form #address_pincode").val().length > 5){
                e.preventDefault();
            }
        });
        // address update data sent code start
        $(document).on("click","#update_address_submitbtn",function(e){
            e.preventDefault();
            var cust_name = $("#update_add_form #address_customer_name").val();
            var cust_country = $("#update_add_form #address_country").val();
            var cust_mobno = $("#update_add_form #address_mobileno").val();
            var cust_pincode = $("#update_add_form #address_pincode").val();
            var cust_houseno = $("#update_add_form #address_houseno").val();
            var cust_area_colony = $("#update_add_form #address_area_colony").val();
            var cust_landmark = $("#update_add_form #address_landmark").val();
            var cust_town_city = $("#update_add_form #address_town_city").val();
            var cust_state_region = $("#update_add_form #address_state_region").val();
            if(cust_name == ""){
                alert("Please enter your full name");
                $("#address_customer_name").focus();
            }
            else if(cust_country == ""){
                alert("Please enter your country name");
                $("#address_country").focus();
            }
            else if(cust_mobno == ""){
                alert("Please anter your mobile no");
                $("#address_country").focus();
            }
            else if(cust_mobno.length < 9){
                alert("enter 10 digit mobile no");
                $("#address_country").focus();
            }
            else if(cust_pincode == ""){
                alert("Please enter your pin code/zip code");
                $("#address_country").focus();
            }
            else if(cust_pincode.length < 5){
                alert("enter 6 digit pin code/zip code");
                $("#address_country").focus();
            }
            else if(cust_houseno == ""){
                alert("Please enter your Flat, House no., Building, Company, Apartment name/no");
                $("#address_country").focus();
            }
            else if(cust_area_colony == ""){
                alert("Please enter your area,colont,street,sector,village name");
                $("#address_country").focus();
            }
            else if(cust_landmark == ""){
                alert("Please enter your landmarks");
                $("#address_country").focus();
            }
            else if(cust_town_city == ""){
                alert("Please enter your town,city name");
                $("#address_country").focus();
            }
            else if(cust_state_region == ""){
                alert("Please enter your sate name");
                $("#address_country").focus();
            }
            else{
                var address_data_json = JSON.stringify({name:cust_name,country:cust_country,mobile_no:cust_mobno
                    ,pinocde:cust_pincode,flat_house_building_company_apartment_no:cust_houseno,
                    area_colony_street_sector_village:cust_area_colony,landmark:cust_landmark,
                    town_city:cust_town_city,state_province_region:cust_state_region});
                    console.log(address_data_json);
                    var acc_token = window.localStorage.getItem("access_token");

                    $.ajax({
                        headers:{
                            Authorization:'Bearer '+acc_token,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        url:mainurl+"/customer_address/"+"update_address/"+add_uniid+"/",
                        type:"POST",
                        dataType:"json",
                        data:address_data_json,
                        success:function(data){
                            console.log(data)
                            alert("address updated successfully");
                            window.location = mainurl+"/userdata_change/";
                        }
                    });


            }
        });

        // address update data sent code end
    }// edit address code end here
   


    // name change button code start
    $(document).on("click","#name_change_btn",function(e){
        // name_change_btn click code start
        e.preventDefault();
        var firstname = $("#firstname_change").val();
        var lastname = $("#lastname_change").val();
        var user_email = userchange_data.user_email;
        var acc_token = window.localStorage.getItem("access_token");
        if(firstname == ""){
            alert("Please enter first name");
            $("#firstname_change").focus();
        }
        else if(lastname == ""){
            alert("Please enter last name");
            $("#lastname_change").focus();
        }
        else{
            //   alert(firstname+" : "+lastname+" : "+user_email);
        var name_json = JSON.stringify({first_name:firstname,last_name:lastname,email:user_email});
        $.ajax({
            headers:{
                Authorization:'Bearer '+acc_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            url:mainurl+"/userdata_change/"+"name/",
            type:"PUT",
            dataType:"json",
            data:name_json,
            success:function(data){
                console.log("Put request success");
                console.log(data);
                window.location = mainurl+"/profile/";
            }
        });
        // validation else end here 
    }
// name_change_btn click code end
});
// name change button code end

    // email change button code start
    $(document).on("click","#email_change_btn",function(e){
        // email_change_btn click code start
        e.preventDefault();
        // var c_email = $("#email_change_current").val();
        var new_email = $("#email_change_new").val();
        var conf_email = $("#email_change_confirm").val();
        var user_email = userchange_data.user_email;
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if(new_email  == ""){
            alert("Please enter email address");
            $("#email_change_new").focus();
        }
        else if(!new_email.match(mailformat))
        {
          alert("You have entered a invalid email address please fix it");    
          $("#email_change_new").focus();
        }
        else if(conf_email == ""){
            alert("Please enter confirm email");
            $("#email_change_confirm").focus();
        }
        else if(new_email !== conf_email){
            alert("Email and confirm email not matching");
            $("#email_change_confirm").focus();
        }
        else{
        var email_json = JSON.stringify({email:new_email,oldemail:user_email});
        var acc_token = window.localStorage.getItem("access_token");
        $.ajax({
            headers:{
                Authorization:'Bearer '+acc_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            url:mainurl+"/userdata_change/"+"email/",
            type:"PUT",
            dataType:"json",
            data:email_json,
            success:function(data){
                console.log("Put request success");
                console.log(data);
                window.location = mainurl+"/profile/";
            }
        });
        // validation else end here 
    }
// email_change_btn click code end
});
// email change button code end 


// mobile no change button code start
$(document).on("keypress","#new_change_mobileno",function(e){
    // alert("key pressed");
    if($("#new_change_mobileno").val().length > 9){
        e.preventDefault();
    }
});
$(document).on("click","#mobileno_change_btn",function(e){
    e.preventDefault();
    
    var mobile_noooo = $("#new_change_mobileno").val();
    // alert(mobile_no);
    if(mobile_noooo == ""){
        alert("Please enter new mobile no");
    }
    else if(mobile_noooo.length < 10)
    {
        alert("please enter valid mobile no");
    }
    else{

        var mobileno_json = JSON.stringify({mobile_no:mobile_noooo});
        var acc_token = window.localStorage.getItem("access_token");
        $.ajax({
            headers:{
                Authorization:'Bearer '+acc_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            url:mainurl+"/userdata_change/"+"mobileno/",
            type:"PUT",
            dataType:"json",
            data:mobileno_json,
            success:function(data){
                console.log("Put request success");
                console.log(data);
                alert("Mobile no changed successfully.");
                window.location = mainurl+"/profile/";
            }
        });

    } //else suit end here

}); // mobile no change btn code end here

// mobile no change button code end




    


    // user change data page main if end
}

// cart page code start here
if(pagetitle == "Cartpage"){
    // alert("this is cart page");
    if("cart_details" in window.localStorage){
        var cart_data = JSON.parse(window.localStorage.getItem("cart_details"));
        if(cart_data.length <= 0){
            $("#cart_product_list_disp").html("");
            $("#cart_product_list_disp").append("cart is empty please buy something");
            $("#order_summary_price_total").css({"display":"none"});
        }else{
            $("#order_summary_price_total").css({"display":"block"});
        }
       
        // alert("cart data availabe");
        var cart_total_price = 0;
        var product_ids_arr = [];
        var cart_data = JSON.parse(window.localStorage.getItem("cart_details")); // getting cart data
        console.log(cart_data);
        // getting all product id in one array
        $.each(cart_data,function(k,v){
        console.log(v.pid);
        product_ids_arr.push(v.pid);
        });
        console.log("in cart_details_page ",product_ids_arr)
        var cart_pro_id_json = JSON.stringify(product_ids_arr);
        // alert(product_ids_arr);
        $.ajax({
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            url:mainurl+"/cart_data/",
            type:"POST",
            dataType:"json",
            data:cart_pro_id_json,
            success:function(data){
                console.log(data);
                // get quantity by product vise from cart
                var qty_update_no = 1;
                var cart_data_for_quantity= JSON.parse(window.localStorage.getItem("cart_details")); // getting cart data
                $.each(data,function(k,v){
                    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

                    $.each(cart_data_for_quantity,function(kk_qtyupdate,vv_qtyupdate){
                        
                        if(vv_qtyupdate.pid == v.pid){
                            console.log(vv_qtyupdate.pid,vv_qtyupdate.qty);
                            qty_update_no = vv_qtyupdate.qty;
                        }
                    });



                    console.log(v.pid);

                    // cart disp appended cards
                    console.log("product_card_arr",product_ids_arr);
                    $("#cart_product_list_disp").append(
                        "<div class='row my-5'>"+
                            "<div class='col-sm-3 text-center align-self-center' ><a href='#' id='product_details_via_cartpage_btn'  data-pid='"+v.pid+"'><img src='"+mainurl+v.product_img+"' style='height:150px; width:150px; object-fit: contain;' alt='' srcset='' class='img-fluid img-thumbnail shadow-sm'></a></div>"+
                            "<div class='col-sm-9'><div>"+
                            "<h5 class=' mt-sm-0 mt-3'>"+v.title+"</h5>"+
                            "<div class='my-3'>"+
                            "<label for='quantity'>Quantity:</label>"+
                            "<a href='#' class='minus-cart btn' data-cpid='"+v.pid+"' data-cproqty='"+qty_update_no+"' id='cart_pro_qty_minusbtn'><i class='fas fa-minus-square fa-lg'></i></a>"+
                              "<span id='product_quantity_dip_area'>"+qty_update_no+"</span>"+
                            "<a href='#' class='plus-cart btn' data-cpid='"+v.pid+"' data-cproqty='"+qty_update_no+"' id='cart_pro_qty_plusbtn'><i class='fas fa-plus-square fa-lg'></i></a>"+
                            "</div>"+
                            "<div class='d-flex justify-content-between'>"+
                            "<a href='#' class='btn btn-sm btn-secondary mr-3'  data-cpid='"+v.pid+"' id='cart_item_remove_btn'>Remove item </a>"+
                            "<p class='mb-0' data-price='"+v.discounted_price+"' id='cart_pro_price_get'><span><strong>Rs. "+v.discounted_price+"</strong></span></p>"+
                           "</div>"+
                            "</div></div>"
                            +"</div><hr class='text-muted'>"
                            );

                        
                }); //cart card update code here

                // total price update code start here
                var product_ids_arr = [];
                console.log("total order price : "+cart_total_price);
                    var cart_data_for_total_price = JSON.parse(window.localStorage.getItem("cart_details")); // getting cart data
                    console.log(cart_data);
                    // getting all product id in one array
                     $.each(cart_data_for_total_price,function(k,v){
                     console.log(v.pid);
                     product_ids_arr.push(v.pid);
                     console.log("total price cart list",product_ids_arr);
                     });
            
                     $.each(product_ids_arr,function(k,v){
                        console.log(v);
                        var product_qty_getted = null;
                        $.each(cart_data_for_total_price,function(kqty,vqty){
                            if(vqty.pid == v){
                                product_qty_getted = vqty.qty;
                                console.log("product qty getted : ",product_qty_getted);
                                
                            }
                            
                        });
                        
                        $.each(data,function(k,vv){
                            if(vv.pid == v){
                                console.log(vv.discounted_price);
                                cart_total_price += product_qty_getted*vv.discounted_price;
                            }   
                        });
                     });
                     
                     $("#total_price__amount_update_span").html("Rs. "+cart_total_price+".00");
                     console.log("total order price : "+cart_total_price);
                     cart_total_price+=50;
                     $("#total_price_amount_shipping_charge").html("Rs. "+cart_total_price+".00").attr("data-totalprice",cart_total_price);
                    
            
                //  total price update code  end here

            } // success function end here
            
        });

        // increase product quantity code start
        $(document).on("click","#cart_pro_qty_plusbtn",function(e){
            e.preventDefault();
            // alert("increase button clicked");
            var qty = $(this).attr('data-cproqty');
            var cartpid = $(this).attr('data-cpid');

            var cartdata = JSON.parse(window.localStorage.getItem("cart_details"));
            console.log(cartdata);
            $.each(cartdata,function(k,v){
                console.log(v);
                if(v.pid == cartpid){
                    // alert("matched : "+k+"qty : "+v.qty);
                    cartdata[k] = {pid:v.pid,qty:v.qty+1};

                }
            });
            console.log(cartdata);
            window.localStorage.setItem("cart_details",JSON.stringify(cartdata));
            window.location = mainurl+"/cart/";
            // alert(qty+" : "+cartpid);

        });

            // $("#cart_pro_qty_plusbtn").css("color","red");
        // increase product quantity code end

        // decrease product quantity code start


        $(document).on("click","#cart_pro_qty_minusbtn",function(e){
            e.preventDefault();
            // alert("increase button clicked");
            var cqty = $(this).attr('data-cproqty');
            var cartpid = $(this).attr('data-cpid');
            var delete_index = 0;
            var cartdata = JSON.parse(window.localStorage.getItem("cart_details"));
            if(cqty == 1){
                $.each(cartdata,function(kkkk,vvvv){
                    if(vvvv.pid == cartpid){
                        // alert("found at "+kkkk);
                        // 
                        
                        delete_index = kkkk;
                        console.log(vvvv,delete_index);
                    }
                });
                var newarr = cartdata.splice(delete_index,1);
                console.log("new array after splice",newarr);
                window.localStorage.setItem("cart_details",JSON.stringify(cartdata));
                window.location = mainurl+"/cart/";
            }
            else{
            console.log(cartdata);
            $.each(cartdata,function(k,v){
                console.log(v);
                if(v.pid == cartpid){
                    // alert("matched : "+k+"qty : "+v.qty);
                    cartdata[k] = {pid:v.pid,qty:v.qty-1};

                }
            });
            console.log(cartdata);
            window.localStorage.setItem("cart_details",JSON.stringify(cartdata));
            window.location = mainurl+"/cart/";
            // alert(qty+" : "+cartpid);
            }

        });

        // decrease product quantity code end

        // cart item remove  code start

        $(document).on("click","#cart_item_remove_btn",function(e){
            e.preventDefault();
            // alert("increase button clicked");
            var cqty = $(this).attr('data-cproqty');
            var cartpid = $(this).attr('data-cpid');
            var delete_index = 0;
            var cartdata = JSON.parse(window.localStorage.getItem("cart_details"));
                $.each(cartdata,function(kkkk,vvvv){
                    if(vvvv.pid == cartpid){
                        // alert("found at "+kkkk);
                        // 
                        
                        delete_index = kkkk;
                        console.log(vvvv,delete_index);
                    }
                });
                var newarr = cartdata.splice(delete_index,1);
                console.log("new array after splice",newarr);
                window.localStorage.setItem("cart_details",JSON.stringify(cartdata));
                window.location = mainurl+"/cart/";
        });

        // cart item remove code end


    }
    else{
        $("#cart_product_list_disp").html("");
        $("#cart_product_list_disp").append("cart is empty please buy something");
    }

    $(document).on("click","#product_details_via_cartpage_btn",function(e){
        e.preventDefault();
        window.localStorage.setItem("product_pid",$(this).attr("data-pid"));
        console.log(window.localStorage.getItem("product_pid"));
        window.location = mainurl +'/productdetail';
    });

    $(document).on("click","#place_order_btn_cartpage",function(e){
        e.preventDefault();
        var total_order_pr = $("#total_price_amount_shipping_charge").attr("data-totalprice");
        window.localStorage.setItem("total_order_price",total_order_pr);
        window.location = mainurl+"/checkout/";
    });

}

// cart page code end here

if(pagetitle == "Checkoutpage"){
    // checkout page start
    if_user_not_login();
    // alert("this is checkout page");
    var cart_total_price = 0;
    var product_ids_arr = [];
    var cart_data = JSON.parse(window.localStorage.getItem("cart_details")); // getting cart data
    console.log(cart_data);
    // getting all product id in one array
    $.each(cart_data,function(k,v){
    console.log(v.pid);
    product_ids_arr.push(v.pid);
    });
    console.log("in cart_details_page ",product_ids_arr)
    var cart_pro_id_json = JSON.stringify(product_ids_arr);
    // alert(product_ids_arr);
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        url:mainurl+"/cart_data/",
        type:"POST",
        dataType:"json",
        data:cart_pro_id_json,
        success:function(data){
            console.log(data);
            // get quantity by product vise from cart
            var qty_update_no = 1;
            var cart_data_for_quantity= JSON.parse(window.localStorage.getItem("cart_details")); // getting cart data
                
            // get quantity by product vise from cart end

            $.each(data,function(k,v){
                console.log(v);
                 // get quantity by product vise from cart
                $.each(cart_data_for_quantity,function(kk_qtyupdate,vv_qtyupdate){
                        
                    if(vv_qtyupdate.pid == v.pid){
                        console.log(vv_qtyupdate.pid,vv_qtyupdate.qty);
                        qty_update_no = vv_qtyupdate.qty;
                    }
                });
                // get quantity by product vise from cart end
                $("#product_summary_list").append("<div class='card mb-2'>"+
                "<div class='card-body'>"+
                  "<h5>Product: "+v.title+"</h5>"+
                  "<p>Quantity: "+qty_update_no+"</p>"+
                  "<p class='fw-bold'>Price: Rs. "+qty_update_no*v.discounted_price+"</p>"+
                "</div>"+
              "</div>");

            });
        }
    });

// address code start

var acc_token = window.localStorage.getItem("access_token");
// console.log("access_token available for profile page",acc_token);
$.ajax({
    headers:{
        Authorization:'Bearer '+acc_token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    url:mainurl+'/customer_address/getall_addresses/',
    type:"POST",
    dataType:"json",
    success:function(data){
        console.log("This is address get code");
        if(data.length <= 0){
            $("#checkout_page_address_lists").append("<a href='#' id='add_address_btn' class='' style='text-decoration:none;'>add delivery address</a>");

        }
        else{
            console.log(data);
            var address_no = 1;
        $.each(data,function(k,v){
            
            console.log("V",v);
            
            $("#checkout_page_address_lists").append(
            "<div class='card'>"+
            "<div class='card-body'>"+
            "<h5>"+v.name+"</h5>"+
            "<p>"+v.flat_house_building_company_apartment_no+","+v.area_colony_street_sector_village+","+v.landmark+","+v.town_city+","+v.state_province_region+","+v.country+"</p>"+
            "</div>"+
          "</div>"+
          "<div class='form-check mt-2 mb-5'>"+
          "<input class='form-check-input' name='address_select_id_radio' type='radio' value='address' id='address_select_id_radio' data-addid='"+v.custadd_id+"'>"+
          "<label class='form-check-label fw-bold' for=''>"+
            "Address: "+address_no+" </label>"+
        "</div>");
        address_no+=1;
        });

        $("#checkout_page_address_lists").append( "<div class='text-end'>"+
        "<button type='submit' class='btn btn-warning mt-3 px-5 fw-bold' id='continue_button_for_orderplace'>Continue</button>"+
      "</div>");

        }
      

    }

    }); // ajax function end
    


// address code end

// add new address link code start
$(document).on("click","#add_address_btn",function(e){
    e.preventDefault();
     var userdata_change_json = JSON.stringify({"change_btn_name":"add_address_btn"});
     window.localStorage.setItem("userdata_changedata",userdata_change_json);
    window.location = mainurl+"/userdata_change/";
});
// add new address link code end


$(document).on("click","#continue_button_for_orderplace",function(e){
    e.preventDefault();
    var address_ids = $("#checkout_page_address_lists input:checked").attr('data-addid');
    var product_ids_arr = [];
    if(address_ids == undefined){
        alert("please select address");
    }
    else{
    var cart_data = JSON.parse(window.localStorage.getItem("cart_details")); // getting cart data
    console.log(cart_data);
    // getting all product id in one array
    $.each(cart_data,function(k,v){
    console.log(v.pid);
    product_ids_arr.push(v.pid);
    });
    console.log("in cart_details_page ",product_ids_arr)
    var cart_pro_id_json = JSON.stringify({cart_detail:cart_data,addressid:address_ids});
    console.log("address id : ",cart_pro_id_json);
    window.localStorage.setItem("order",cart_pro_id_json);
    window.location = mainurl+"/paymentoptions_for_pay/";
    }   
    
    // alert("continue btn clicked");
});

} // checkout page end


// payment mode code start here

if(pagetitle == "paymentoptions_for_pay"){
    if_user_not_login();
    // alert("this is paymentoptions");
    $(document).on("click","#pay_on_delivey_btn",function(e){
        e.preventDefault();
        // alert("pay 0n delivery btn clicked");
        $("#wait_spinner").removeClass("d-none");
        $("#wait_spinner").addClass("d-flex");
        var acc_token = window.localStorage.getItem("access_token");
        var order_data = window.localStorage.getItem("order");
        $.ajax({
            headers:{
                Authorization:'Bearer '+acc_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            url:mainurl+"/payondelivery/",
            type:"POST",
            dataType:"json",
            data:order_data,
            success:function(data){
                console.log(data);
                if(data.pay_on_delivery_order_placed){
                    alert("Your order placed successfully,it will be deliver soon");
                    window.localStorage.removeItem("order");
                    window.localStorage.removeItem("cart_details");
                    window.localStorage.removeItem("total_order_price");
                    $("#wait_spinner").removeClass("d-flex");
                     $("#wait_spinner").addClass("d-none");
                    window.location = mainurl+"/orders/";
                }
            }
            
        });

    });


    // pay online button code 
    $(document).on("click","#pay_online_btn",function(e){
        var acc_token = window.localStorage.getItem("access_token");
        var order_data = window.localStorage.getItem("order");
        $.ajax({
            headers:{
                Authorization:'Bearer '+acc_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            url:mainurl+"/payonline/",
            type:"POST",
            dataType:"json",
            data:order_data,
            success:function(data){
                console.log(data);
                if(data.pay_online_order_placed){
                    window.localStorage.setItem("payordid",data.payment_ord_details.id);
                    window.localStorage.setItem("payorduserdetails",JSON.stringify(data.user_details_for_pay));
                    window.location = mainurl+"/payment/";
                }
            }
            
        });




    }); 
}

// payment mode code end here

// payment code start here
if(pagetitle == "online_payment_page"){
    if_user_not_login();
    var user_details = JSON.parse(window.localStorage.getItem("payorduserdetails"));
    var acc_token = window.localStorage.getItem("access_token");
    var order_data = JSON.parse(window.localStorage.getItem("order"));
    if("payordid" in window.localStorage){
        var options = {
            "key": "rzp_test_xUPvX2FfVbTVZt", // Enter the Key ID generated from the Dashboard
            "currency": "INR",
            "name": "E-shop point",
            "description": "Test Transaction",
            "image": mainurl+"/static/app/images/logo.jpg",
            "order_id": window.localStorage.getItem("payordid"), //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": function (response){
                var success_payment_details = {razorpay_payment_id:response.razorpay_payment_id,razorpay_order_id:response.razorpay_order_id,
                razorpay_signature:response.razorpay_signature};
                console.log(success_payment_details);
                $("#wait_spinner").removeClass("d-none");
                $("#wait_spinner").addClass("d-flex");
               
                    $.ajax({
                        headers:{
                            Authorization:'Bearer '+acc_token,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        url:mainurl+"/payonline/",
                        type:"PUT",
                        dataType:"json",
                        data:JSON.stringify({"success_payment_data":success_payment_details,"order_details":order_data}),
                        success:function(data){
                            console.log(data);
                            if(data.pay_online_success){
                                $("#wait_spinner").removeClass("d-flex");
                                $("#wait_spinner").addClass("d-none");
                                window.localStorage.removeItem("payorduserdetails");
                                window.localStorage.removeItem("order");
                                window.localStorage.removeItem("payordid");
                                window.localStorage.removeItem("cart_details");
                                alert("Your order placed successfully,it will be deliver soon");
                                window.location = mainurl+"/orders/";
                               
                            }
                        }
                    });
            },
            "prefill": {
                "name": user_details.name,
                "email": user_details.email,
                "contact": user_details.contact_no
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.on('payment.failed', function (response){
                alert(response.error.code);
                // alert(response.error.description);
                // alert(response.error.source);
                // alert(response.error.step);
                // alert(response.error.reason);
                // alert(response.error.metadata.order_id);
                // alert(response.error.metadata.payment_id);
        });
        document.getElementById('rzp-button1').onclick = function(e){
            rzp1.open();
            e.preventDefault();
        }
    }
    else{
        window.location = mainurl;
    }
 


}


//payment code end here


if(pagetitle == "OrderDetailPage"){
    // oreder page start
    if_user_not_login();
    var acc_token = window.localStorage.getItem("access_token");
    $.ajax({
        headers:{
            Authorization:'Bearer '+acc_token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        url:mainurl+"/getallorders/",
        type:"GET",
        dataType:"json",
        success:function(data){
            console.log(data.length);
            console.log(data);
            if(data.length > 0){
                insert_order_details_cards(data);
            }
            
        }
    });
     // product details code start for category product list click

     $(document).on("click","#order_det_card_img_width",function(e){
        e.preventDefault();
        window.localStorage.setItem("product_pid",$(this).attr("data-pid"));
        console.log(window.localStorage.getItem("product_pid"));
        window.location = mainurl +'/productdetail';
    });
    
     // product details code start for category product list click


    //  address popover 
    $(document).on("click","#shiping_address_name_hover_for_disp_address",function(e){
        $(this).parent().next().toggle(200);
    });

    // $(document).on("mouseleave","#shiping_address_name_hover_for_disp_address",function(e){
    //     $(this).parent().next().hide(200);
    // });

    $(document).on('click',"#whole_order_cancell_button",function(e){
        e.preventDefault();
        $("#wait_spinner").removeClass("d-none");
        $("#wait_spinner").addClass("d-flex");
        var ordid = $(this).attr("data-orderidforcancellord");
        var acc_token = window.localStorage.getItem("access_token");
        $.ajax({
            headers:{
                Authorization:'Bearer '+acc_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            url:mainurl+"/getallorders/",
            type:"DELETE",
            dataType:"json",
            data:JSON.stringify({ord_id:ordid}),
            success:function(data){
                console.log(data);
                if(data.cancelled_order){
                    $("#wait_spinner").removeClass("d-flex");
                    $("#wait_spinner").addClass("d-none");
                    alert("order cancelled successfully");
                    window.location = mainurl+"/orders/";
                } else{
                    $("#all_disp_orders_container").html("<div class='alert alert-warning text-center' role='alert'>"+
                    "<h4> There are no open orders here</h4></div>");
                }


            }
        });
        
    });

    $(document).on("click","#order_page_openord_tab_btn,#order_page_cancell_ord_tab_btn",function(e){
        e.preventDefault();
        $("#order_page_menutab li .btn-primary").removeClass("btn-primary");
        $(this).addClass("btn-primary");
        if($(this).attr("data-btntype") == "open_orders"){//open orders page code start
            console.log("address page");
            // alert("this is open order data");

        var acc_token = window.localStorage.getItem("access_token");
        $.ajax({
            headers:{
                Authorization:'Bearer '+acc_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            url:mainurl+"/getallorders/"+"get_all_open_orders/",
            type:"POST",
            dataType:"json",
            success:function(data){
                console.log(data.length);
                console.log(data);
                if(data.length > 0){
                    insert_order_details_cards(data);
                }
                else{
                    $("#all_disp_orders_container").html("<div class='alert alert-warning text-center' role='alert'>"+
                    "<h4> There are no open orders here</h4></div>");
                }
            }
    });


    } //open orders page code end
    else if($(this).attr("data-btntype") == "cancelled_orders"){
        // alert("this is cancell order data");
        // $("#all_disp_orders_container").html("");
        var acc_token = window.localStorage.getItem("access_token");
        $.ajax({
            headers:{
                Authorization:'Bearer '+acc_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            url:mainurl+"/getallorders/"+"get_all_cancelled_orders/",
            type:"POST",
            dataType:"json",
            success:function(data){
                console.log(data.length);
                console.log(data);
                if(data.length > 0){
                    insert_order_details_cards(data);
                }
                else{
                    $("#all_disp_orders_container").html("<div class='alert alert-warning text-center' role='alert'>"+
                    "<h4> There are no open orders here</h4></div>");
                }
            }
    });



    }

    });
     
    // particullar product remove from particullar order code start
    $(document).on("click",".product_del_from_order",function(e){
        e.preventDefault();
        var rm_pid = $(this).attr("data-delpropid");
        var rm_ord_id = $(this).attr("data-delproordid");
        $("#wait_spinner").removeClass("d-none");
        $("#wait_spinner").addClass("d-flex");
        // alert("this is order cancelled btn : "+" order_id : "+rm_ord_id+" pid : "+rm_pid);
        var acc_token = window.localStorage.getItem("access_token");
        var rm_pro_data = {rmorderid:rm_ord_id,rmproductid:rm_pid};
        $.ajax({
            headers:{
                Authorization:'Bearer '+acc_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            url:mainurl+"/remove_pro_from_ord/rm_pro_from_ord/",
            type:"DELETE",
            dataType:"json",
            data:JSON.stringify(rm_pro_data),
            success:function(data){
                console.log(data);
                if(data.remove_pro_cancelled_order){
                    $("#wait_spinner").removeClass("d-flex");
                    $("#wait_spinner").addClass("d-none");
                    alert("order cancelled successfully");
                    window.location = mainurl+"/orders/";
                }
                else if(data.product_is_already_cancelled){
                    $("#wait_spinner").removeClass("d-flex");
                    $("#wait_spinner").addClass("d-none");
                    alert("product already cancelled");
                
                }
                else if(data.remove_particullar_pro){
                    $("#wait_spinner").removeClass("d-flex");
                    $("#wait_spinner").addClass("d-none");
                    alert("product remove successfully from your order");
                    window.location = mainurl+"/orders/";
                } 
                else{
                    $("#all_disp_orders_container").html("<div class='alert alert-warning text-center' role='alert'>"+
                    "<h4> There are no open orders here</h4></div>");
                }


            }
        });




    });

    // particullar product remove from particullar order code  end
} //order page if end


//    hamberger menu open close using bars button script start
    $(document).on("click","#hambtn",function(e){
        e.preventDefault();
        $("#menuitem").toggleClass("menuitemslider");
        $('#overlay').toggleClass("overlaydiv");
    });
//    hamberger menu open close using bars button script close



// hamberger menu close button script start
    $(document).on("click","#cancel_ham_menu_btn",function(e){
        e.preventDefault();
        $("#menuitem").removeClass("menuitemslider");
    });
// hamberger menu close button script end

// product-detail page image hover image slider code start 
    $(document).on("mouseover","#small_img",function(){
        $("#big_img").attr("src",$(this).attr("src"));
    });

    // img zoom code start
    $("#big_img").imagezoomsl({
        innerzoommagnifier: true,
        classmagnifier: window.external ? "round-loope" : "",
        zoomrange:[2,3],
        magnifierborder: "5px solid #F0F0F0",
		  zoomstart: 1,
		  magnifiersize: [155, 150]	
    });
    // img zoom code end
// product-detail page image hover image slider code end 




});