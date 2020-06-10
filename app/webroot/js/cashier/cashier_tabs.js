$(document).ready(function() {
    var fullname_cashier = $(".fullname_cashier").text();
    $(".payment_date").text(getDate());
    $(".payment_time").text(getTime());
});

var tabs = $( "#tabs" ).tabs();

var tabTitle = "Bill ";

var content_left = "<div class='content-left col-md-9'>"
    + "<table class='striped'>"
    + "<tbody class='content_body'>"
    + "</tbody>"    
    + "</table>"
    + "</div>";
var fullname_cashier = $('.fullname_cashier').text();
var content_right =   "<div class='content-right col-md-3'>"
    + "<div class='row row1'>"
    + "<div class='col-md-7'>"
    + "<i class='fas fa-user' id='icon-user'></i>"
    + "<div class='fullname_cashier'>#{replace1}</div>"
    + "</div>"
    + "<div class='col-md-3 payment_date'>#{replace2}</div>"
    + "<div class='col-md-2 payment_time'>#{replace3}</div>"                
    + "</div>"
    + "<div class='row row2'>"
    + "<i class='fas fa-search' id='icon_search_customer'></i>"
    + "<input placeholder='(F18) Search customer' class='search_customer' onFocus='this.select()' id='myInput' autocomplete='off'>"
    + "<div class='found_customer' hidden='true'>"
    + "</div>"
    + "</div>"
    + "<div class='row row2_2' hidden='true'>"
    + "<i class='fas fa-user user' id='customer-icon'></i>"
    + "<div class='customer_found'>"
    + "<div class='cid' hidden='true'></div>"
    + "<a class='name_customer_choose'></a>"
    + "<b hidden='true' class='phone_customer_choose'></b>"
    + "</div>"
    + "<i class='fas fa-times times' id='icon-remove-customer'></i>"
    + "</div>"
    + "<div class='row row2_3' hidden='true'>"
    + "</div>"
    + "<div class='row row3'>"
    + "<div class='row3_title'>Bill</div>"
    + "</div>"
    + "<div class='row row4'>"
    + "<div class='col-md-6 total_price'>Total price <span class='badge badge-warning badge-product'>0</span></div>"
    + "<div class='col-md-6 number_total_price'>0</div>"    
    + "</div>"
    + "<div class='row row10'>"
    + "<div class='col-md-6 paying'>Paying"
    + "<div class='payment' hidden='true'><i class='fas fa-credit-card'></i></div>"
    + "<div class='methods'>Cash</div>"
    + "</div>"
    + "<div class='col-md-6 number_paying'>"
    + "<input class='input_paying' placeholder='0' onFocus='this.select()' disabled='true'></input>"
    + "<div class='use_point' hidden='true'></div>"
    + "</div>"
    + "</div>"
    + "<div class='row row7'>"
    + "<div class='col-md-6 change'>Change</div>"
    + "<div class='col-md-6 number_change'>0</div>"
    + "</div>"
    + "<div class='row row11'>"
    + "<div class='col-md-6 note'>Note</div>"
    + "</div>"
    + "<div class='row row12'>"
    + "<input type='text' class='input_note form-control' placeholder='note'>"
    + "</div>"
    + "<div class='row row8'>"
    + "<div class='btn btn-success btn-block btn-pay'>PAY (F19)</div>"
    + "</div>"
    + "<div class='row row9'>"
    + "<i class='fas fa-phone' aria-hidden='true'></i> Support : tien.dd166827@sis.hust.edu.vn"
    + "</div>"
    + "</div>";

pay = "<div class='pay_by_point'>"
    + "<div class='pbp_header'>"
    + "<div class='pbp_title'>Paying</div>"
    + "<div class='pbp_close'><i class='far fa-window-close icon-fa-close'></i></div>"
    + "</div>"
    + "<div class='pbp_content'>"
    + "<div class='pbp_info'>"
    + "<label>Name: </label>"
    + "<div class='pbp_name'></div>"
    + "<label>| Phone: </label>"
    + "<div class='pbp_phone'></div>"
    + "<label>| Point: </label>"
    + "<div class='pbp_p'></div>"
    + "</div>"
    + "<div class='pbp_to_pay'>"
    + "<label class='enter_money'>Money to pay</label>"
    + "<div class='pbp_to_pay_total'></div>"
    + "</div>"
    + "<div class='pbp_pay'>"
    + "<label class='enter_money'>Enter money</label>"
    + "<input type='text' class='pbp_input_money' onFocus='this.select()'>"
    + "</div>"
    + "<div class='pbp_methods_pay'>"
    + "<button class='btn btn-default pbp_cash'>Cash</button>"
    + "<button class='btn btn-default pbp_point'>Point</button>"
    + "<button class='btn btn-default pbp_card'>Card</button>"
    + "</div>"
    + "<div class='pbp_info_pay'>"
    + "<div class='pbp_pay_change'>"
    + "<label class='enter_money'>Change</label>"
    + "<div class='pbp_change'></div>"
    + "</div>"
    + "</div>"
    + "</div>"
    + "<div class='pbp_foot'>"
    + "<button class='btn btn-success complete'>"
    + "<i class='fa fa-check-square'></i> Complete"
    + "</button>" 
    + "<button class='btn btn-default cancel'>"
    + "<i class='fa fa-ban'></i> Cancel"
    + "</button>"
    + "</div>"
    + "</div>";

tabContent = "<div class='row' id='content-tabs'>" + content_left + content_right + "</div>" + pay;


tabTemplate = "<li><a href='#{replace1}' class='tab_title'>#{replace2}</a> <i class='fas fa-times ui-icon-close-x' role='presentation' aria-hidden='true'></i></li>";
tabCounter = 2;

function getDate(){
    var date = new Date();

    if ( date.getMonth() + 1 < 10 ) {
        month = '0'+(date.getMonth()+1);
    } else {
        month = date.getMonth()+1;
    }

    if ( date.getDate() < 0 ) {
        day = '0'+date.getDate();
    } else {
        day = date.getDate();
    }

    var year = date.getFullYear();
    return day + "/" + month + "/" + year;
}

function getTime(){
    var time = new Date();
    if ( time.getHours() < 10 ) {
        hour = '0' + time.getHours() ;
    } else {
        hour = time.getHours();
    }

    if ( time.getMinutes() < 10 ) {
        min = '0'+ time.getMinutes();
    } else {
        min = time.getMinutes();
    }

    return hour + ":" + min;
}

$(document).on('click', '#add_bill', function(event) {
    event.preventDefault();
    addTab();
});

$(document).on('click', 'li.ui-tabs-tab', function(event) {
    $('li.ui-tabs-tab').removeClass('ui-tabs-active');
    $('li.ui-tabs-tab').removeClass('ui-state-active');
    $('li.ui-tabs-tab').removeClass('ui-state-focus');
    $('li.ui-tabs-tab').attr('tabindex', '-1');
    $('li.ui-tabs-tab').attr('aria-selected', 'false');
    $('li.ui-tabs-tab').attr('aria-expanded', 'false');
    $(this).addClass('ui-tabs-active');
    $(this).addClass('ui-state-active');
    $(this).addClass('ui-state-focus');
    $(this).attr('tabindex', '0');
    $(this).attr('aria-selected', 'true');
    $(this).attr('aria-expanded', 'true');

    var id_tab = "#" + $(this).attr('aria-controls');
    $('.content_tabs').attr('aria-hidden', 'true');
    $('.content_tabs').css({
        "display": 'none'
    });
    $(id_tab).removeAttr('style');
    $(id_tab).attr('aria-hidden', 'false');
});


$(document).on('click', '.ui-icon-close-x', function(event) {
    var name_bill = $(this).prev('a').text();

    var id_tab = "#"+$(this).parent('li.ui-tabs-tab').attr('aria-controls');
    var tab_quantity = $(this).parent('li').parent('ul').find('.ui-tabs-tab').length;
    if($(id_tab).children('.row').find('.content_product').length > 0){

        $('.bill_close').find('b').html(name_bill);
        $('.background').addClass('show');
        $('.bill_close').addClass('show');
        $( this ).closest( "li" ).addClass('tab_close');
    }
    else{
        if(tab_quantity == 1)
        {
            event.stopPropagation();
            $(this).prev('a').text('Bill 1');

        }
        else
        {
            event.stopPropagation();
            var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
            $( "#" + panelId ).remove();
            tabs.tabs( "refresh" );
        }

    }
});

tabs.on( "keyup", function( event ) {
    if ( event.altKey && event.keyCode === $.ui.keyCode.BACKSPACE ) {
        var panelId = tabs.find( ".ui-tabs-active" ).remove().attr( "aria-controls" );
        $( "#" + panelId ).remove();
        tabs.tabs( "refresh" );
    }
});

$(document).on('click', '.bill_close_close', function(event) {
    event.preventDefault();
    $('.background').removeClass('show');
    $('.bill_close').removeClass('show');
    $('li.ui-tabs-tab').removeClass('tab_close');
});

$(document).on('click', '.btn-cancel', function(event) {
    event.preventDefault();
    $('.background').removeClass('show');
    $('.bill_close').removeClass('show');
    $('li.ui-tabs-tab').removeClass('tab_close');
});

$(document).on('click', '.btn-confirm', function(event) {
    event.preventDefault();
    if ($('li.ui-tabs-tab').length == 1) {
        $('.number_total_price').text('0');
        $('.input_paying').val(0);
        $('.input_paying').attr('disabled', 'true');
        $('.number_change').text('0');
        $('.content_product').remove();
        $('.fa-credit-card').removeData('Point');
        $('.fa-credit-card').removeData('Card');
        $('.fa-credit-card').data('Cash','0');
        $('.fa-credit-card').removeAttr('hidden');
        $('.methods').text('Cash');
        $('.badge-product').text('0');

        $('.row2').removeAttr('hidden');
        $('.row2_2').attr('hidden', 'true');
        $('.row2_3').attr('hidden', 'true');

        $(".tab_title").text('Bill 1');

        $('li.ui-tabs-tab').removeClass('tab_close');
    }
    else{
        var panelId = $('.tab_close').remove().attr("aria-controls");
        $("#"+panelId).remove();
        tabs.tabs( "refresh" );
    }

    $('.background').removeClass('show');
    $('.bill_close').removeClass('show');
});

function addTab(){
    var tab_title = $('.tab_title');
    var bill_array = new Array();
    for (var i = 0; i < tab_title.length; i++) {
        bill_array[i] = Number(tab_title[i].innerText.split(" ")[1]);
    }
    var max = Math.max.apply(Math, bill_array);
    var label = tabTitle + (max +1);
    var id = "tabs-" + tabCounter;
    var li = $( tabTemplate.replace( /#\{replace1\}/g, "#" + id ).replace( /#\{replace2\}/g, label ) );
    var fullname_cashier = $(".fullname_cashier")[0].innerText;
    var content = tabContent.replace( /#\{replace1\}/g, fullname_cashier).replace( /#\{replace2\}/g, getDate() ).replace( /#\{replace3\}/g,  getTime());
    $('#add_bill').before(li);
    tabs.append( "<div id='" + id + "' class='content_tabs'>" + content + "</div>" );
    tabs.tabs( "refresh" );
    tabCounter++;
    $('li.ui-tabs-tab').removeClass('ui-tabs-active');
    $('li.ui-tabs-tab').removeClass('ui-state-active');
    $('li.ui-tabs-tab').removeClass('ui-state-focus');
    $('li.ui-tabs-tab').attr('tabindex', '-1');
    $('li.ui-tabs-tab').attr('aria-selected', 'false');
    $('li.ui-tabs-tab').attr('aria-expanded', 'false');

    $('li.ui-tabs-tab').last().addClass('ui-tabs-active');
    $('li.ui-tabs-tab').last().addClass('ui-state-active');
    $('li.ui-tabs-tab').last().addClass('ui-state-focus');
    $('li.ui-tabs-tab').last().attr('tabindex', '0');
    $('li.ui-tabs-tab').last().attr('aria-selected', 'true');
    $('li.ui-tabs-tab').last().attr('aria-expanded', 'true');

    var id_tab = "#" + $('li.ui-tabs-tab').last().attr('aria-controls');

    $('.content_tabs').attr('aria-hidden', 'true');
    $('.content_tabs').css({
        "display": 'none'
    });

    $(id_tab).removeAttr('style');
    $(id_tab).attr('aria-hidden', 'false');
}