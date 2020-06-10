var products = window.localStorage.getItem('products') ? JSON.parse(window.localStorage.getItem('products')) : [];
window.localStorage.setItem('products', JSON.stringify(products));
$(document).ready(function() {
    var products = window.localStorage.getItem('products') ? JSON.parse(window.localStorage.getItem('products')) : [];
    window.localStorage.setItem('products', JSON.stringify(products));
    var login = $("#header").data('login') == true ? true : false;

    if (login) {
        var customer_id = atob($("#header").data('id'));
        $.ajax({
            url: 'ajaxGetQuantityProductsForCart',
            type: 'POST',
            dataType: 'json',
            data: {
                customer_id: customer_id
            },
            success: function(quantity) {
                $(".badge-cart").text(quantity);
            }
        })
    } else {
        $("#navigation .badge-cart").text(products.length);
    }
});

$(document).on('click', '.addToCart .btn', function(event) {
    if ($(event.target).is('.btn-add')) {
        $("#add-to-cart-success").remove();
        var login = $("#header").data('login') == true ? true : false;
        var id = atob($("#product-detail").data('product'));
        var quantity = Number($(".quantity").val());

        if (login) {
            var customer_id = atob($("#header").data('id'));
            $.ajax({
                url: 'ajaxAddToCart',
                type: 'POST',
                dataType: 'json',
                data: {
                    customer_id: customer_id,
                    product_id: id,
                    quantity: quantity
                },
                success: function(carts){
                    if (carts) {
                        $("#navigation .badge.badge-danger.badge-cart").text(carts.length);

                        var success = "<div id='add-to-cart-success'>"
                                    + "<div class='icon-remove'>"
                                    + "<i class='fas fa-times'></i>"
                                    + "</div>"
                                    + "<div class='header'>"
                                    + "<span><i class='far fa-check-circle'></i> Thêm vào giỏ hàng thành công! </span>"
                                    + "</div>"
                                    + "<a href='cart' class='btn btn-danger btn-block btn-show-cart'> Xem giỏ hàng và thanh toán </a>"
                                    + "</div>";

                        $("#add-to-cart-success").remove();
                        $(".addToCart").append(success);
                    }
                }
            });
            
        } else {
            if (getIndexByID(id).id != -1) {
                products[getIndexByID(id).index].quantity += quantity;
            } else {
                var product = {
                    id : id,
                    quantity : quantity
                }

                products.push(product);
            }
            window.localStorage.setItem('products', JSON.stringify(products));

            var success = "<div id='add-to-cart-success'>"
                        + "<div class='icon-remove'>"
                        + "<i class='fas fa-times'></i>"
                        + "</div>"
                        + "<div class='header'>"
                        + "<span><i class='far fa-check-circle'></i> Thêm vào giỏ hàng thành công! </span>"
                        + "</div>"
                        + "<a href='cart' class='btn btn-danger btn-block btn-show-cart'> Xem giỏ hàng và thanh toán </a>"
                        + "</div>";

            $(".addToCart").remove('#add-to-cart-success');
            $(".addToCart").append(success);

            $("#navigation .badge.badge-danger.badge-cart").text(products.length);
        }
    } else if ($(event.target).is('a.btn-show-cart')){
        window.location = 'cart';
    } else {
        return false;
    }
    
});

// product search
$(document).on('click', '.product-add-to-cart', function(event) {
    event.preventDefault();
    event.stopPropagation();
    var login = $("#header").data('login') == true ? true : false;
    var id = atob($(this).parent('a').attr('href').split("=")[1]);
    var quantity = 1;

    if (login) {
        var customer_id = atob($("#header").data('id'));
        $.ajax({
            url: 'ajaxAddToCart',
            type: 'POST',
            dataType: 'json',
            data: {
                customer_id: customer_id,
                product_id: id,
                quantity: quantity
            },
            success: function(carts){
                if (carts) {
                    $("#navigation .badge.badge-danger.badge-cart").text(carts.length);

                    notifySuccess();
                }
            }
        });
        
    } else {
        if (getIndexByID(id).id != -1) {
            products[getIndexByID(id).index].quantity += quantity;
        } else {
            var product = {
                id : id,
                quantity : quantity
            }

            products.push(product);
        }
        window.localStorage.setItem('products', JSON.stringify(products));

        notifySuccess();

        $("#navigation .badge.badge-danger.badge-cart").text(products.length);
    }
});

$(document).on('click', '.home-add-to-cart', function(event) {
    event.preventDefault();
    event.stopPropagation();
    var login = $("#header").data('login') == true ? true : false;
    var id = atob($(this).parent().parent().parent().parent('a').attr('href').split("=")[1]);
    var quantity = 1;

    if (login) {
        var customer_id = atob($("#header").data('id'));
        $.ajax({
            url: 'ajaxAddToCart',
            type: 'POST',
            dataType: 'json',
            data: {
                customer_id: customer_id,
                product_id: id,
                quantity: quantity
            },
            success: function(carts){
                if (carts) {
                    $("#navigation .badge.badge-danger.badge-cart").text(carts.length);

                    notifySuccess();
                }
            }
        });
        
    } else {
        if (getIndexByID(id).id != -1) {
            products[getIndexByID(id).index].quantity += quantity;
        } else {
            var product = {
                id : id,
                quantity : quantity
            }

            products.push(product);
        }
        window.localStorage.setItem('products', JSON.stringify(products));

        notifySuccess();

        $("#navigation .badge.badge-danger.badge-cart").text(products.length);
    }
});

$(document).on('click', '.icon-remove', function(event) {
    $("#add-to-cart-success").remove();
});

$(document).on('click', 'body', function(event) {
    if (!$(event.target).is('#add-to-cart-success') && !$(event.target).is('.addToCart .btn')) {
        $('#add-to-cart-success').remove();
    }
});

function notifySuccess(){
    $(".notify-add-to-cart-success").remove();
    var success = "<div class='notify-add-to-cart-success'>"
                + "<div class='header'>"
                + "<span><i class='far fa-check-circle'></i> Thêm vào giỏ hàng thành công! </span>"
                + "</div>"
                + "<a href='cart' class='btn btn-danger btn-block'> Xem giỏ hàng và thanh toán </a>"
                + "</div>";
    
    $("body").append(success);

    setTimeout(function(){
        $(".notify-add-to-cart-success").addClass('show');
    }, 200);

    setTimeout(function(){
        $('.notify-add-to-cart-success').removeClass('show');
        setTimeout(function(){
            $(".notify-add-to-cart-success").remove();
        }, 300);
    }, 4000);
}