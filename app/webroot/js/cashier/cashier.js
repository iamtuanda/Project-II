$(document).ready(function() {
    // change width notification
    var width = $(".btn-pay").outerWidth();
    $('.notification').outerWidth(width);
});

// show button edit quantity
$(document).on('mouseenter', '.content_product', function(event) {
    event.preventDefault();
    $(this).children('.td_down').children('.btn-icon.down').addClass('show_btn');
    $(this).children('.td_up').children('.btn-icon.up').addClass('show_btn');
});

// hidden button edit quatity
$(document).on('mouseleave', '.content_product', function(event) {
    event.preventDefault();
    $(this).children('.td_down').children('.btn-icon.down').removeClass('show_btn');
    $(this).children('.td_up').children('.btn-icon.up').removeClass('show_btn');
});

// remove product for bill use keydown enter
$(document).on('keydown', '.bill_remove_product button', function(event) {
    if (event.keyCode == "13") {
        var content_product = $(this).parent('.bill_remove_product').parent('.content_product');
        var bill = $(content_product).parent('.content_body').parent('.striped').parent('.content-left').parent('.row');

        $(content_product).remove();
        var content_product_list = $(bill).find('.content_product');

        var quantity_product = content_product_list.length;
        if(quantity_product >= 13){
            $(bill).find('.content-left').css({
                'overflow-y': 'scroll'
            });
        } else {
            $(bill).find('.content-left').css({
                'overflow-y': 'unset'
            });
        }
        updateBill(bill);
        $(bill).find('.badge-product').text(Number($(bill).find('.badge-product').text()) - 1);
    }
});

// remove product for bill use click
$(document).on('click', '#icon-remove-product', function(event) {
    var content_product = $(this).parent('button').parent('.bill_remove_product').parent('.content_product');
    var bill = $(content_product).parent('.content_body').parent('.striped').parent('.content-left').parent('.row');

    $(content_product).remove();
    var content_product_list = $(bill).find('.content_product');

    var quantity_product = content_product_list.length;
    if(quantity_product >= 13){
        $(bill).find('.content-left').css({
            'overflow-y': 'scroll'
        });
    } else {
        $(bill).find('.content-left').css({
            'overflow-y': 'unset'
        });
    }
    updateBill(bill);
    $(bill).find('.badge-product').text(Number($(bill).find('.badge-product').text()) - 1);
    $(".search_product").focus();

});

// reduce the number of products
$(document).on('click', '.btn-icon.down', function(event) {
    var input_quantity = $(this).parent('.td_down').next('.edit_quantity').children('.input_quantity');
    var quantity = Number($(input_quantity).val());
    var tr = $(input_quantity).parent('.edit_quantity').parent('.content_product');
    var bill = $(tr).parent('.content_body').parent('.striped').parent('.content-left').parent('.row');

    if(quantity > 1){
        $(input_quantity).val(quantity - 1);
        updatePriceProduct(tr, $(input_quantity).val());
        updateBill(bill);
    }
});

// increase the number of products
$(document).on('click', '.btn-icon.up', function(event) {
    var input_quantity = $(this).parent('.td_up').prev('.edit_quantity').children('.input_quantity');
    var quantity = Number($(input_quantity).val());
    var tr = $(input_quantity).parent('.edit_quantity').parent('.content_product');
    var bill = $(tr).parent('.content_body').parent('.striped').parent('.content-left').parent('.row');

    $(input_quantity).val(quantity + 1);
    updatePriceProduct(tr, $(input_quantity).val());
    updateBill(bill);
});

// enter the number of products
$(document).on('keyup', '.input_quantity', function(event) {
    var tr = $(this).parent('.edit_quantity').parent('.content_product');
    var bill = $(tr).parent('.content_body').parent('.striped').parent('.content-left').parent('.row');

    updatePriceProduct(tr, $(this).val());
    updateBill(bill);
});

// prevent alphabet
$(document).on('keypress', '.input_quantity, .input_paying, .pbp_input_money', function(event) {
    var key = window.event ? event.keyCode : event.which;
    if (event.keyCode === 8) {
        return true;
    } else if ( key < 48 || key > 57 ) {
        return false;
    } else {
        return true;
    }
});

// enter paying
$(document).on('keyup', '.input_paying', function(event) {
    var row10 = $(this).parent('.number_paying').parent('.row10');
    var paying = convertCurrencyToNumber($(this).val());
    var total_price = convertCurrencyToNumber($(row10).prev('.row4').children('.number_total_price').text());
    $(this).val(convertNumberToCurrency(paying));
    $(row10).find('.fa-credit-card').data('Cash', convertNumberToCurrency(paying));
    $(row10).next('.row7').children('.number_change').text(convertNumberToCurrency(paying - total_price));
});

// use wallet
$(document).on('click', '.payment .fa-credit-card', function(event) {

    var row10 = $(this).parent('.payment').parent('.paying').parent('.row10');
    var row = $(row10).parent('.content-right').parent('.row');
    var total_price = $(row10).prev('.row4').children('.number_total_price').text();

    var name_customer = $(row).find('.name_customer_choose').text();
    var phone_customer = $(row).find('.phone_customer_choose').text();
    var point = $(row).find('.row2_3').text().split(' ')[1];
    var change = $(row).find('.number_change').text();

    if(convertCurrencyToNumber(total_price) != 0){
        pay_by_point = $(row).next('.pay_by_point');
        $(pay_by_point).find('.pbp_to_pay_total').text(total_price);
        $(pay_by_point).find('.pbp_input_money').val(0);
        $(pay_by_point).find('.pbp_change').text(change);
        $(pay_by_point).find('.pbp_name').text(name_customer);
        $(pay_by_point).find('.pbp_phone').text(phone_customer);
        $(pay_by_point).find('.pbp_p').text(point);
        $(pay_by_point).addClass('pay_by_point_show');
        $('.background').addClass('show');

        $(pay_by_point).find('.pbp_info_pay').html(
            "<div class='pbp_pay_change'><label class='enter_money'>Change</label><div class='pbp_change'>"+ change + "</div></div>"
            )

        $(pay_by_point).find('.pbp_point').removeAttr('disabled');

        if($(this).data('Cash') != undefined){
            var pay_by_cash = "<div class='pay_by_cash'>"
            + "<i class='fas fa-times remove_pay_cash'></i>"
            + "<div class='name_methods'>Cash</div>"
            + "<div class='money_methods'>"
            + $(this).data('Cash')
            + "</div>"
            + "</div>";
            $(pay_by_point).find('.pbp_info_pay').prepend(pay_by_cash);

        }

        if($(this).data('Point') != undefined && $(pay_by_point).find('.pay_by_use_point').length == 0) {
            var pay_by_use_point = "<div class='pay_by_use_point'>"
            + "<i class='fas fa-times remove_pay_point'></i>"
            + "<div class='name_methods'>Point</div>"
            + "<div class='money_methods'>"
            + $(this).data('Point')
            + "</div>"
            + "</div>";

            $(pay_by_point).find('.pbp_info_pay').prepend(pay_by_use_point);
            $(pay_by_point).find('.pbp_point').attr('disabled', 'true');
        }

        if ($(this).data('Card') != undefined && $(pay_by_point).find('.pay_by_card').length == 0) {
            var pay_by_card = "<div class='pay_by_card'>"
            + "<i class='fas fa-times remove_pay_card'></i>"
            + "<div class='name_methods'>Card</div>"
            + "<div class='money_methods'>"
            + $(this).data('Card')
            + "</div>"
            + "</div>";

            $(pay_by_point).find('.pbp_info_pay').prepend(pay_by_card);
        }
    }
});

// convert currency use keyup
$(document).on('keyup', '.pbp_input_money', function(event) {
    $(this).val(convertNumberToCurrency(convertCurrencyToNumber($(this).val())));
});

// close wallet
$(document).on('click', '.pbp_close .icon-fa-close', function(event) {
    var pay_by_point = $(this).parent('.pbp_close').parent('.pbp_header').parent('.pay_by_point');
    $(pay_by_point).removeClass('pay_by_point_show');
    $('.background').removeClass('show');
});

// close wallet
$(document).on('click', '.cancel', function(event) {
    var pay_by_point = $(this).parent('.pbp_foot').parent('.pay_by_point');
    $(pay_by_point).removeClass('pay_by_point_show');
    $('.background').removeClass('show');
});

// click background 
$(document).on('click', '.background', function(event) {
    $('.pay_by_point').removeClass('pay_by_point_show');
    $('.bill_close').removeClass('pay_by_point_show');
    $(this).removeClass('show');
    $('.bill_close').removeClass('show');
    $('#information').removeClass('show');
});

// use cash
$(document).on('click', '.pbp_cash', function(event) {
    var pbp_content = $(this).parent('.pbp_methods_pay').parent('.pbp_content');
    var money_to_pay = convertCurrencyToNumber($(pbp_content).find('.pbp_to_pay_total').text());
    var enter_money = $(pbp_content).find('.pbp_input_money').val();
    var pbp_change_before = convertCurrencyToNumber($(pbp_content).find('.pbp_change').text());
    pay_by_cash = $(pbp_content).find('.pay_by_cash');
    if (convertCurrencyToNumber(enter_money) != 0) {
        if( $(pay_by_cash).length == 0){
            var pay_by_cash = "<div class='pay_by_cash'>"
            + "<i class='fas fa-times remove_pay_cash'></i>"
            + "<div class='name_methods'>Cash</div>"
            + "<div class='money_methods'>"
            + enter_money
            + "</div>"
            + "</div>";

            $(pbp_content).find('.pbp_info_pay').prepend(pay_by_cash);
            $(pbp_content).find('.pbp_input_money').focus();
            $(pbp_content).find('.pbp_change').text(convertNumberToCurrency(convertCurrencyToNumber(enter_money) - money_to_pay));
        } else {
            money_methods = $(pay_by_cash).find('.money_methods').text();
            $(pay_by_cash).find('.money_methods').text(convertNumberToCurrency(convertCurrencyToNumber(money_methods) + convertCurrencyToNumber(enter_money)));
        }

        $(pbp_content).find('.pbp_change').text(convertNumberToCurrency(convertCurrencyToNumber(enter_money) + pbp_change_before));
        var pbp_change_current = convertCurrencyToNumber($(pbp_content).find('.pbp_change').text());

        if (pbp_change_current > 0) {
            $(pbp_content).find('.pbp_input_money').val(0);
        } else {
            $(pbp_content).find('.pbp_input_money').val(convertNumberToCurrency(Math.abs(pbp_change_current)));
        }
    }

    $(pbp_content).find('.pbp_input_money').focus();
    
});

// remove use cash
$(document).on('click', '.remove_pay_cash', function(event) {
    var pbp_content = $(this).parent('.pay_by_cash').parent('.pbp_info_pay').parent('.pbp_content');
    var money_methods = convertCurrencyToNumber($(this).next('.name_methods').next('.money_methods').text());
    var money_to_pay = convertCurrencyToNumber($(pbp_content).find('.pbp_to_pay_total').text());
    var pbp_change_before = convertCurrencyToNumber($(pbp_content).find('.pbp_change').text());
    var pbp_cash = $(pbp_content).find('.pbp_cash');
    var enter_money = convertCurrencyToNumber($(pbp_content).find('.pbp_input_money').val());

    $(pbp_content).find('.pay_by_cash').remove();
    $(pbp_content).find('.pbp_change').text(convertNumberToCurrency(pbp_change_before - money_methods));

    var pbp_change_current = convertCurrencyToNumber($(pbp_content).find('.pbp_change').text());

    if (pbp_change_current > 0) {
        $(pbp_content).find('.pbp_input_money').val(0);
    } else {
        $(pbp_content).find('.pbp_input_money').val(convertNumberToCurrency(Math.abs(pbp_change_current)));
    }
    $(pbp_content).find('.pbp_input_money').focus();
});


// use card
$(document).on('click', '.pbp_card', function(event) {
    var pbp_content = $(this).parent('.pbp_methods_pay').parent('.pbp_content');
    var money_to_pay = convertCurrencyToNumber($(pbp_content).find('.pbp_to_pay_total').text());
    var enter_money = $(pbp_content).find('.pbp_input_money').val();
    var pbp_change_before = convertCurrencyToNumber($(pbp_content).find('.pbp_change').text());
    pay_by_card = $(pbp_content).find('.pay_by_card');
    if (convertCurrencyToNumber(enter_money) != 0) {
        if( $(pay_by_card).length == 0){
            // chưa tồn tại
            var pay_by_card = "<div class='pay_by_card'>"
            + "<i class='fas fa-times remove_pay_card'></i>"
            + "<div class='name_methods'>Card</div>"
            + "<div class='money_methods'>"
            + enter_money
            + "</div>"
            + "</div>";

            $(pbp_content).find('.pbp_info_pay').prepend(pay_by_card);

            $(pbp_content).find('.pbp_change').text(convertNumberToCurrency(convertCurrencyToNumber(enter_money) - money_to_pay));
        } else {
            money_methods = $(pay_by_card).find('.money_methods').text();
            $(pay_by_card).find('.money_methods').text(convertNumberToCurrency(convertCurrencyToNumber(money_methods) + convertCurrencyToNumber(enter_money)));
        }

        $(pbp_content).find('.pbp_change').text(convertNumberToCurrency(convertCurrencyToNumber(enter_money) + pbp_change_before));
        var pbp_change_current = convertCurrencyToNumber($(pbp_content).find('.pbp_change').text());
        if (pbp_change_current > 0) {
            $(pbp_content).find('.pbp_input_money').val(0);
        } else {
            $(pbp_content).find('.pbp_input_money').val(convertNumberToCurrency(Math.abs(pbp_change_current)));
        }
    }

    $(pbp_content).find('.pbp_input_money').focus();
});

// remove use card
$(document).on('click', '.remove_pay_card', function(event) {
    var pbp_content = $(this).parent('.pay_by_card').parent('.pbp_info_pay').parent('.pbp_content');
    var money_methods = convertCurrencyToNumber($(this).next('.name_methods').next('.money_methods').text());
    var money_to_pay = convertCurrencyToNumber($(pbp_content).find('.pbp_to_pay_total').text());
    var pbp_change_before = convertCurrencyToNumber($(pbp_content).find('.pbp_change').text());
    var pbp_card = $(pbp_content).find('.pbp_card');
    var enter_money = convertCurrencyToNumber($(pbp_content).find('.pbp_input_money').val());

    $(pbp_content).find('.pay_by_card').remove();
    $(pbp_content).find('.pbp_change').text(convertNumberToCurrency(pbp_change_before - money_methods));

    var pbp_change_current = convertCurrencyToNumber($(pbp_content).find('.pbp_change').text());

    if (pbp_change_current > 0) {
        $(pbp_content).find('.pbp_input_money').val(0);
    } else {
        $(pbp_content).find('.pbp_input_money').val(convertNumberToCurrency(Math.abs(pbp_change_current)));
    }
    $(pbp_content).find('.pbp_input_money').focus();
});

// use point
$(document).on('click', '.pbp_point', function(event) {
    var pbp_content = $(this).parent('.pbp_methods_pay').parent('.pbp_content');
    var money_point = Number($(pbp_content).find('.pbp_p').text()) * 1000;
    var money_to_pay = convertCurrencyToNumber($(pbp_content).find('.pbp_to_pay_total').text());
    var enter_money = $(pbp_content).find('.pbp_input_money').val();
    var pbp_change_before = convertCurrencyToNumber($(pbp_content).find('.pbp_change').text());
    if (convertCurrencyToNumber(enter_money) != 0) {
        if(convertCurrencyToNumber(enter_money) <= money_point){

            if(convertCurrencyToNumber(enter_money) <= money_to_pay){
                var pay_by_use_point = "<div class='pay_by_use_point'>"
                + "<i class='fas fa-times remove_pay_point'></i>"
                + "<div class='name_methods'>Point</div>"
                + "<div class='money_methods'>"
                + enter_money
                + "</div>"
                + "</div>";

                $(pbp_content).find('.pbp_info_pay').prepend(pay_by_use_point);
                pbp_point = $(pbp_content).find('.pbp_point');
                $(pbp_point).attr('disabled', 'true');
                $(pbp_content).find('.pbp_change').text(convertNumberToCurrency(pbp_change_before + convertCurrencyToNumber(enter_money)));
                var pbp_change_current = convertCurrencyToNumber($(pbp_content).find('.pbp_change').text());

                if (pbp_change_current > 0) {
                    $(pbp_content).find('.pbp_input_money').val(0);
                } else {
                    $(pbp_content).find('.pbp_input_money').val(convertNumberToCurrency(Math.abs(pbp_change_current)));
                }
            } else {
                notification(" <i class='fas fa-exclamation-triangle'></i> The value of payment in points must not be greater than the amount that the guest must pay", "#dc4a4a");
            }

        } else {
            notification("<i class='fas fa-exclamation-triangle'></i> The amount exceeded the payment value by the allowed points", "#dc4a4a");
        }
    }
    $(pbp_content).find('.pbp_input_money').focus();
    
});

// remove use point
$(document).on('click', '.remove_pay_point', function(event) {
    var pbp_content = $(this).parent('.pay_by_use_point').parent('.pbp_info_pay').parent('.pbp_content');
    var money_methods = convertCurrencyToNumber($(this).next('.name_methods').next('.money_methods').text());
    var money_to_pay = convertCurrencyToNumber($(pbp_content).find('.pbp_to_pay_total').text());
    var pbp_point = $(pbp_content).find('.pbp_point');
    var enter_money = convertCurrencyToNumber($(pbp_content).find('.pbp_input_money').val());
    var pbp_change_before = convertCurrencyToNumber($(pbp_content).find('.pbp_change').text());

    $(pbp_content).find('.pay_by_use_point').remove();

    $(pbp_content).find('.pbp_change').text(convertNumberToCurrency(pbp_change_before - money_methods));
    var pbp_change_current = convertCurrencyToNumber($(pbp_content).find('.pbp_change').text());

    if (pbp_change_current > 0) {
        $(pbp_content).find('.pbp_input_money').val(0);
    } else {
        $(pbp_content).find('.pbp_input_money').val(convertNumberToCurrency(Math.abs(pbp_change_current)));
    }
    $(pbp_point).removeAttr('disabled', 'true');
    $(pbp_content).find('.pbp_input_money').focus();
}); 

// complete use wallet
$(document).on('click', '.complete', function(event) {
    var pay_by_point = $(this).parent('.pbp_foot').parent('.pay_by_point');
    var row = $(pay_by_point).prev('.row');
    var pbp_change = convertCurrencyToNumber($(pay_by_point).find('.pbp_change').text());
    var money_to_pay = convertCurrencyToNumber($(pay_by_point).find('.pbp_to_pay_total').text())

    if(pbp_change >= 0){
        var paying = convertNumberToCurrency(pbp_change + money_to_pay);
        var name_methods = $(pay_by_point).find('.name_methods');
        var methods = "";
        $(row).find('.fa-credit-card').removeData('Cash');
        $(row).find('.fa-credit-card').removeData('Point');
        $(row).find('.fa-credit-card').removeData('Card');
        _.forEach(name_methods, function(item, index){
            if($(name_methods).length - 1 == index){
                methods += $(item).text();  
            } else {
                methods += $(item).text() + ", ";
            }
            var attr = $(item).text();
            $(row).find('.fa-credit-card').data(attr, $(item).next('.money_methods').text());
        });

        $(row).find('.methods').text(methods);
        $(row).find('.methods').removeAttr('hidden');
        $(row).find('.input_paying').val(paying);
        var fa_credit_card = $(row).find('.fa-credit-card');
        if( $(fa_credit_card).data('Cash') && $(fa_credit_card).data('Point') == undefined && $(fa_credit_card).data('Card') == undefined){
            $(row).find('.input_paying').removeAttr('disabled');
        } else {
            $(row).find('.input_paying').attr('disabled', 'true');
        }
        $(row).find('.fa-credit-card').data('edit', 'true');
        $(row).find('.number_change').text(convertNumberToCurrency(pbp_change));
    }

    $(pay_by_point).removeClass('pay_by_point_show');
    $('.background').removeClass('show');

});

// update price for one product
function updatePriceProduct(tr, quantity){
    var price = $(tr).find('.input_bill_price_product').val();

    $(tr).find('.bill_sum_price').text(convertNumberToCurrency(convertCurrencyToNumber(price) * quantity));

}

function convertCurrencyToNumber(string){
    return Number(string.replace(/,/g,''));
}

function convertNumberToCurrency(number){
    var number_before = number;
    number = Math.abs(number);

    str = String(number);
    if(str.length <= 3)
        return number_before;
    strResult = "";
    for (var i = str.length; i >= 0; i--) {
        if (strResult.length > 0 && (str.length - i - 1) % 3 == 0)
            strResult = "," + strResult;
        strResult = str.substring(i, i + 1) + strResult;
    }
    if( number_before < 0 ){
        return "-" + strResult
    } 
    return strResult;
}

function updateBill(bill){
    var list_product = $(bill).find('.bill_sum_price');

    var total_price = 0;
    for (var i = 0; i < list_product.length; i++) {
        total_price += convertCurrencyToNumber($(list_product[i]).text())
    }

    total_price = convertNumberToCurrency(total_price);
    $(bill).find('.number_total_price').text(total_price);
    $(bill).find('.input_paying').val(total_price);
    $(bill).find('.number_change').text('0');
    $(bill).find('.fa-credit-card').data('Cash', total_price);
    $(bill).find('.fa-credit-card').removeData('Point');
    $(bill).find('.fa-credit-card').removeData('Card');
    $(bill).find('.methods').text('Cash');

    if(total_price === '0'){
        $(".input_discount").attr('disabled', 'true');
        $(".input_paying").attr('disabled', 'true');
    } else {
        $(".input_discount").removeAttr('disabled');
        $(".input_paying").removeAttr('disabled');
    }
}

function notification(text, bg){
    var content_tabs_list = $(".content_tabs");
    var current_tab;
    _.forEach(content_tabs_list, function(item){
        if ( $(item).attr('aria-hidden') === 'false' ) {
            current_tab = item;
        }
    });
    var width = $(current_tab).find('.btn-pay').outerWidth();
    $('.notification').outerWidth(width);

    $('.notification').html(text);
    $('.notification').css('background', bg);
    $('.notification').addClass('show');

    setTimeout(function(){
        $('.notification').removeClass('show');
    }, 1500);
};

$(document).on('click', 'body', function(event) {
    if (!$(event.target).is('#found_product') || !$(event.target).is('.found_customer')) {
        $('#found_product').attr('hidden', 'true');
        $('.found_customer').attr('hidden', 'true');
    }
});

$(document).on('click', '.btn-shortcut-keys', function(event) {
    var template_shortcut_keys =  "<div id='shortcut-keys'>"
    + "<div class='shortcut-keys-body'>"
    + "<div class='shortcut-keys-header'>"
    + "<div class='shortcut-keys-close'><i class='far fa-times-circle icon-shortcut-keys-close'></i></div>"
    + "</div>"
    + "<div class='shortcut-keys-notation'>"
    + "<div class='shortcut-keys-title'>List of shortcuts</div>"
    + "<table class='table table-responsive shortcut-keys-table'>"
    + "<tbody>"
    + "<tr>"
    + "<td>"
    + "<div class='shortcut-keys-sample'>"
    + "<span>f13</span>"
    + "</div>"
    + "</td>"
    + "<td class='shortcut-keys-content'>"
    + "<p>: &nbsp; Move to the next tab</p>"
    + "</td>"
    + "</tr>"
    + "<tr>"
    + "<td>"
    + "<div class='shortcut-keys-sample'>"
    + "<span>f16</span>"
    + "</div>"
    + "</td>"
    + "<td class='shortcut-keys-content'>"
    + "<p>: &nbsp; Move the cursor to the search box products</p>"
    + "</td>"
    + "</tr>"
    + "<tr>"
    + "<td>"
    + "<div class='shortcut-keys-sample'>"
    + "<span>f17</span>"
    + "</div>"
    + "</td>"
    + "<td class='shortcut-keys-content'>"
    + "<p>: &nbsp; Add tab</p>"
    + "</td>"
    + "</tr>"
    + "<tr>"
    + "<td>"
    + "<div class='shortcut-keys-sample'>"
    + "<span>f18</span>"
    + "</div>"
    + "</td>"
    + "<td class='shortcut-keys-content'>"
    + "<p>: &nbsp; Move the cursor to the search box customers</p>"
    + "</td>"
    + "</tr>"
    + "<tr>"
    + "<td>"
    + "<div class='shortcut-keys-sample'>"
    + "<span>f19</span>"
    + "</div>"
    + "</td>"
    + "<td class='shortcut-keys-content'>"
    + "<p>: &nbsp; Payment</p>"
    + "</td>"
    + "</tr>"
    + "<tr>"
    + "<td>"
    + "<div class='shortcut-keys-sample'>"
    + "<span>=</span>"
    + "</div>"
    + "</td>"
    + "<td class='shortcut-keys-content'>"
    + "<p>: &nbsp; Move the cursor to the payment box</p>"
    + "</td>"
    + "</tr>"
    + "</tbody>"
    + "</table>"
    + "</div>"
    + "</div>"
    + "</div>";

    $("body").append(template_shortcut_keys);
});


$(document).on('click', '.shortcut-keys-close', function(event) {
    $("#shortcut-keys").remove();
});

$(document).on('click', '.dropdown-item-manager', function(event) {
    window.location = './admin/home';
});

$(document).on('click', '.dropdown-item-logout', function(event) {
    window.location = './admin/logout';
});










