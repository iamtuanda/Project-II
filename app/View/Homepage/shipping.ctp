<?php
    echo $this->Html->css(array('customer/shipping'),array('inline' => false));

    echo $this->Html->script(
        array(
            'jquery-ui/jquery-ui',
            'customer/shipping',
            'bootstrap/bootstrap-datepicker.min',
            'lib/address',
        ),
        array(
            'inline' => false
        )
    );
?>
<?php
    $user = $this->Session->read('user');
    if (!empty($customer['tCustomer']['address_code'])) {
        $address_code = explode(",", $customer['tCustomer']['address_code']);
        $province = $address_code[0];
        $county = $address_code[1];
        $ward = $address_code[2];
    }
?>
<div class="container-fluid" id="header-payment" data-id="<?php echo base64_encode($user['id']); ?> ">
    <div class="row">
        <div class="col-3 col-sm-3 col-md-3 col-lg-3 logo-paymentt">
            <a href="home">
                <?php echo $this->Html->image('logo_mishon.png'); ?>
            </a>
        </div>
        <div class="col-6 col-sm-6 col-md-6 col-lg-6 progress-payment">
            <ol class="my-progress">
                <li class="is-complete" data-step="1">
                    Login
                </li>
                <li data-step="2" class="is-active">
                    Address
                </li>
                <li data-step="3" class="progress__last">
                    Payment & order
                </li>
            </ol>
        </div>
        <div class="col-3 col-sm-3 col-md-3 col-lg-3 cart-payment">
            <a href="cart" class="btn btn-danger"> <i class="fas fa-shopping-cart"></i> <span>Shopping Cart</span></a>
        </div>
    </div>
</div>
<div id="address">
    <div class="container">
        <?php if ($customer['tCustomer']['address_code']) { ?>
        <h3 class="address-title">Delivery address</h3>
        <div class="row">
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 frame-address" data-province="<?php echo $province; ?>" data-county="<?php echo $county; ?>" data-ward="<?php echo $ward; ?>">
                <p class="frame-address-fullname"><?php echo $customer['tCustomer']['fullname']; ?></p>
                <p><span>Address:</span> <span><?php echo $customer['tCustomer']['address']; ?></span></p>
                <p><span>Phone: </span> <?php echo $customer['tCustomer']['phone']; ?></p>
                <a href="payment" class="btn btn-info">Ship to this address</a>
                <span class="btn btn-danger btn-edit">Edit</span>
            </div>
        </div>
        <?php } else { ?>
        <div class="row" id="update">
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 frame-update-address">
                <p>Update shipping address</p>
                <div class="frame-update-fullname frame-li">
                    <div class="row">
                        <div class="col-1 col-sm-1 col-md-2 col-lg-2"></div>
                        <div class="col-3 col-sm-3 col-md-2 col-lg-2 label">
                            Fullname <span class="text-danger">*</span>
                        </div>
                        <div class="col-6 col-sm-6 col-md-6 col-lg-6">
                            <input type="text" class="form-control fullname input1" value="<?php echo $customer['tCustomer']['fullname']; ?>">
                        </div>
                        <div class="col-1 col-sm-1 col-md-1 col-lg-1 notify1" hidden="true">
                            <i class="fas fa-times"></i>
                        </div>
                    </div>
                </div>
                <div class="frame-update-phone frame-li">
                    <div class="row">
                        <div class="col-1 col-sm-1 col-md-2 col-lg-2"></div>
                        <div class="col-3 col-sm-3 col-md-2 col-lg-2 label">
                            Phone <span class="text-danger">*</span>
                        </div>
                        <div class="col-6 col-sm-6 col-md-6 col-lg-6">
                            <input type="text" class="form-control phone input2" value="<?php echo $customer['tCustomer']['phone']; ?>">
                        </div>
                        <div class="col-1 col-sm-1 col-md-1 col-lg-1 notify2" hidden="true">
                            <i class="fas fa-times"></i>
                        </div>
                    </div>
                </div>
                <div class="frame-update-province frame-li">
                    <div class="row">
                        <div class="col-1 col-sm-1 col-md-2 col-lg-2"></div>
                        <div class="col-3 col-sm-3 col-md-2 col-lg-2 label">
                            Province / City <span class="text-danger">*</span>
                        </div>
                        <div class="col-6 col-sm-6 col-md-6 col-lg-6">
                            <select name="province" class="form-control address province input3">
                                <option value="00">Chọn Tỉnh/Thành phố</option>
                            </select>
                        </div>
                        <div class="col-1 col-sm-1 col-md-1 col-lg-1 notify3" hidden="true">
                            <i class="fas fa-times"></i>
                        </div>
                    </div>
                </div>
                <div class="frame-update-county frame-li">
                    <div class="row">
                        <div class="col-1 col-sm-1 col-md-2 col-lg-2"></div>
                        <div class="col-3 col-sm-3 col-md-2 col-lg-2 label">
                            District <span class="text-danger">*</span>
                        </div>
                        <div class="col-6 col-sm-6 col-md-6 col-lg-6">
                            <select name="county" class="form-control address county input4">
                                <option value="00">Chọn Quận/Huyện</option>
                            </select>
                        </div>
                        <div class="col-1 col-sm-1 col-md-1 col-lg-1 notify4" hidden="true">
                            <i class="fas fa-times"></i>
                        </div>
                    </div>
                </div>
                <div class="frame-update-ward frame-li">
                    <div class="row">
                        <div class="col-1 col-sm-1 col-md-2 col-lg-2"></div>
                        <div class="col-3 col-sm-3 col-md-2 col-lg-2 label">
                            Ward <span class="text-danger">*</span>
                        </div>
                        <div class="col-6 col-sm-6 col-md-6 col-lg-6">
                            <select name="ward" class="form-control address ward input5">
                                <option value="00">Chọn Xã/Phường</option>
                            </select>
                        </div>
                        <div class="col-1 col-sm-1 col-md-1 col-lg-1 notify5" hidden="true">
                            <i class="fas fa-times"></i>
                        </div>
                    </div>
                </div>
                <div class="frame-update-address frame-li">
                    <div class="row">
                        <div class="col-1 col-sm-1 col-md-2 col-lg-2"></div>
                        <div class="col-3 col-sm-3 col-md-2 col-lg-2 label">
                            Address <span class="text-danger">*</span>
                        </div>
                        <div class="col-6 col-sm-6 col-md-6 col-lg-6">
                            <input type="text" class="form-control address input6" value="<?php echo $customer['tCustomer']['address_detail']; ?>">
                        </div>
                        <div class="col-1 col-sm-1 col-md-1 col-lg-1 notify6" hidden="true">
                            <i class="fas fa-times"></i>
                        </div>
                    </div>
                </div>
                <div class="frame-update-funtion frame-li">
                    <div class="row">
                        <div class="col-1 col-sm-1 col-md-2 col-lg-2"></div>
                        <div class="col-3 col-sm-3 col-md-2 col-lg-2 label"></div>
                        <div class="col-6 col-sm-6 col-md-6 col-lg-6">
                            <button class="btn btn-success btn-update">Update</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <?php } ?>
    </div>
</div>

