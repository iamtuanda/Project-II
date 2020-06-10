// search product
$(document).on('keyup', '.search_customer', function(event) {
    if (event.keyCode == "40" || event.keyCode == "38" || event.keyCode == "13") {
        return false;
    }
    var value = $(this).val();
    var found_customer = $(this).next('.found_customer');
    if( value !== ''){
        $.ajax({
            url: 'cashier/ajaxSearchCustomer',
            type: 'POST',
            dataType: 'json',
            data: {
                key_search: value
            },
            success : function(customers){
                var quantity = customers.length;
                if (quantity > 0) {
                    if(quantity > 3){
                        $(found_customer).css({
                            'overflow-y': 'scroll',
                            'height': '247px'
                        });
                    }else{
                        height = 82 * quantity + 'px';
                        $(found_customer).css({
                            'height' : height,
                            'overflow-y' : 'unset'
                        });
                    }

                    $(found_customer).removeAttr('hidden');
                    $(found_customer).html("");

                    for (var i = 0; i < quantity; i++) {

                        one_customer = $("<div>").addClass('one_customer').data('id', customers[i]['tCustomerCashier']['id']);;
                        img = $("<img>").addClass('img_customer').attr('src', 'img/customers/' + customers[i]['tCustomerCashier']['avatar']);
                        name_customer = $("<div>").addClass('name_customer').text(customers[i]['tCustomerCashier']['fullname']);
                        phone = $("<div>").addClass('phone').text(customers[i]['tCustomerCashier']['phone']);
                        point = $("<div>").addClass('point').text("Point: " + Math.floor(customers[i]['tCustomerCashier']['point']));
                        one_customer.append(img).append(name_customer).append(phone).append(point);

                        $(found_customer).append(one_customer);
                    }
                    $(found_customer).children(".one_customer").first().addClass('choose');

                } else {
                    $(found_customer).html("");
                    $(found_customer).css({
                        'overflow-y': 'unset',
                        'height': '40px'
                    });
                    var customer_not_found = $("<div>").addClass('customer-not-found').text('No customers matched');
                    $(found_customer).append(customer_not_found);
                }
            }
        })
    } else {
        $(found_customer).attr('hidden', 'true');
        $(found_customer).html("");
    }
});

// choose customer
$(document).on('click', '.one_customer', function(event) {
    addCustomer($(this));
});

function addCustomer(customer){
    var name_customer = $(customer).children('.name_customer').text();
    var row2 = $(customer).parent('.found_customer').parent('.row2');
    var row2_2 = $(row2).next(".row2_2");
    var id = $(customer).data('id');
    var phone = $(customer).children('.phone').text();
    var point = $(customer).children('.point').text();

    $(row2).attr('hidden', 'true');

    $(row2_2).removeAttr('hidden');
    $(row2_2).next(".row2_3").removeAttr('hidden');

    $(row2_2).find('.name_customer_choose').text(name_customer);
    $(row2_2).find('.phone_customer_choose').text(phone);
    $(row2_2).find('.cid').text(id);
    $(row2_2).next(".row2_3").text(point);

    $(row2).parent('.content-right').find('.payment').removeAttr('hidden');
}

// remove customer
$(document).on('click', '#icon-remove-customer', function(event) {
    var row2_2 = $(this).parent('.row2_2');
    $(row2_2).attr('hidden', 'true');
    $(row2_2).next(".row2_3").attr('hidden', 'true');
    $(row2_2).prev(".row2").removeAttr('hidden');
    $(row2_2).prev(".row2").find('.search_customer').val('');
    $(row2_2).prev(".row2").find('.found_customer').attr('hidden','true');

    var content_right = $(row2_2).parent('.content-right')
    $(content_right).find('.payment').attr('hidden', 'true');

    $(content_right).find('.methods').text('Cash');

    $(content_right).find('.input_paying').val($(content_right).find('.number_total_price').text());
    $(content_right).find('.number_change').text('0');
    $(content_right).find('.fa-credit-card').removeData('Point');
    $(content_right).find('.fa-credit-card').removeData('Card');
    $(content_right).find('.fa-credit-card').data('Cash', $(content_right).find('.number_total_price').text());

    $(content_right).parent('.row').next('.pay_by_point').find('.pbp_point').removeAttr('disabled');
});


$(document).on('mousemove', '.one_customer', function(event) {
    $(".one_customer").removeClass('choose');
    $(this).addClass('choose');
});