var page_index = '1';
$(document).on('keyup', '.input-price', function() {
    $(this).val(convertNumberToCurrency(convertCurrencyToNumber($(this).val())));

    if ($(this).val() == 'NaN') {
        $(this).val('0');
    }
});

$(document).on("mouseenter", ".list-categories-item", function() {
    $(this).children(".sub-menu").addClass("show");
    $(this).children(".name-category").children(".edit-category").addClass("show-edit-category");
});

$(document).on("mouseleave", ".list-categories-item", function() {
    $(this).children(".sub-menu").removeClass("show");
    $(this).children(".name-category").children(".edit-category").removeClass("show-edit-category");
});

$(document).on("mouseenter", ".sub-menu-item", function() {
    $(this).find(".edit-category").addClass("show-edit-category");
});

$(document).on("mouseleave", ".sub-menu-item", function() {
    $(this).find(".edit-category").removeClass("show-edit-category");
});

$(document).on("click", ".edit-menu-parent", function(e) {
    e.preventDefault();
    $("#editCategory #gname1").attr('data-gname', $(this).prev('.name-category-detail').text());
    $("#editCategory #gname1").attr('data-pgroup', '');
    $("#editCategory #gname1").val($(this).prev('.name-category-detail').text());
    $('#editCategory #sel2')[0].selectedIndex = 0;
    $('#editCategory #sel2').attr('disabled', 'disabled');
});

$(document).on("click", ".edit-menu-child", function(e) {
    e.preventDefault();
    $("#editCategory #gname1").attr('data-gname', $(this).parent("a").text());
    $("#editCategory #gname1").attr('data-pgroup', $(this).parentsUntil('.list-categories-item').prev('.name-category').children('.name-category-detail').text());
    $("#editCategory #gname1").val($(this).parent("a").text());
    $('#editCategory #sel2').val($(this).parentsUntil('.list-categories-item').prev('.name-category').children('.name-category-detail').text());
    $('#editCategory #sel2').removeAttr('disabled');
});

$(document).on("click", ".sh-info", function(e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $(this).next('.product-detail').fadeToggle('slow');
});

$(document).on('click', '#add-product', function() {
    $('#addProduct').modal('show');

    if (CKEDITOR.instances['editor1']) {
        CKEDITOR.instances['editor1'].destroy(true);
    }
    CKEDITOR.replace('editor1');
    $('#addProduct').attr('style', ' overflow: auto !important');
    $('#addProduct .list-image .add-list-image .add-image').css('display', 'block');
});

$(document).on('click', '.edit-product', function() {
    $('#editProduct').modal('show');

    $('#pname2')[0].value = $(this).parentsUntil('.one-product').prev('.product-name').text();
    $('#pprice2')[0].value = $(this).parent('.btn-product').prev('.info-product').children('.price-product').children('div').children('strong').text();
    $('#pgroup2').val($(this).parent('.btn-product').prev('.info-product').children('.group-product').children('div').children('strong').text());
    $('#editProduct .codeP').val($(this).parent('.btn-product').prev('.info-product').children('.key-product').children('div').children('strong').text());
    $('#editProduct .codeP').attr('data-codeP', $(this).parent('.btn-product').prev('.info-product').children('.key-product').children('div').children('strong').text());

    var number_photos = $(this).parent('.btn-product').prev('.info-product').prev('.img-product').children('.img-product-secondary').children('ul').children('li').length;
    var template = '';
    $('#editProduct .list-image .add-list-image .add-image').css('display', 'block');

    if (number_photos == 5) {
        $('#editProduct .list-image .add-list-image .add-image').css('display', 'none');
    }

    if (number_photos == 1 && $(this).parentsUntil('.one-product').find('.img-product-secondary').children('ul').children('li').children('.secondary').attr('src') == '../img/products/default-product-img.jpg') {

    } else {
        for (var i = 0; i < number_photos; i++) {
            template += "<li class='list-image-item'>";
            template += "<img src='" + $($(this).parent('.btn-product').prev('.info-product').prev('.img-product').children('.img-product-secondary').children('ul').children('li')[i]).children('.secondary').attr('src') + "' class='img'>";
            template += "<div class='delete-img'><i class='fas fa-minus-circle icon-delete-img'></i></div>" + "</li>";
        }
    }

    $('#editProduct .list-image .chosen-list-image').html(template);
    $('#editProduct').attr('style', ' overflow: auto !important');

    if (CKEDITOR.instances['editor2']) {
        CKEDITOR.instances['editor2'].destroy(true);
    }

    CKEDITOR.replace('editor2');
    $('#editor2')[0].value = $(this).parent('.btn-product').prev('.info-product').children('.des-product').children('div').children('strong').text();
});

$(document).on('click', '.close-product, .button-close-product', function() {
    $('#addProduct').modal('hide');
    $('#editProduct').modal('hide');

    if (CKEDITOR.instances['editor1']) {
        CKEDITOR.instances['editor1'].destroy(true);
    }
    if (CKEDITOR.instances['editor2']) {
        CKEDITOR.instances['editor2'].destroy(true);
    }

    $('#editProduct .list-image .chosen-list-image li').remove();
    $('.notBlank').fadeOut();
});

$(document).on('click', '.curtain-frame', function() {
    $(this).parent('li').parent('ul').children('li').removeClass('active');
    $(this).parent('li').addClass('active');
    $(this).parentsUntil('.img-product').prev('.img-product-main').children('.main').attr('src', $(this).prev('.secondary').attr('src'));
});

$(document).on('change', '#file', function() {
    var src_media = URL.createObjectURL($(this)[0]['files'][0]);

    var number_photos = $(this).parentsUntil('#addProduct').find('.chosen-list-image').children('li').length;
    var template = '';

    if (number_photos == 4) {
        $('#addProduct .list-image .add-list-image .add-image').css('display', 'none');
    }

    template += "<li class='list-image-item'>";
    template += "<img src='" + src_media + "' class='img'>";
    template += '<input type="file" class="inputfile" accept="image/gif, image/jpeg, image/jpg, image/png" />';
    template += "<div class='delete-img'><i class='fas fa-minus-circle icon-delete-img'></i></div>" + "</li>";

    $('#addProduct .list-image .chosen-list-image').append(template);

    $('#addProduct .list-image .chosen-list-image li:last').children('.inputfile').prop('files' [0], $('#file').prop('files')[0]);

    $(this).val('');
});

$(document).on('change', '#file2', function() {
    var src_media = URL.createObjectURL($(this)[0]['files'][0]);

    var number_photos = $(this).parent('.add-image').parent('.add-list-image').prev('.chosen-list-image').children('li').length;
    var template = '';

    if (number_photos == 4) {
        $('#editProduct .list-image .add-list-image .add-image').css('display', 'none');
    }

    template += "<li class='list-image-item'>";
    template += "<img src='" + src_media + "' class='img'>";
    template += '<input type="file" class="inputfile" accept="image/gif, image/jpeg, image/jpg, image/png" />';
    template += "<div class='delete-img'><i class='fas fa-minus-circle icon-delete-img'></i></div>" + "</li>";

    $('#editProduct .list-image .chosen-list-image').append(template);
    $('#editProduct .list-image .chosen-list-image li:last').children('.inputfile').prop('f', $('#file2').prop('files')[0]);
    $(this).val('');
});

$(document).on('click', '.list-image-item .delete-img', function() {
    if ($(this).parent('.list-image-item').parent('.chosen-list-image').children('li').length == 5) {
        $('#editProduct .list-image .add-list-image .add-image').css('display', 'block');
        $('#addProduct .list-image .add-list-image .add-image').css('display', 'block');
    }
    $(this).parent('.list-image-item').remove();
});

$(document).on('click', '.button-add-cate, .icon-manipulation', function() {
    $('.frame-add-category').css('display', 'block');
    $('#addCategory').css({ 'transform': 'scale(1)', 'opacity': '1' });
});

$(document).on('click', '.close-addC, .button-close-addC', function() {
    $('.frame-add-category').css('display', 'none');
    $('#addCategory').css({ 'transform': 'scale(0)', 'opacity': '0' });
    $('.notBlank').fadeOut();
});

$(document).on('click', '#addCategory', function(e) {
    if (!$(e.target).is('.modal-content *')) {
        $('.frame-add-category').css('display', 'none');
        $('#addCategory').css({ 'transform': 'scale(0)', 'opacity': '0' });
    }
});

$(document).on('click', '.form-check-inputP', function(e) {
    e.stopPropagation();
    if ($(e.target).is('.form-check-inputP:first')) {
        $('.form-check-inputP').prop('checked', $(this).is(":checked"));
    } else if ($('.form-check-inputP:first').prop('checked')) {
        if ($('.form-check-inputP:checked').length == 1) {
            $('.form-check-inputP:first').prop('checked', false);
        }
    }

    if ($('.form-check-inputP:checked').length > 0) {
        $('.delete-allP').fadeIn('slow');
        $('.checked-messageP').fadeIn('slow');
        var count_checked = $('.form-check-inputP:checked').length;
        var msg = '';
        if ($('.form-check-inputP:first').prop('checked')) {
            count_checked--;
        }
        if (count_checked == 1) {
            txt = 'is <b>1</b> selected product';
        } else {
            txt = 'are <b>' + count_checked + '</b> selected products';
        }

        $('.quantityP').html(txt);
    } else {
        $('.delete-allP').fadeOut('slow');
        $('.checked-messageP').fadeOut('slow');
    }
});

$(document).on('click', '.unchecked-allP', function() {
    $('.form-check-inputP').prop('checked', false);
    $('.delete-allP').fadeOut('slow');
    $('.checked-messageP').fadeOut('slow');
});

$(document).on('click', '.delete-product, .delete-allP', function(e) {
    var idP = [];
    var category = '';

    if ($(e.target).is('.delete-allP')) {
        if ($('.form-check-inputP:first').prop('checked')) {
            $('.code').text('all Products you have chosen');
        } else if ($('.form-check-inputP:checked').length > 0) {
            $('.code').text('' + $('.form-check-inputP:checked').length + ' Products you have chosen');
        }
        for (var i = 0; i < $('.check-boxP .form-check-inputP:checked').length; i++) {
            idP.push($($('.check-boxP .form-check-inputP:checked')[i]).parent('.check-boxP').next('td').text());
        }
        category = $($('.check-boxP .form-check-inputP:checked')[0]).parent('.check-boxP').next('td').next('td').next('td').children('small').text();
    } else {
        $('.code').text($(this).parentsUntil('.one-product').find('.key-product').children('.form-control-static').children('strong').text());
        idP.push($(this).parentsUntil('.one-product').find('.key-product').children('.form-control-static').children('strong').text());
        category = $(this).parentsUntil('.one-product').find('.group-product').children('.form-control-static').children('strong').text();
    }

    $('.yes-no .product-info .product-info-id').text(idP);
    $('.yes-no .product-info .product-info-category').text(category);

    $('.frame-check-delete').css('display', 'block');
    $('.yes-no').css({ 'transform': 'scale(1)', 'opacity': '1' });
});

$(document).on('click', '.addC', function(e) {
    e.preventDefault();
    var g_name = $(this).parentsUntil('#addCategory').find('#gname').val();
    g_name = g_name.toLowerCase();
    g_name = g_name.substr(0, 1).toUpperCase() + g_name.substr(1);

    var p_group = $(this).parentsUntil('#addCategory').find('#sel1').val();

    if (g_name === '') {
        $(this).parentsUntil('#addCategory').find('.notBlank').children('label').text('Please fill out this field');
        $(this).parentsUntil('#addCategory').find('.notBlank').fadeIn();
        $(this).parentsUntil('#addCategory').find('#gname').focus();
        return false;
    }

    $.ajax({
        url: 'ajaxAddCategory',
        type: 'POST',
        dataType: 'json',
        data: {
            g_name: g_name,
            p_group: p_group,
        },
        success: function(result) {
            if (result == 'duplicatedC') {
                $('#addCategory').find('.notBlank').children('label').text('Category halready exists');
                $('#addCategory').find('.notBlank').fadeIn();
                $('#addCategory').find('#gname').focus();
            } else if (result == 'duplicatedT') {
                $('#addCategory').find('.notBlank').children('label').text('Type already exists');
                $('#addCategory').find('.notBlank').fadeIn();
                $('#addCategory').find('#gname').focus();
            } else {
                var template = '';
                template = loadCategories(result);
                $('.list-categories').html(template);
                if (p_group != "None" && $('#addProduct').hasClass('show')) {
                    $('#addProduct #pgroup').val(p_group + ">>" + g_name);
                }
                add_success();
                $('#addCategory').find('#gname').val('');
                $('#addCategory').find('#sel1').val('None');
                $('.frame-add-category').css('display', 'none');
                $('#addCategory').css({ 'transform': 'scale(0)', 'opacity': '0' });
            }
        }
    })

});

$(document).on('click', '.editC', function(e) {
    e.preventDefault();

    var old_gname = $(this).parentsUntil('#editCategory').find('#gname1').attr('data-gname');
    var old_pgroup = $(this).parentsUntil('#editCategory').find('#gname1').attr('data-pgroup');
    var g_name = $(this).parentsUntil('#editCategory').find('#gname1').val();
    g_name = g_name.toLowerCase();
    g_name = g_name.substr(0, 1).toUpperCase() + g_name.substr(1);

    var p_group = $(this).parentsUntil('#editCategory').find('#sel2').val();

    if (old_gname == g_name) {
        if (old_pgroup == '' || old_pgroup == p_group) {
            save_success();
            $('#editCategory').modal('hide');
            return false;
        }
    }

    $.ajax({
        url: 'ajaxEditCategory',
        type: 'POST',
        dataType: 'json',
        data: {
            old_gname: old_gname,
            g_name: g_name,
            p_group: p_group,
            old_pgroup: old_pgroup
        },
        success: function(result) {
            if (result == 'duplicatedC') {
                $('#editCategory').find('.notBlank').children('label').text('Category already exists');
                $('#editCategory').find('.notBlank').fadeIn();
                $('#editCategory').find('#gname1').focus();
            } else if (result == 'duplicatedT') {
                $('#editCategory').find('.notBlank').children('label').text('Type already exists');
                $('#editCategory').find('.notBlank').fadeIn();
                $('#editCategory').find('#gname1').focus();
            } else {
                var template = '';
                template = loadCategories(result);
                $('.list-categories').html(template);
                save_success();
                $('#editCategory').modal('hide');
            }
        }
    })
});

$(document).on('click', '.deleteC', function(e) {
    e.preventDefault();
    var g_name = $(this).parentsUntil('#editCategory').find('#gname1').attr('data-gname');
    var p_group = $(this).parentsUntil('#editCategory').find('#gname1').attr('data-pgroup');
    g_name = g_name.toLowerCase();
    g_name = g_name.substr(0, 1).toUpperCase() + g_name.substr(1);

    if (p_group == '') {
        $('.code').text(g_name);
    } else {
        $('.code').text(p_group + ">>" + g_name);
    }

    $('.frame-check-delete').css('display', 'block');
    $('.yes-noC').css({ 'transform': 'scale(1)', 'opacity': '1' });
});

$(document).on('click', '.yesC', function() {
    var g_name = $(this).parentsUntil('#editCategory').find('#gname1').attr('data-gname');
    var p_group = $(this).parentsUntil('#editCategory').find('#gname1').attr('data-pgroup');
    g_name = g_name.toLowerCase();
    g_name = g_name.substr(0, 1).toUpperCase() + g_name.substr(1);

    $.ajax({
        url: 'ajaxDeleteCategory',
        type: 'POST',
        dataType: 'json',
        data: {
            g_name: g_name,
            p_group: p_group,
        },
        success: function(result) {
            var template1 = '';
            template1 = loadCategories(result[0]);
            $('.list-categories').html(template1);
            delete_success();
            $('#editCategory').modal('hide');
            $('.frame-check-delete').css('display', 'none');
            $('.yes-noC').css({ 'transform': 'scale(0)', 'opacity': '0' });
            loadProducts(result[1]);

            var page_number = Number(result[2]);
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
            $('.notBlank').fadeOut();
        }
    })
});

function loadCategories(result) {
    var template = '';
    var template1 = '';
    var template2 = '';
    for (var i = 0; i < result['nameCategory'].length; i++) {
        template += '<li class="list-categories-item">' +
            '<div class="name-category">' + '<div class="name-category-detail">' + result['nameCategory'][i]['tCategoryManagement']['category'] + '</div>' +
            '<i class="fas fa-pencil-alt edit-category edit-menu-parent" data-toggle="modal" data-target="#editCategory"></i>' + '</div>' +
            '<div class="sub-menu">' + '<ul class="sub-menu-1">';
        for (var j = 0; j < result['categories'].length; j++) {
            if (result['categories'][j]['tCategoryManagement']['category'] == result['nameCategory'][i]['tCategoryManagement']['category']) {
                template += '<li class="sub-menu-item">' + '<a href="#">' + result['categories'][j]['tCategoryManagement']['type'] +
                    '<i class="fas fa-pencil-alt edit-category edit-menu-child" data-toggle="modal" data-target="#editCategory"></i></a>' + '</li>';
            }
        }
        template += '</ul></div></li>';
    }

    for (var i = 0; i < result['nameCategory'].length; i++) {
        for (var j = 0; j < result['categories'].length; j++) {
            if (result['categories'][j]['tCategoryManagement']['category'] == result['nameCategory'][i]['tCategoryManagement']['category']) {
                template1 += '<option value="' + result['nameCategory'][i]['tCategoryManagement']['category'] + '>>' + result['categories'][j]['tCategoryManagement']['type'] + '">' +
                    result['nameCategory'][i]['tCategoryManagement']['category'] + '>>' + result['categories'][j]['tCategoryManagement']['type'] + "</option>";
            }
        }
    }

    $('#pgroup, #pgroup2').html(template1);

    template2 = '<option value="None">None</option>';
    for (var i = 0; i < result['nameCategory'].length; i++) {
        template2 += '<option value="' + result['nameCategory'][i]['tCategoryManagement']['category'] + '">' + result['nameCategory'][i]['tCategoryManagement']['category'] + '</option>';
    }

    $('#sel1, #sel2').html(template2);
    $('.notBlank').fadeOut();

    return template;
}

$(document).on('click', '.addP', function() {
    var pname = $('#addProduct #pname').val().replace(/\s\s+/g, ' ').trim();
    var codeP = $('#addProduct .codeP').val();
    var pprice = $('#addProduct #pprice').val();
    var pgroup = $('#addProduct #pgroup').val().replace(/\s\s+/g, ' ').trim();
    var description = CKEDITOR.instances.editor1.getData().replace(/\s\s+/g, ' ').trim();

    pprice = convertCurrencyToNumber(pprice);

    if (pname == '') {
        $('#addProduct #pname').next('.notBlank').fadeIn();
        $('#addProduct #pname').focus();
        return false;
    } else if (pprice == '') {
        $('#addProduct #pprice').next('.notBlank').fadeIn();
        $('#addProduct #pprice').focus();
        return false;
    } else if (pgroup == null) {
        $('#addProduct #pgroup').next('.button-add-cate').next('.notBlank').fadeIn();
        setTimeout(function() {
            $('#addProduct #pgroup').next('.button-add-cate').next('.notBlank').fadeOut();
        }, 1500);
        return false;
    }

    var formData = new FormData();
    pname = pname.toLowerCase();
    pname = pname.substr(0, 1).toUpperCase() + pname.substr(1);

    var number_photos = $('#addProduct .chosen-list-image li').length;

    if (number_photos > 0) {
        for (var i = 0; i < number_photos; i++) {
            formData.append('imgList[]', $($('#addProduct .chosen-list-image').children('li')[i]).children('.inputfile').prop('f'));
        }
    }

    var category = pgroup.split(">>");
    var g_name = category[1].replace(/\s\s+/g, ' ').trim();
    var p_group = category[0].replace(/\s\s+/g, ' ').trim();
    var detail_content = convertVnToEn(pname) + ' ' + convertVnToEn(description).replace(/<\/?[^>]+(>|$)/g, "");
    formData.append('pname', pname);
    formData.append('codeP', codeP);
    formData.append('pprice', pprice);
    formData.append('g_name', g_name);
    formData.append('p_group', p_group);
    formData.append('description', description);
    formData.append('detail_content', detail_content);

    $.ajax({
        url: 'ajaxAddProduct',
        type: 'POST',
        dataType: 'json',
        data: formData,
        contentType: false,
        processData: false,

        success: function(result) {
            if (result == "duplicatedC") {
                $('#addProduct .codeP').next('.notBlank').fadeIn();
                $('#addProduct .codeP').focus();
                return false;
            }
            loadProducts(result[0]);
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

            $('#addProduct').modal('hide');
            add_success();
            $('#addProduct #pname').val('');
            $('#addProduct .codeP').val('');
            $('#addProduct #pprice').val('');
            $('#editor1').val('');
            $('#addProduct .list-image .chosen-list-image li').remove();
        }
    });
});

$(document).on('click', '.editP', function() {
    var pname = $('#editProduct #pname2').val().replace(/\s\s+/g, ' ').trim();
    var codeP = $('#editProduct .codeP').val();
    var old_codeP = $('#editProduct .codeP').attr('data-codeP');
    var pprice = $('#editProduct #pprice2').val();
    var pgroup = $('#editProduct #pgroup2').val().replace(/\s\s+/g, ' ').trim();
    var description = CKEDITOR.instances.editor2.getData().replace(/\s\s+/g, ' ').trim();
    var image_list_exist = '';

    pprice = convertCurrencyToNumber(pprice);

    if (pname == '') {
        $('#editProduct #pname2').next('.notBlank').fadeIn();
        $('#editProduct #pname2').focus();
        return false;
    } else if (pprice == '') {
        $('#editProduct #pprice2').next('.notBlank').fadeIn();
        $('#editProduct #pprice2').focus();
        return false;
    } else if (pgroup == null) {
        $('#editProduct #pgroup2').next('.button-add-cate').next('.notBlank').fadeIn();
        setTimeout(function() {
            $('#editProduct #pgroup2').next('.button-add-cate').next('.notBlank').fadeOut();
        }, 1500);
        return false;
    }

    var formData = new FormData();
    pname = pname.toLowerCase();
    pname = pname.substr(0, 1).toUpperCase() + pname.substr(1);

    var number_photos = $('#editProduct .chosen-list-image li').length;
    var number_photos_upload = $('#editProduct .chosen-list-image li .inputfile').length;

    if (number_photos > 0) {
        for (var i = 0; i < number_photos; i++) {

            if (i < number_photos - number_photos_upload) {
                var src = $($('#editProduct .chosen-list-image').children('li')[i]).children('.img').attr('src').split('/');
                image_list_exist += src[3];
                if (i < number_photos - number_photos_upload - 1) {
                    image_list_exist += ',';
                }
            } else {
                formData.append('imgList[]', $($('#editProduct .chosen-list-image').children('li')[i]).children('.inputfile').prop('f'));
            }
        }
    }

    var category = pgroup.split(">>");
    var g_name = category[1].replace(/\s\s+/g, ' ').trim();
    var p_group = category[0].replace(/\s\s+/g, ' ').trim();
    var detail_content = convertVnToEn(pname) + ' ' + convertVnToEn(description).replace(/<\/?[^>]+(>|$)/g, "");
    var index = page_index;

    formData.append('pname', pname);
    formData.append('codeP', codeP);
    formData.append('old_codeP', old_codeP);
    formData.append('pprice', pprice);
    formData.append('g_name', g_name);
    formData.append('p_group', p_group);
    formData.append('description', description);
    formData.append('index', index);
    formData.append('detail_content', detail_content);
    formData.append('image_list_exist', image_list_exist);

    $.ajax({
        url: 'ajaxEditProduct',
        type: 'POST',
        dataType: 'json',
        data: formData,
        contentType: false,
        processData: false,

        success: function(result) {
            if (result == "duplicatedC") {
                $('#editProduct .codeP').next('.notBlank').fadeIn();
                $('#editProduct .codeP').focus();
                return false;
            }
            loadProducts(result);
            save_success();
            $('#editProduct').modal('hide');
        }
    });
});

$(document).on('click', '.yesP', function() {
    var idP = [];
    var id_list = '';
    var category = '';
    var g_name = '';
    var p_group = '';

    id_list = $(this).parentsUntil('.check-delete').find('.product-info-id').text();
    category = $(this).parentsUntil('.check-delete').find('.product-info-category').text();

    idP = id_list.split(',');

    g_name = category.split('>>')[1];
    p_group = category.split('>>')[0];

    $.ajax({
        url: 'ajaxDeleteProduct',
        type: 'POST',
        dataType: 'json',
        data: {
            idP: idP,
            g_name: g_name,
            p_group: p_group
        },
        success: function(result) {
            loadProducts(result[0]);

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

$(document).on('click', '.sub-menu-item', function() {
    var g_name = $(this).children('a').text();
    var p_group = $(this).parentsUntil('.list-categories-item').prev('.name-category').children('.name-category-detail').text();

    $.ajax({
        url: 'ajaxGetProducts',
        type: 'POST',
        dataType: 'json',
        data: {
            g_name: g_name,
            p_group: p_group,
        },
        success: function(result) {
            loadProducts(result[0]);
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

    var pgroup = $('.products').find('.sh-info:first').find('small').text();

    var category = pgroup.split(">>");
    var g_name = category[1].replace(/\s\s+/g, ' ').trim();
    var p_group = category[0].replace(/\s\s+/g, ' ').trim();

    $.ajax({
        url: 'ajaxLoadPage',
        type: 'POST',
        dataType: 'json',
        data: {
            page_index: page_index,
            g_name: g_name,
            p_group: p_group,
        },
        success: function(result) {
            loadProducts(result);
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

    var pgroup = $('.products').find('.sh-info:first').find('small').text();

    var category = pgroup.split(">>");
    var g_name = category[1].replace(/\s\s+/g, ' ').trim();
    var p_group = category[0].replace(/\s\s+/g, ' ').trim();

    $.ajax({
        url: 'ajaxLoadPage',
        type: 'POST',
        dataType: 'json',
        data: {
            page_index: page_index,
            g_name: g_name,
            p_group: p_group,
        },
        success: function(result) {
            loadProducts(result);
        }
    });
});

$(document).on('keyup', '#inputFocus', debounce(function(event) {
    $('.pagination').html('');
    if ($(this).val() == '') {
        return false;
    }

    $.ajax({
        url: 'ajaxSearchProduct',
        type: 'POST',
        dataType: 'json',
        data: { key_word: $(this).val() },
        success: function(result) {
            page_index = '1';
            loadProducts(result);
        }
    });
}, 1000));

$(document).ready(function() {
    $('#main-menu').find('li').removeClass('active');
    $($('#main-menu').find('li')[1]).addClass('active');
    $.ajax({
        url: 'ajaxGetProducts',
        type: 'GET',
        dataType: 'json',
        success: function(result) {
            loadProducts(result[0]);

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
    });
});

function loadProducts(result) {

    $('.form-check-inputP').prop('checked', false);
    $('.delete-allP').fadeOut('slow');
    $('.checked-messageP').fadeOut('slow');
    var template = '';
    if (result == null || result == '') {
        template = '<tr class="empty-product text-center"><td colspan="6"><p>Product is currently empty, please add products!!!</p></td></tr>';
    } else {
        for (var i = 0; i < result.length; i++) {
            template += '<tr class="sh-info">' + '<td class="check-boxP"><input type="checkbox" class="form-check-inputP" value=""></td>' +
                '<td>' + result[i]['tProductManagement']['code'] + '</td>';
            var list_image = '';
            var main_image = '';
            result[i]['tProductManagement']['price'] = convertNumberToCurrency(result[i]['tProductManagement']['price']);
            list_image = result[i]['tProductManagement']['image'].split(',');
            main_image = list_image[0];
            if (main_image == '') {
                main_image = 'default-product-img.jpg';
            }
            template += '<td><img src="../img/products/' + main_image + '" alt="" class="img-sh-info"></td>' + '<td>' + '<h6>' + result[i]['tProductManagement']['name'] + '</h6>' +
                '<small>' + result[i]['CategoryManagement']['category'] + '>>' + result[i]['CategoryManagement']['type'] + '</small>' + '</td>' +
                '<td>' + result[i]['tProductManagement']['price'] + '</td>' + '<td>' + result[i]['tProductManagement']['sold'] + '</td>' + '</tr>' +
                '<tr class="product-detail">' + '<td colspan="6">' + '<div class="row">' + '<div class="col-sm-12 one-product">' + '<div class="product-name">' + result[i]['tProductManagement']['name'] + '</div>' +
                '<div class="row">' + '<div class="col-lg-4 col-sm-12 img-product">' + '<div class="img-product-main">' + '<img src="../img/products/' + main_image + '" alt="" class="main">' + '</div>' +
                '<div class="img-product-secondary">' + '<ul class="d-flex flex-column">' + '<li class="active">' + '<img src="../img/products/' + main_image + '" alt="" class="secondary">' + '<a class="curtain-frame"></a>' + '</li>';
            if (list_image.length > 1) {
                for (var j = 1; j < list_image.length; j++) {
                    template += '<li>' + '<img src="../img/products/' + list_image[j] + '" alt="" class="secondary">' + '<a class="curtain-frame"></a>' + '</li>';
                }
            }
            template += '</ul>' + '</div>' + '</div>' + '<div class="col-lg-7 col-sm-10 info-product">' + '<div class="form-group key-product">' + '<label class="form-label control-label ">Product key:</label>' +
                '<div class="form-control-static"><strong>' + result[i]['tProductManagement']['code'] + '</strong></div>' + '</div>' + '<div class="form-group group-product">' + ' <label for="" class="form-label control-label ">Group of goods:</label>' +
                '<div class="form-control-static"><strong>' + result[i]['CategoryManagement']['category'] + '>>' + result[i]['CategoryManagement']['type'] + '</strong></div>' + '</div>' + '<div class="form-group price-product">' + '<label for="" class="form-label control-label ">Unit price:</label>' +
                '<div class="form-control-static"><strong>' + result[i]['tProductManagement']['price'] + '</strong></div>' + '</div>' + '<div class="form-group">' + '<label for="" class="form-label control-label ">Sold:</label>' + '<div class="form-control-static"><strong>' + result[i]['tProductManagement']['sold'] +
                '</strong></div>' + '</div>' + '<div class="form-group des-product">' + '<label for="" class="form-label control-label ">Description:</label>' + '<div class="form-control-static"><strong>' + result[i]['tProductManagement']['description'] + '</strong></div>' + '</div>' + '</div>' +
                '<div class="col-lg-1 col-sm-2 btn-product">' + '<div class="btn1 shadow edit-product"><i class="fas fa-pencil-alt icon-product"></i></div>' + '<div class="btn1 shadow delete-product"><i class="fas fa-times icon-product"></i></i></div>' + '</div>' + '</div>' + '</div>' + '</div>' + '</td>' + '</tr>';
        }
    }
    $('.notBlank').fadeOut();
    $('.products').find('tbody').html(template);
}

$(document).on('keyup', '#gname, #gname1, #pname, #pprice, .codeP', function() {
    $(this).next('.notBlank').fadeOut();
});

function convertVnToEn(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
}