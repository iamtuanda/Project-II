var productsStorage = window.localStorage.getItem('products') ? JSON.parse(window.localStorage.getItem('products')) : [];
window.localStorage.setItem('products', JSON.stringify(productsStorage));
$(document).ready(function() {
    var productsStorage = window.localStorage.getItem('products') ? JSON.parse(window.localStorage.getItem('products')) : [];
    window.localStorage.setItem('products', JSON.stringify(productsStorage));
    $(".cart").html("");

    if (checkLogin()) {
        var customer_id = atob($("#header").data('id'));

        $.ajax({
            url: 'ajaxGetShoppingCart',
            type: 'POST',
            dataType: 'json',
            data : {
                customer_id : customer_id
            },
            success : function(products){

                if (products.length == 0) {
                    var cart_empty = "<div class='col-12 col-sm-12 col-md-12 col-lg-12 cart-empty'>"
                    + "<div class='text-center bg-white'>"
                    + "<span class='no-product'>You have no items in your shopping cart.</span>"
                    + "<a href='home'><span class='btn btn-warning continue-shopping'>Continue shopping</span></a>"
                    + "</div>"
                    + "</div>";
                    $(".cart").html(cart_empty);
                } else {
                    var template = "";
                    var frame_product = "<div class='col-12 col-sm-12 col-md-12 col-lg-9 frame-product'>";
                    for (var i = 0; i < products.length; i++) {
                        template += "<div class='row cart-product' data-id='" + btoa(products[i]['tProduct']['id']) + "' data-card='" + btoa(products[i]['tShoppingCart']['id']) + "'>"
                        + "<div class='col-2 col-sm-2 col-md-3 col-lg-3 image-product'>"
                        + "<p class='image'>"
                        + "<img src='../img/products/" + products[i]['tProduct']['image'].split(",")[0] + "' class='img-responsive'>"
                        + "</p>"
                        + "</div>"
                        + "<div class='col-1 col-sm-1 col-md-1 col-lg-1 remove-product'>"
                        + "<a href='#'><i class='fa fa-times' aria-hidden='true'></i></a>"
                        + "</div>"
                        + "<div class='col-4 col-sm-4 col-md-4 col-lg-4 info-product'>"
                        + "<div class='name-product'>"
                        + "<a href='product_detail?p="
                        + btoa(products[i]['tProduct']['id'])
                        + "'>"
                        + products[i]['tProduct']['name']
                        + "</a>"
                        + "</div>"
                        + "</div>"
                        + "<div class='col-2 col-sm-2 col-md-2 col-lg-2 price-product'>"
                        + convertNumberToCurrency(Number(products[i]['tProduct']['finish_price']))
                        + "</div>"
                        + "<div class='col-3 col-sm-3 col-md-2 col-lg-2 number'>"
                        + "<div class='quantity-number'>"
                        + "<span class='minus'>-</span>"
                        + "<p class='quantity'>"
                        + products[i]['tShoppingCart']['quantity']
                        + "</p>"
                        + "<span class='plus'>+</span>"
                        + "</div>"
                        + "</div>"
                        + "</div>";
                    }
                    frame_product += template + "</div>"; 
                    var total = "<div class='col-12 col-sm-12 col-md-12 col-lg-3 frame-payment'>"
                    + "<div class='row total'>"
                    + "<span>Total :</span>"
                    + "<div class='amount'>"
                    + "<p>"
                    + "<strong class='tt'></strong>"
                    + "</p>"
                    + "</div>"
                    + "</div>"
                    + "<div class='row payment'>"
                    + "<a href='shipping' class='btn btn-block btn-danger btn-payment'>CONDUCTING PAYMENT</a>"
                    + "</div>"
                    + "</div>";
                    $(".cart").html("");
                    $(".cart").append(frame_product).append(total);
                    totalPrice();
                }
                
            }
        });
    } else {
        if (productsStorage.length == 0) {
            var cart_empty = "<div class='col-12 col-sm-12 col-md-12 col-lg-12 cart-empty'>"
            + "<div class='text-center bg-white'>"
            + "<span class='no-product'>You have no items in your shopping cart.</span>"
            + "<a href='home'><span class='btn btn-warning continue-shopping'>Continue shopping</span></a>"
            + "</div>"
            + "</div>";
            $(".cart").html(cart_empty);
        } else {
            var template = "";
            var frame_product = "<div class='col-12 col-sm-12 col-md-12 col-lg-9 frame-product'>";
            var counter = 0;
            var location = [];
            productsStorage.forEach((item, index) => {
                $.ajax({
                    async: false,
                    url: 'ajaxGetProductByID',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        id: item.id
                    },
                    success : function(product){
                        if (product.length != 0) {
                            counter ++;
                            template += "<div class='row cart-product' data-id='" + btoa(product['tProduct']['id']) + "'>"
                            + "<div class='col-2 col-sm-2 col-md-3 col-lg-3 image-product'>"
                            + "<p class='image'>"
                            + "<img src='../img/products/" + product['tProduct']['image'].split(",")[0] + "' class='img-responsive'>"
                            + "</p>"
                            + "</div>"
                            + "<div class='col-1 col-sm-1 col-md-1 col-lg-1 remove-product'>"
                            + "<a href='#'><i class='fa fa-times' aria-hidden='true'></i></a>"
                            + "</div>"
                            + "<div class='col-4 col-sm-4 col-md-4 col-lg-4 info-product'>"
                            + "<div class='name-product'>"
                            + "<a href='product_detail?p="
                            + btoa(product['tProduct']['id'])
                            + "'>"
                            + product['tProduct']['name']
                            + "</a>"
                            + "</div>"
                            + "</div>"
                            + "<div class='col-2 col-sm-2 col-md-2 col-lg-2 price-product'>"
                            + convertNumberToCurrency(Number(product['tProduct']['finish_price']))
                            + "</div>"
                            + "<div class='col-3 col-sm-3 col-md-2 col-lg-2 number'>"
                            + "<div class='quantity-number'>"
                            + "<span class='minus'>-</span>"
                            + "<p class='quantity'>"
                            + item.quantity
                            + "</p>"
                            + "<span class='plus'>+</span>"
                            + "</div>"
                            + "</div>"
                            + "</div>";
                        } else {
                            flag = true;
                            location.push(index);
                        }
                    }
                });
            });
            if (counter != 0) {
                frame_product += template + "</div>"; 
                var total = "<div class='col-12 col-sm-12 col-md-12 col-lg-3 frame-payment'>"
                + "<div class='row total'>"
                + "<span>Total :</span>"
                + "<div class='amount'>"
                + "<p>"
                + "<strong class='tt'></strong>"
                + "</p>"
                + "</div>"
                + "</div>"
                + "<div class='row payment'>"
                + "<div class='btn btn-block btn-danger btn-payment' href='#signin-modal' data-toggle='modal'>CONDUCTING PAYMENT</div>"
                + "</div>"
                + "</div>";
                $(".cart").html("");
                $(".cart").append(frame_product).append(total);
                totalPrice();
            } else {
                var cart_empty = "<div class='col-12 col-sm-12 col-md-12 col-lg-12 cart-empty'>"
                + "<div class='text-center bg-white'>"
                + "<span class='no-product'>You have no items in your shopping cart.</span>"
                + "<a href='home'><span class='btn btn-warning continue-shopping'>Continue shopping</span></a>"
                + "</div>"
                + "</div>";
                $(".cart").html(cart_empty);
                var productsStorage = [];
                window.localStorage.setItem('products', JSON.stringify(productsStorage));
            }

            if (location.length != 0) {
                for (var i = 0; i < location.length; i++) {
                    productsStorage.splice(location[i].index, 1);
                }
                window.localStorage.setItem('products', JSON.stringify(productsStorage));
            }
            
        }
    }
    totalPrice();   
});

$(document).on('click', '.minus', function(event) {
    var quantity = Number($(this).next('.quantity').text());
    var product_id = atob($(this).parent('.quantity-number').parent('.number').parent().data('id'));
    if (quantity != 1) {
        $(this).next('.quantity').text(quantity - 1);

        if (checkLogin()) {
            var card_id = atob($(this).parent('.quantity-number').parent('.number').parent().data('card'));
            $.ajax({
                url: 'ajaxUpdateShoppingCart',
                type: 'POST',
                dataType: 'json',
                data: {
                    id: card_id,
                    quantity: quantity - 1
                },
                success: function(){
                    totalPrice();
                }
            });
        } else {
            productsStorage[getIndexByID(product_id).index].quantity --;
            window.localStorage.setItem('products', JSON.stringify(productsStorage));
            totalPrice();
        }
    }
});

$(document).on('click', '.plus', function(event) {
    var quantity = Number($(this).prev('.quantity').text());
    var product_id = atob($(this).parent('.quantity-number').parent('.number').parent().data('id'));
    if (quantity != 10) {
        $(this).prev('.quantity').text(quantity + 1);
        if (checkLogin()) {
            var card_id = atob($(this).parent('.quantity-number').parent('.number').parent().data('card'));
            $.ajax({
                url: 'ajaxUpdateShoppingCart',
                type: 'POST',
                dataType: 'json',
                data: {
                    id: card_id,
                    quantity: quantity + 1
                },
                success: function(){
                    totalPrice();
                }
            });
        } else {
            productsStorage[getIndexByID(product_id).index].quantity ++;
            window.localStorage.setItem('products', JSON.stringify(productsStorage));
            totalPrice();
        }
        
    }
});

$(document).on('click', '.remove-product a', function(event) {
    event.preventDefault();
    var product_id = atob($(this).parent('.remove-product').parent().data('id'));
    
    var cart_product = $(this).parent('.remove-product').parent('.cart-product');

    var quantity_product = $(".frame-product").find('.cart-product').length;
    if (checkLogin()) {
        var card_id = atob($(this).parent('.remove-product').parent().data('card'));
        if (quantity_product == 1) {
            $(".frame-product").remove();
            $(".frame-payment").remove();
            var cart_empty = "<div class='col-12 col-sm-12 col-md-12 col-lg-12 cart-empty'>"
            + "<div class='text-center bg-white'>"
            + "<span class='no-product'>You have no items in your shopping cart.</span>"
            + "<a href='home'><span class='btn btn-warning continue-shopping'>Continue shopping</span></a>"
            + "</div>"
            + "</div>";
            $(".cart").html(cart_empty);
            totalPrice();
        }
        $(cart_product).remove();
        $.ajax({
            url: 'ajaxDeleteShoppingCart',
            type: 'POST',
            dataType: 'json',
            data: {
                id: card_id,
            },
            success: function(){
                totalPrice();
            }
        });
    } else {
        if (quantity_product == 1) {
            $(".frame-product").remove();
            $(".frame-payment").remove();
            var cart_empty = "<div class='col-12 col-sm-12 col-md-12 col-lg-12 cart-empty'>"
            + "<div class='text-center bg-white'>"
            + "<span class='no-product'>You have no items in your shopping cart.</span>"
            + "<a href='home'><span class='btn btn-warning continue-shopping'>Continue shopping</span></a>"
            + "</div>"
            + "</div>";
            $(".cart").html(cart_empty);
            productsStorage = [];
            window.localStorage.setItem('products', JSON.stringify(productsStorage));
            totalPrice();
        } else {
            $(cart_product).remove();
            productsStorage.splice(getIndexByID(product_id).index, 1);
            window.localStorage.setItem('products', JSON.stringify(productsStorage));
            totalPrice();
        }
    }
});

