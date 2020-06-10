var cashier_id = $('.dropdown-item-info').data('id');

$(document).on('click', '.dropdown-item-info', function(event) {
    $("#information").addClass('show');
    var fullname = $(this).data('fullname');
    var avatar = $(this).data('avatar');
    var address = $(this).data('address');
    var phone = $(this).data('phone');

    $("#information").find('.avatar img').attr('src', avatar);
    $("#information").find('.edit-fullname').val(fullname);
    $("#information").find('.edit-phone').val(phone);
    $("#information").find('.edit-address').val(address);

    $(".background").addClass('show');
});

$(document).on('click', '.info-close', function(event) {
    $("#information").removeClass('show');
    $(".background").removeClass('show');
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

    var fullname = $(".edit-fullname").val();
    var phone = $(".edit-phone").val();
    var address = $(".edit-address").val();
    var src = $(".avatar img").attr('src');

    $(".info-back").data('phone', phone);
    $(".info-back").data('fullname', fullname);
    $(".info-back").data('address', address);
    $(".info-back").data('src', src);

    $(".update-avatar").removeAttr('hidden');
    $(".edit-fullname").removeAttr('disabled');
    $(".edit-phone").removeAttr('disabled');
    $(".edit-address").removeAttr('disabled');

    $(".info-save").removeAttr('hidden');
});

$(document).on('change', '.avatar_cashier', function(event) {
    $(".avatar img").attr('src', URL.createObjectURL($(this)[0]['files'][0]));
});

$(document).on('click', '.info-back', function(event) {
    var phone = $(this).data('phone');
    var address = $(this).data('address');
    var src = $(this).data('src');
    var fullname = $(this).data('fullname');

    $(".avatar img").attr('src', src);
    $(".edit-fullname").val(fullname);
    $(".edit-phone").val(phone);
    $(".edit-address").val(address);

    $(".update-avatar").attr('hidden','true');
    $(".edit-fullname").attr('disabled','true');
    $(".edit-phone").attr('disabled','true');
    $(".edit-address").attr('disabled','true');

    $(".info-save").attr('hidden','true');
    $(this).attr('hidden', 'value');
    $(".info-edit").removeAttr('hidden');
});

$(document).on('click', '.info-save', function(event) {
    var src = $(".avatar img").attr('src');
    var fullname = $(".edit-fullname").val();
    var phone = $(".edit-phone").val();
    var address = $(".edit-address").val();


    if (fullname == "") {
        $(".ckeck2").css('display', 'none');
        $(".check3").css('display', 'none');
        $(".check1").html("<i class='fas fa-exclamation-circle'></i> Please fill out this field!");
        $(".check1").css('display', 'block');
    } else if (phone == ""){
        $(".ckeck1").css('display', 'none');
        $(".check3").css('display', 'none');
        $(".check2").html("<i class='fas fa-exclamation-circle'></i> Please fill out this field!");
        $(".check2").css('display', 'block');
    } else if (address == ""){
        $(".ckeck1").css('display', 'none');
        $(".check2").css('display', 'none');
        $(".check3").html("<i class='fas fa-exclamation-circle'></i> Please fill out this field!");
        $(".check3").css('display', 'block');
    } else {
        var formData = new FormData();
        formData.append('username', fullname);
        formData.append('phone', phone);
        formData.append('address', address);
        formData.append('image', $('.avatar_cashier').prop('files')[0]);

        $(".info-save").attr('hidden','true');
        $(this).attr('hidden','true');
        $(".info-edit").removeAttr('hidden');
        $(".info-back").attr('hidden','true');

        $(".edit-fullname").attr('disabled', 'true');
        $(".edit-phone").attr('disabled', 'true');
        $(".edit-address").attr('disabled', 'true');
        $(".update-avatar").attr('hidden','true');

        $.ajax({
            url: './admin/ajaxEditInfo',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function(result){
                if (result == 'duplicatedP') {
                    $(".ckeck1").css('display', 'none');
                    $(".check3").css('display', 'none');
                    $(".check2").html("<i class='fas fa-exclamation-circle'></i> Phone number exists!");
                    $(".check2").css('display', 'block');
                } else {
                    notification("<i class='far fa-check-circle'></i> Update information successfully! ", "#4BB543");
                    $('.dropdown-item-info').data('fullname', fullname);
                    $('.dropdown-item-info').data('address', address);
                    $('.dropdown-item-info').data('phone', phone);
                    $('.dropdown-item-info').data('avatar', src);

                    $(".fullname_cashier").text(fullname);
                }
            }
        });
    }
});

$(document).on('keypress', '.edit-fullname', function(event) {
    $(".check1").css('display', 'none');
});

$(document).on('keypress', '.edit-phone', function(event) {
    $(".check2").css('display', 'none');
});

$(document).on('keypress', '.edit-address', function(event) {
    $(".check3").css('display', 'none');
});

$(document).on('click', '.password-save', function(event) {
    $(".error2").removeClass('show');
    $(".error3").removeClass('show');
    $(".error1").removeClass('show');
    var current_password = $("#current-password").val();
    var new_password = $("#new-password").val();
    var confirm_new_password = $("#confirm-new-password").val();

    if (current_password == "") {
        $(".error1").text('Please enter current password');
        $(".error2").removeClass('show');
        $(".error3").removeClass('show');
        $(".error1").addClass('show');
        $("#current-password").focus();
    } else if (new_password == "") {
        $(".error2").text('Please enter new password');
        $(".error1").removeClass('show');
        $(".error3").removeClass('show');
        $(".error2").addClass('show');
        $("#new-password").focus();
    } else if (confirm_new_password == "") {
        $(".error3").text('Please enter confirm new password');
        $(".error1").removeClass('show');
        $(".error2").removeClass('show');
        $(".error3").addClass('show');
        $("#confirm-new-password").focus();
    } else if (new_password == current_password){
        $(".error2").text('Please enter a new password that is different from the current password');
        $(".error1").removeClass('show');
        $(".error3").removeClass('show');
        $(".error2").addClass('show');
        $("#new-password").focus();
    } else if (new_password != confirm_new_password) {
        $(".error3").text('Confirm assword does not match');
        $(".error1").removeClass('show');
        $(".error2").removeClass('show');
        $(".error3").addClass('show');
        $("#confirm-new-password").focus();
    } else {
        $.ajax({
            url: 'cashier/ajaxChangePassword',
            type: 'POST',
            dataType: 'json',
            data: {
                cashier_id : cashier_id,
                current_password: current_password,
                new_password : new_password
            },
            success: function(result){
                if (result == 'false') {
                    $(".error1").text('Incorrect password');
                    $(".error2").removeClass('show');
                    $(".error3").removeClass('show');
                    $(".error1").addClass('show');
                    $("#current-password").focus();
                } else if (result == 1) {
                    notification("<i class='far fa-check-circle'></i> Change password successfully!", "#4BB543");
                    $("#current-password").val('');
                    $("#new-password").val('');
                    $("#confirm-new-password").val('');
                } else {
                    notification("<i class='fas fa-exclamation-circle'></i> Change password error! ", "#FF9494");
                    $("#current-password").val('');
                    $("#new-password").val('');
                    $("#confirm-new-password").val('');
                }
            }
        })
    }
});