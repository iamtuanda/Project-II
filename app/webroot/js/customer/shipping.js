$(document).ready(function() {
    provinces.forEach((province, index) => {
        var o = new Option(province.name, province.matp);
        $("select.province").append(o);
    });
});

$(document).on('change', 'select.province', function(event) {
    $("select.county").html("");
    var o = new Option("Chọn Quận/Huyện", "00");
    $("select.county").append(o);

    $("select.ward").html("");
    var o = new Option("Chọn Xã/Phường", "00");
    $("select.ward").append(o);

    if ($(this).val() != "00") {
        $("select.county").html("");
        var o = new Option("Chọn Quận/Huyện", "00");
        $("select.county").append(o);
        countys.forEach((county, index) => {
            if ($(this).val() == county.matp) {
                var o = new Option(county.name, county.maqh);
                $("select.county").append(o);
            }
        });
    }
});

$(document).on('change', 'select.county', function(event) {
    $("select.ward").html("");
    var o = new Option("Chọn Xã/Phường", "00");
    $("select.ward").append(o);

    if ($(this).val() != "00") {
        wards.forEach((ward, index) => {
            if ($(this).val() == ward.maqh) {
                var o = new Option(ward.name, ward.maxp);
                $("select.ward").append(o);
            }
        });
    }
});

$(document).on('click', '.btn-update', function(event) {
    var fullname = $("input.fullname").val().replace(/\s\s+/g, ' ').trim();
    var phone = $("input.phone").val().replace(/\s\s+/g, ' ').trim();
    var phone_vn_regex = /((09|03|07|08)+([0-9]{8})\b)/g;
    var province = $("select.province option:selected").text();
    var value1 = $("select.province").val();
    var county = $("select.county option:selected").text();
    var value2 = $("select.county").val();
    var ward = $("select.ward option:selected").text();
    var value3 = $("select.ward").val();
    var address = $("input.address").val().replace(/\s\s+/g, ' ').trim();;
    if (fullname.length === 0) {
        showNotify(1);
    } else if (phone.length === 0 || !phone_vn_regex.test(phone)) {
        showNotify(2);
    } else if (value1 == "00") {
        showNotify(3);
    } else if (value2 == "00") {
        showNotify(4);
    } else if (value3 == "00") {
        showNotify(5);
    } else if (address.length === 0) {
        showNotify(6);
    } else {
        showNotify(0);
        $("input.fullname").val(fullname);

        var customer_id = atob($("#header-payment").data('id'));
        $.ajax({
            url: 'ajaxUpdateAddress',
            type: 'POST',
            dataType: 'json',
            data: {
                customer_id: customer_id,
                address : address + ", " + ward + ", " + county + ", " + province,
                address_code: value1 + "," + value2 + "," + value3,
                address_detail: address,
                fullname: fullname,
                phone: phone
            },
            success: function(){
                $("#address .container").html("");
                var template = "<h3 class='address-title'>Delivery address</h3>"
                + "<div class='row'>"
                + "<div class='col-12 col-sm-12 col-md-12 col-lg-12 frame-address' data-province='"
                + value1
                + "' data-county='"
                + value2
                + "' data-ward='"
                + value3
                + "'>"
                + "<p class='frame-address-fullname'>"
                + fullname
                + "</p>"
                + "<p><span>Address: </span><span>"
                + address + ", " + ward + ", " + county + ", " + province
                + "</span></p>"
                + "<p><span>Phone: </span>" 
                + phone
                + "</p>"
                + "<a href='payment' class='btn btn-info'>Ship to this address</a> "
                + "<span class='btn btn-danger btn-edit'>Edit</span>"
                + "</div>"
                + "</div>" ;
                $("#address .container").append(template);
            }
        })
        
    }

    
});

$(document).on('click', '.btn-edit', function(event) {
    $("#update").remove();
    var customer_id = atob($("#header-payment").data('id'));
    $.ajax({
        url: 'ajaxGetInfoCustomer',
        type: 'POST',
        dataType: 'json',
        data: {
            customer_id: customer_id
        },
        success: function(customer){
            var address_code = customer['tCustomer']['address_code'].split(",");
            var add_province = address_code['0'];
            var add_county = address_code['1'];
            var add_ward = address_code['2'];
            var template_province = "";
            provinces.forEach((province, index) => {
                if (province.matp == add_province) {
                    template_province += "<option value='"+ province.matp +"' selected>" + province.name +"</option>";
                } else {
                    template_province += "<option value='"+ province.matp +"'>" + province.name +"</option>";
                }
            });

            var template_county = "";
            countys.forEach((county, index) => {
                if (county.matp == add_province) {
                    if (county.maqh == add_county) {
                    template_county += "<option value='"+ county.maqh +"' selected>" + county.name +"</option>";
                    } else {
                        template_county += "<option value='"+ county.maqh +"'>" + county.name +"</option>";
                    }
                }
            });

            var template_ward = "";
            wards.forEach((ward, index) => {
                if (ward.maqh == add_county) {
                    if (ward.maxp == add_ward) {
                    template_ward += "<option value='"+ ward.maxp +"' selected>" + ward.name +"</option>";
                    } else {
                        template_ward += "<option value='"+ ward.maxp +"'>" + ward.name +"</option>";
                    }
                }
            });

            var template = "<div class='row' id='update'>"
            + "<div class='col-12 col-sm-12 col-md-12 col-lg-12 frame-update-address'>"
            + "<p>Update shipping address</p>"
            + "<div class='frame-update-fullname frame-li'>"
            + "<div class='row'>"
            + "<div class='col-1 col-sm-1 col-md-2 col-lg-2'></div>"
            + "<div class='col-3 col-sm-3 col-md-2 col-lg-2 label'>Fullname <span class='text-danger'>*</span>"
            + "</div>"
            + "<div class='col-6 col-sm-6 col-md-6 col-lg-6'>"
            + "<input type='text' class='form-control fullname input1' value='" + customer['tCustomer']['fullname'] + "'>"
            + "</div>"
            + "<div class='col-1 col-sm-1 col-md-1 col-lg-1 notify1' hidden='true'>"
            + "<i class='fas fa-times'></i>"
            + "</div>"
            + "</div>"
            + "</div>"
            + "<div class='frame-update-phone frame-li'>"
            + "<div class='row'>"
            + "<div class='col-1 col-sm-1 col-md-2 col-lg-2'>"
            + "</div>"
            + "<div class='col-3 col-sm-3 col-md-2 col-lg-2 label'>Phone <span class='text-danger'>*</span>"
            + "</div>"
            + "<div class='col-6 col-sm-6 col-md-6 col-lg-6'>"
            + "<input type='text' class='form-control phone input2' value='" + customer['tCustomer']['phone'] + "'>"
            + "</div>"
            + "<div class='col-1 col-sm-1 col-md-1 col-lg-1 notify2' hidden='true'>"
            + "<i class='fas fa-times'></i>"
            + "</div>"
            + "</div>"
            + "</div>"
            + "<div class='frame-update-province frame-li'>"
            + "<div class='row'>"
            + "<div class='col-1 col-sm-1 col-md-2 col-lg-2'>"
            + "</div>"
            + "<div class='col-3 col-sm-3 col-md-2 col-lg-2 label'>Province / City<span class='text-danger'>*</span>"
            + "</div>"
            + "<div class='col-6 col-sm-6 col-md-6 col-lg-6'>"
            + "<select name='province' class='form-control address province input3'>"
            + "<option value='00'>Chọn Tỉnh/Thành phố</option>"
            + template_province
            + "</select>"
            + "</div>"
            + "<div class='col-1 col-sm-1 col-md-1 col-lg-1 notify3' hidden='true'>"
            + "<i class='fas fa-times'></i>"
            + "</div>"
            + "</div>"
            + "</div>"
            + "<div class='frame-update-county frame-li'>"
            + "<div class='row'>"
            + "<div class='col-1 col-sm-1 col-md-2 col-lg-2'>"
            + "</div>"
            + "<div class='col-3 col-sm-3 col-md-2 col-lg-2 label'>District <span class='text-danger'>*</span>"
            + "</div>"
            + "<div class='col-6 col-sm-6 col-md-6 col-lg-6'>"
            + "<select name='county' class='form-control address county input4'>"
            + "<option value='00'>Chọn Quận/Huyện</option>"
            + template_county
            + "</select>"
            + "</div>"
            + "<div class='col-1 col-sm-1 col-md-1 col-lg-1 notify4' hidden='true'>"
            + "<i class='fas fa-times'></i>"
            + "</div>"
            + "</div>"
            + "</div>"
            + "<div class='frame-update-ward frame-li'>"
            + "<div class='row'>"
            + "<div class='col-1 col-sm-1 col-md-2 col-lg-2'>"
            + "</div>"
            + "<div class='col-3 col-sm-3 col-md-2 col-lg-2 label'>Ward <span class='text-danger'>*</span>"
            + "</div>"
            + "<div class='col-6 col-sm-6 col-md-6 col-lg-6'>"
            + "<select name='ward' class='form-control address ward input5'>"
            + "<option value='00'>Chọn Xã/Phường</option>"
            + template_ward
            + "</select>"
            + "</div>"
            + "<div class='col-1 col-sm-1 col-md-1 col-lg-1 notify5' hidden='true'>"
            + "<i class='fas fa-times'></i>"
            + "</div>"
            + "</div>"
            + "</div>"
            + "<div class='frame-update-address frame-li'>"
            + "<div class='row'>"
            + "<div class='col-1 col-sm-1 col-md-2 col-lg-2'>"
            + "</div>"
            + "<div class='col-3 col-sm-3 col-md-2 col-lg-2 label'>Address <span class='text-danger'>*</span>"
            + "</div>"
            + "<div class='col-6 col-sm-6 col-md-6 col-lg-6'>"
            + "<input type='text' class='form-control address input6' value='" + customer['tCustomer']['address_detail'] + "'>"
            + "</div>"
            + "<div class='col-1 col-sm-1 col-md-1 col-lg-1 notify6' hidden='true'>"
            + "<i class='fas fa-times'></i>"
            + "</div>"
            + "</div>"
            + "</div>"
            + "<div class='frame-update-funtion frame-li'>"
            + "<div class='row'>"
            + "<div class='col-1 col-sm-1 col-md-2 col-lg-2'>"
            + "</div>"
            + "<div class='col-3 col-sm-3 col-md-2 col-lg-2 label'>"
            + "</div>"
            + "<div class='col-6 col-sm-6 col-md-6 col-lg-6'>"
            + "<button class='btn btn-success btn-update'>Update</button> "
            + "<button class='btn btn-secondary btn-cancel'>Cancel</button>"
            + "</div>"
            + "</div>"
            + "</div>"
            + "</div>"
            + "</div>";

            $("#address .container").append(template);
        }
    });
});

$(document).on('click', '.btn-cancel', function(event) {
    $("#update").remove();
});

$(document).on('keypress', 'input', function(event) {
    $(this).removeAttr('style');
    $(this).parent().next().attr('hidden', 'true');
});

$(document).on('change', 'select', function(event) {
    $(this).removeAttr('style');
    $(this).parent().next().attr('hidden', 'true');
});

function showNotify(index){

    for (var i = 1; i < 7; i++) {
        $(".notify" + i).attr('hidden', 'true');
        $(".input" + i).blur().removeAttr('style');
        if (i == index) {
            $(".notify" + i).removeAttr('hidden');
            $(".input" + i).css('border', '1px solid red').focus();
        }
    }
}