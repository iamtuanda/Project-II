$(document).ready(function() {
    if ($("#header").data('login') == true) {
        var customer_id = atob($("#header").data('id'));

        $.ajax({
            url: 'ajaxGetPointByID',
            type: 'POST',
            dataType: 'json',
            data: {customer_id: customer_id},
            success : function(point){
                if (point) {
                    $(".point-customer span").text(point);
                }
            }
        })
        
        $.ajax({
            async: false,
            url: 'ajaxGetNotification',
            type: 'POST',
            dataType: 'json',
            data: {
                customer_id: customer_id
            },
            success : function(notifys){
                $(".bell .badge.badge-notify").text(notifys.length);
                $(".notification-icon .badge.badge-notify").text(notifys.length);
                if (notifys.length == 0) {
                    var template = "<a class='notification-content-detail no-notify no' href='' >You have no notifications</a>";
                    $(".notification-content").html(template);
                } else {
                    var template = "";
                    template += "<div class='notification-content-header'>"
                    + "<span class='float-left'>Notifications</span>"
                    + "<a href='' class='float-right mark-read'>Mark all as read</a>"
                    + "</div>";
                    notifys.forEach((notify, index) => {
                        var day = notify['tNotificationCustomer'].time.split(" ")[0];
                        var date = Number(day.split("/")[0]);
                        var month = Number(day.split("/")[1]);
                        var year = Number(day.split("/")[2]);
                        var time = notify['tNotificationCustomer'].time.split(" ")[1];
                        var hours = time.split(":")[0];
                        var minutes = time.split(":")[1];
                        var before = new Date(year, month -1 , date, hours, minutes);
                        var now = new Date();
                        if ( now - before > 86400000) {
                            if (Math.round((now - before) / 1000 / 60 / 60 / 24) == 1) {
                                var clock ="a day ago";
                            } else {
                                var clock = Math.round((now - before) / 1000 / 60 / 60 / 24) + " days ago";
                            }
                        } else if (now - before > 3600000) {
                            if (Math.round((now - before) / 1000 / 60 / 60) == 1) {
                                var clock ="a hour ago";
                            } else {
                                var clock = Math.round((now - before) / 1000 / 60 / 60) + " hours ago";
                            }
                        } else if (now - before > 60000) {
                            if (Math.round((now - before) / 1000 / 60) == 1) {
                                var clock ="a minute ago";
                            } else {
                                var clock = Math.round((now - before) / 1000 / 60) + " minutes ago";
                            }
                        } else {
                            var clock ="a second ago";
                        }
                        var notify = "<a class='notification-content-detail' data-id='" + notify['tNotificationCustomer'].id + "' data-href='track?view="+ notify['tNotificationCustomer'].order_id +"'>"
                        + "<p class='notification-content-detail-description'>"
                        + "Order #" + notify['tNotificationCustomer'].order_id + " " + notify['tNotificationCustomer'].description
                        + "</p>"
                        + "<p class='notification-content-detail-time'>"
                        + "<i class='far fa-clock'></i> "
                        + "<span>"
                        + clock
                        + "</span>"
                        + "</p>"
                        + "</a>";
                        template += notify;
                    });
                    $(".notification-content").html(template);
                }

            }
        });
        
    } else {
        var template = "<a class='notification-content-detail no-notify' href='#signin-modal' data-toggle='modal'>Sign in to receive the latest notifications</a>";
        $(".notification-content").html(template);
    }
});

$(document).on('click', '.bell', function(event) {
    event.preventDefault();
    $(this).parent('#notification').children('#notification-toggle').toggle();
});

$(document).on('click', 'body', function(event) {
    if ($( event.target ).is('#notification-toggle') || $( event.target ).is('.bell')){
        $("#notification-toggle").css('display', 'block');
    } else {
        $("#notification-toggle").css('display', 'none');
    }
});


$(document).on('click', '.notification-icon', function(event) {
    $(this).next('#notification-toggle-small').toggle();
});

$(document).on('click', 'body', function(event) {
    if ($( event.target ).is('#notification-toggle-small') || $( event.target ).is('.notification-icon')){
        $("#notification-toggle-small").css('display', 'block');
    } else {
        $("#notification-toggle-small").css('display', 'none');
    }
});

$(document).on('click', '.notification-content-detail', function(event) {
    var notification_id = $(this).data('id');
    var href = $(this).data('href');

    $.ajax({
        url: 'ajaxDeleteNotification',
        type: 'POST',
        dataType: 'json',
        data: {
            notification_id: notification_id
        },
        success : function(result){
            if (result == 1) {
                window.location = href;
            }
        }
    });
});

$(document).on('click', '.mark-read', function(event) {
    event.preventDefault();
    $.ajax({
        url: 'ajaxDeleteManyNotification',
        type: 'POST',
        dataType: 'json',
        data: {
            customer_id : atob($("#header").data('id'))
        },
        success : function(){
            window.location = window.location.href;
        }
    });
});

