$(document).ready(function() {
    updateCart();
    var product_price = $(".product-price-before span");
    var product_last_price = $(".product-last-price span");

    for (var i = 0; i < product_price.length; i++) {
        $(product_price[i]).text(convertNumberToCurrency(Number($(product_price[i]).text())));
    }

    for (var i = 0; i < product_last_price.length; i++) {
        $(product_last_price[i]).text(convertNumberToCurrency(Number($(product_last_price[i]).text())));
    }
    var href = window.location.href.split("/");
    var page_active = ".page-active:eq(" + (Number(href[href.length - 1]) - 1) + ")";
    $(page_active).addClass('active');
});

$(document).on('click', '.product-element ul li', function(event) {
    if ($(this).is(":first-child")) {
        return false;
    }

    $(".orderBy").removeClass('active');
    $(this).addClass('active');
    var orderBy = getOrderActive($(this));
    var id = Number($(".search-product-key").data('id'));
    var key = $(".search-product-key").children('span').text();
    if (id != 0) {
        key = id;
    }

    if (orderBy != '') {
        $.ajax({
            url: 'ajaxProductOrderBy',
            type: 'POST',
            dataType: 'json',
            data: {
                key: key,
                orderBy : orderBy
            },
            success: function(products){
                var template = "";
                for (var i = 0; i < products.length; i++) {
                    template +="<a class='col-sm-6 col-md-4 col-lg-3 product-result' href='product_detail?p=" + btoa(products[i]['tProduct']['id']) +" '>"
                    + "<div class='product-img'>"
                    + "<img src='../img/products/" + products[i]['tProduct']['image'].split(',')[0] + "' alt=''>"
                    + "</div>"
                    + "<p class='product-name'>" + products[i]['tProduct']['name'] + "</p>";
                    if (products[i]['tProduct']['price'] != products[i]['tProduct']['finish_price']) {
                        template += "<p class='product-price'><strike><span>" + convertNumberToCurrency(Number(products[i]['tProduct']['price'])) + "</span> VNĐ</strike></p>";
                    } else {
                        template += "<p class='empty'></p>";
                    }
                    template += "<p class='product-last-price'><span>" + convertNumberToCurrency(Number(products[i]['tProduct']['finish_price'])) + "</span> VNĐ</p>"
                    + "<div class='btn btn-outline-danger product-add-to-cart'><i class='fas fa-cart-plus'></i> Add to cart</div>"
                    + "</a>";
                }

                $(".product-show").html(template);
                $('.page-item').removeClass('active');
                $(".page-active").first().addClass('active');
            }
        });
    }
});

$(document).on('click', '.pagination .page-item', function(event) {
    var page_active = $(".page-active.active");
    var page = $(this).text();
    
    if ($(this).is(":first-child")) {
        var number_page_active = $(page_active)[0].innerText;
        if (number_page_active == '1') {
            return false;
        } else {
            page = $(page_active).prev().text();
            $(".page-item").removeClass('active');
            $(page_active).prev().addClass('active');
        }
    } else if ($(this).is(":last-child")) {
        if ($(page_active).next()[0] == $(".page-next")[0]) {
            return false;
        } else {
            page = $(page_active).next().text();
            $(".page-item").removeClass('active');
            $(page_active).next().addClass('active');
        }
    } else {
        $(".page-item").removeClass('active');
        $(this).addClass('active');
    }
    var id = Number($(".search-product-key").data('id'));
    var key = $(".search-product-key").children('span').text();
    if (id != 0) {
        key = id;
    }

    var orderBy = getOrderActive($(".orderBy.active"));

    if (page != '' && key != '' && orderBy != '') {
        $.ajax({
            url: 'ajaxProductPagination',
            type: 'POST',
            dataType: 'json',
            data: {
                key: key,
                orderBy : orderBy,
                page: page
            },
            success: function(products){
                var template = "";
                for (var i = 0; i < products.length; i++) {
                    template +="<a class='col-sm-6 col-md-4 col-lg-3 product-result' href='product_detail?p=" + btoa(products[i]['tProduct']['id']) +" '>"
                    + "<div class='product-img'>"
                    + "<img src='../img/products/" + products[i]['tProduct']['image'].split(',')[0] + "' alt=''>"
                    + "</div>"
                    + "<p class='product-name'>" + products[i]['tProduct']['name'] + "</p>"
                    if (products[i]['tProduct']['price'] != products[i]['tProduct']['finish_price']) {
                        template += "<p class='product-price'><strike><span>" + convertNumberToCurrency(Number(products[i]['tProduct']['price'])) + "</span> VNĐ</strike></p>";
                    } else {
                        template += "<p class='empty'></p>";
                    }
                    template += "<p class='product-last-price'><span>" + convertNumberToCurrency(Number(products[i]['tProduct']['finish_price'])) + "</span> VNĐ</p>"
                    + "<div class='btn btn-outline-danger product-add-to-cart'><i class='fas fa-cart-plus'></i> Add to cart</div>"
                    + "</a>";
                }

                $(".product-show").html(template);
            }
        });
    }
});

function getOrderActive(orderBy){
    switch($(orderBy).index()) {
        case 1 :
        order = "new";
        break;
        case 2 :
        order = "sold";
        break;
        case 3 :
        order = "increase";
        break;
        case 4 :
        order = "deincrease";
        break;
        default :
        order = 'default';
        break;
    };
    return order;
}

function convertVnToEn(str){
    return  str.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/\s\s+/g, ' ').trim();
}