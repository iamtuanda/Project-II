var page_index = '1';
$(document).ready(function() {
    $('#main-menu').find('li').removeClass('active');
    $($('#main-menu').find('li')[5]).addClass('active');

    $($('.modal-add-type-category').find('.category-item')[0]).addClass('active');
    $($('.modal-add-type-category').find('.sub-menu')[0]).addClass('show');
    $($('.modal-add-products').find('.categories-list-item')[0]).addClass('active');
    for (var i = 0; i < $('.modal-add-products').find('.products-list').length; i++) {
        $($($('.modal-add-products').find('.products-list')[i]).find('.nav-link')[0]).addClass('active');
        $($($('.modal-add-products').find('.products-list')[i]).find('.tab-pane')[0]).removeClass('fade');
        $($($('.modal-add-products').find('.products-list')[i]).find('.tab-pane')[0]).addClass('active');
    }
    $($('.modal-add-products').find('.products-list')[0]).addClass('active');
});

$(document).on('click', '.add-new-event', function(event) {
    $('#addEvent').modal('show');

    if (CKEDITOR.instances['editor1']) {
        CKEDITOR.instances['editor1'].destroy(true);
    }
    CKEDITOR.replace('editor1');
    $('.modal-add-products').find('.check-product').prop('checked', false);
    $('.modal-add-products').find('.check-all-products').prop('checked', false);
    $('#addEvent').attr('style', ' overflow: auto !important');
});

$(document).on('change', '.categoryE', function() {
    if ($(this).val() === "Offer a discount") {
        $(this).next('input').next('.unit').text('%');
        $('#addEvent').find('.add-product').removeClass('active');

        $('#addEvent').find('.valueE').css({ 'width': '10%' });
    } else {
        $(this).next('input').next('.unit').text('$');
        $('#addEvent').find('.add-product').addClass('active');
        $('#addEvent').find('.valueE').css({ 'width': '15%' });
    }
    $('#addEvent').find('.valueE').focus();
    $('#addEvent').find('.valueE').val('');
});

$(document).on('click', '.update', function(event) {
    $('#editEvent').modal('show');

    if (CKEDITOR.instances['editor2']) {
        CKEDITOR.instances['editor2'].destroy(true);
    }
    CKEDITOR.replace('editor2');

    $('.modal-add-products').find('.check-product').prop('checked', false);
    $('.modal-add-products').find('.check-all-products').prop('checked', false);

    var products_chosen = $(this).parent('.manipulation').prev('div').find('.product');
    var products = $('.modal-add-products').find('.one-product');
    var idP = [];

    for (var i = 0; i < products_chosen.length; i++) {
        var codeP = $(products_chosen[i]).children('.commodity-code').text();
        idP.push(codeP);
        for (var j = 0; j < products.length; j++) {
            if (codeP == $(products[j]).find('.commodity-code').text()) {
                $(products[j]).find('.check-product').prop('checked', true);
                break;
            }
        }
    }

    $('.quantity-product').text(products_chosen.length);
    $('.list-ids').text(idP);

    if ($(this).parentsUntil('.detail-info').find('.status').text() == "Apply") {
        $("#editEvent .status input[name=status][value='Apply']").prop("checked", true);
    } else {
        $("#editEvent .status input[name=status][value='Not apply']").prop("checked", true);
    }

    if ($(this).parentsUntil('.detail-info').find('.event-category').children('strong').text() == "Free ship") {
        $('#editEvent').find('.add-product').addClass('active');
        $("#editEvent .unit").text('km');
    } else {
        $('#editEvent').find('.add-product').removeClass('active');
        $("#editEvent .unit").text('%');
    }

    $('#editEvent .event_id').text($(this).parentsUntil('.detail-info').find('.event-key').children('strong:first').text());
    $('#editEvent .img-event').attr('src', $(this).parentsUntil('.detail-info').find('.main-image').children('img').attr('src'));
    $('#editEvent .titleE').val($(this).parentsUntil('.detail-info').find('.event-title').children('strong').text());
    $('#editEvent .start-date').val($(this).parentsUntil('.detail-info').find('.event-startD').children('strong').text());
    $('#editEvent .due-date').val($(this).parentsUntil('.detail-info').find('.event-dueD').children('strong').text());
    $('#editEvent .categoryE').val($(this).parentsUntil('.detail-info').find('.event-category').children('strong').text());
    $('#editEvent .categoryE').attr('disabled', 'disabled');
    $('#editEvent .valueE').val(parseInt($(this).parentsUntil('.detail-info').find('.event-category').children('.value').text().replace(/[^0-9]/gi, ''), 10));
    $('#editEvent #editor2').val($(this).parentsUntil('.detail-info').find('.event-content').children('.content').val());
    $('#editEvent').attr('style', ' overflow: auto !important');
});

$(document).on('click', '.closeE, .button-closeE', function() {
    $('#editor2')[0].value = '';

    if (CKEDITOR.instances['editor1']) {
        CKEDITOR.instances['editor1'].destroy(true);
    }
    if (CKEDITOR.instances['editor2']) {
        CKEDITOR.instances['editor2'].destroy(true);
    }
    $('.notBlank').fadeOut();
});

$(document).on('click', '.view-modeE .dropdown-item', function(e) {
    $(this).parent('.dropdown-menu').prev('.dropdown-toggle').children('.form-control').val($(this).text());
    if (!$(this).hasClass('active')) {
        $(this).parent('.dropdown-menu-right').children('.dropdown-item').removeClass('active');
        $(this).addClass('active');
    }
    var view_mode = $(this).text().replace(/\s\s+/g, ' ').trim();

    $.ajax({
        url: 'ajaxEventViewMode',
        type: 'POST',
        dataType: 'json',
        data: { view_mode: view_mode },
        success: function(result) {
            page_index = '1';
            if (view_mode != 'All events') {
                $('.pagination').html('');
                loadEvents(result);
            } else {
                loadEvents(result[0]);

                var page_number = Number(result[1]);
                var template = '';
                if (page_number > 0) {
                    template += '<div class="page">' + '<ul class="list-page">';
                    if (page_number > 1) {
                        template += '<li class="page-item prev-page-item hide"><a class="prev-page">prev</a></li>';
                        for (var i = 0; i < page_number; i++) {
                            if (i == 0) {
                                template += '<li class="page-item page_link active"><a>1</a></li>';
                            } else {
                                template += '<li class="page-item page_link"><a>' + (i + 1) + '</a></li>';
                            }
                        }
                        template += '<li class="page-item next-page-item"><a class="next-page">next</a></li>';
                    }
                    template += '</ul>' + '</div>';
                }
                $('.pagination').html(template);
            }
        }
    });

});

$(document).on('click', '.category .delete-img', function() {
    if ($(this).parent('.product').parent('.products-list').children('.product').length == 1) {
        $(this).parent('.product').parent('.products-list').parent('.category').remove();
    }

    $(this).parent('.product').remove();
});

$(document).on('click', ".category .delete-category", function() {
    $(this).parent('.category').remove();
});

$(document).on('click', '.form-check-inputE', function(e) {
    e.stopPropagation();
    if ($(e.target).is('.form-check-inputE:first')) {
        $('.form-check-inputE').prop('checked', $(this).is(":checked"));
    } else if ($('.form-check-inputE:first').prop('checked')) {
        if ($('.form-check-inputE:checked').length == 1) {
            $('.form-check-inputE:first').prop('checked', false);
        }
    }

    if ($('.form-check-inputE:checked').length > 0) {
        $('.delete-allE').fadeIn('slow');
        $('.checked-messageE').fadeIn('slow');
        var count_checked = $('.form-check-inputE:checked').length;
        var msg = '';
        if ($('.form-check-inputE:first').prop('checked')) {
            count_checked--;
        }
        if (count_checked == 1) {
            txt = 'is <b>1</b> selected event';
        } else {
            txt = 'are <b>' + count_checked + '</b> selected events';
        }

        $('.quantityE').html(txt);
    } else {
        $('.delete-allE').fadeOut('slow');
        $('.checked-messageE').fadeOut('slow');
    }
});

$(document).on('click', '.unchecked-allE', function() {
    $('.form-check-inputE').prop('checked', false);
    $('.delete-allE').fadeOut('slow');
    $('.checked-messageE').fadeOut('slow');
});

$(document).on('click', '.deleteE, .delete-allE', function(e) {
    var idE = [];
    if ($(e.target).is('.delete-allE')) {
        if ($('.form-check-inputE:first').prop('checked')) {
            $('.code_E').text('all Events you have chosen');
        } else if ($('.form-check-inputE:checked').length > 0) {
            $('.code_E').text('' + $('.form-check-inputE:checked').length + ' Event you have chosen');
        }

        for (var i = 0; i < $('.check-boxE .form-check-inputE:checked').length; i++) {
            idE.push($($('.check-boxE .form-check-inputE:checked')[i]).parent('.check-boxE').parent('.sh-infoE').next('.event-detail').find('.event-key').children('strong:first').text());
        }
    } else {
        $('.code_E').text($(this).parentsUntil('.detail-info').find('.event-key').children('strong:first').text());
        idE.push($(this).parentsUntil('.detail-info').find('.event-key').children('strong:first').text());
    }

    $('.ids_list').text(idE);

    $('.frame-check-delete').css('display', 'block');
    $('.yes-no').css({ 'transform': 'scale(1)', 'opacity': '1' });
});

$(document).on('click', '.sh-infoE', function() {
    $(this).toggleClass('active');
    $(this).next('.event-detail').fadeToggle('slow');
});

$(document).on('click', '.category-type', function() {
    $(this).toggleClass('active');
    $(this).children('.icon').toggleClass('open');
    $(this).next('.products-list').fadeToggle("slow");
    $(this).next('.products-list').css('display', 'flex');
});

$(document).on('change', '#addEvent .input-edit, #editEvent .input-edit', function() {
    $(this).parent('.edit-image').prev('.img-event').attr('src', URL.createObjectURL($(this)[0]['files'][0]));
    $(this).parent('.edit-image').next('.notBlank').fadeOut();
});

$(document).on('click', '.addP', function() {
    $('.frame-add-product').css('display', 'block');
    $('.modal-add-products').css({ 'transform': 'scale(1)', 'opacity': '1', 'visibility': 'visible' });
    $('.modal-add-products .add-products').addClass('show');

    setTimeout(function() {
        $('.modal-add-products').css({ 'overflow': 'auto' });
    }, 800);
});

$(document).on('click', '.button-close-addP', function() {
    $('.modal-add-products').css({ 'overflow': 'hidden' });
    $('.modal-add-products .add-products').removeClass('show');
    $('.frame-add-product').css('display', 'none');
    $('.modal-add-products').css({ 'transform': 'scale(0)', 'opacity': '0', 'visibility': 'hidden' });
});

$(document).on('click', '.one-product .product', function() {
    if ($(this).children('input').prop('checked')) {
        $(this).children('input').prop('checked', false);
    } else {
        $(this).children('input').prop('checked', true);
    }

    if ($(this).parentsUntil('.tab-pane').find('.check-product:checked').length == 0) {
        if ($(this).parentsUntil('.tab-pane').find('.check-all-products:checked')) {
            $(this).parentsUntil('.tab-pane').find('.check-all-products').prop('checked', false);
        }
    }
});

$(document).on('click', '.check-all-products', function() {
    $(this).parentsUntil('.tab-pane').find('.check-product').prop('checked', $(this).is(":checked"));
});

$(document).on('click', '.categories-list-item', function() {
    $(this).parent('.categories-list').children('.categories-list-item').removeClass('active');
    $(this).addClass('active');
    $('.modal-add-products').find('.products-list').removeClass('active');
    $($('.modal-add-products').find('.products-list')[$(this).index()]).addClass('active');
});

$(document).on('click', '.button-addP', function() {
    var idP = [];
    if ($('.modal-add-products').find('.check-product:checked').length > 0) {
        $('#addEvent').find('.add-product').children('.notBlank').fadeOut();
        $('#editEvent').find('.add-product').children('.notBlank').fadeOut();
    }
    for (var i = 0; i < $('.modal-add-products').find('.check-product:checked').length; i++) {
        idP.push($($('.modal-add-products').find('.check-product:checked')[i]).prev('.product-name').prev('.commodity-code').text());
    }

    $('.quantity-product').text($('.modal-add-products').find('.check-product:checked').length);
    $('.list-ids').text(idP);

    $('.modal-add-products').css({ 'overflow': 'hidden' });
    $('.modal-add-products .add-products').removeClass('show');
    $('.frame-add-product').css('display', 'none');
    $('.modal-add-products').css({ 'transform': 'scale(0)', 'opacity': '0', 'visibility': 'hidden' });
});

$(document).on('keyup', '.valueE', function() {
    $(this).val(convertNumberToCurrency(convertCurrencyToNumber($(this).val())));
    if ($(this).val() == 'NaN') {
        $(this).val('0');
    }

    if ($(this).next('i').text() == '%') {
        $(this).val(convertCurrencyToNumber($(this).val()));
        if (Number($(this).val()) >= 100) {
            $(this).val('100')
        }
    }
});

$(document).on('click', '.addEvent', function() {
    page_index = '1';
    var title = $('#addEvent').find('.titleE').val().replace(/\s\s+/g, ' ').trim();
    var date_start = $('#addEvent').find('.date_start').val();
    var date_due = $('#addEvent').find('.date_due').val();
    var status = $('#addEvent').find('input[name=status]:checked').val().replace(/\s\s+/g, ' ').trim();
    var category = $('#addEvent').find('#categoryE').val().replace(/\s\s+/g, ' ').trim();
    var valueE = convertCurrencyToNumber($('#addEvent').find('.valueE').val());
    var content = CKEDITOR.instances.editor1.getData().replace(/\s\s+/g, ' ').trim();
    var product_list = $('#addEvent').find('.list-ids').text();
    var codeP = [];
    var height = 0;

    if ($('#input-edit')[0].files.length === 0) {
        height = $('#addEvent').find('.new-event-image').offset().top;
        $('#addEvent .new-event-image').children('.notBlank').fadeIn();
    } else if (title == '') {
        height = $('#addEvent').find('.titleE').offset().top;
        $('#addEvent .titleE').next('.notBlank').fadeIn();
        $('#addEvent .titleE').focus();
    } else if (date_start == '') {
        $('#addEvent .date_start').parent('.form_datetime').next('.notBlank').children('.eBlank').text('Please fill out this field!');
        height = $('#addEvent').find('.date_start').offset().top;
        $('#addEvent .date_start').parent('.form_datetime').next('.notBlank').fadeIn();
        setTimeout(function() {
            $('#addEvent .date_start').parent('.form_datetime').next('.notBlank').fadeOut();
        }, 3000);
    } else if (date_due == '') {
        $('#addEvent .date_due').parent('.form_datetime').next('.notBlank').children('.eBlank').text('Please fill out this field!');
        height = $('#addEvent').find('.date_due').offset().top;
        $('#addEvent .date_due').parent('.form_datetime').next('.notBlank').fadeIn();
        setTimeout(function() {
            $('#addEvent .date_due').parent('.form_datetime').next('.notBlank').fadeOut();
        }, 3000);
    } else if (valueE == '') {
        height = $('#addEvent').find('.valueE').offset().top;
        $('#addEvent .valueE').next('i').next('.notBlank').fadeIn();
        $('#addEvent .valueE').focus();
    }

    if (Math.abs(height) > 0) {
        $("#addEvent").animate({ scrollTop: ($('#addEvent').height() - Math.abs(height)) }, 1000);
        return false;
    }

    var dStart = new Date(date_start);
    var dDue = new Date(date_due);

    if (dStart.getTime() > dDue.getTime()) {
        $('#addEvent .date_start').parent('.form_datetime').next('.notBlank').children('.eBlank').text('Start date can not more than due date!');
        height = $('#addEvent').find('.date_start').offset().top;
        $('#addEvent .date_start').parent('.form_datetime').next('.notBlank').fadeIn();
        setTimeout(function() {
            $('#addEvent .date_start').parent('.form_datetime').next('.notBlank').fadeOut();
        }, 4000);
    } else if (dStart.getTime() == dDue.getTime()) {
        $('#addEvent .date_start').parent('.form_datetime').next('.notBlank').children('.eBlank').text('Start date can not equal due date!');
        height = $('#addEvent').find('.date_start').offset().top;
        $('#addEvent .date_start').parent('.form_datetime').next('.notBlank').fadeIn();
        setTimeout(function() {
            $('#addEvent .date_start').parent('.form_datetime').next('.notBlank').fadeOut();
        }, 4000);
    }

    if (Math.abs(height) > 0) {
        $("#addEvent").animate({ scrollTop: ($('#addEvent').height() - Math.abs(height)) }, 1000);
        return false;
    }

    status = status.toLowerCase();
    status = status.substr(0, 1).toUpperCase() + status.substr(1);
    if (status == 'Apply') {
        var current_date = getDateTime('event');
        var currentD = new Date(current_date);
        if (dStart.getTime() < currentD.getTime()) {
            $('#addEvent .date_start').parent('.form_datetime').next('.notBlank').children('.eBlank').text('Start date can not less than current date!');
            height = $('#addEvent').find('.date_start').offset().top;
            $('#addEvent .date_start').parent('.form_datetime').next('.notBlank').fadeIn();
            setTimeout(function() {
                $('#addEvent .date_start').parent('.form_datetime').next('.notBlank').fadeOut();
            }, 4000);
        }
        if (Math.abs(height) > 0) {
            $("#addEvent").animate({ scrollTop: ($('#addEvent').height() - Math.abs(height)) }, 1000);
            return false;
        }
    }

    category = category.toLowerCase();
    category = category.substr(0, 1).toUpperCase() + category.substr(1);

    if (category == 'Offer a discount') {
        codeP = product_list.split(',');
        if ($('.modal-add-products').find('.check-product:checked').length == 0) {
            $('#addEvent').find('.add-product').children('.notBlank').fadeIn();
            return false;
        }
    }

    var check = false;

    if (status == 'Apply') {
        $.ajax({
            async: false,
            type: 'POST',
            dataType: 'json',
            data: {
                idE: '',
            },
            url: 'ajaxCheckStatus',
            success: function(result) {
                if (result == '1') {
                    check = true;
                    $('#addEvent .status').next('.notBlank').fadeIn();
                    setTimeout(function() {
                        $('#addEvent .status').next('.notBlank').fadeOut();
                    }, 5000);
                    height = $('#addEvent').find('.status').offset().top;
                }
            }
        });
    }

    if (check == false) {
        var formData = new FormData();
        formData.append('title', title);
        formData.append('date_start', date_start);
        formData.append('date_due', date_due);
        formData.append('category', category);
        formData.append('valueE', valueE);
        formData.append('status', status);
        formData.append('content', content);
        formData.append('codeP', codeP);
        formData.append('image', $('#input-edit')[0].files[0]);

        $.ajax({
            url: 'ajaxAddEvent',
            type: 'POST',
            dataType: 'json',
            data: formData,
            contentType: false,
            processData: false,
            success: function(result) {
                loadEvents(result[0]);
                page_index = '1';

                var page_number = Number(result[1]);
                var template = '';
                if (page_number > 0) {
                    template += '<div class="page">' + '<ul class="list-page">';
                    if (page_number > 1) {
                        template += '<li class="page-item prev-page-item hide"><a class="prev-page">prev</a></li>';
                        for (var i = 0; i < page_number; i++) {
                            if (i == 0) {
                                template += '<li class="page-item page_link active"><a>1</a></li>';
                            } else {
                                template += '<li class="page-item page_link"><a>' + (i + 1) + '</a></li>';
                            }
                        }
                        template += '<li class="page-item next-page-item"><a class="next-page">next</a></li>';
                    }
                    template += '</ul>' + '</div>';
                }
                $('.pagination').html(template);

                $('#addEvent').modal('hide');
                $('#addEvent').find('.titleE').val('');
                $('#addEvent').find('.date_start').val('');
                $('#addEvent').find('.date_due').val('');
                $('#addEvent').find('.valueE').val('0');
                $('.modal-add-products').find('.check-product').prop('checked', false);
                $('.modal-add-products').find('.check-all-products').prop('checked', false);
                $('.quantity-product').text('0');
                $('#addEvent .default-img-event').attr('src', '../img/admin/nami.jpg');
                $('#editor1').val('');
                $('#addEvent').find('.list-ids').text('');
                add_success();
            }
        });
    } else {
        $("#addEvent").animate({ scrollTop: ($('#addEvent').height() - Math.abs(height)) }, 1000);
        return false;
    }
});

$(document).on('click', '.editEvent', function() {
    var title = $('#editEvent').find('.titleE').val().replace(/\s\s+/g, ' ').trim();
    var date_start = $('#editEvent').find('.start-date').val();
    var date_due = $('#editEvent').find('.due-date').val();
    var status = $('#editEvent').find('input[name=status]:checked').val().replace(/\s\s+/g, ' ').trim();
    var category = $('#editEvent').find('#categoryE2').val().replace(/\s\s+/g, ' ').trim();
    var valueE = convertCurrencyToNumber($('#editEvent').find('.valueE').val());
    var content = CKEDITOR.instances.editor2.getData().replace(/\s\s+/g, ' ').trim();
    var product_list = $('#editEvent').find('.list-ids').text();
    var event_id = $('#editEvent').find('.event_id').text();
    var codeP = [];
    var height = 0;

    if (title == '') {
        height = $('#editEvent').find('.titleE').offset().top;
        $('#editEvent .titleE').next('.notBlank').fadeIn();
        $('#editEvent .titleE').focus();
    } else if (date_start == '') {
        $('#editEvent .start-date').parent('.form_datetime').next('.notBlank').children('.eBlank').text('Please fill out this field!');
        height = $('#editEvent').find('.start-date').offset().top;
        $('#editEvent .start-date').parent('.form_datetime').next('.notBlank').fadeIn();
        setTimeout(function() {
            $('#editEvent .start-date').parent('.form_datetime').next('.notBlank').fadeOut();
        }, 3000);
    } else if (date_due == '') {
        $('#editEvent .due-date').parent('.form_datetime').next('.notBlank').children('.eBlank').text('Please fill out this field!');
        height = $('#editEvent').find('.due-date').offset().top;
        $('#editEvent .due-date').parent('.form_datetime').next('.notBlank').fadeIn();
        setTimeout(function() {
            $('#editEvent .due-date').parent('.form_datetime').next('.notBlank').fadeOut();
        }, 3000);
    } else if (valueE == '') {
        height = $('#editEvent').find('.valueE').offset().top;
        $('#editEvent .valueE').next('i').next('.notBlank').fadeIn();
        $('#editEvent .valueE').focus();
    }

    if (Math.abs(height) > 0) {
        $("#editEvent").animate({ scrollTop: (Math.abs(height)) }, 1000);
        return false;
    }

    var dStart = new Date(date_start);
    var dDue = new Date(date_due);

    if (dStart.getTime() > dDue.getTime()) {
        $('#editEvent .start-date').parent('.form_datetime').next('.notBlank').children('.eBlank').text('Start date can not more than due date!');
        height = $('#editEvent').find('.start-date').offset().top;
        $('#editEvent .start-date').parent('.form_datetime').next('.notBlank').fadeIn();
        setTimeout(function() {
            $('#editEvent .start-date').parent('.form_datetime').next('.notBlank').fadeOut();
        }, 4000);
    } else if (dStart.getTime() == dDue.getTime()) {
        $('#editEvent .start-date').parent('.form_datetime').next('.notBlank').children('.eBlank').text('Start date can not equal due date!');
        height = $('#editEvent').find('.start-date').offset().top;
        $('#editEvent .start-date').parent('.form_datetime').next('.notBlank').fadeIn();
        setTimeout(function() {
            $('#editEvent .start-date').parent('.form_datetime').next('.notBlank').fadeOut();
        }, 4000);
    }

    if (Math.abs(height) > 0) {
        $("#editEvent").animate({ scrollTop: ($('#editEvent').height() - Math.abs(height)) }, 1000);
        return false;
    }

    status = status.toLowerCase();
    status = status.substr(0, 1).toUpperCase() + status.substr(1);
    if (status == 'Apply') {
        var current_date = getDateTime('event');
        var currentD = new Date(current_date);
        if (dStart.getTime() < currentD.getTime()) {
            $('#editEvent .start-date').parent('.form_datetime').next('.notBlank').children('.eBlank').text('Start date can not less than current date!');
            height = $('#editEvent').find('.start-date').offset().top;
            $('#editEvent .start-date').parent('.form_datetime').next('.notBlank').fadeIn();
            setTimeout(function() {
                $('#editEvent .start-date').parent('.form_datetime').next('.notBlank').fadeOut();
            }, 4000);
        }
        if (Math.abs(height) > 0) {
            $("#editEvent").animate({ scrollTop: (Math.abs(height)) }, 1000);
            return false;
        }
    }

    category = category.toLowerCase();
    category = category.substr(0, 1).toUpperCase() + category.substr(1);

    if (category == 'Offer a discount') {
        codeP = product_list.split(',');
        if ($('.modal-add-products').find('.check-product:checked').length == 0) {
            $('#editEvent').find('.add-product').children('.notBlank').fadeIn();
            return false;
        }
    }

    var check = false;
    var index = page_index;

    if (status == 'Apply') {
        $.ajax({
            async: false,
            type: 'POST',
            data: {
                idE: event_id,
            },
            url: 'ajaxCheckStatus',
            success: function(result) {
                if (result == '1') {
                    check = true;
                    $('#editEvent .status').next('.notBlank').fadeIn();
                    setTimeout(function() {
                        $('#editEvent .status').next('.notBlank').fadeOut();
                    }, 5000);
                    height = $('#editEvent').find('.status').offset().top;
                }
            }
        });
    }

    if (check == false) {
        var formData = new FormData();
        formData.append('id', event_id);
        formData.append('title', title);
        formData.append('date_start', date_start);
        formData.append('date_due', date_due);
        formData.append('category', category);
        formData.append('valueE', valueE);
        formData.append('status', status);
        formData.append('content', content);
        formData.append('codeP', codeP);
        formData.append('index', index);
        formData.append('image', $('#input-edit2')[0].files[0]);

        $.ajax({
            url: 'ajaxEditEvent',
            type: 'POST',
            dataType: 'json',
            data: formData,
            contentType: false,
            processData: false,
            success: function(result) {
                loadEvents(result);
                $('#editEvent').modal('hide');
                $('#editEvent').find('.titleE').val('');
                $('#editEvent').find('.start-date').val('');
                $('#editEvent').find('.due_date').val('');
                $('#editEvent').find('.valueE').val('0');
                $('.modal-add-products').find('.check-product').prop('checked', false);
                $('.modal-add-products').find('.check-all-products').prop('checked', false);
                $('.quantity-product').text('0');
                $('#editor2').val('');
                $('#editEvent').find('.list-ids').text('');
                save_success();
            }
        });
    } else {
        $("#editEvent").animate({ scrollTop: (Math.abs(height)) }, 1000);
        return false;
    }
});

$(document).on('click', '.nApply', function() {
    var idE = $(this).parentsUntil('.detail-info').find('.event-key').children('strong:first').text();
    var type = $(this).parentsUntil('.detail-info').find('.event-category').children('.type').text();
    var index = page_index;
    $.ajax({
        url: 'ajaxChangeStatus',
        type: 'POST',
        data: {
            idE: idE,
            status: 'Not apply',
            type: type,
            index: index,
        },
        success: function(result) {
            save_success();
            loadEvents(result);
        }
    });
});

$(document).on('click', '.apply', function() {
    var idE = $(this).parentsUntil('.detail-info').find('.event-key').children('strong:first').text();
    var type = $(this).parentsUntil('.detail-info').find('.event-category').children('.type').text();

    var date_start = $(this).parentsUntil('.detail-info').find('.event-startD').children('strong').text();
    var dStart = new Date(date_start);

    var current_date = getDateTime('event');
    var currentD = new Date(current_date);
    if (dStart.getTime() < currentD.getTime()) {
        var template = '<div class="errorStatus">' + '<p><i class="fas fa-exclamation-circle error"></i>Start date can not less than current date!</p>' + '</div>';
        change_error(template);
        return false;
    }

    var category = $(this).parentsUntil('.detail-info').find('.type').text();
    if (category == 'Offer a discount') {
        if ($(this).parentsUntil('.detail-info').find('.category').length = 0) {
            var template = '<div class="errorStatus">' + '<p><i class="fas fa-exclamation-circle error"></i>Please add product to apply!</p>' + '</div>';
            change_error(template);
            return false;
        }
    }

    var index = page_index;

    $.ajax({
        url: 'ajaxChangeStatus',
        type: 'POST',
        dataType: 'json',
        data: {
            idE: idE,
            status: 'Apply',
            type: type,
            index: index,
        },
        success: function(result) {
            if (result == 'false') {
                var template = '<div class="errorStatus">' + '<p><i class="fas fa-exclamation-circle error"></i>There is currently an event in progress so this event cannot be applied!</p>' + '</div>';
                change_error(template);
            } else {
                save_success();
                loadEvents(result);
            }
        }
    });
});

$(document).on('click', '.page_link', function() {
    var page_index_lastest = $('.page_link').last().children('a').text();
    page_index = $(this).children('a').text();

    if (page_index == 1) {
        $(this).prev('.page-item').addClass('hide');
        $('.page-item').last().removeClass('hide');
    } else if (page_index == page_index_lastest) {
        $(this).next('.page-item ').addClass('hide');
        $('.page-item').first().removeClass('hide');
    } else {
        $('.page-item').first().removeClass('hide');
        $('.page-item').last().removeClass('hide');
    }
    $('.page .page_link').removeClass('active');
    $(this).addClass('active');

    $.ajax({
        url: 'ajaxLoadEvents',
        type: 'POST',
        dataType: 'json',
        data: { page_index: page_index },
        success: function(result) {
            loadEvents(result);
        }
    });
});

$(document).on('click', '.prev-page-item, .next-page-item', function(e) {
    var current_element = $('.page').find('.active');
    var current_page = current_element.children('a').text();
    var page_index_lastest = $('.page_link').last().children('a').text();
    page_index = '1';

    $('.page .page_link').removeClass('active');

    if ($(e.target).is('.prev-page-item')) {
        current_element.prev('.page_link').addClass('active');
        page_index = current_element.prev('.page_link').children('a').text();
    } else {
        current_element.next('.page_link').addClass('active');
        page_index = current_element.next('.page_link').children('a').text();
    }

    if (page_index == 1) {
        $('.prev-page-item').addClass('hide');
        $('.page-item').last().removeClass('hide');
    } else if (page_index == page_index_lastest) {
        $('.next-page-item ').addClass('hide');
        $('.page-item').first().removeClass('hide');
    } else {
        $('.page-item').first().removeClass('hide');
        $('.page-item').last().removeClass('hide');
    }

    $.ajax({
        url: 'ajaxLoadEvents',
        type: 'POST',
        dataType: 'json',
        data: { page_index: page_index },
        success: function(result) {
            loadEvents(result);
        }
    });
});

$(document).on('click', '.yes-bt', function() {
    var id_list = $(this).parent('.footer').prev('.ids_list').text();
    var idE = id_list.split(',');

    $.ajax({
        url: 'ajaxDeleleEvents',
        type: 'POST',
        dataType: 'json',
        data: { idE: idE },
        success: function(result) {
            loadEvents(result[0]);

            var page_number = Number(result[1]);
            var template = '';
            if (page_number > 0) {
                template += '<div class="page">' + '<ul class="list-page">';
                if (page_number > 1) {
                    template += '<li class="page-item prev-page-item hide"><a class="prev-page">prev</a></li>';
                    for (var i = 0; i < page_number; i++) {
                        if (i == 0) {
                            template += '<li class="page-item page_link active"><a>1</a></li>';
                        } else {
                            template += '<li class="page-item page_link"><a>' + (i + 1) + '</a></li>';
                        }
                    }
                    template += '<li class="page-item next-page-item"><a class="next-page">next</a></li>';
                }
                template += '</ul>' + '</div>';
            }
            $('.pagination').html(template);
            page_index = '1';
            delete_success();

            $('.frame-check-delete').css('display', 'none');
            $('.yes-no').css({ 'transform': 'scale(0)', 'opacity': '0' });
        }
    });
});

$(document).on('keyup', '#inputFocus', debounce(function(event) {
    var key_word = $(this).val();
    $.ajax({
        url: 'ajaxSearchEvent',
        type: 'POST',
        dataType: 'json',
        data: { key_word: key_word },
        success: function(result) {
            page_index = '1';
            if (key_word != '') {
                $('.pagination').html('');
                loadEvents(result, 'search');
            } else {
                loadEvents(result[0]);

                var page_number = Number(result[1]);
                var template = '';
                if (page_number > 0) {
                    template += '<div class="page">' + '<ul class="list-page">';
                    if (page_number > 1) {
                        template += '<li class="page-item prev-page-item hide"><a class="prev-page">prev</a></li>';
                        for (var i = 0; i < page_number; i++) {
                            if (i == 0) {
                                template += '<li class="page-item page_link active"><a>1</a></li>';
                            } else {
                                template += '<li class="page-item page_link"><a>' + (i + 1) + '</a></li>';
                            }
                        }
                        template += '<li class="page-item next-page-item"><a class="next-page">next</a></li>';
                    }
                    template += '</ul>' + '</div>';
                }
                $('.pagination').html(template);
            }
        }
    });
}, 1000));

$(document).on('keypress', '.titleE, .valueE', function() {
    $('#addEvent').find('.notBlank').fadeOut();
    $('#editEvent').find('.notBlank').fadeOut();
});

function loadEvents(result, status) {
    var template = '';

    $('.form-check-inputE').prop('checked', false);
    $('.delete-allE').fadeOut('slow');
    $('.checked-messageE').fadeOut('slow');
    if (result == '') {
        if (status == 'search') {
            template += '<tr>' + '<td colspan="6"><p class="empty">Event does not exist!!!</p></td>' + '</tr>';
        } else {
            template += '<tr>' + '<td colspan="6"><p class="empty">Event is currently empty, please add event!!!</p></td>' + '</tr>';
        }
    } else {
        for (var i = 0; i < result.length; i++) {
            template += '<tr class="sh-infoE">' + '<td class="check-boxE"><input type="checkbox" class="form-check-inputE" value=""></td>' + '<td class="order">' +
                (i + (page_index - 1) * 10 + 1) + '</td>' + '<td>' + result[i]['tEventManagement']['title'] + '</td>' + '<td>' + result[i]['tEventManagement']['start_date'] + '</td>' +
                '<td>' + result[i]['tEventManagement']['due_date'] + '</td>' + '<td align="right">' + result[i]['tEventManagement']['status'] + '</td>' + '</tr>' + '<tr class="event-detail">' +
                '<td colspan="6">' + '<div class="title">' + '<h3>Event detail</h3>' + '</div>' + '<div class="detail-info">' + '<div class="row">' + '<div class="col-sm-12 col-lg-6">' +
                '<div class="main-image"><img src="../img/events/' + result[i]['tEventManagement']['image'] + '?>" alt=""></div>' + '</div>' + '<div class="col-sm-12 col-lg-6">' +
                '<div class="form-group form-control event-key">' + '<label for="" class="form-label control-label">Event code:</label>' + '<strong>' + result[i]['tEventManagement']['id'] +
                '</strong>' + '<strong class="status">' + result[i]['tEventManagement']['status'] + '</strong>' + '</div>' + '<div class="form-group form-control event-title">' + '<label for="" class="form-label control-label">Title:</label>' +
                '<strong>' + result[i]['tEventManagement']['title'] + '</strong>' + '</div>' + '<div class="form-group form-control event-startD">' + '<label for="" class="form-label control-label">Start date:</label>' +
                '<strong>' + result[i]['tEventManagement']['start_date'] + '</strong>' + '</div>' + '<div class="form-group form-control event-dueD">' + '<label for="" class="form-label control-label">Due date:</label>' +
                '<strong>' + result[i]['tEventManagement']['due_date'] + '</strong>' + '</div>' + '<div class="form-group form-control event-category">' + '<label for="" class="form-label control-label">Category:</label>' +
                '<strong class="type">' + result[i]['tEventManagement']['category'] + '</strong>' + '  <i class="value">' + result[i]['tEventManagement']['value_deal'] + ' </i>' + '<i class="unit">';
            if (result[i]['tEventManagement']['category'] == 'Free ship') {
                template += '$';
            } else {
                template += '%';
            }
            template += '</i>' + '</div>' + '<div class="form-group event-content">' + '<textarea class="content" rows="9" disabled>' + result[i]['tEventManagement']['content'] + '</textarea>' + '<label for="" class="control-label">Content:</label>' + '</div>' + '</div>';
            if (result[i]['Category'] != undefined) {
                template += '<div class="col-sm-12">' + '<h4 class="product-title">Products are applied</h4>' + '</div>' + '<div class="col-sm-12">' + '<div class="cate-list d-flex flex-column">';
                for (var j = 0; j < result[i]['Category'].length; j++) {
                    template += '<div class="category">' + '<div class="category-type">' + '<p class="category-name">' + result[i]['Category'][j]['name'] + '</p>' + '<i class="fas fa-caret-down icon"></i>' + '</div>' + '<div class="products-list">';
                    for (var k = 0; k < result[i]['Category'][j]['Products'].length; k++) {
                        template += '<div class="product">' + '<img src="../img/products/';
                        if (result[i]['Category'][j]['Products'][k]['image'] != '') {
                            template += result[i]['Category'][j]['Products'][k]['image'];
                        } else {
                            template += 'default-product-img.jpg';
                        }
                        template += '" alt="" class="product-img">' + '<p class="commodity-code">' + result[i]['Category'][j]['Products'][k]['code'] + '</p>' + '<p class="product-name">' + result[i]['Category'][j]['Products'][k]['name'] + '</p>' + '</div>';
                    }
                    template += '</div>' + '</div>';
                }
                template += '</div>' + '</div>';
            }

            template += '<div class="manipulation">' + '<a class="btn btn-default update"><i class="fas fa-pencil-alt icon-manipulation"></i>Update</a>';
            if (result[i]['tEventManagement']['status'] == 'Apply') {
                template += '<a class="btn btn-default nApply"><i class="fas fa-eye-slash icon-manipulation"></i>Not apply</a>';
            } else {
                template += '<a class="btn btn-default apply"><i class="fas fa-eye icon-manipulation"></i>Apply</a>';
            }
            template += '<a class="btn btn-default deleteE"><i class="fas fa-trash-alt icon-manipulation"></i>delete</a>' + '</div>' + '</div>' + '</div>' + '</td>' + '</tr>';
        }
    }

    $('.events-list tbody').html(template);
}

var change_error = function(template) {
    $('.errorStatus').remove();
    $('body').append(template);

    setTimeout(function() {
        $('.errorStatus').addClass('show');
        setTimeout(function() {
            $('.errorStatus').removeClass('show');
        }, 3000)
    }, 500);

    setTimeout(function() {
        $('.errorStatus').remove('');
    }, 4000);
};