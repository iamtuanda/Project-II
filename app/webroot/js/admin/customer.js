$(document).ready(function() {
    $('#main-menu').find('li').removeClass('active');
    $($('#main-menu').find('li')[3]).addClass('active');
});

var page_index = '1';
$(document).on('click', 'body', function(e) {
    if ($(e.target).is('#inputFocusC')) {
        if (!$('#inputFocusC').hasClass('isFocus')) {
            $('.inner-searchC').css({ 'width': '300px', 'right': '0' });
            $('#inputFocusC').addClass('isFocus');
        }
    } else if ($(e.target).is('#clearC') == true || $(e.target).is('#clearC *')) {
        $('#inputFocusC').val('');
    } else {
        if ($('#inputFocusC').hasClass('isFocus')) {
            $('#inputFocusC').removeClass('isFocus');
            $('.inner-searchC').css({ 'width': '0', 'right': '70px' });
        }
    }
});

$(document).on('click', '.form-check-input', function(e) {
    if ($(e.target).is('.form-check-input:first')) {
        $('.form-check-input').prop('checked', $(this).is(":checked"));
    } else if ($('.form-check-input:first').prop('checked')) {
        if ($('.form-check-input:checked').length == 1) {
            $('.form-check-input:first').prop('checked', false);
        }
    }

    if ($('.form-check-input:checked').length > 0) {
        $('.delete-all').fadeIn('slow');
        $('.checked-message').fadeIn('slow');
        var count_checked = $('.form-check-input:checked').length;
        var msg = '';
        if ($('.form-check-input:first').prop('checked')) {
            count_checked--;
        }
        if (count_checked == 1) {
            txt = 'is <b>1</b> selected customer';
        } else {
            txt = 'are <b>' + count_checked + '</b> selected customers';
        }

        $('.quantity').html(txt);
    } else {
        $('.delete-all').fadeOut('slow');
        $('.checked-message').fadeOut('slow');
    }
});

$(document).on('click', '.unchecked-all', function() {
    $('.form-check-input').prop('checked', false);
    $('.delete-all').fadeOut('slow');
    $('.checked-message').fadeOut('slow');
});

$(document).on('click', '.deleteC, .delete-all', function(e) {
    var email_list = [];
    if ($(e.target).is('.delete-all')) {
        if ($('.form-check-input:first').prop('checked')) {
            $('.user_email').text('all Customer you have chosen');
        } else if ($('.form-check-input:checked').length > 0) {
            $('.user_email').text('' + $('.form-check-input:checked').length + ' Customer you have chosen');
        }
        for (var i = 0; i < $('.check-box .form-check-input:checked').length; i++) {
            email_list.push($($('.check-box .form-check-input:checked')[i]).parent('.check-box').next('td').next('td').next('td').next('td').text());
        }
    } else {
        email_list.push($(this).parent('td').prev('td').prev('td').prev('td').text());
        $('.user_email').text($(this).parent('td').prev('td').prev('td').prev('td').text());
    }

    $('.yes-no .email-list').text(email_list);
    $('.frame-check-delete').css('display', 'block');
    $('.yes-no').css({ 'transform': 'scale(1)', 'opacity': '1' });
});

$(document).on('click', '.yes-bt', function() {
    var email_list = [];
    var emails = '';
    page_index = '1';

    emails = $(this).parentsUntil('.check-delete').find('.email-list').text();
    email_list = emails.split(',');
    $.ajax({
        url: 'ajaxDeleteCustomer',
        type: 'POST',
        dataType: 'json',
        data: { email_list: email_list },
        success: function(result) {
            loadCustomers(result[0]);
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
            page_index = '1';
            $('.pagination').html(template);
            delete_success();
            $('.frame-check-delete').css('display', 'none');
            $('.yes-no').css({ 'transform': 'scale(0)', 'opacity': '0' });
        }
    });
});

$(document).on('keyup', '#inputFocusC', debounce(function(event) {
    key_word = $(this).val();
    $.ajax({
        url: 'ajaxSearchCustomer',
        type: 'POST',
        dataType: 'json',
        data: { key_word: key_word },
        success: function(result) {
            page_index = '1';
            if (key_word != '') {
                $('.pagination').html('');
                loadCustomers(result, 'search');
            } else {
                loadCustomers(result[0]);
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
}, 500));

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
        url: 'ajaxLoadCustomer',
        type: 'POST',
        dataType: 'json',
        data: { page_index: page_index },
        success: function(result) {
            loadCustomers(result);
        }
    });
});

$(document).on('click', '.prev-page-item, .next-page-item', function(e) {
    var current_element = $('.page').find('.active');
    var current_page = current_element.children('a').text();
    var page_index_lastest = $('.page_link').last().children('a').text();
    page_index = '';

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
        url: 'ajaxLoadCustomer',
        type: 'POST',
        dataType: 'json',
        data: { page_index: page_index },
        success: function(result) {
            loadCustomers(result);
        }
    });
});

function loadCustomers(result, status) {
    var template = '';

    $('.form-check-input').prop('checked', false);
    $('.delete-all').fadeOut('slow');
    $('.checked-message').fadeOut('slow');

    if (result == '') {
        if (status == 'search') {
            template = '<tr>' + '<td colspan="8"><p class="empty">Customer does not exist!!!</p></td>' + '</tr>';
        } else {
            template = '<tr>' + '<td colspan="8"><p class="empty">Customer is currently empty!!!</p></td>' + '</tr>';
        }
    } else {
        for (var i = 0; i < result.length; i++) {
            template += '<tr>' + '<td class="check-box"><input type="checkbox" class="form-check-input" value=""></td>' + '<td>' + (i + (page_index - 1) * 10 + 1) + '</td>';
            if (result[i]['tCustomerManagement']['avatar'] == '') {
                result[i]['tCustomerManagement']['avatar'] = 'zoro.jpg';
            }
            template += '<td class="customer-image"><img src="../img/customers/' + result[i]['tCustomerManagement']['avatar'] + '" alt=""></td>' + '<td>' +
                result[i]['tCustomerManagement']['username'] + '</td>' + '<td>' + result[i]['tCustomerManagement']['email'] + '</td>' + '<td>' +
                result[i]['tCustomerManagement']['phone'] + '</td>' + '<td>' + result[i]['tCustomerManagement']['point'] + '</td>' + '<td>' +
                '<button type="button" class="deleteC">' + '<i class="fas fa-trash-alt icon-deleteC"></i>' + '</button>' + '</td>' + '</tr>';
        }
    }
    $('#customers-list tbody').html(template);
}