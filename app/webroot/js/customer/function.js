function updateCart(){
    if (checkLogin()) {
        var customer_id = atob($("#header").data('id'));
        $.ajax({
            url: 'ajaxGetShoppingCart',
            type: 'POST',
            dataType: 'json',
            data : {
                customer_id : customer_id
            },
            success : function(products){
                $(".badge.badge-danger.badge-cart").text(products.length);
            }
        });
    } else {
        var productsStorage = window.localStorage.getItem('products') ? JSON.parse(window.localStorage.getItem('products')) : [];
        $(".badge.badge-danger.badge-cart").text(productsStorage.length);
    }
}

function convertNumberToCurrency(number){
    var number_before = number;
    number = Math.abs(number);

    str = String(number);
    if(str.length <= 3)
        return str;
    strResult = "";
    for (var i = str.length; i >= 0; i--) {
        if (strResult.length > 0 && (str.length - i - 1) % 3 == 0)
            strResult = "." + strResult;
        strResult = str.substring(i, i + 1) + strResult;
    }
    if( number_before < 0 ){
        return "-" + strResult
    } 
    return strResult;
}

function convertCurrencyToNumber(string){
    return Number(string.replace(/\./g,''));
}

function getIndexByID($id){
    var productsStorage = window.localStorage.getItem('products') ? JSON.parse(window.localStorage.getItem('products')) : [];
    window.localStorage.setItem('products', JSON.stringify(productsStorage));
    var result = {
        id : -1,
        quantity : -1,
        index: -1
    };
    productsStorage.forEach((product, index) => {
        if (product.id == $id) {
            product.index = index;
            result = product;
        }
    });
    return result;
}

function totalPrice(){
    var products = $(".cart-product").toArray();
    $(".quantity-total").text("( " + products.length + " )");
    $(".badge.badge-danger.badge-cart").text(products.length);
    var sum = 0;
    products.forEach((product, index) => {
        var price = convertCurrencyToNumber($(product).find('.price-product').text());
        var quantity = Number($(product).find('.quantity').text());
        sum += price * quantity;
    });

    $(".amount .tt").text(convertNumberToCurrency(sum));
}


function checkLogin(){
    var login = $("#header").data('login') == true ? true : false;
    return login;
}

function getDate() {
    var date = new Date();

    if (date.getMonth() + 1 < 10) {
        month = '0' + (date.getMonth() + 1);
    } else {
        month = date.getMonth() + 1;
    }

    if (date.getDate() < 10) {
        day = '0' + date.getDate();
    } else {
        day = date.getDate();
    }

    var year = date.getFullYear();
    return day + "/" + month + "/" + year;
}

function getTime() {
    var time = new Date();
    if (time.getHours() < 10) {
        hour = '0' + time.getHours();
    } else {
        hour = time.getHours();
    }

    if (time.getMinutes() < 10) {
        min = '0' + time.getMinutes();
    } else {
        min = time.getMinutes();
    }

    return hour + ":" + min;
}