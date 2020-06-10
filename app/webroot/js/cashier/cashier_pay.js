$('#UserAgent').text(navigator.userAgent);

function print() {
    printJS({
        printable: 'printElement',
        type: 'html',
        targetStyles: ['*']
    })
}

$(document).on('click', '.btn-pay', function(event) {
    payment();
});

$(document).on('click', '.switch-print', function(event) {
    togglePrint();
});

function togglePrint(action){
    if( $('.switch-print').data('print') == true ){
        $('.switch-print').data('print', "false");
        notification(" <i class='fas fa-toggle-off'></i> Print off !", "#dc4a4a");
    } else {
        $('.switch-print').data('print', "true");
        notification(" <i class='fas fa-toggle-on'></i> Print on !", "#31cc77");
    }
}

function payment(){
    var content_tabs_list = $(".content_tabs");
    var current_tab;
    _.forEach(content_tabs_list, function(item){
        if ( $(item).attr('aria-hidden') === 'false' ) {
            current_tab = item;
        }
    });
    var products = $(current_tab).find('.content_product');

    if (products.length == 0) {
        notification(" <i class='fas fa-exclamation-triangle'></i> Bill is currently empty !", "#dc4a4a");
        return false;
    }

    var input_quantity = $(".input_quantity");
    var enter_quantity = true;
    _.forEach(input_quantity, function(item){
        if ($(item).val() == 0){
            $(item).focus();
            enter_quantity = false;
            notification("<i class='far fa-keyboard'></i> Please enter quantity!", "#dc4a4a");
        }
    })

    if (enter_quantity == false) {
        return false;
    }

    var change = $(current_tab).find('.number_change').text();
    if (convertCurrencyToNumber(change) < 0) {
        notification(" <i class='fas fa-exclamation-triangle'></i> The amount paid by customers is not enough !", "#dc4a4a");
        $(current_tab).find('.input_paying').focus();
        return false;
    }

    var replace1 = getDate();
    var replace2 = getTime();
    var customer_id;

    if ($(current_tab).find('.row2').attr('hidden') == undefined) {
        var replace4 = "Retail customers";
        var replace5 = "";
        var replace6 = "";
        var customer_id = 0;
    } else {
        var replace4 = $(current_tab).find('.name_customer_choose').text();
        var replace5 = $(current_tab).find('.phone_customer_choose').text();
        var replace6 = $(current_tab).find('.row2_3').text().split(" ")[1];
        var customer_id = $(current_tab).find('.cid').text();
    }

    var replace7 = $(current_tab).find('.fullname_cashier').text();
    var replace8 = $(current_tab).find('.input_note').val();

    var replace9 = $(current_tab).find('.number_total_price').text();
    var total_price = replace9;
    if ($(".payment").attr('hidden') == undefined ) {
        var point = $(".fa-credit-card").data('Point') ? $(".fa-credit-card").data('Point') : '0';
        if (convertCurrencyToNumber(point) > 0) {
            total_price = convertCurrencyToNumber(total_price) -  convertCurrencyToNumber(point);
        } else {
            total_price = convertCurrencyToNumber(total_price);
        }
    } else {
        total_price = convertCurrencyToNumber(total_price);
    }
    var plus_point = (total_price / 100000);
    var replace10 = $(current_tab).find('.fa-credit-card').data('Point') ? $(current_tab).find('.fa-credit-card').data('Point') : '0';
    var point = replace10;
    var minus_point = convertCurrencyToNumber(point) / 1000;
    var replace11 = $(current_tab).find('.fa-credit-card').data('Cash') ? $(current_tab).find('.fa-credit-card').data('Cash') : '0';
    var cash = replace11;
    var replace12 = $(current_tab).find('.fa-credit-card').data('Card') ? $(current_tab).find('.fa-credit-card').data('Card') : '0';
    var card = replace12;
    var replace13 = $(current_tab).find('.number_change').text();

    var print1 = "<div id='printElement' class='invoice'>" +
    "<div class='container-fluid'>" +
    "<div class='shop-name'>MISHON</div>" +
    "<div class='shop-address'>241 Xuan Thuy, Cau Giay, Ha Noi</div>" +
    "<hr>" +
    "<div id='date-sale' class='form-inline'> Date sale : &nbsp;" +
    "<div class='date-sale'>#{replace1} &nbsp;</div>" +
    "<div class='time-sale'>#{replace2}</div>" +
    "</div>" +
    "<div class='invoice-title'>INVOICE FOR SALES</div>" +
    "<div class='invoice-id'>#{replace3}</div>" +
    "<div class='invoice-info'>" +
    "<div class='form-inline'>" +
    "<div class='form-group'>" +
    "<label for='invoice-name-customer'>Customer : &nbsp; </label>" +
    "<div id='invoice-name-customer'>#{replace4}</div>" +
    "</div>" +
    "</div>" +
    "<div class='form-inline'>" +
    "<div class='form-group'>" +
    "<label for='invoice-phone-customer'>Phone : &nbsp;</label>" +
    "<div id='invoice-phone-customer'>#{replace5}</div>" +
    "</div>" +
    "</div>" +
    "<div class='form-inline'>" +
    "<div class='form-group'>" +
    "<label for='invoice-point-customer'>Point : &nbsp;</label>" +
    "<div id='invoice-point-customer'>#{replace6}</div>" +
    "</div>" +
    "</div>" +
    "<div class='form-inline'>" +
    "<div class='form-group'>" +
    "<label for='invoice-cashier'>Seller : &nbsp;</label>" +
    "<div id='invoice-cashier'>#{replace7}</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "<table class='table'>" +
    "<thead class='thead-light'>" +
    "<tr>" +
    "<th>Name product</th>" +
    "<th>Quantity</th>" +
    "<th>Price</th>" +
    "<th>Provisional</th>" +
    "</tr>" +
    "</thead>" +
    "<tbody>";

    var print2 = "";

    

    _.forEach(products, function(product) {
        print2 += "<tr><td>" +
        $(product).find('.bill_name_product').text() + "</td><td>" +
        $(product).find('.input_quantity').val() + "</td><td>" +
        $(product).find('.input_bill_price_product').val() + "</td><td>" +
        $(product).find('.bill_sum_price').text() + "</td></td>";
    });

    var print3 = "</tbody>" +
    "</table>" +
    "<div class='form-inline note'>" +
    "<div class='form-group'>" +
    "<label for='invoice-note'>Note : &nbsp;</label>" +
    "<div id='invoice-note'>#{replace8}</div>" +
    "</div>" +
    "</div>" +
    "<hr>" +
    "<div id='invoice-total'>Total : <div class='invoice-total'>#{replace9}</div>" +
    "</div>";


    if (replace10 != '0') {
        print3 += "<div id='invoice-point'>Point : <div class='invoice-point'>" + replace10 + "</div>" +
        "</div>"
    }
    if (replace11 != '0') {
        print3 += "<div id='invoice-cash'>Cash : <div class='invoice-cash'>" + replace11 + "</div>" +
        "</div>";
    }
    if (replace12 != '0') {
        print3 += "<div id='invoice-card'>Card : <div class='invoice-card'>" + replace12 + "</div>" +
        "</div>";
    }

    print3 += "<div id='invoice-change'>Change : <div class='invoice-change'>#{replace13}</div>" +
    "</div>" +
    "<div class='invoice-description text-center'>" +
    "( 1 point = 1.000 vnđ ) <br>" +
    "Freeship around 2m <br>" +
    "Order : 01234567 <br>" +
    "Thank you & see you again!" +
    "</div>" +
    "</div>" +
    "</div>";

    var template = print1 + print2 + print3;
    var account_id = $(".dropdown-item-info").data('id');
    $.ajax({
        url: 'cashier/ajaxPayAddBill',
        type: 'POST',
        dataType: 'json',
        data: {
            time: getDate() + " " + getTime(),
            total_price : total_price,
            account_id : account_id,
            customer_id : customer_id,
            note: $(".input_note").val(),
            point: point,
            cash: cash,
            card: card
        },
        success: function(bill_id){
            if (bill_id) {

                // add point and minus point
                if (customer_id != 0) {
                    $.ajax({
                        async: false,
                        url: 'cashier/ajaxPayAddPoint',
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            customer_id: customer_id,
                            plus_point: plus_point.toFixed(2)
                        }
                    });

                    if (point != 0) {
                        $.ajax({
                            async: false,
                            url: 'cashier/ajaxPayMinusPoint',
                            type: 'POST',
                            dataType: 'json',
                            data: {
                                customer_id: customer_id,
                                minus_point: minus_point.toFixed(2)
                            }
                        });
                    }
                }

                _.forEach(products, function(product) {
                    var id = $(product).data('id');
                    var quantity = $(product).find('.input_quantity').val();
                    var name = $(product).find('.bill_name_product').text();
                    var price = $(product).data('price');
                    var finish_price = convertCurrencyToNumber($(product).find('.input_bill_price_product').val());
                    var code = $(product).find('.code').text();

                    $.ajax({
                        async: false,
                        url: 'cashier/ajaxPayAddProductSold',
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            product_id: id,
                            name: name,
                            price: price,
                            code: code,
                            quantity: quantity,
                            bill_id: bill_id,
                            finish_price: finish_price
                        },
                        success: function(){}
                    });
                });

                // insert table notification
                $.ajax({
                    async: false,
                    url: 'cashier/ajaxInsertNotification',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        name: $(".fullname_cashier_header").text(),
                        status: "sold bill #B" + bill_id,
                        price: convertNumberToCurrency(total_price),
                        time : getDate() + " " + getTime()
                    },
                    success: function(){
                        template = template.replace(/#\{replace1\}/g, replace1)
                        .replace(/#\{replace2\}/g, replace2)
                        .replace(/#\{replace3\}/g, "HD" + bill_id)
                        .replace(/#\{replace4\}/g, replace4)
                        .replace(/#\{replace5\}/g, replace5)
                        .replace(/#\{replace6\}/g, replace6)
                        .replace(/#\{replace7\}/g, replace7)
                        .replace(/#\{replace8\}/g, replace8)
                        .replace(/#\{replace9\}/g, replace9)
                        .replace(/#\{replace13\}/g, replace13);

                        $("body").append(template);
                        if ($(".switch-print").data('print') == true) {
                            print();
                        }

                        $("#printElement").remove();

                        var tab_quantity = $('li.ui-tabs-tab').length;

                        var id_current_tab = $(current_tab).attr('id');
                        var attr_head_tab = "[aria-controls='"+id_current_tab+"']";
                        var head_tab = $(attr_head_tab);

                        if( tab_quantity == 1 ){
                            $('.number_total_price').text('0');
                            $('.input_paying').val(0);
                            $('.input_paying').attr('disabled', 'true');
                            $('.number_change').text('0');
                            $('.content_product').remove();
                            $('.fa-credit-card').removeData('Point');
                            $('.fa-credit-card').removeData('Card');
                            $('.fa-credit-card').data('Cash','0');
                            $('.fa-credit-card').removeAttr('hidden');
                            $('.payment').attr('hidden', 'true');
                            $('.methods').text('Cash');
                            $('.badge-product').text('0');

                            $('.row2').removeAttr('hidden');
                            $('.search_customer').val('');
                            $('.found_customer').attr('hidden', 'true');
                            $('.row2_2').attr('hidden', 'true');
                            $('.row2_3').attr('hidden', 'true');

                            $("#search_product").removeAttr('hidden');
                            $("#remove_search_product").attr('hidden', 'true');

                            $(head_tab).find('.tab_title').text('Bill 1');

                            $(".payment_time").text(getTime());
                        } else {
                            $(current_tab).remove();
                            $(head_tab).remove();

                            var tab = $("li.ui-tabs-tab")[0];

                            $(tab).addClass('ui-tabs-active');
                            $(tab).addClass('ui-state-active');
                            $(tab).addClass('ui-state-focus');
                            $(tab).attr('tabindex', '0');
                            $(tab).attr('aria-selected', 'true');
                            $(tab).attr('aria-expanded', 'true');

                            var content_tabs = $(".content_tabs")[0];
                            $(content_tabs).removeAttr('style');
                            $(content_tabs).attr('aria-hidden', 'false');
                        }
                        $(".search_product").val('');
                        $("#found_product").attr('hidden', 'true');
                        notification("<i class='far fa-check-circle'></i> Successful payment", "#28a745");
                    }
                });
            }
        }
    });
}