$(document).ready(function() {
    updateCart();
    $(".images ul li").first().addClass('active');
    $(".info-product-price span").text(convertNumberToCurrency(Number($(".info-product-price span").text())));
    $(".info-product-last-price span").text(convertNumberToCurrency(Number($(".info-product-last-price span").text())));
});

$(document).on('click', '.minus', function(event) {
    var value = Number($(this).next('input').val());
    if (value == 1) {
        return false;
    } else {
        $(this).next('input').val( value - 1 );
    }
});

$(document).on('click', '.plus', function(event) {
    var value = Number($(this).prev('input').val());
    if (value == 10) {
        return false;
    } else {
        $(this).prev('input').val( value + 1 );
    }
});

$(document).on('click', '.images ul li', function(event) {
    $(".images ul li").removeClass('active');
    $(this).addClass('active');

    var src = $(this).children('img').attr('src');

    $(".image-main img").attr('src', src);
});
