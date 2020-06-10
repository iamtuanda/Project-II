$(document).ready(function() {
    $('#phonenumber').find('.phonenumber').focus();
});

$(document).on('click', '.sell, .admin', function(e) {
    e.preventDefault();
    var phonenumber = $(this).parentsUntil('.auto-form-wrapper').find('.phonenumber').val();
    var password = $(this).parentsUntil('.auto-form-wrapper').find('.password').val();
    var status = '';

    if (phonenumber == '') {
        $('#phonenumber').children('.notBlank').fadeIn();
        $('#phonenumber').find('.phonenumber').focus();
        return false;
    } else if (password == '') {
        $('#password').children('.notBlank').fadeIn();
        $('#password').find('.password').focus();
        return false;
    }

    if ($(e.target).is('.sell')) {
        status = 'cashier';
    } else if ($(e.target).is('.admin')) {
        status = 'admin/home';
    }

    $.ajax({
        url: 'login/ajaxLogIn',
        type: 'POST',
        dataType: 'json',
        data: {
            phonenumber: phonenumber,
            password: password,
        },
        success: function(result) {
            if (result == 'false') {
                $('.error').addClass('active');
            } else {
                window.location = status;
            }
        }
    });
});

$(document).on('keypress', '.phonenumber, .password', function() {
    $('#phonenumber').children('.notBlank').fadeOut();
    $('#password').children('.notBlank').fadeOut();
});