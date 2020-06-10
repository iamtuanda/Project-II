var products = window.localStorage.getItem('products') ? JSON.parse(window.localStorage.getItem('products')) : [];
$(document).ready(function() {
    var products = window.localStorage.getItem('products') ? JSON.parse(window.localStorage.getItem('products')) : [];
    var product_price = $(".body .product-price");

    for (var i = 0; i < product_price.length; i++) {
        $(product_price[i]).text(convertNumberToCurrency(Number($(product_price[i]).text())));
    }

    updateCart();
    $("#datepicker").datepicker({
        format: "dd MM yyyy",
        autoclose: true,
        forceParse: false,
        Default: true,
        pickDate: true,
        todayHighlight: true,

    });
});

// Scroll button
$(window).scroll(function() {
    if ($(this).scrollTop() >= 50) {
        $('#myBtn').fadeIn(200);
    } else {
        $('#myBtn').fadeOut(200);
    }
});

$(document).on('click', '#myBtn', function(event) {
    $('body,html').animate({
        scrollTop : 0
    }, 500);
});

// Show password
function iconShowHide(){
    var x = document.getElementById("signinpassword");
    var y = document.getElementById("enable");
    var z = document.getElementById("disable");

    if(x.type === 'password'){
        x.type = "text";
        y.style.display = "block";
        z.style.display = "none";
    } else {
        x.type = 'password';
        y.style.display = "none";
        z.style.display = "block";
    }
}

function hidePass(){
    var a = document.getElementById("signuppassword");
    var b = document.getElementById("enablesu");
    var c = document.getElementById("disablesu");
    if (a.type === 'password') {
        a.type = "text";
        b.style.display = "block";
        c.style.display = "none";

    } else {
        a.type = 'password';
        b.style.display = "none";
        c.style.display = "block";

    }
}

$(document).on('click', '.btn-signin', function(event) {
    var username = $('.username-login').val();
    var password = $('.password-login').val();

    $.ajax({
        url: 'ajaxSignIn',
        type: 'POST',
        dataType: 'json',
        data: {
            user: username,
            pass: password
        },
        success: function(user) {
            if (user) {
                if (products.length > 0) {
                    var customer_id = user['tCustomer']['id'];
                    $.ajax({
                        async: false,
                        url: 'ajaxDeleteCartByCustomerId',
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            customer_id: customer_id
                        },
                        success : function(){
                            products.forEach((product, index) => {
                                $.ajax({
                                    async: false,
                                    url: 'ajaxAddToCart',
                                    type: 'POST',
                                    data: {
                                        customer_id : customer_id,
                                        quantity : product.quantity,
                                        product_id : product.id
                                    }
                                });
                            });

                            $("#navigation .badge.badge-danger.badge-cart").text(products.length);
                            window.localStorage.removeItem('products');
                        }
                    });
                }
                window.location = window.location.href;
            } else {
                swal({
                    title : "Login Failed ...",
                    title : "Username & Password is not fullfilled!",
                    icon : "error",
                });
            }
        }
    })
});

$(document).on('keypress', '.username-login', function() {
    $(".error").removeClass('show');
});
$(document).on('keypress', '.password-login', function() {
    $(".error").removeClass('show');
});
// end sign in

// sign up
$(document).on('click','.signup-btn',function(){
    $('.error-signup-name').removeClass('show');
    $('.error-signup-email').removeClass('show');
    $('.error-signup-pwd').removeClass('show');
    $('.error-signup-cpwd').removeClass('show');

    var userName = $('.signup-name').val();
    var e_mail   = $('.signup-email').val();
    var password = $('.signup-pwd').val();
    var cpassword = $('.signup-pwd-cf').val();
    var gender     = $('.signup-gender:checked').parent()[0].innerText.trim();
    var birthday = $('.signup-birthday').val();
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (userName == "") {
        $('.error-signup-email').removeClass('show');
        $('.error-signup-pwd').removeClass('show');
        $('.error-signup-cpwd').removeClass('show');
        $('.error-signup-name').addClass('show');
        $('.signup-name').focus();
    } else if (e_mail == "") {
        $('.error-signup-email').addClass('show');
        $('.error-signup-name').removeClass('show');
        $('.error-signup-pwd').removeClass('show');
        $('.error-signup-cpwd').removeClass('show');
        $('.signup-email').focus();
    } else if (!filter.test(e_mail)) {
        $('.error-signup-email')[0].innerText = "Please enter email in correct format!!!";
        $('.error-signup-name').removeClass('show');
        $('.error-signup-pwd').removeClass('show');
        $('.error-signup-cpwd').removeClass('show');
        $('.error-signup-email').addClass('show');
        $('.signup-email').focus();
    } else if (password == "") {
        $('.error-signup-pwd').addClass('show');
        $('.error-signup-name').removeClass('show');
        $('.error-signup-email').removeClass('show');
        $('.error-signup-cpwd').removeClass('show');
        $('.signup-pwd').focus();
    } else if (password.length < 6 || password.length > 20) {
        $('.error-signup-pwd').text('Please choose strong password bettwen 6 to 20 character!');
        $('.error-signup-pwd').addClass('show');
        $('.error-signup-name').removeClass('show');
        $('.error-signup-email').removeClass('show');
        $('.error-signup-cpwd').removeClass('show');
        $('.signup-pwd').focus();
    } else if (cpassword == "") {
        $('.error-signup-cpwd').addClass('show');
        $('.error-signup-name').removeClass('show');
        $('.error-signup-email').removeClass('show');
        $('.error-signup-pwd').removeClass('show');
        $('.error-signup-bd').removeClass('show');
        $('.signup-pwd-cf').focus();
    } else if (password != cpassword) {
        $('.error-signup-cpwd').text('Password does not matching!!! Please enter your password again.');
        $('.error-signup-cpwd').addClass('show');
        $('.error-signup-name').removeClass('show');
        $('.error-signup-email').removeClass('show');
        $('.error-signup-pwd').removeClass('show');
        $('.signup-pwd-cf').focus();
    } else {
        $.ajax({
            url: 'ajaxPostSignup',
            type: 'POST',
            dataType: 'json',
            data: {
                userName: userName,
                e_mail: e_mail,
                password: password,
                gender: gender,
                birthday: birthday 
            },

            success: function(result) {
                if (result == 1) {
                    swal({
                        title: "Successfull",
                        text: "Sign up successfull, please login with account",
                        icon: "success",
                    });
                    setTimeout("window.location = 'home'", 1000);
                } else {
                    swal({
                        title : "Please fill in the information again",
                        icon : "error",
                    });
                }
            }
        })
    }
    return false;
});

$(document).on('keypress', '.signup-name', function() {
    $(".error").removeClass('show');
});
$(document).on('keypress', '.signup-email', function() {
    $(".error").removeClass('show');
});
$(document).on('keypress', '.signup-pwd', function() {
    $(".error").removeClass('show');
});
$(document).on('keypress', '.signup-pwd-cf', function() {
    $(".error").removeClass('show');
});


$(document).on('click','.info-save',function(){
    var info_id = $('.info-id').val();
    var gender     = $('.info-gender:checked').parent()[0].innerText.trim();
    var phone = $('.info-phone').val();
    var birthday = $('.info-birthday').val();
    var fullname = $('.info-fullname').val();

    $.ajax({
        url: 'ajaxUpdateInfo',
        type: 'POST',
        dataType: 'json',
        data: {
            info_id : info_id,
            fullname : fullname,
            gender: gender,
            phone: phone,
            birthday: birthday
        },
        success: function(result){
            if (result == 1) {
                setTimeout("window.location = 'info'", 1000);
                swal({
                    title: "Successfull",
                    text: "Your information have been update",
                    icon: "success",
                });
            } else {
                swal({
                    title : "Please choose your information to update",
                    icon : "error",
                });

            }
        }
    });
});

//  Change password for information
$(document).on('click','.info-change-pwd',function(){

    $('.error-pwd').removeClass('show');
    $('.error-new-pwd').removeClass('show');
    $('.error-confirm-pwd').removeClass('show');

    var pass_id = $('.pass-id').val();
    var current_password = $("#current-password").val();
    var new_password = $("#new-password").val();
    var confirm_new_password = $("#confirm-new-password").val();

    if (current_password == "") {
        $(".error-new-pwd").removeClass('show');
        $(".error-confirm-pwd").removeClass('show');
        $(".error-pwd").addClass('show');
        $("#current-password").focus();
    } else if (new_password == "") {
        $(".error-pwd").removeClass('show');
        $(".error-confirm-pwd").removeClass('show');
        $(".error-new-pwd").addClass('show');
        $("#new-password").focus();
    } else if (confirm_new_password == "") {
        $(".error-pwd").removeClass('show');
        $(".error-new-pwd").removeClass('show');
        $(".error-confirm-pwd").addClass('show');
        $("#confirm-new-password").focus();
    } else if (new_password == current_password){
        $(".error-new-pwd").text('Please enter a new password that is different from the current password');
        $(".error-pwd").removeClass('show');
        $(".error-confirm-pwd").removeClass('show');
        $(".error-new-pwd").addClass('show');
        $("#new-password").focus();
    } else if (new_password != confirm_new_password) {
        $(".error-confirm-pwd").text('Confirm password does not match');
        $(".error-pwd").removeClass('show');
        $(".error-new-pwd").removeClass('show');
        $(".error-confirm-pwd").addClass('show');
        $("#confirm-new-password").focus();
    } else {
        $.ajax({
            url: 'ajaxChangePassword',
            type: 'POST',
            dataType: 'json',
            data: {
                pass_id : pass_id,
                current_password: current_password,
                new_password : new_password,
                confirm_new_password : confirm_new_password
            },
            success: function(result){
                if (result == false) {
                    $(".error-pwd").text('Incorrect Password');
                    $(".error-confirm-pwd").removeClass('show');
                    $(".error-pwd").addClass('show');
                    $("#current-password").focus();
                } else if (result == '1') {
                    swal({
                        title: "Successfull",
                        text: "Change password Successfully",
                        icon: "success",
                    });
                    $("#current-password").val('');
                    $("#new-password").val('');
                    $("#confirm-new-password").val('');
                } else {
                    swal({
                        title : "Change password error!!!",
                        icon : "error",
                    });
                    $("#current-password").val('');
                    $("#new-password").val('');
                    $("#confirm-new-password").val('');
                }
            }
        })
    }
});

$(document).on('keypress', '#current-password', function() {
    $(".errorpwd").removeClass('show');
});
$(document).on('keypress', '#new-password', function() {
    $(".errorpwd").removeClass('show');
});
$(document).on('keypress', '#confirm-new-password', function() {
    $(".errorpwd").removeClass('show');
});














