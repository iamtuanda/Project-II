// search product
$(document).on('keyup', '.search_product', function(event) {
    if (event.keyCode == "38" || event.keyCode == "40" || event.keyCode == "13" || event.keyCode == "128") {
        return false;
    }
    var value = $(this).val();
    if( value !== ''){

        $.ajax({
            url: 'cashier/ajaxSearchProduct',
            type: 'POST',
            dataType: 'json',
            data: {
                key_search: value
            },
            success: function(products){
                var quantity = products.length;
                if (quantity > 0) {
                    if (quantity > 5) {
                        $("#found_product").css({
                            'overflow-y': 'scroll',
                            'height': '450px'
                        });
                    } else {
                        height = 90 * quantity + 'px';
                        $("#found_product").css({
                            'height' : height,
                            'overflow-y' : 'unset'
                        });
                    }

                    $("#found_product").removeAttr('hidden');
                    $("#found_product").html("");

                    for (var i = 0; i < quantity; i++) {
                        one_product = $("<div>").addClass('one_product').data('id', products[i]['tProductCashier']['id']).data('code', products[i]['tProductCashier']['code']).data('price', products[i]['tProductCashier']['price']);
                        img = $("<img>").addClass('img_product').attr('src', "img/products/" + products[i]['tProductCashier']['image'].split(",")[0]);
                        code = $("<div>").addClass('code').text(products[i]['tProductCashier']['code']);
                        unit = $("<div>").addClass('unit').text("chiếc");
                        name_product = $("<div>").addClass('name_product').text(products[i]['tProductCashier']['name']);
                        price_product = $("<div>").addClass('price_product').text(convertNumberToCurrency(Number(products[i]['tProductCashier']['finish_price'])) + " vnđ");
                        one_product.append(img).append(code).append(unit).append(name_product).append(price_product);

                        $("#found_product").append(one_product);
                    }
                } else {
                    $("#found_product").html("");
                    $("#found_product").css({
                        'overflow-y': 'unset',
                        'height': '45px'
                    });
                    var product_not_found = $("<div>").addClass('product-not-found').text('No products matched');
                    $("#found_product").append(product_not_found);

                }
            }
        })
    } else {
        $("#found_product").attr('hidden', 'true');
        $("#found_product").html("");
    }
});

function chooseProduct(){
    var product_active = $(".one_product.choose");
    addProduct(product_active);
}

// click add product for bill
$(document).on('click', '.one_product', function(event) {
    addProduct($(this));
});

function addProduct(product, detail){
    if( product === "product") {
        var id = detail.id;
        var price = detail.price;
        var code = detail.code;
        var unit = detail.unit;
        var name_product = detail.name;
        var price_product = convertNumberToCurrency(Number(detail.finish_price));
    } else {
        var id = $(product).data('id');
        var price = $(product).data('price');
        var code = $(product).find('.code').text();
        var unit = $(product).find('.unit').text();
        var name_product = $(product).find('.name_product').text();
        var price_product = $(product).find('.price_product').text().split(" ")[0];
    }
    

    var tr = "<tr class='content_product' data-id='#{id}' data-price='#{price}'>"
        + "<td class='bill_remove_product' colspan='1'>"
        + "<button><i class='fas fa-times' aria-hidden='true' id='icon-remove-product'></i></button>"
        + "</td>"
        + "<td class='bill_name_product'>#{replace1}</td>"
        + "<td style='text-align: right;' class='td_down'>"
        + "<button type='button' class='btn-icon down'>"
        + "<i class='fas fa-angle-down' aria-hidden='true'></i>"
        + "</button>"
        + "</td>"
        + "<td class='edit_quantity'>"
        + "<input type='text' onFocus='this.select()' class='input_quantity' value='#{replace2}' style='text-align: right;'>"
        + "</td>"
        + "<td class='td_up'>"
        + "<button type='button' class='btn-icon up'>"
        + "<i class='fas fa-angle-up' aria-hidden='true'>"
        + "</i>"
        + "</button>"
        + "</td>"
        + "<td class='bill_price_product'>"
        + "<input id='id_bill_price_product' type='text' name='' maxlength='12' class='input_bill_price_product' value='#{replace3}' onfocus='this.select()' disabled='true'><div class='tiengiamgia' style='opacity:0;visibility:hidden;'>0</div>"
        + "</td>"
        + "<td class='bill_sum_price'>#{replace4}</td>"
        + "<td class='code' hidden='true'>#{replace5}</td>"
        + "</tr>";

    var bill;

    var bills = $(".content_tabs");
    _.forEach(bills, function(item){
        if($(item).attr('aria-hidden') === 'false'){
            bill = item;
        }
    });

    var content_product = $(bill).find('.content_product');
    var content_body = $(bill).find('.content_body');
    var row = $(bill).children('.row');

    var quantity_product = content_product.length;

    if(quantity_product == 0){ // bill empty
        tr = tr.replace(/#\{id\}/g, id).replace(/#\{price\}/g, price).replace(/#\{replace2\}/g,1).replace(/#\{replace1\}/g, name_product).replace(/#\{replace3\}/g, price_product).replace(/#\{replace4\}/g, price_product).replace(/#\{replace5\}/g, code);
        $(content_body).append(tr);
        updateBill(row);
        $(bill).find('.badge-product').text(Number($(bill).find('.badge-product').text()) + 1);
    } else {
        var found = false;
        _.forEach(content_product, function(item){
            
            if($(item).find('.code').text() === code){
                $(item).find('.input_quantity').val(parseInt($(item).find('.input_quantity').val()) + 1);
                found = true;
                updatePriceProduct(item, $(item).find('.input_quantity').val());
            }
        });
        if( !found ){
            tr = tr.replace(/#\{id\}/g, id).replace(/#\{price\}/g, price).replace(/#\{replace2\}/g,1).replace(/#\{replace1\}/g, name_product).replace(/#\{replace3\}/g, price_product).replace(/#\{replace4\}/g, price_product).replace(/#\{replace5\}/g, code);
            $(content_body).prepend(tr);
            
            $(bill).find('.badge-product').text(Number($(bill).find('.badge-product').text()) + 1);
        }
        var number = Math.floor(($(".content-left").innerHeight()) / ($(".content_product").innerHeight())) ;
        if(quantity_product >= number){
            $(bill).find('.content-left').css({
                'overflow-y': 'scroll'
            });
        } else {
            $(bill).find('.content-left').css({
                'overflow-y': 'unset'
            });
        }
    }
    updateBill(row);
    $(".search_product").val(code);
    $(".search_product").select();
    $("#found_product").attr('hidden', 'true');
    $("#found_product").html("");
    $("#search_product").removeAttr('hidden');
    $("#remove_search_product").attr('hidden', 'true');
}

// click remove search product
$(document).on('click', '#remove_search_product', function(event) {
    $(".search_product").val('');
    $("#found_product").attr('hidden', 'true');
    $("#found_product").html("");
    $("#search_product").removeAttr('hidden');
    $("#remove_search_product").attr('hidden', 'true');
});

// show icon remove when keyup input search product
$(document).on('keyup', '.search_product', function(event) {
    var value = $(this).val();
    if( value !== ''){
        $("#remove_search_product").removeAttr('hidden');
        $("#search_product").attr('hidden', 'true');
    }else{
        $("#search_product").removeAttr('hidden');
        $("#remove_search_product").attr('hidden', 'true');
    }
});


$(document).on('mousemove', '.one_product', function(event) {
    $(".one_product").removeClass('choose');
    $(this).addClass('choose');
});