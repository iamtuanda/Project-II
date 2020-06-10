$(document).on('click', '.edit', function(event) {
    $(this).attr('hidden', 'true');
    $(this).next('.update').removeAttr('hidden');
    $(this).next('.update').next('.update-avatar').removeAttr('hidden');
});

$(document).on('change', '.avatar_customer', function(event) {
    $(".avatar img").attr('src', URL.createObjectURL($(this)[0]['files'][0]));
});

$(document).on('click', '.update', function(event) {
    var formData = new FormData();
    formData.append('image', $('.avatar_customer').prop('files')[0]);

    $.ajax({
        url: 'ajaxUpdateAvatar',
        type: 'POST',
        dataType: 'json',
        data: formData,
        contentType: false,
        processData: false,
        success: function(result){
            if (result == 1) {
                swal({
                    title: "Successfull",
                    text: "Update avatar successfully !!!",
                    icon: "success",
                });
            } else {
                swal({
                    title : "Update error !!!",
                    icon : "error",
                });
            }

            setTimeout("window.location = 'info'", 1000);
        }
    });
});
