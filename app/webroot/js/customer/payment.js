$(document).ready(function() {
    $(".money").text(convertNumberToCurrency(Number($(".money").text())));

    var sum = 0;
    var total = 0

    var prices = $(".price span");
    for (var i = 0; i < prices.length; i++) {
        sum += Number($(prices[i]).text());
        $(prices[i]).text(convertNumberToCurrency(Number($(prices[i]).text())) + " đ");
    }
    if ($(".fee_ship").data('fee') == false) {
        total = sum + 30000;
        $(".fee-ship").text('30.000 đ');
        $(".fee_ship").text('30.000 đ');
    } else {
        var value_deal = convertCurrencyToNumber($(".fee_ship").data('value').replace(/\,/g,'.'));
        if (sum > value_deal) {
            total = sum;
            $(".fee-ship").text('0 đ');
            $(".fee_ship").text('Miễn phí');
        } else {
            total = sum + 30000;
            $(".fee-ship").text('30.000 đ');
            $(".fee_ship").text('30.000 đ');
        }
    }

    $(".provisonal span").text(convertNumberToCurrency(sum) + " đ");
    $(".price-total span").text(convertNumberToCurrency(total) + " đ");
    
});

$(document).on('change', '#cbx', function(event) {
    var money_point = $(".step-2 .money").text();
    var price_total = $(".price-total span").text().split(" ")[0];
    if( $(this).is(":checked") ) {
        if (convertCurrencyToNumber(money_point) > convertCurrencyToNumber(price_total)) {
            money_point = price_total;
        }
        var template = "<div class='li li-point'>"
        + "<p class='title text-left'>Sử dụng điểm</p>"
        + "<p class='text-right use-point'>"
        + "<span>"
        + money_point
        + " đ</span>"
        + "</p>"
        + "</div>";
        $(".list-info-price").append(template);
        $(".price-total span").text(convertNumberToCurrency(convertCurrencyToNumber(price_total) - convertCurrencyToNumber(money_point)) + " đ");
    } else {
        var money_point = $(".use-point span").text().split(" ")[0];
        var price_total = $(".price-total span").text().split(" ")[0];
        $(".price-total span").text(convertNumberToCurrency(convertCurrencyToNumber(price_total) + convertCurrencyToNumber(money_point)) + " đ");
        $(".li-point").remove();
    }
});

$(document).on('click', '.btn-order', function(event) {
    var provisonal = convertCurrencyToNumber($(".provisonal span").text().split(" ")[0]);
    var fee_ship = convertCurrencyToNumber($(".fee-ship").text().split(" ")[0]);
    var total_price = convertNumberToCurrency(provisonal + fee_ship);
    var total_price_number = convertCurrencyToNumber(total_price);
    var customer_id = atob($("#header-payment").data('id'));
    var contact = $(".information .fullname").text() + " <br/> " + $(".information .address").text() + "<br/>" + $(".information .phone").text();
    var point = convertCurrencyToNumber($(".use-point span").text().split(" ")[0]);
    $.ajax({
        url: 'ajaxAddOrder',
        type: 'POST',
        dataType: 'json',
        data: {
            time: getDate() + " " + getTime(),
            total_price : convertCurrencyToNumber($(".price-total span").text().split(" ")[0]),
            customer_id : customer_id,
            statement: "Successful",
            contact : contact,
            note: $(".note").val(),
            ship_fee : $(".fee-ship").text().split(' ')[0].replace(/\./g,',')
        },
        success: function(order_id){
            if (order_id) {
                if (Number(point) > 0) {
                    $.ajax({
                        async: false,
                        url: 'ajaxOrderAddMethods',
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            point: convertNumberToCurrency(point).replace(/\./g,','),
                            order_id : order_id,
                            cash : '0',
                            card: '0'
                        },
                        success: function(){
                            $.ajax({
                                async: false,
                                url: 'ajaxOrderMinusPoint',
                                type: 'POST',
                                dataType: 'json',
                                data: {
                                    point: point/1000,
                                    customer_id : customer_id
                                }
                            });
                        }
                    });
                }

                var products = $(".products .item").toArray();
                products.forEach((product, index) => {
                    var quantity = Number($(product).find('.title strong').text().split(" ")[0]);
                    var product_id = atob($(product).data('id'));
                    var name = $(product).find('.title a').text();
                    var price = Number($(product).data('price'));
                    var finish_price = Number($(product).data('finish-price'));
                    var code = $(product).data('code');
                    $.ajax({
                        async: false,
                        url: 'ajaxOrderAddProductSold',
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            code: code,
                            name: name
                        },
                        success: function(product_sold_id){
                            $.ajax({
                                async: false,
                                url: 'ajaxOrderAddOrderDetail',
                                type: 'POST',
                                dataType: 'json',
                                data: {
                                    quantity: quantity,
                                    product_sold_id: product_sold_id,
                                    order_id: order_id,
                                    price: price,
                                    finish_price: finish_price,
                                }
                            });
                        }
                    });
                    
                });

                // insert table order track
                $.ajax({
                    async: false,
                    url: 'ajaxInsertTrackOrder',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        expected_time: $(".alert-time strong").text(),
                        order_id : order_id
                    }
                });

                // remove all product in shopping cart
                $.ajax({
                    async: false,
                    url: 'ajaxDeleteCartByCustomerId',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        customer_id: customer_id
                    }
                });

                // insert table notification
                $.ajax({
                    async: false,
                    url: 'ajaxInsertNotification',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        name: $("#payment").data('name'),
                        status: "ordered order #O" + order_id,
                        price: total_price.replace(/\./g,','),
                        time : getDate() + " " + getTime()
                    },
                    success: function(){
                        window.location = "order?code=" + order_id; 
                    }
                });
            }
        }
    });
});

