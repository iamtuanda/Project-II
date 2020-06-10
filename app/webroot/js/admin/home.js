$(document).ready(function() {
    var price_format = $('.price');
    for (var i = 0; i < price_format.length; i++) {
        $(price_format[i]).text(convertNumberToCurrency(convertCurrencyToNumber($(price_format[i]).text())));
    }
});
$page_index = 1;

$(document).on('click', '.see-more', function() {
    $page_index += 1;
    $('#timeline-stream').append('<div class="image-loading"><img src="../img/admin/Bean Eater.gif" alt=""></div>');
    $.ajax({
        url: 'ajaxLoadMoreNotification',
        type: 'POST',
        dataType: 'json',
        data: { page_index: $page_index },
        success: function(result) {
            var template = '';

            if (result[0].length > 0) {
                for (var i = 0; i < result[0].length; i++) {
                    template += '<li class="timeline-stream-item">' + '<div class="timeline-stream-detail d-flex flex-row">' + '<span class="icon"><i class="fas fa-file-invoice-dollar icon-bill"></i></span>' +
                        '<span class="timeline-stream-detail-content d-flex flex-column">' + '<span class="activities">' + '<span class="us">' + result[0][i]['tNotification']['name'] + '</span> ' + '<span class="action">' +
                        result[0][i]['tNotification']['status'] + '</span> ' + '<span>with value</span> ' + '<span class="price">' + result[0][i]['tNotification']['price'] + '</span>$ ' + '</span>' + '<span class="datetime"><i>' +
                        result[0][i]['tNotification']['time'] + '</i></span> ' + '</span>' + '</div>' + '</li>';
                }

                setTimeout(function() {
                    $('#timeline-stream .image-loading').remove();
                    $('#timeline-stream').append(template);
                    if (result[1] == 'true') {
                        $('.see-more').addClass('hide');
                    }
                    var price_format = $('.price');
                    for (var i = 0; i < price_format.length; i++) {
                        $(price_format[i]).text(convertNumberToCurrency(convertCurrencyToNumber($(price_format[i]).text())));
                    }
                }, 1000);
            }
        }
    });

});

$(document).on('click', '.reload', function() {
    $('#timeline-stream').html('<div class="image-loading"><img src="../img/admin/Bean Eater.gif" alt=""></div>');
    $('.see-more').addClass('hide');
    $page_index = 1;
    $.ajax({
        url: 'ajaxLoadMoreNotification',
        type: 'POST',
        dataType: 'json',
        data: { page_index: $page_index },
        success: function(result) {
            var template = '';
            if (result[0].length > 0) {
                for (var i = 0; i < result[0].length; i++) {
                    template += '<li class="timeline-stream-item">' + '<div class="timeline-stream-detail d-flex flex-row">' + '<span class="icon"><i class="fas fa-file-invoice-dollar icon-bill"></i></span>' +
                        '<span class="timeline-stream-detail-content d-flex flex-column">' + '<span class="activities">' + '<span class="us">' + result[0][i]['tNotification']['name'] + '</span> ' + '<span class="action">' +
                        result[0][i]['tNotification']['status'] + '</span> ' + '<span>with value</span> ' + '<span class="price">' + result[0][i]['tNotification']['price'] + '</span>$ ' + '</span>' + '<span class="datetime"><i>' +
                        result[0][i]['tNotification']['time'] + '</i></span> ' + '</span>' + '</div>' + '</li>';
                }
                setTimeout(function() {
                    $('#timeline-stream').html(template);
                    if (result[1] == 'true') {
                        $('.see-more').addClass('hide');
                    } else {
                        $('.see-more').removeClass('hide');
                    }
                    var price_format = $('.price');
                    for (var i = 0; i < price_format.length; i++) {
                        $(price_format[i]).text(convertNumberToCurrency(convertCurrencyToNumber($(price_format[i]).text())));
                    }
                }, 1000);
            }
        },
    });
});