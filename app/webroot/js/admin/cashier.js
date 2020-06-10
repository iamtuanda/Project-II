$(document).ready(function() {
    $('#main-menu').find('li').removeClass('active');
    $($('#main-menu').find('li')[2]).addClass('active');
    $.ajax({
        url: 'ajaxGetCashiers',
        dataType: 'json',
        success: function(result) {
            loadCashiers(result);
        }
    });
});

$(document).on('click', '.delete-cashier', function(e) {
    e.preventDefault();
    $('.phone_C').text($(this).parentsUntil('.cashier-info').find('.phone-number').val());
    $('.name_C').text($(this).parentsUntil('.cashier-info').find('.cashier-name').val());
    $('.frame-check-delete').css('display', 'block');
    $('.yes-no').css({ 'transform': 'scale(1)', 'opacity': '1' });
});

$(document).on('click', '.edit-cashier', function(e) {
    e.preventDefault();
    $(this).parentsUntil('.cashier-info').find('input,textarea').prop('disabled', false);
    $(this).parentsUntil('.cashier-info').find('input:text:visible:first').focus();
    $(this).parentsUntil('.cashier-info').find('.edit-image').css('display', 'block');
    $(this).parent('.edit-delete').css('display', 'none');
    $(this).parent('.edit-delete').next('.save').css({ 'display': 'block' });
    $(this).parentsUntil('.cashier-info').find('.reset-password').css({ 'display': 'block' });
});

$(document).on('click', '#add-cashier', function(e) {
    e.preventDefault();
    $('#addCashier').modal('show');

    if (CKEDITOR.instances['editor1']) {
        CKEDITOR.instances['editor1'].destroy(true);
    }
    CKEDITOR.replace('editor1');
    $('#addCashier').attr('style', ' overflow: auto !important');
});

$(document).on('change', '#addCashier .input-edit', function(e) {
    e.preventDefault();
    $(this).parent('.edit-image').prev('img').attr('src', URL.createObjectURL($(this)[0]['files'][0]));
});

$(document).on('click', '.close-addC, .button-close-addC', function(e) {
    e.preventDefault();
    if (CKEDITOR.instances['editor1']) {
        CKEDITOR.instances['editor1'].destroy(true);
    }

    $('#default-img-cashier').attr('src', '../img/admin/nami.jpg');
    $('.notBlank').fadeOut();
});

$(document).on('click', '.bt-cancel', function(e) {
    e.preventDefault();
    $(this).parentsUntil('.cashier-info').find('.img-cashier').attr('src', $(this).parentsUntil('.cashier-info').find('.img-cashier').data('src'));
    $(this).parentsUntil('.cashier-info').find('.cashier-name').val($(this).parentsUntil('.cashier-info').find('.cashier-name').data('name'));
    $(this).parentsUntil('.cashier-info').find('.phone-number').val($(this).parentsUntil('.cashier-info').find('.phone-number').data('phone'));
    $(this).parentsUntil('.cashier-info').find('.datetimepicker').val($(this).parentsUntil('.cashier-info').find('.datetimepicker').data('date'));
    $(this).parentsUntil('.cashier-info').find('.description').val($(this).parentsUntil('.cashier-info').find('.description').data('add'));

    $(this).parentsUntil('.cashier-info').find('input,textarea').prop('disabled', true);
    $(this).parentsUntil('.cashier-info').find('.edit-image').css('display', 'none');
    $(this).parent('.save').css('display', 'none');
    $(this).parent('.save').prev('.edit-delete').css('display', 'block');
    $(this).parentsUntil('.cashier-info').find('.notBlank').fadeOut();
    $(this).parentsUntil('.cashier-info').find('.reset-password').css({ 'display': 'none' });
    $('.notBlank').fadeOut();
});

$(document).on('keypress', '#cname, #pcashier', function() {
    $(this).next('.notBlank').fadeOut();
});

$(document).on('keypress', '.cashier-name, .phone-number', function() {
    $(this).next('label').next('i').next('.notBlank').fadeOut();
});

$(document).on('click', '.addCashier', function(e) {
    e.preventDefault();
    var cname = $('#addCashier').find('#cname').val().trim();
    var cphone = $('#addCashier').find('#pcashier').val();
    var startd = $('#addCashier').find('.date').children('.form-control').val();
    var description = CKEDITOR.instances.editor1.getData().replace(/\s\s+/g, ' ').trim();

    $('#addCashier').find('.notBlank').children('label').text('Please fill out this field');

    if (cname == '') {
        $('#addCashier #cname').next('.notBlank').fadeIn();
        $('#addCashier #cname').focus();
        return false;
    } else if (cphone == '') {
        $('#addCashier #pcashier').next('.notBlank').fadeIn();
        $('#addCashier #pcashier').focus();
        return false;
    } else if (startd == '') {
        $('#addCashier .date').next('.notBlank').fadeIn();
        setTimeout(function() {
            $('#addCashier .date').next('.notBlank').fadeOut();
        }, 1500);
        return false;
    }

    cname = cname.toLowerCase();
    cname = cname.substr(0, 1).toUpperCase() + cname.substr(1);

    var formData = new FormData();
    formData.append('cname', cname);
    formData.append('cphone', cphone);
    formData.append('startd', startd);
    formData.append('description', description);
    formData.append('image', $('#addCashier').find('.input-edit').prop('files')[0]);

    $.ajax({
        url: 'ajaxAddCashier',
        type: 'POST',
        dataType: 'json',
        data: formData,
        contentType: false,
        processData: false,

        success: function(result) {
            if (result == 'duplicatedC') {
                $('#addCashier').find('.notBlank').children('label').text('Phone already exists');
                $('#addCashier #pcashier').next('.notBlank').fadeIn();
                $('#addCashier #pcashier').focus();
                return false;
            }
            loadCashiers(result);
            $('#addCashier').modal('hide');
            add_success();
        }
    });
});

$(document).on('click', '.bt-save', function(e) {
    e.preventDefault();
    var cname = $(this).parentsUntil('.cashier-info').find('.cashier-name').val().trim();
    var cphone = $(this).parentsUntil('.cashier-info').find('.phone-number').val();
    var old_cphone = $(this).parentsUntil('.cashier-info').find('.phone-number').attr('data-phone');
    var startd = $(this).parentsUntil('.cashier-info').find('.datetimepicker').val();
    var description = $(this).parentsUntil('.cashier-info').find('.description').val().trim();

    var current = $(this).parentsUntil('.cashier-info').find('.phone-number');

    if (cname == '') {
        $(this).parentsUntil('.cashier-info').find('.cashier-name').next('label').next('i').next('.notBlank').fadeIn();
        $(this).parentsUntil('.cashier-info').find('.cashier-name').focus();
        return false;
    } else if (cphone == '') {
        $(this).parentsUntil('.cashier-info').find('.phone-number').next('label').next('i').next('.notBlank').children('label').text('Please fill out this field');
        $(this).parentsUntil('.cashier-info').find('.phone-number').next('label').next('i').next('.notBlank').fadeIn();
        $(this).parentsUntil('.cashier-info').find('.phone-number').focus();
        return false;
    } else if (startd == '') {
        $(this).parentsUntil('.cashier-info').find('.datetimepicker').next('label').next('i').next('.notBlank').fadeIn();
        setTimeout(function() {
            $(this).parentsUntil('.cashier-info').find('.datetimepicker').next('label').next('i').next('.notBlank').fadeOut();
        }, 1500);
        return false;
    }

    var formData = new FormData();
    formData.append('cname', cname);
    formData.append('cphone', cphone);
    formData.append('old_cphone', old_cphone);
    formData.append('startd', startd);
    formData.append('description', description);
    formData.append('image', $(this).parentsUntil('.cashier-info').find('#input-edit').prop('files')[0]);

    $.ajax({
        url: 'ajaxEditCashier',
        type: 'POST',
        dataType: 'json',
        data: formData,
        contentType: false,
        processData: false,

        success: function(result) {
            if (result == 'duplicatedC') {
                current.next('label').next('i').next('.notBlank').children('label').text('Phone already exists');
                current.next('label').next('i').next('.notBlank').fadeIn();
                current.focus();
                return false;
            }
            loadCashiers(result);
            save_success();
        }
    });
});

$(document).on('click', '.yes-bt', function(e) {
    e.preventDefault();
    var cphone = $(this).parentsUntil('.check-delete').find('.phone_C').text();

    $.ajax({
        url: 'ajaxDeleteCashier',
        type: 'POST',
        dataType: 'json',
        data: {
            cphone: cphone,
        },
        success: function(result) {
            loadCashiers(result);
            delete_success();
            $('.frame-check-delete').css('display', 'none');
            $('.yes-no').css({ 'transform': 'scale(0)', 'opacity': '0' });
        }
    })
});

$(document).on('keypress', '#inputFocus', debounce(function(e) {
    e.preventDefault();
    $.ajax({
        url: 'ajaxSearchCashier',
        type: 'POST',
        dataType: 'json',
        data: { key_word: $(this).val() },
        success: function(result) {
            loadCashiers(result);
        }
    });
}, 1000));

$(document).on('click', '.reset-password', function(e) {
    e.preventDefault();
    var phonenumber = $(this).parentsUntil('.cashier-info').find('.phone-number').attr('data-phone');

    $.ajax({
        url: 'ajaxResetPassword',
        type: 'post',
        dataType: 'json',
        data: { phonenumber: phonenumber },
        success: function(result) {
            if (result == 'true') {
                save_success();
            }
        }
    });

});

function loadCashiers(result) {
    var template = '';

    for (var i = 0; i < result.length; i++) {
        template += '<div class="col-sm-12 cashier-info">' + '<div class="row">' + '<div class="col-lg-3 col-sm-12 cashier-img">' + '<i class="fas fa-unlock-alt reset-password" title="Reset password"></i>' + '<div class="image-main">';
        if (result[i]['tCashierManagement']['avatar'] == '') {
            result[i]['tCashierManagement']['avatar'] = 'nami.jpg';
        }
        template += '<img src="../img/cashiers/' + result[i]['tCashierManagement']['avatar'] + '" alt="" class="img-cashier" data-src="../img/cashiers/' +
            result[i]['tCashierManagement']['avatar'] + '">' + '<div class="edit-image">' + '<input type="file" name="input-edit" id="input-edit" class="input-edit" accept="image/gif, image/jpeg, image/jpg, image/png" />' +
            '<label for="input-edit">' + '<span class="hover-edit">' + '<i class="fas fa-pencil-alt"></i>' + '</span>' + '</label>' + '</div>' + '</div>' + '</div>' +
            '<div class="col-lg-4 col-sm-5">' + '<form>' + '<div class="form-group">' + '<input type="text" value="' + result[i]['tCashierManagement']['fullname'] + '" class="cashier-name" data-name="' + result[i]['tCashierManagement']['fullname'] +
            '">' + '<label class="control-label">Cashier name</label>' + '<i class="bar"></i>' + '<div class="notBlank">' + '<i class="fas fa-exclamation-circle icon-warn"></i>' + '<label for="" class="eBlank">Please fill out this field</label>' + '</div>' + '</div>' + '<div class="form-group">' + '<input type="text" value="' + result[i]['tCashierManagement']['phone'] + '" class="phone-number" data-phone="' +
            result[i]['tCashierManagement']['phone'] + '" maxlength="10">' + '<label class="control-label">Cashier phone number</label>' + '<i class="bar"></i>' + '<div class="notBlank">' + '<i class="fas fa-exclamation-circle icon-warn"></i>' + '<label for="" class="eBlank">Please fill out this field</label>' + '</div>' +
            '</div>' + '<div class="form-group">' + '<input type="text" class="datetimepicker" value="' + result[i]['tCashierManagement']['start_working'] + '" data-date="' + result[i]['tCashierManagement']['start_working'] + '">' +
            '<label class="control-label">Start working</label>' + '<i class="bar"></i>' + '<div class="notBlank">' + '<i class="fas fa-exclamation-circle icon-warn"></i>' + '<label for="" class="eBlank">Please fill out this field</label>' + '</div>' + '</div>' + '</form>' + '</div>' + '<div class="col-lg-4 col-sm-5">' + '<form>' + '<div class="form-group">' + '<label class="control-label">Total money paid</label>' +
            '<p class="price_format">' + result[i]['total_pay'] + '</p>' + '<i class="bar"></i>' + '</div>' + '<div class="form-group">' + '<textarea class="description" rows="6" data-add="' + result[i]['tCashierManagement']['address'] + '">' + result[i]['tCashierManagement']['address'] + '</textarea>' +
            '<label class="control-label">Address</label>' + '</div>' + '</form>' + '</div>' + '<div class="col-lg-1 col-sm-2 btn-cashier">' + '<div class="edit-delete">' + '<div class="btn1 shadow edit-cashier"><i class="fas fa-pencil-alt icon-cashier"></i></div>' +
            '<div class="btn1 shadow delete-cashier"><i class="fas fa-times icon-cashier"></i></i></div>' + '</div>' + '<div class="save">' + '<button type="button" class="btn btn-primary bt-save"><i class="far fa-save icon-save"></i>Save</button>' +
            '<button type="button" class="btn btn-danger bt-cancel"><i class="fas fa-ban icon-save"></i>Cancel</button>' + '</div>' + '</div>' + '</div>' + '</div>';
    }
    $('#cashiers-list').find('.cashier-info').remove();
    $('#cashiers-list').append(template);
    $('.cashier-info .form-group input, .cashier-info textarea').prop('disabled', true);
    var price_format = $('.price_format');
    for (var i = 0; i < price_format.length; i++) {
        $(price_format[i]).text(convertNumberToCurrency($(price_format[i]).text()));
        $(price_format[i]).append(' $');
    }
    $('.datetimepicker, .input-group.date').datepicker({
        todayBtn: true,
        daysOfWeekHighlighted: "0,6",
        autoclose: true,
        todayHighlight: true
    });
}