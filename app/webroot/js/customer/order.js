$(document).ready(function() {
    var sum = 0;
    
    var prices1 = $(".begin-price");
    for (var i = 0; i < prices1.length; i++) {
        $(prices1[i]).text(convertNumberToCurrency(Number($(prices1[i]).text().split(" ")[0])) + " đ");
    }

    var prices2 = $(".discount-price");
    for (var i = 0; i < prices2.length; i++) {
        $(prices2[i]).text(convertNumberToCurrency(Number($(prices2[i]).text().split(" ")[0])) + " đ");
    }
    
    var prices3 = $(".finish-price");
    for (var i = 0; i < prices3.length; i++) {
        sum += Number($(prices3[i]).text().split(" ")[0]);
        $(prices3[i]).text(convertNumberToCurrency(Number($(prices3[i]).text().split(" ")[0])) + " đ");
    }

    var ship_fee = convertCurrencyToNumber($(".fee-price").text().split(" ")[0]);

    $(".provisonal-price").text(convertNumberToCurrency(sum) + " đ");
    $(".total-price").text(convertNumberToCurrency(Number($(".total-price").text().split(" ")[0])) + " đ");
    $(".point-price").text($(".point-price").text().replace(/\,/g,'.'));

    var prices4 = $(".orders-total-price");
    for (var i = 0; i < prices4.length; i++) {
        sum += Number($(prices4[i]).text().split(" ")[0]);
        $(prices4[i]).text(convertNumberToCurrency(Number($(prices4[i]).text().split(" ")[0])) + " đ");
    }
});

$(document).on('click', '.cancel-order', function(event) {
    var order_id = $(".order-status span").text();
    var notify = "";
    if ($(".point-price").length > 0) {
        notify = "<strong>Bạn có chắc chắn muốn huỷ đơn hàng?</strong> </br> Lưu ý khi huỷ chỉ nhận lại nửa số điểm đã dùng!"
    } else {
        notify = "<strong>Bạn có chắc chắn muốn huỷ đơn hàng?</strong>";
    } 

    var template = "<div id='destroy-notify'></div>"
    + "<div class='notify-frame'>"
    + "<div class='notify-frame-header'>"
    + "<div class='notify-frame-title'>Huỷ <b> đơn hàng " + order_id + "</b></div>"
    + "<div class='notify-frame-close'>"
    + "<i class='fa fa-times bill-close-icon' aria-hidden='true'></i>"
    + "</div>"
    + "</div>"
    + "<div class='notify-frame-info'>"
    + "<div class='notify-frame-notify'>"
    + notify
    + "</div>"
    + "<div class='notify-frame-footer text-right'>"
    + "<button class='btn btn-danger btn-confirm'><i class='fas fa-check-square'></i>Agree</button> "
    + "<button class='btn btn-default btn-cancel'><i class='fas fa-ban'></i>Cancel</button>"
    + "</div>"
    + "</div>"
    + "</div>";

    $("body").append(template);
    setTimeout(function(){
        $(".destroy-notify").addClass('show');
        $(".notify-frame").addClass('show');
    }, 200);
});

$(document).on('click', '.notify-frame-close', function(event) {
    $("#destroy-notify").remove();
    $(".notify-frame").remove();
});

$(document).on('click', '.btn-cancel', function(event) {
    $("#destroy-notify").remove();
    $(".notify-frame").remove();
});

$(document).on('click', '.btn-confirm', function(event) {
    if ($(".point-price").length > 0) {
        var point = convertCurrencyToNumber($(".point-price").text().split(" ")[0])/2000;
    } else {
        var point = 0;
    }

    $.ajax({
        async: false,
        url: 'ajaxDeleteOrder',
        type: 'POST',
        dataType: 'json',
        data: {
            order_id: $(".order-status span").text()
        },
        success : function(result){
            if (result == 1) {
                if (point > 0) {
                    var customer_id = atob($("#header").data('id'));
                    $.ajax({
                        async: false,
                        url: 'ajaxAddPoint',
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            customer_id : customer_id,
                            point : point.toFixed(2)
                        }
                    });
                }

                $.ajax({
                    async: false,
                    url: 'ajaxInsertNotification',
                    type: 'POST',
                    data: {
                        name: $("#header-info-person").text(),
                        status: "cancelled order #O" + $(".order-status span").text(),
                        price: $(".total-price").text().split(" ")[0].replace(/\./g,','),
                        time : getDate() + " " + getTime()
                    },
                    success: function(){
                        $("body").append("<div class='notification bg-success text-light'> Huỷ đơn hàng thành công </div>");
                        setTimeout(function(){
                            $(".notification").addClass('show');

                            setTimeout(function(){
                                window.location = "order";
                            }, 500);
                        }, 200);
                        
                    }
                });
                

                
            }
        }
    })
    
});