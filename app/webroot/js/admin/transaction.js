var page_index = '1';
var page_index_bill = '1';
$(document).ready(function() {
    var price_format = $('.price_format');
    for (var i = 0; i < price_format.length; i++) {
        $(price_format[i]).text(convertNumberToCurrency($(price_format[i]).text()));
    }

    $('#main-menu').find('li').removeClass('active');
    $($('#main-menu').find('li')[4]).addClass('active');
});

$(document).on('click', '.sh-infoT', function() {
    $(this).toggleClass('active');
    $(this).next('.transaction-detail').fadeToggle('slow');
});

$(document).on('click', '.check-bill', function(e) {
    e.stopPropagation();
    if ($(e.target).is('.check-bill:first')) {
        $('.check-bill').prop('checked', $(this).is(":checked"));
    } else if ($('.check-bill:first').prop('checked')) {
        if ($('.check-bill:checked').length == 1) {
            $('.check-bill:first').prop('checked', false);
        }
    }

    if ($('.check-bill:checked').length > 0) {
        $('.delete-allB').fadeIn('slow');
        $('.checked-messageB').fadeIn('slow');
        var count_checked = $('.check-bill:checked').length;
        var msg = '';
        if ($('.check-bill:first').prop('checked')) {
            count_checked--;
        }
        if (count_checked == 1) {
            txt = 'is <b>1</b> selected product';
        } else {
            txt = 'are <b>' + count_checked + '</b> selected products';
        }

        $('.quantityT').html(txt);
    } else {
        $('.delete-allB').fadeOut('slow');
        $('.checked-messageB').fadeOut('slow');
    }
});


$(document).on('click', '.check-order', function(e) {
    e.stopPropagation();
    if ($(e.target).is('.check-order:first')) {
        $('.check-order').prop('checked', $(this).is(":checked"));
    } else if ($('.check-order:first').prop('checked')) {
        if ($('.check-order:checked').length == 1) {
            $('.check-order:first').prop('checked', false);
        }
    }

    if ($('.check-order:checked').length > 0) {
        $('.delete-allO').fadeIn('slow');
        $('.checked-messageO').fadeIn('slow');
        var count_checked = $('.check-order:checked').length;
        var msg = '';
        if ($('.check-order:first').prop('checked')) {
            count_checked--;
        }
        if (count_checked == 1) {
            txt = 'is <b>1</b> selected product';
        } else {
            txt = 'are <b>' + count_checked + '</b> selected products';
        }

        $('.quantityT').html(txt);
    } else {
        $('.delete-allO').fadeOut('slow');
        $('.checked-messageO').fadeOut('slow');
    }
});

$(document).on('click', '.unchecked-allB, .unchecked-allO', function(e) {
    if ($(e.target).is('.unchecked-allB')) {
        $('.check-bill').prop('checked', false);
        $('.delete-allB').fadeOut('slow');
        $('.checked-messageB').fadeOut('slow');
    } else {
        $('.check-order').prop('checked', false);
        $('.delete-allO').fadeOut('slow');
        $('.checked-messageO').fadeOut('slow');
    }
});

$(document).on('click', '.destroy, .delete-allT', function(e) {
    var transaction_id = '';
    var transaction_code = [];
    var transaction_type = '';
    if ($(e.target).is('.delete-allB')) {
        if ($('.check-bill:first').prop('checked')) {
            $('.code_T').text('all Transactions you have chosen');
        } else if ($('.check-bill:checked').length > 0) {
            $('.code_T').text('' + $('.check-bill:checked').length + ' Transactions you have chosen');
        }
        transaction_type = "B";
        for (var i = 0; i < $('.check-boxT .check-bill:checked').length; i++) {
            transaction_id = $($('.check-boxT .check-bill:checked')[i]).parent('.check-boxT').next('td').text();
            transaction_code.push(transaction_id.substr(1));
        }
    } else if ($(e.target).is('.delete-allO')) {
        if ($('.check-order:first').prop('checked')) {
            $('.code_T').text('all Transactions you have chosen');
        } else if ($('.check-order:checked').length > 0) {
            $('.code_T').text('' + $('.check-order:checked').length + ' Transactions you have chosen');
        }
        transaction_type = "T";
        for (var i = 0; i < $('.check-boxT .check-order:checked').length; i++) {
            transaction_id = $($('.check-boxT .check-order:checked')[i]).parent('.check-boxT').next('td').text();
            transaction_code.push(transaction_id.substr(1));
        }
    } else {
        transaction_id = $(this).parentsUntil('.detail-info').find('.tracsaction-key').children('strong:first').text();
        $('.code_T').text(transaction_id);
        transaction_code.push(transaction_id.substr(1));
        transaction_type = transaction_id.substr(0, 1);
    }

    $('.transaction_id').text(transaction_code);
    $('.transaction_type').text(transaction_type);
    $('.frame-check-delete').css('display', 'block');
    $('.yes-no').css({ 'transform': 'scale(1)', 'opacity': '1' });
});

$(document).on('keyup', '#inputFocus', debounce(function(event) {
    var key_word = $(this).val().replace(/\s\s+/g, ' ').trim();
    $.ajax({
        url: 'ajaxSearchBill',
        type: 'POST',
        dataType: 'json',
        data: { key_word: key_word },
        success: function(result) {
            page_index_bill = '1';
            if (key_word != '') {
                $('.paginationB').html('');
                loadBills(result, 'search');
            } else {
                loadBills(result);
                var page_number = Number(result[2]);
                var template = '';
                if (page_number > 0) {
                    template += '<div class="page pageB">' + '<ul class="list-page">';
                    if (page_number > 1) {
                        template += '<li class="page-item page-itemB prev-page-item prev-page-itemB hide"><a class="prev-page">prev</a></li>';
                        for (var i = 0; i < page_number; i++) {
                            if (i == 0) {
                                template += '<li class="page-item page-itemB page_link page_linkB active"><a>1</a></li>';
                            } else {
                                template += '<li class="page-item page-itemB page_link page_linkB"><a>' + (i + 1) + '</a></li>';
                            }
                        }
                        template += '<li class="page-item page-itemB next-page-item next-page-itemB"><a class="next-page">next</a></li>';
                    }
                    template += '</ul>' + '</div>';
                }
                $('.paginationB').html(template);
            }
        }
    });
}, 500));

$(document).on('keyup', '#inputFocusO', debounce(function(event) {
    var key_word = $(this).val().replace(/\s\s+/g, ' ').trim();
    $.ajax({
        url: 'ajaxSearchOrder',
        type: 'POST',
        dataType: 'json',
        data: { key_word: key_word },
        success: function(result) {
            page_index = '1';
            if (key_word != '') {
                $('.paginationO').html('');
                loadOrders(result, 'search');
            } else {
                loadOrders(result);
                var page_number = Number(result[2]);
                var template = '';
                if (page_number > 0) {
                    template += '<div class="page pageO">' + '<ul class="list-page">';
                    if (page_number > 1) {
                        template += '<li class="page-item page-itemO prev-page-item prev-page-itemO hide"><a class="prev-page">prev</a></li>';
                        for (var i = 0; i < page_number; i++) {
                            if (i == 0) {
                                template += '<li class="page-item page-itemO page_link page_linkO active"><a>1</a></li>';
                            } else {
                                template += '<li class="page-item page-itemO page_link page_linkO"><a>' + (i + 1) + '</a></li>';
                            }
                        }
                        template += '<li class="page-item page-itemO next-page-item next-page-itemO"><a class="next-page">next</a></li>';
                    }
                    template += '</ul>' + '</div>';
                }
                $('.paginationO').html(template);
            }
        }
    });
}, 500));

$(document).on('click', '.view-mode .dropdown-item', function(e) {
    $(this).parent('.dropdown-menu').prev('.dropdown-toggle').children('.form-control').val($(this).text());
    if (!$(this).hasClass('active')) {
        $(this).parent('.dropdown-menu-right').children('.dropdown-item').removeClass('active');
        $(this).addClass('active');
    }

    var view_mode = $(this).text().trim();

    if ($(e.target).is('.bill .dropdown-item')) {
        $.ajax({
            url: 'ajaxBillsViewMode',
            type: 'POST',
            dataType: 'json',
            data: { view_mode: view_mode },
            success: function(result) {
                page_index_bill = '1';
                if (view_mode != 'All bill') {
                    $('.paginationB').html('');
                    loadBills(result);
                } else {
                    loadBills(result);
                    var page_number = Number(result[2]);
                    var template = '';
                    if (page_number > 0) {
                        template += '<div class="page pageB">' + '<ul class="list-page">';
                        if (page_number > 1) {
                            template += '<li class="page-item page-itemB prev-page-item prev-page-itemB hide"><a class="prev-page">prev</a></li>';
                            for (var i = 0; i < page_number; i++) {
                                if (i == 0) {
                                    template += '<li class="page-item page-itemB page_link page_linkB active"><a>1</a></li>';
                                } else {
                                    template += '<li class="page-item page-itemB page_link page_linkB"><a>' + (i + 1) + '</a></li>';
                                }
                            }
                            template += '<li class="page-item page-itemB next-page-item next-page-itemB"><a class="next-page">next</a></li>';
                        }
                        template += '</ul>' + '</div>';
                    }
                    $('.paginationB').html(template);
                }
            }
        });
    } else {
        $.ajax({
            url: 'ajaxOrdersViewMode',
            type: 'POST',
            dataType: 'json',
            data: { view_mode: view_mode },
            success: function(result) {
                page_index = '1';
                if (view_mode != 'All order') {
                    $('.paginationO').html('');
                    loadOrders(result);
                } else {
                    loadOrders(result);
                    var page_number = Number(result[2]);
                    var template = '';
                    if (page_number > 0) {
                        template += '<div class="page pageO">' + '<ul class="list-page">';
                        if (page_number > 1) {
                            template += '<li class="page-item page-itemO prev-page-item prev-page-itemO hide"><a class="prev-page">prev</a></li>';
                            for (var i = 0; i < page_number; i++) {
                                if (i == 0) {
                                    template += '<li class="page-item page-itemO page_link page_linkO active"><a>1</a></li>';
                                } else {
                                    template += '<li class="page-item page-itemO page_link page_linkO"><a>' + (i + 1) + '</a></li>';
                                }
                            }
                            template += '<li class="page-item page-itemO next-page-item next-page-itemO"><a class="next-page">next</a></li>';
                        }
                        template += '</ul>' + '</div>';
                    }
                    $('.paginationO').html(template);
                }
            }
        });
    }
});

$(document).on('click', '.yes-bt', function() {
    var idT = [];
    var idT_list = $('.transaction_id').text();
    var type = $('.transaction_type').text().toUpperCase();

    idT = idT_list.split(',');

    if (type == 'B') {
        $.ajax({
            url: 'ajaxDeleteBills',
            type: 'POST',
            dataType: 'json',
            data: {
                idT: idT,
                delele_time: getDateTime(),
            },
            success: function(result) {
                loadBills(result);
                var page_number = Number(result[2]);
                var template = '';
                if (page_number > 0) {
                    template += '<div class="page pageB">' + '<ul class="list-page">';
                    if (page_number > 1) {
                        template += '<li class="page-item page-itemB prev-page-item prev-page-itemB hide"><a class="prev-page">prev</a></li>';
                        for (var i = 0; i < page_number; i++) {
                            if (i == 0) {
                                template += '<li class="page-item page-itemB page_link page_linkB active"><a>1</a></li>';
                            } else {
                                template += '<li class="page-item page-itemB page_link page_linkB"><a>' + (i + 1) + '</a></li>';
                            }
                        }
                        template += '<li class="page-item page-itemB next-page-item next-page-itemB"><a class="next-page">next</a></li>';
                    }
                    template += '</ul>' + '</div>';
                }
                $('.paginationB').html(template);
                page_index_bill = '1';
                delete_success();

                $('.frame-check-delete').css('display', 'none');
                $('.yes-no').css({ 'transform': 'scale(0)', 'opacity': '0' });
            }
        });
    } else if (type == 'O') {
        $.ajax({
            url: 'ajaxDeleteOrders',
            type: 'POST',
            dataType: 'json',
            data: {
                idT: idT,
                delele_time: getDateTime(),
            },
            success: function(result) {
                loadOrders(result);
                var page_number = Number(result[2]);
                var template = '';
                if (page_number > 0) {
                    template += '<div class="page pageO">' + '<ul class="list-page">';
                    if (page_number > 1) {
                        template += '<li class="page-item page-itemO prev-page-item prev-page-itemO hide"><a class="prev-page">prev</a></li>';
                        for (var i = 0; i < page_number; i++) {
                            if (i == 0) {
                                template += '<li class="page-item page-itemO page_link page_linkO active"><a>1</a></li>';
                            } else {
                                template += '<li class="page-item page-itemO page_link page_linkO"><a>' + (i + 1) + '</a></li>';
                            }
                        }
                        template += '<li class="page-item page-itemO next-page-item next-page-itemO"><a class="next-page">next</a></li>';
                    }
                    template += '</ul>' + '</div>';
                }
                $('.paginationO').html(template);
                page_index = '1';
                delete_success();

                $('.frame-check-delete').css('display', 'none');
                $('.yes-no').css({ 'transform': 'scale(0)', 'opacity': '0' });
            }
        });

    }
});

function loadBills(result, status) {
    var template = '';

    $('.check-bill').prop('checked', false);
    $('.delete-allB').fadeOut('slow');
    $('.checked-messageB').fadeOut('slow');

    if (result[0].length > 0) {
        template += '<tr>' + '<td></td>' + '<td></td>' + '<td></td>' + '<td></td>' + '<td></td>' + '<td align="right" class="bill-total-price">' + result[1] + '</td>' + '</tr>';
        for (var i = 0; i < result[0].length; i++) {
            template += '<tr class="sh-infoT">' + '<td class="check-boxT"><input type="checkbox" class="form-check-inputT check-bill" value=""></td>' + '<td>' +
                result[0][i]['tBillManagement']['bill_code'] + '</td>' + '<td>' + result[0][i]['AccountManagement']['fullname'] + '</td>';
            if (result[0][i]['CustomerManagement']['username'] == null) {
                result[0][i]['CustomerManagement']['username'] = 'Guest';
            }
            template += '<td>' + result[0][i]['CustomerManagement']['username'] + '</td>' + '<td>' + result[0][i]['tBillManagement']['time'] + '</td>' + '<td align="right" class="price_format">' +
                result[0][i]['tBillManagement']['total_price'] + '</td>' + '</tr>' + '<tr class="transaction-detail">' + '<td colspan="6">' + '<div class="title">' + '<h3>Transaction detail</h3>' +
                '</div>' + '<div class="detail-info">' + '<div class="row">' + '<div class="col-sm-6 col-lg-4">' + '<div class="form-group form-control tracsaction-key">' + '<label for="" class="form-label control-label">Trading code:</label>' +
                '<strong>' + result[0][i]['tBillManagement']['bill_code'] + '</strong>' + '</div>' + '<fieldset disabled="true">' + '<div class="form-group form-control tracsaction-time">' + '<label for="disabledInput" class="form-label control-label">Time:</label>' +
                '<strong>' + result[0][i]['tBillManagement']['time'] + '</strong>' + '</div>' + '</fieldset>' + '<div class="form-group form-control tracsaction-guest">' + '<label for="" class="form-label control-label ">Guest:</label>' + '<strong>' +
                result[0][i]['CustomerManagement']['username'] + '</strong>' + '</div>';
            if (result[0][i]['CustomerManagement']['username'] != 'Guest') {
                template += '<div class="form-group form-control tracsaction-phone">' + '<label for="" class="form-label control-label">Phone number:</label>' + '<strong>' + result[0][i]['CustomerManagement']['phone'] + '</strong>' + '</div>';
            }
            template += '</div>' + '<div class="col-sm-6 col-lg-4">';
            if (result[0][i]['CustomerManagement']['username'] != 'Guest') {
                template += '<div class="form-group form-control tracsaction-point">' + '<label for="" class="form-label control-label">Point:</label>' + '<strong>' + result[0][i]['CustomerManagement']['point'] + '</strong>' + '</div>' +
                    '<div class="form-group form-control tracsaction-add">' + '<label for="" class="form-label control-label ">Address:</label>' + '<strong>' + result[0][i]['CustomerManagement']['address'] + '</strong>' + '</div>';
            }
            template += '<div class="form-group form-control tracsaction-cashier">' + '<label for="" class="form-label control-label ">Cashier:</label>' + '<strong>' + result[0][i]['AccountManagement']['fullname'] + '</strong>' + '</div>' +
                '<div class="form-group form-control tracsaction-type">' + '<label for="" class="form-label control-label ">Payment type:</label>' + '<strong>' + result[0][i]['PaymentMethod']['type'] + '</strong>' + '</div>' + '</div>' +
                '<div class="col-sm-12 col-lg-4">' + '<textarea class="description tracsaction-note" rows="9" data-add="' + result[0][i]['tBillManagement']['note'] + '">' + result[0][i]['tBillManagement']['note'] + '</textarea>' + '</div>' +
                '<div class="col-sm-12 products-list">' + '<table class="table">' + '<thead>' + '<tr>' + '<th class="commodity-code">Commodity codes</th>' + '<th>Product name</th>' + '<th>goods of group</th>' + '<th class="right">Quantity</th>' +
                '<th class="right">Price</th>' + '<th class="right">Provisional</th>' + '</tr>' + '</thead>' + '<tbody>';
            for (var j = 0; j < result[0][i]['Products'].length; j++) {
                template += '<tr>' + '<td>' + result[0][i]['Products'][j]['product_code'] + '</td>' + '<td>' + result[0][i]['Products'][j]['name'] + '</td>' + '<td>' + result[0][i]['Products'][j]['category'] + '</td>' + '<td align="right">' + result[0][i]['Products'][j]['quantity'] +
                    '</td>' + '<td align="right" class="price_format">' + result[0][i]['Products'][j]['price'] + '</td>' + '<td align="right" class="price_format">' + (Number(result[0][i]['Products'][j]['price']) * Number(result[0][i]['Products'][j]['quantity'])) + '</td>' + '</tr>';
            }
            template += '</tbody>' + '</table>' + '</div>' + '<div class="col-sm-12">' + '<table class="summary">' + '<tbody>' + '<tr>' + '<td align="right">Total:</td>' + '<td align="right" class="total-price price_format">' + result[0][i]['tBillManagement']['total_price'] + '</td>' +
                '</tr>' + '<tr>' + '<td align="right">Use point:</td>' + '<td align="right" class="use-point">' + result[0][i]['PaymentMethod']['point'] + '</td>' + '</tr>' + '<tr>' + '<td align="right">Card:</td>' + '<td align="right" class="use-card">' + result[0][i]['PaymentMethod']['card'] +
                '</td>' + '</tr>' + '<tr>' + '<td align="right">Cash:</td>' + '<td align="right" class="cash">' + result[0][i]['PaymentMethod']['cash'] + '</td>' + '</tr>' + '<tr>' + '<td align="right">Change:</td>' + '<td align="right" class="change price_format">' + result[0][i]['PaymentMethod']['change'] +
                '</td>' + '</tr>' + '</tbody>' + '</table>' + '</div>' + '<div class="manipulation">' + '<a class="btn btn-default save"><i class="far fa-save icon-manipulation"></i>save</a>' + '<a class="btn btn-default print"><i class="fas fa-print icon-manipulation"></i>print</a>' +
                '<a class="btn btn-default destroy"><i class="fas fa-trash-alt icon-manipulation"></i>delete</a>' + '</div>' + '</div>' + '</div>' + '</td>' + '</tr>';
        }
    } else {
        if (status == 'search') {
            template += '<tr class="empty">' + '<td colspan="6">Bills is not found!!!</td>' + '</tr>';
        } else {
            template += '<tr class="empty">' + '<td colspan="6">Bills is currently empty!!!</td>' + '</tr>';
        }
    }
    $('.bills .tbody').html(template);
    $('.bill-total-price').text(convertNumberToCurrency($('.bill-total-price').text()));

    var price_format = $('.bills').find('.price_format');
    for (var i = 0; i < price_format.length; i++) {
        $(price_format[i]).text(convertNumberToCurrency($(price_format[i]).text()));
    }
}

$(document).on('click', '.delivering', function() {
    var order_code = $(this).parentsUntil('.detail-info').find('.tracsaction-key').children('strong:first').text();
    var index = page_index;
    $.ajax({
        url: 'ajaxDeliveringOrder',
        type: 'POST',
        dataType: 'json',
        data: {
            order_code: order_code,
            delivering_time: getDateTime(),
            index: index,
        },
        success: function(result) {
            loadOrders(result);
            delivering_success();
        }
    });
});

$(document).on('click', '.delivered', function() {
    var order_code = $(this).parentsUntil('.detail-info').find('.tracsaction-key').children('strong:first').text();
    var index = page_index;
    $.ajax({
        url: 'ajaxDeliveredOrder',
        type: 'POST',
        dataType: 'json',
        data: {
            order_code: order_code,
            delivered_time: getDateTime(),
            index: index,
        },
        success: function(result) {
            loadOrders(result);
            delivered_success();
        }
    });
});

function loadOrders(result, status) {
    var template = '';

    $('.check-order').prop('checked', false);
    $('.delete-allO').fadeOut('slow');
    $('.checked-messageO').fadeOut('slow');

    if (result[0].length > 0) {
        template += '<tr>' + '<td></td>' + '<td></td>' + '<td></td>' + '<td></td>' + '<td></td>' + '<td></td>' + '<td align="right" class="price_format">' + result[1] + '</td>' + '</tr>';
        for (var i = 0; i < result[0].length; i++) {
            var cashier = '';
            var statement = '';
            template += '<tr class="sh-infoT">' + '<td class="check-boxT"><input type="checkbox" class="form-check-inputT check-order" value=""></td>' + '<td>' + result[0][i]['tOrderManagement']['order_code'] + '</td>' + '<td>';
            if (result[0][i]['tOrderManagement']['account_id'] == '0') {
                cashier = 'Not approval';
            } else {
                cashier = result[0][i]['AccountManagement']['fullname'];
            }
            template += cashier + '</td>' + '<td>' + result[0][i]['CustomerManagement']['username'] + '</td>' + '<td>' + result[0][i]['tOrderManagement']['time'] + '</td>' + '<td>';
            if (result[0][i]['tOrderManagement']['statement'] == 'Successful') {
                statement += 'Unconfimred';
            } else {
                statement += result[0][i]['tOrderManagement']['statement'];
            }
            template += statement + '</td>' + '<td align="right" class="price_format">' + result[0][i]['tOrderManagement']['total_price'] + '</td>' + '</tr>' + '<tr class="transaction-detail">' + '<td colspan="7">' + '<div class="title">' +
                '<h3>Transaction detail</h3>' + '</div>' + '<div class="detail-info">' + '<div class="row">' + '<div class="col-sm-6 col-lg-4">' + '<div class="form-group form-control tracsaction-key">' + '<label for="" class="form-label control-label">Trading code:</label>' +
                '<strong>' + result[0][i]['tOrderManagement']['order_code'] + '</strong>' + '<strong class="status">' + statement + '</strong>' + '</div>' + '<fieldset disabled="true">' + '<div class="form-group form-control tracsaction-time">' +
                '<label for="disabledInput" class="form-label control-label ">Order time:</label>' + '<strong>' + result[0][i]['tOrderManagement']['time'] + '</strong>' + '</div>' + '</fieldset>' + '<div class="form-group form-control tracsaction-cashier">' +
                '<label for="" class="form-label control-label ">Cashier:</label>' + '<strong>' + cashier + '</strong>' + '</div>' + '<div class="form-group form-control tracsaction-type">' + '<label for="" class="form-label control-label ">Payment type:</label>' +
                '<strong>' + result[0][i]['PaymentMethod']['type'] + '</strong>' + '</div>';
            if (result[0][i]['tOrderManagement']['delivering_date'] != '') {
                template += '<div class="form-group form-control delivering-date">' + '<label for="" class="form-label control-label ">Delivering date:</label>' + '<strong>' + result[0][i]['tOrderManagement']['delivering_date'] + '</strong>' + '</div>';
            }

            if (result[0][i]['tOrderManagement']['delivered_date'] != '') {
                template += '<div class="form-group form-control delivered-date">' + '<label for="" class="form-label control-label ">Deliverd date:</label>' + '<strong>' + result[0][i]['tOrderManagement']['delivered_date'] + '</strong>' + '</div>';
            }

            template += '</div>' + '<div class="col-sm-6 col-lg-4">' + '<div class="form-group form-control tracsaction-guest">' + '<label for="" class="form-label control-label ">Guest:</label>' + '<strong>' +
                result[0][i]['CustomerManagement']['username'] + '</strong>' + '</div>' + '<div class="form-group form-control tracsaction-phone">' + '<label for="" class="form-label control-label ">Phone number:</label>' + '<strong>' +
                result[0][i]['CustomerManagement']['phone'] + '</strong>' + '</div>' + '<div class="form-group form-control tracsaction-point">' + '<label for="" class="form-label control-label ">Point:</label>' + '<strong>' + result[0][i]['CustomerManagement']['point'] +
                '</strong>' + '</div>' + '<div class="form-group form-control tracsaction-add">' + '<label for="" class="form-label control-label ">Contact:</label>' + '<strong>' + result[0][i]['tOrderManagement']['contact'] + '</strong>' + '</div>' + '</div>' +
                '<div class="col-sm-12 col-lg-4">' + '<textarea class="description tracsaction-note" rows="9">' + result[0][i]['tOrderManagement']['note'] + '</textarea>' + '</div>' + '<div class="col-sm-12 products-list">' + '<table class="table">' + '<thead>' + '<tr>' + '<th class="commodity-code">Commodity codes</th>' +
                '<th>Product name</th>' + '<th>goods of group</th>' + '<th class="right">Quantity</th>' + '<th class="right">Price</th>' + '<th class="right">Provisional</th>' + '</tr>' + '</thead>' + '<tbody>';
            for (var j = 0; j < result[0][i]['Products'].length; j++) {
                template += '<tr>' + '<td>' + result[0][i]['Products'][j]['product_code'] + '</td>' + '<td>' + result[0][i]['Products'][j]['name'] + '</td>' + '<td>' + result[0][i]['Products'][j]['category'] + '</td>' + '<td align="right">' + result[0][i]['Products'][j]['quantity'] +
                    '</td>' + '<td align="right" class="price_format">' + result[0][i]['Products'][j]['price'] + '</td>' + '<td align="right" class="price_format">' + (Number(result[0][i]['Products'][j]['price']) * Number(result[0][i]['Products'][j]['quantity'])) + '</td>' + '</tr>';
            }
            template += '</tbody>' + '</table>' + '</div>' + '<div class="col-sm-12">' + '<table class="summary">' + '<tbody>' + '<tr>' + '<td align="right">Provisional:</td>' + '<td align="right" class="provisional price_format">' + result[0][i]['tOrderManagement']['provisional'] +
                '</td>' + '</tr>' + '<tr>' + '<td align="right">Shipment fee:</td>' + '<td align="right" class="shipment-fee">' + result[0][i]['tOrderManagement']['ship-fee'] + '</td>' + '</tr>' + '<tr>' + '<td align="right">Use point:</td>' + '<td align="right" class="use-point">' +
                result[0][i]['PaymentMethod']['point'] + '</td>' + '</tr>' + '<tr>' + '<td align="right">Total:</td>' + '<td align="right" class="total-price price_format">' + result[0][i]['tOrderManagement']['total_price'] + '</td>' + '</tr>' + '</tbody>' + '</table>' + '</div>' +
                '<div class="manipulation">' + '<a class="btn btn-default save"><i class="far fa-save icon-manipulation"></i>save</a>';
            if (result[0][i]['tOrderManagement']['statement'] != 'Delivered') {
                template += '<a class="btn btn-default delivered"><i class="fas fa-check-double icon-manipulation"></i>delivered</a>';
            }
            if (result[0][i]['tOrderManagement']['statement'] != 'Delivering' && result[0][i]['tOrderManagement']['statement'] != 'Delivered') {
                template += '<a class="btn btn-default delivering"><i class="fas fa-truck icon-manipulation"></i></i>delivering</a>';
            }
            template += '<a class="btn btn-default print printO"><i class="fas fa-print icon-manipulation"></i>print</a>' + '<a class="btn btn-default destroy"><i class="fas fa-trash-alt icon-manipulation"></i>delete</a>' + '</div>' + '</div>' + '</div>' + '</td>' + '</tr>';
        }
    } else {
        if (status == 'search') {
            template += '<tr class="empty">' + '<td colspan="7">Orders is not found!!!</td>' + '</tr>';
        } else {
            template += '<tr class="empty">' + '<td colspan="7">Orders is currently empty!!!</td>' + '</tr>';
        }
    }

    $('.orders').html(template);

    var price_format = $('.orders').find('.price_format');
    for (var i = 0; i < price_format.length; i++) {
        $(price_format[i]).text(convertNumberToCurrency($(price_format[i]).text()));
    }
}

function payment(print_bill, transaction) {
    var replace1 = $(print_bill).parentsUntil('.detail-info').find('.tracsaction-time').children('strong').text();
    var replace2 = $(print_bill).parentsUntil('.detail-info').find('.tracsaction-key').children('strong:first').text();
    var replace4 = $(print_bill).parentsUntil('.detail-info').find('.tracsaction-guest').children('strong').text();
    var replace5 = $(print_bill).parentsUntil('.detail-info').find('.tracsaction-phone').children('strong').text();
    var replace6 = $(print_bill).parentsUntil('.detail-info').find('.tracsaction-point').children('strong').text(); //point

    var replace7 = $(print_bill).parentsUntil('.detail-info').find('.tracsaction-cashier').children('strong').text();
    var replace8 = $(print_bill).parentsUntil('.detail-info').find('.tracsaction-note').val();

    var replace9 = $(print_bill).parentsUntil('.detail-info').find('.total-price').text(); //Total price
    var replace10 = $(print_bill).parentsUntil('.detail-info').find('.use-point').text(); //Use point
    var replace11 = $(print_bill).parentsUntil('.detail-info').find('.cash').text(); // Use cash
    var replace12 = $(print_bill).parentsUntil('.detail-info').find('.use-card').text(); // Use card
    var replace13 = $(print_bill).parentsUntil('.detail-info').find('.change').text(); //Change
    var replace14 = $(print_bill).parentsUntil('.detail-info').find('.shipment-fee').text(); //shipment-fee
    var replace15 = $(print_bill).parentsUntil('.detail-info').find('.provisional').text(); //provisional

    var print1 = "<div id='printElement' class='invoice'>" +
        "<div class='container-fluid'>" +
        "<div class='shop-name'>MISHON</div>" +
        "<div class='shop-address'>241 Xuan Thuy, Cau Giay, Ha Noi</div>" +
        "<hr>" +
        "<div id='date-sale' class='form-inline'> Date sale : &nbsp;" +
        "<div class='time-sale'>#{replace1}</div>" +
        "</div>" +
        "<div class='invoice-title'>INVOICE FOR SALES</div>" +
        "<div class='invoice-id'>#{replace2}</div>" +
        "<div class='invoice-info'>" +
        "<div class='form-inline'>" +
        "<div class='form-group'>" +
        "<label for='invoice-name-customer'>Customer : &nbsp; </label>" +
        "<div id='invoice-name-customer'>#{replace4}</div>" +
        "</div>" +
        "</div>" +
        "<div class='form-inline'>" +
        "<div class='form-group'>" +
        "<label for='invoice-phone-customer'>Phone : &nbsp;</label>" +
        "<div id='invoice-phone-customer'>#{replace5}</div>" +
        "</div>" +
        "</div>" +
        "<div class='form-inline'>" +
        "<div class='form-group'>" +
        "<label for='invoice-point-customer'>Point : &nbsp;</label>" +
        "<div id='invoice-point-customer'>#{replace6}</div>" +
        "</div>" +
        "</div>" +
        "<div class='form-inline'>" +
        "<div class='form-group'>" +
        "<label for='invoice-cashier'>Seller : &nbsp;</label>" +
        "<div id='invoice-cashier'>#{replace7}</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "<table class='table'>" +
        "<thead class='thead-light'>" +
        "<tr>" +
        "<th>Name product</th>" +
        "<th>Quantity</th>" +
        "<th>Price</th>" +
        "<th>Provisional</th>" +
        "</tr>" +
        "</thead>" +
        "<tbody>";

    var print2 = "";
    var products = $(print_bill).parentsUntil('.detail-info').children('.products-list').children('.table').children('tbody').children('tr');

    $.each(products, function(index, product) {
        print2 += "<tr><th>" +
            $(product).children('td:nth-child(2)').text() + "</th><th>" +
            $(product).children('td:nth-child(4)').text() + "</th><th>" +
            $(product).children('td:nth-child(5)').text() + "</th><th>" +
            $(product).children('td:nth-child(6)').text() + "</th></tr>";
    });

    var print3 = "</tbody>" +
        "</table>" +
        "<div class='form-inline note'>" +
        "<div class='form-group'>" +
        "<label for='invoice-note'>Note : &nbsp;</label>" +
        "<div id='invoice-note'>#{replace8}</div>" +
        "</div>" +
        "</div>" +
        "<hr>";

    if (transaction == 'bill') {
        print3 += "<div id='invoice-total'>Total : <div class='invoice-total'>#{replace9}</div>" + "</div>";
        if (replace10 != '0') {
            print3 += "<div id='invoice-point'>Point : <div class='invoice-point'>" + replace10 + "</div>" +
                "</div>"
        }
        if (replace11 != '0') {
            print3 += "<div id='invoice-cash'>Cash : <div class='invoice-cash'>" + replace11 + "</div>" +
                "</div>";
        }
        if (replace12 != '0') {
            print3 += "<div id='invoice-card'>Card : <div class='invoice-card'>" + replace12 + "</div>" +
                "</div>";
        }
        print3 += "<div id='invoice-change'>Change : <div class='invoice-change'>#{replace13}</div>" + "</div>";
    } else {
        print3 += "<div id='provisional'>Provision : <div class='provisional'>#{replace15}</div>" + "</div>";
        if (replace10 != '0') {
            print3 += "<div id='invoice-point'>Point : <div class='invoice-point'>" + replace10 + "</div>" +
                "</div>"
        }
        print3 += "<div id='shipment-fee'>Shipment fee : <div class='shipment-fee'>#{replace14}</div>" + "</div>" + "<div id='invoice-total'>Total : <div class='invoice-total'>#{replace9}</div>" + "</div>";
    }

    print3 += "<div class='invoice-description text-center'>" +
        "( 1 point = 1.000 vnđ ) <br>" +
        "Freeship around 2m <br>" +
        "Order : 01234567 <br>" +
        "Thank you & see you again!" +
        "</div>" +
        "</div>" +
        "</div>";


    var template = print1 + print2 + print3;

    template = template.replace(/#\{replace1\}/g, replace1)
        .replace(/#\{replace2\}/g, replace2)
        .replace(/#\{replace4\}/g, replace4)
        .replace(/#\{replace5\}/g, replace5)
        .replace(/#\{replace6\}/g, replace6)
        .replace(/#\{replace7\}/g, replace7)
        .replace(/#\{replace8\}/g, replace8)
        .replace(/#\{replace9\}/g, replace9)
        .replace(/#\{replace13\}/g, replace13)
        .replace(/#\{replace14\}/g, replace14)
        .replace(/#\{replace15\}/g, replace15);

    $("body").append(template);
    print();

    $("#printElement").remove();
}

function print() {
    printJS({
        printable: 'printElement',
        type: 'html',
        targetStyles: ['*']
    })
}

$(document).on('click', '.printB', function(event) {
    var print_bill = $(this);
    payment(print_bill, 'bill');
});

$(document).on('click', '.printO', function(event) {
    var print_bill = $(this);
    payment(print_bill, 'order');
});

$(document).on('click', '.save', function() {
    var note = $(this).parentsUntil('.transaction-detail').find('.tracsaction-note').val();
    var transaction_id = $(this).parentsUntil('.transaction-detail').find('.tracsaction-key').children('strong:first').text();
    var url = '';
    var transaction_type = transaction_id.substr(0, 1).toUpperCase();
    if (transaction_type == 'B') {
        url = 'ajaxSaveBill';
    } else if (transaction_type == 'O') {
        url = 'ajaxSaveOrder'
    }
    transaction_id = transaction_id.substr(1);

    $.ajax({
        url: url,
        type: 'POST',
        data: {
            transaction_id: transaction_id,
            note: note,
        },
    }).done(function() {
        save_success();
    });
});

$(document).on('click', '.page_linkB', function() {
    var page_index_lastest = $('.page_linkB').last().children('a').text();
    page_index_bill = $(this).children('a').text();

    if (page_index_bill == 1) {
        $(this).prev('.page-itemB').addClass('hide');
        $('.page-itemB').last().removeClass('hide');
    } else if (page_index_bill == page_index_lastest) {
        $(this).next('.page-itemB').addClass('hide');
        $('.page-itemB').first().removeClass('hide');
    } else {
        $('.page-itemB').first().removeClass('hide');
        $('.page-itemB').last().removeClass('hide');
    }
    $('.pageB .page_linkB').removeClass('active');
    $(this).addClass('active');

    $.ajax({
        url: 'ajaxLoadBills',
        type: 'POST',
        dataType: 'json',
        data: { page_index_bill: page_index_bill },
        success: function(result) {
            loadBills(result);
        }
    });
});

$(document).on('click', '.prev-page-itemB, .next-page-itemB', function(e) {
    var current_element = $('.pageB').find('.active');
    var current_page = current_element.children('a').text();
    var page_index_lastest = $('.page_linkB').last().children('a').text();
    page_index_bill = '1';

    $('.pageB .page_link').removeClass('active');

    if ($(e.target).is('.prev-page-itemB')) {
        current_element.prev('.page_linkB').addClass('active');
        page_index_bill = current_element.prev('.page_link').children('a').text();
    } else {
        current_element.next('.page_linkB').addClass('active');
        page_index_bill = current_element.next('.page_link').children('a').text();
    }

    if (page_index_bill == 1) {
        $('.prev-page-itemB').addClass('hide');
        $('.page-itemB').last().removeClass('hide');
    } else if (page_index_bill == page_index_lastest) {
        $('.next-page-itemB').addClass('hide');
        $('.page-itemB').first().removeClass('hide');
    } else {
        $('.page-itemB').first().removeClass('hide');
        $('.page-itemB').last().removeClass('hide');
    }

    $.ajax({
        url: 'ajaxLoadBills',
        type: 'POST',
        dataType: 'json',
        data: { page_index_bill: page_index_bill },
        success: function(result) {
            loadBills(result);
        }
    });
});

$(document).on('click', '.page_linkO', function() {
    var page_index_lastest = $('.page_linkO').last().children('a').text();
    page_index = $(this).children('a').text();

    if (page_index == 1) {
        $(this).prev('.page-itemO').addClass('hide');
        $('.page-itemO').last().removeClass('hide');
    } else if (page_index == page_index_lastest) {
        $(this).next('.page-itemO ').addClass('hide');
        $('.page-itemO').first().removeClass('hide');
    } else {
        $('.page-itemO').first().removeClass('hide');
        $('.page-itemO').last().removeClass('hide');
    }
    $('.pageO .page_linkO').removeClass('active');
    $(this).addClass('active');

    $.ajax({
        url: 'ajaxLoadOrders',
        type: 'POST',
        dataType: 'json',
        data: { page_index: page_index },
        success: function(result) {
            loadOrders(result);
        }
    });
});

$(document).on('click', '.prev-page-itemO, .next-page-itemO', function(e) {
    var current_element = $('.pageO').find('.active');
    var current_page = current_element.children('a').text();
    var page_index_lastest = $('.page_linkO').last().children('a').text();
    page_index = '1';

    $('.pageO .page_link').removeClass('active');

    if ($(e.target).is('.prev-page-itemO')) {
        current_element.prev('.page_linkO').addClass('active');
        page_index = current_element.prev('.page_link').children('a').text();
    } else {
        current_element.next('.page_linkO').addClass('active');
        page_index = current_element.next('.page_link').children('a').text();
    }

    if (page_index == 1) {
        $('.prev-page-itemO').addClass('hide');
        $('.page-itemO').last().removeClass('hide');
    } else if (page_index == page_index_lastest) {
        $('.next-page-itemO').addClass('hide');
        $('.page-itemO').first().removeClass('hide');
    } else {
        $('.page-itemO').first().removeClass('hide');
        $('.page-itemO').last().removeClass('hide');
    }

    $.ajax({
        url: 'ajaxLoadOrders',
        type: 'POST',
        dataType: 'json',
        data: { page_index: page_index },
        success: function(result) {
            loadOrders(result);
        }
    });
});

var delivering_success = function(template) {
    $('.delivering-alert').remove();
    var template = '<div class="delivering-alert">' + '<i class="fas fa-truck icon-delivering-alert"></i>' + '<p>delivering successful!!!</p>' + '</div>';
    $('body').append(template);
    setTimeout(function() {
        $('.delivering-alert').addClass('show');
        setTimeout(function() {
            $('.delivering-alert').removeClass('show');
        }, 1500)
    }, 500);

    setTimeout(function() {
        $('.delivering-alert').remove('');
    }, 2000);
};

var delivered_success = function() {
    $('.delivered-alert').remove();
    var template = '<div class="delivered-alert">' + '<i class="fas fa-check-double icon-delivered-alert"></i>' + '<p>delivered successful!!!</p>' + '</div>';
    $('body').append(template);
    setTimeout(function() {
        $('.delivered-alert').addClass('show');
        setTimeout(function() {
            $('.delivered-alert').removeClass('show');
        }, 1500)
    }, 500);

    setTimeout(function() {
        $('.delivered-alert').remove('');
    }, 2000);
};