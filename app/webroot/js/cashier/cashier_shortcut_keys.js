$(document).on('keydown', '.search_product', function(event) {
    if (event.keyCode == "38" || event.keyCode == "40") {
        event.preventDefault();
        $(this).select();
    }
});

$(document).on('keydown', '.search_customer', function(event) {
    if (event.keyCode == "38" || event.keyCode == "40") {
        event.preventDefault();
        $(this).select();
    }
});

document.body.onkeydown = function(e){
    var bg = $('.background').hasClass('show');
    var content_tabs_list = $(".content_tabs");
    var current_tab;

    _.forEach(content_tabs_list, function(item){
        if ($(item).attr('aria-hidden') === 'false') {
            current_tab = item;
        }
    });

    var found_product = $("#found_product").attr('hidden');
    var found_customer = $(".found_customer").attr('hidden');
    var product_active = $(".one_product.choose").length;
    if (bg === false){
        if (e.keyCode == "130") {
            payment();
        } else if (e.keyCode == "127") {
            $(".search_product").focus();
        } else if (e.keyCode == "128") {
            addTab();
        } else if (e.keyCode == "129") {
            $(current_tab).find('.search_customer').focus();
        } else if (e.keyCode == "187"){
            if( $(current_tab).find('.input_paying').attr('disabled') === undefined ){
                $(current_tab).find('.input_paying').select();
            }
        } else if (e.keyCode == "124"){
            nextTab();
        } else if (e.keyCode == "27") {
            $("#shortcut-keys").remove();
        } else {
            return true;
        }
    }
};

$(window).on('resize', function(event){
    var width = $(".btn-pay").outerWidth();
    $('.notification').outerWidth(width);
});

function nextTab(){
    var tabs = $('li.ui-tabs-tab');
    var tab_quantity = $(tabs).length;
    var tab_active = $(".ui-tabs-active");

    if (tab_active[0] == $(tabs).last()[0]) {
        var tab_after = $('li.ui-tabs-tab').first();
    } else {
        var tab_after = $(tab_active).next('.ui-tabs-tab');
    }
    var id_tab = "#" + $(tab_after).attr('aria-controls');

    $('li.ui-tabs-tab').removeClass('ui-tabs-active');
    $('li.ui-tabs-tab').removeClass('ui-state-active');
    $('li.ui-tabs-tab').removeClass('ui-state-focus');
    $('li.ui-tabs-tab').attr('tabindex', '-1');
    $('li.ui-tabs-tab').attr('aria-selected', 'false');
    $('li.ui-tabs-tab').attr('aria-expanded', 'false');

    $(tab_after).addClass('ui-tabs-active');
    $(tab_after).addClass('ui-state-active');
    $(tab_after).addClass('ui-state-focus');
    $(tab_after).attr('tabindex', '0');
    $(tab_after).attr('aria-selected', 'true');
    $(tab_after).attr('aria-expanded', 'true');

    $('.content_tabs').attr('aria-hidden', 'true');
    $('.content_tabs').css({
        "display": 'none'
    });

    $(id_tab).removeAttr('style');
    $(id_tab).attr('aria-hidden', 'false');

    $("#found_product").attr('hidden', 'true');
}

/* PRODUCT */
$(document).on('keydown', '.search_product', function(event) {
    var bg = $('.background').hasClass('show');
    var found_product = $("#found_product").attr('hidden');
    var product_active = $(".one_product.choose").length;
    var val = $(this).val();
    if( bg === false){
        if (event.keyCode == "38") {
            moveProduct("prev");
        } else if (event.keyCode == "40") {
            moveProduct("next");
        } else if (event.keyCode == "13") {
            if (found_product == undefined) {
                if(product_active == 1){
                    chooseProduct();
                } else if (product_active == 0 && $("#found_product").find('.one_product').length > 0){
                    addProduct($('.one_product').first());
                }
            } else {
                $.ajax({
                    url: 'cashier/ajaxSearchProduct',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        code: val
                    },
                    success : function(product){
                        if (product.length != 0) {
                            addProduct("product", product['tProductCashier']);
                        } else {
                            var product_not_found = $("<div id='product-not-found'>").html("<i class='fas fa-times'></i> No products matched");
                            $("body").append(product_not_found);
                            $("#product-not-found").addClass('show');

                            setTimeout(function(){
                                $('#product-not-found').removeClass('show');
                                $('#product-not-found').remove();
                            }, 1500);
                        }   
                    }
                });
            }
        }
    }
});

function moveProduct(move){
    var product = $(".one_product");
    var product_active = $(".one_product.choose");

    if (move == "next") {
        var product_move = $(product_active).next('.one_product');

        if (product_active[0] == $(product).last()[0] || product_active.length == 0) {
            product_move = $(product).first();
        }
    } else if (move == "prev") {
        var product_move = $(product_active).prev('.one_product');

        if (product_active[0] == $(product).first()[0] || product_active.length == 0) {
            product_move = $(product).last();
        }
    }
    
    $(product).removeClass('choose');
    $(product_move).addClass('choose');

    var height = $(product_move)[0]['offsetTop'];
    $("#found_product").animate({ scrollTop: height }, 100);
    
}

/* CUSTOMER */

$(document).on('keydown', '.search_customer', function(event) {
    var bg = $('.background').hasClass('show');
    if( bg === false){
        if (event.keyCode == "38") {
            moveCustomer($(this), "prev");
        } else if (event.keyCode == "40") {
            moveCustomer($(this), "next");
        } else if (event.keyCode == "13") {
            chooseCustomer($(this));
        }
    }
});

function moveCustomer(search, move){
    var found_customer = $(search).next('.found_customer');
    var customer = $(found_customer).children(".one_customer");
    var customer_active = $(found_customer).children(".one_customer.choose");
    if (move == "prev") {
        var customer_move = $(customer_active).prev('.one_customer');

        if (customer_active[0] == $(customer).first()[0]) {
            customer_move = $(customer).last();
        }
    } else if (move == "next") {
        var customer_move = $(customer_active).next('.one_customer');

        if (customer_active[0] == $(customer).last()[0]) {
            customer_move = $(customer).first();
        }
    }

    $(customer).removeClass('choose');
    $(customer_move).addClass('choose');

    var height = $(customer_move)[0]['offsetTop'];
    $(found_customer).animate({ scrollTop: height }, 100);
    
}

function chooseCustomer(search){
    var found_customer = $(search).next('.found_customer');
    var customer_active = $(found_customer).children(".one_customer.choose");
    addCustomer(customer_active);
}