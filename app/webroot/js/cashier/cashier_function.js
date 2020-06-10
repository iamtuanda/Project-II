function getDate() {
    var date = new Date();

    if (date.getMonth() + 1 < 10) {
        month = '0' + (date.getMonth() + 1);
    } else {
        month = date.getMonth() + 1;
    }

    if (date.getDate() < 10) {
        day = '0' + date.getDate();
    } else {
        day = date.getDate();
    }

    var year = date.getFullYear();
    return day + "/" + month + "/" + year;
}

function getTime() {
    var time = new Date();
    if (time.getHours() < 10) {
        hour = '0' + time.getHours();
    } else {
        hour = time.getHours();
    }

    if (time.getMinutes() < 10) {
        min = '0' + time.getMinutes();
    } else {
        min = time.getMinutes();
    }

    return hour + ":" + min;
}