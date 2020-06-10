// main menu fix top
$(document).scroll("body", function() {
    if ($(this).scrollTop() > 70) {
        $("#main-menu").css({ position: "fixed" });
    } else {
        $("#main-menu").css({ position: "relative" });
    }
});

$(document).on('click', 'body', function(e) {
    if ($(e.target).is('#inputFocus')) {
        if (!$('#inputFocus').hasClass('isFocus')) {
            $('#inputFocus').addClass('isFocus');
        }
    } else if ($(e.target).is('#clear')) {
        $('#inputFocus').focus();
        $('#inputFocus').val('');
    } else if ($(e.target).is('#inputFocusO')) {
        if (!$('#inputFocusO').hasClass('isFocus')) {
            $('#inputFocusO').addClass('isFocus');
        }
    } else if ($(e.target).is('#clearO')) {
        $('#inputFocusO').val('');
    } else {
        if ($('#inputFocus').hasClass('isFocus')) {
            $('#inputFocus').removeClass('isFocus');
        }
        if ($('#inputFocusO').hasClass('isFocus')) {
            $('#inputFocusO').removeClass('isFocus');
        }
    }
});

$(document).on('click', '.no-bt, .close-yes-no', function() {
    $('.frame-check-delete').css('display', 'none');
    $('.yes-no').css({ 'transform': 'scale(0)', 'opacity': '0' });
    $('.yes-noC').css({ 'transform': 'scale(0)', 'opacity': '0' });
});

$(document).on('keypress', '.input-phone, .codeP, .phone-number, .input-price, .valueE, .phonenumber, .edit-phone', function(event) {
    var key = window.event ? event.keyCode : event.which;
    if (event.keyCode === 8) {
        return true;
    } else if (key < 48 || key > 57) {
        return false;
    } else {
        return true;
    }
});

$(document).on('change', '.input-phone', function() {
    var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    var phone_number = $(this).val();
    if (phone_number != '') {
        if (vnf_regex.test(phone_number) == false) {
            $(this).next().removeAttr('hidden');
        } else {
            $(this).next().attr('hidden', 'true');
        }
    }
});

var add_success = function() {
    $('.add-alert').remove();
    var template = '<div class="add-alert">' + '<i class="fas fa-check icon-add-alert"></i>' + '<p>Add successful!!!</p>' + '</div>';
    $('body').append(template);
    setTimeout(function() {
        $('.add-alert').addClass('show');
        setTimeout(function() {
            $('.add-alert').removeClass('show');
        }, 1500)
    }, 500);

    setTimeout(function() {
        $('.add-alert').remove('');
    }, 2000);
};

var save_success = function() {
    $('.save-alert').remove();
    var template = '<div class="save-alert">' + '<i class="fas fa-save icon-save-alert"></i>' + '<p>Save successful!!!</p>' + '</div>';
    $('body').append(template);

    setTimeout(function() {
        $('.save-alert').addClass('show');
        setTimeout(function() {
            $('.save-alert').removeClass('show');
        }, 1500)
    }, 500);

    setTimeout(function() {
        $('.save-alert').remove('');
    }, 2000);
};

var delete_success = function() {
    $('.delete-alert').remove();
    var template = '<div class="delete-alert">' + '<i class="fas fa-trash-alt icon-delete-alert"></i>' + '<p>Delete successful!!!</p>' + '</div>';
    $('body').append(template);

    setTimeout(function() {
        $('.delete-alert').addClass('show');
        setTimeout(function() {
            $('.delete-alert').removeClass('show');
        }, 1500)
    }, 500);

    setTimeout(function() {
        $('.delete-alert').remove('');
    }, 2000);
};

function convertCurrencyToNumber(string) {
    return Number(string.replace(/,/g, ''));
}

function convertNumberToCurrency(number) {
    str = String(number);
    if (str.length <= 3)
        return str;
    strResult = "";
    for (var i = str.length; i >= 0; i--) {
        if (strResult.length > 0 && (str.length - i - 1) % 3 == 0)
            strResult = "," + strResult;
        strResult = str.substring(i, i + 1) + strResult;
    }
    return strResult;
}

function debounce(fn, delay) {
    var timer = null;
    return function() {
        var context = this,
            args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function() {
            fn.apply(context, args);
        }, delay);
    };
}

function getDateTime(status) {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    if (month.toString().length == 1) {
        month = '0' + month;
    }
    if (day.toString().length == 1) {
        day = '0' + day;
    }
    if (hour.toString().length == 1) {
        hour = '0' + hour;
    }
    if (minute.toString().length == 1) {
        minute = '0' + minute;
    }
    var dateTime = '';
    if (status == 'event') {
        var dateTime = month + '/' + day + '/' + year + ' ' + hour + ':' + minute;
    } else {
        var dateTime = day + '/' + month + '/' + year + ' ' + hour + ':' + minute;
    }
    return dateTime;
}
// information personal

$(document).on('click', '.information-personal', function(event) {
    $("#information").addClass('show');
    $('.frame-check-delete').css('display', 'block');
});

$(document).on('click', '.info-close', function(event) {
    $("#information").removeClass('show');
    $('.frame-check-delete').css('display', 'none');
});

$(document).on('click', '.change-password', function(event) {
    $(".tab-info").attr('hidden', 'true');
    $(".tab-change-password").removeAttr('hidden');

    $(this).addClass('current');
    $(this).prev('.information').removeClass('current');
});

$(document).on('click', '.information', function(event) {
    $(".tab-info").removeAttr('hidden');
    $(".tab-change-password").attr('hidden', 'true');

    $(this).addClass('current');
    $(this).next('.change-password').removeClass('current');
});

$(document).on('click', '.info-edit', function(event) {
    $(this).attr('hidden', 'true');
    $(this).next('.info-back').removeAttr('hidden');

    var username = $(".edit-username").val();
    var phone = $(".edit-phone").val();
    var address = $(".edit-address").val();
    var src = $(".avatar img").attr('src');

    $(".info-back").attr('data-username', username);
    $(".info-back").attr('data-phone', phone);
    $(".info-back").attr('data-address', address);
    $(".info-back").attr('data-src', src);

    $(".update-avatar").removeAttr('hidden');
    $(".edit-username").removeAttr('disabled');
    $(".edit-phone").removeAttr('disabled');
    $(".edit-address").removeAttr('disabled');

    $(".info-save").removeAttr('hidden');
});

$(document).on('change', '.avatar_cashier', function(event) {
    $(".avatar img").attr('src', URL.createObjectURL($(this)[0]['files'][0]));
});

$(document).on('click', '.info-back', function(event) {
    var username = $(this).data('username');
    var phone = $(this).data('phone');
    var address = $(this).data('address');
    var src = $(this).data('src');

    $(".avatar img").attr('src', src);
    $(".edit-username").val(username);
    $(".edit-phone").val(phone);
    $(".edit-address").val(address);

    $(".update-avatar").attr('hidden', 'true');
    $(".edit-username").attr('disabled', 'true');
    $(".edit-phone").attr('disabled', 'true');
    $(".edit-address").attr('disabled', 'true');

    $(".info-save").attr('hidden', 'true');
    $(this).attr('hidden', 'value');
    $(".info-edit").removeAttr('hidden');
});

$(document).on('click', '.info-save', function(e) {
    e.preventDefault();
    var src = $(".avatar img").attr('src');
    var username = $(".edit-username").val();
    var phone = $(".edit-phone").val();
    var address = $(".edit-address").val();

    if (username == '') {
        $(".edit-username").next('.notBlank').fadeIn();
        $(".edit-username").focus();
        return false;
    } else if (phone == '') {
        $('.edit-phone').next('.notBlank').children('label').text('Please fill out this field');
        $(".edit-phone").next('.notBlank').fadeIn();
        $(".edit-phone").focus();
        return false;
    }

    var formData = new FormData();
    formData.append('username', username);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('image', $('.avatar_cashier').prop('files')[0]);

    $.ajax({
        url: 'ajaxEditInfo',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,

        success: function(result) {
            if (result == 'duplicatedP') {
                $('.edit-phone').next('.notBlank').children('label').text('Phone already exists');
                $('.edit-phone').next('.notBlank').fadeIn();
                $('.edit-phone').focus();
                return false;
            } else {
                save_success();
                if ($('.avatar_cashier').prop('files')[0]) {
                    setTimeout(function() {
                        window.location.reload();
                    }, 2000);
                } else {
                    $(".info-save").attr('hidden', 'true');
                    $(this).attr('hidden', 'true');
                    $(".info-edit").removeAttr('hidden');
                    $(".info-back").attr('hidden', 'true');

                    $(".edit-username").attr('disabled', 'true');
                    $(".edit-phone").attr('disabled', 'true');
                    $(".edit-address").attr('disabled', 'true');
                    $(".update-avatar").attr('hidden', 'true');
                }
            }
        }
    });
});

$(document).on('click', '.password-save', function(e) {
    e.preventDefault();
    var current_password = $('#current-password').val();
    var new_password = $('#new-password').val();
    var comfirm_new_password = $('#confirm-new-password').val();

    if (current_password == '') {
        $('#current-password').next('.notBlank').children('label').text('Please fill out this field');
        $('#current-password').next('.notBlank').fadeIn();
        $('#current-password').focus();
        return false;
    } else if (new_password == '') {
        $('#new-password').next('.notBlank').fadeIn();
        $('#new-password').focus();
        return false;
    } else if (comfirm_new_password == '') {
        $('#confirm-new-password').next('.notBlank').children('label').text('Please fill out this field');
        $('#confirm-new-password').next('.notBlank').fadeIn();
        $('#confirm-new-password').focus();
        return false;
    }

    if (new_password != comfirm_new_password) {
        $('#confirm-new-password').next('.notBlank').children('label').text('Not the same with the new password');
        $('#confirm-new-password').next('.notBlank').fadeIn();
        $('#confirm-new-password').focus();
        return false;
    } else {
        $('#confirm-new-password').next('.notBlank').fadeOut();
    }

    $.ajax({
        url: 'ajaxChangePassword',
        type: 'POST',
        dataType: 'json',
        data: {
            current_password: current_password,
            new_password: new_password,
        },
        success: function(result) {
            if (result == 'false') {
                $('#current-password').next('.notBlank').children('label').text('Incorrect password');
                $('#current-password').next('.notBlank').fadeIn();
                $('#current-password').focus();
            } else {
                save_success();
                $('#current-password').val('');
                $('#new-password').val('');
                $('#confirm-new-password').val('');
                $("#information").removeClass('show');
                $('.frame-check-delete').css('display', 'none');
            }
        }
    });
});

$(document).on('keypress', '.edit-username, .edit-phone, #current-password, #new-password, #confirm-new-password', function() {
    $(this).next('.notBlank').fadeOut();
});

// end information personal