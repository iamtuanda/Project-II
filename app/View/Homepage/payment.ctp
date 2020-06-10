<?php
    echo $this->Html->css(
        array(
            'customer/shipping',
            'customer/payment'
        ),
        array(
            'inline' => false
        )
    );

    echo $this->Html->script(
        array(
            'jquery-ui/jquery-ui',
            'customer/payment',
            'customer/header',
            'bootstrap/bootstrap-datepicker.min',
            'lib/address',
            'customer/function'
        ),
        array(
            'inline' => false
        )
    );
?>
<?php
    if (sizeof($customer_cart) > 0) {
        $user = $this->Session->read('user');
        if (!empty($customer_cart[0]['tCustomer']['address_code'])) {
            $address_code = explode(",", $customer_cart[0]['tCustomer']['address_code']);
            $province = $address_code[0];
            $county = $address_code[1];
            $ward = $address_code[2];
        } else {
            header("Location: home");
            exit;
        }
    } else {
        header("Location: home");
        exit;
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
                <li data-step="2" class="is-complete">
                    Address
                </li>
                <li data-step="3" class="progress__last is-active">
                    Payment & order
                </li>
            </ol>
        </div>
        <div class="col-3 col-sm-3 col-md-3 col-lg-3 cart-payment">
            <a href="cart" class="btn btn-danger"> <i class="fas fa-shopping-cart"></i> <span>Shopping Cart</span></a>
        </div>
    </div>
</div>

<div id="payment" data-name="<?php echo $user['username']; ?>">
    <div class="container">
        <div class="row">
            <div class="col-12 col-sm-12 col-md-12 col-lg-8 payment-left">
                <div class="step-1 step">
                    <h4>1. Chọn hình thức giao hàng</h4>
                    <div class="card card-default">
                        <div class="cntr">
                            <label for="opt1" class="radio">
                                <input type="radio" name="method_shipping" id="opt1" class="hidden" checked="" />
                                <span class="label"></span> Giao hàng tiêu chuẩn
                                <?php if ($event == true) { ?>
                                    <span class="fee_ship" data-fee="true" data-value="<?php echo $value; ?> "></span>
                                <?php } else { ?>
                                    <span class="fee_ship" data-fee="false">30.000 đ</span>
                                <?php } ?>  
                            </label>
                        </div>
                    </div>
                </div>
                <div class="step-2 step">
                    <h4>2. Thanh toán bằng Mishon Point</h4>
                    <div class="card card-default">
                        <?php if ((int)$customer_cart[0]['tCustomer']['point'] > 0 ) { ?>
                            <input class="inp-cbx" id="cbx" type="checkbox" style="display: none;" />
                            <label class="cbx" for="cbx">
                                <span>
                                    <svg width="12px" height="10px" viewbox="0 0 12 10">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                    </svg>
                                </span>
                                <span>Sử dụng điểm để thanh toán</span>
                            </label>
                            <p> Bạn có <span class="point"><?php echo $customer_cart[0]['tCustomer']['point']; ?> </span> point, tương ứng với <span class="money"><?php echo (float)$customer_cart[0]['tCustomer']['point'] * 1000; ?></span> đ</p>
                        <?php } else { ?>
                            <p class="error">Bạn không có đủ số điểm để thanh toán</p>
                        <?php } ?>
                    </div>
                </div>
                <div class="step-3 step">
                    <h4>3. Chọn hình thức thanh toán</h4>
                    <div class="card card-default">
                        <p class="text-danger">Xin lỗi, vì hiện tại chúng tôi chỉ có một hình thức thanh toán khi nhận hàng</p>
                        <div class="cntr">
                            <label for="opt2" class="radio">
                                <input type="radio" name="method_payment" id="opt2" class="hidden" checked="" />
                                <span class="label"></span> Thanh toán tiền mặt khi nhận hàng
                            </label>
                        </div>
                    </div>
                </div>
                <div class="step-4 step">
                    <h4>4. Ghi chú</h4>
                    <div class="card card-default">
                        <textarea class="form-control note" aria-label="With textarea"></textarea>
                    </div>
                </div>
                <div class="step">
                    <div class="alert alert-info alert-time">
                        Dự kiến giao hàng trước ngày <strong><?php echo date('d/m/Y', strtotime('+7 days')); ?></strong>
                    </div>
                </div>
                <div class="step-5 step">
                    <button class="btn btn-danger btn-block btn-order">ĐẶT MUA</button>
                    <div class="alert alert-danger text-center alert-order" role="alert">
                        (Xin vui lòng kiểm tra lại đơn hàng trước khi Đặt Mua)
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-4 payment-right">
                <div class="return-address">
                    <div class="card card-default">
                        <div class="card-address-header">
                            <span>Địa chỉ giao hàng</span>
                            <a href="shipping" class="btn btn-secondary"><span class="fa fa-pencil-alt"></span></a>
                        </div>
                        <div class="card-body information">
                            <div class="fullname"><?php echo $customer_cart[0]['tCustomer']['fullname']; ?> </div>
                            <div class="address"><?php echo $customer_cart[0]['tCustomer']['address']; ?></div>
                            <div class="phone">Điện thoại: <span><?php echo $customer_cart[0]['tCustomer']['phone']; ?></span></div>
                        </div>
                    </div>
                </div>
                <div class="return-cart">
                    <div class="card card-default">
                        <div class="card-cart-header">
                            <span>Đơn hàng ( <span><?php echo sizeof($customer_cart); ?> </span> sản phẩm)</span>
                            <a href="cart" class="btn btn-secondary"><span class="fa fa-pencil-alt"></span></a>
                        </div>
                        <div class="card-body products">
                            <?php foreach ($customer_cart as $key => $cart) :?>
                                <div class="item" data-id="<?php echo base64_encode($cart['tProduct']['id']); ?>" data-price="<?php echo $cart['tProduct']['price']; ?>" data-finish-price="<?php echo $cart['tProduct']['finish_price']; ?>" data-code="<?php echo $cart['tProduct']['code']; ?>" >
                                    <p class="title">
                                        <strong><?php echo $cart['tShoppingCart']['quantity'] ?> x</strong><a href="product_detail?p=<?php echo base64_encode($cart['tProduct']['id']); ?>" target="_blank"><?php echo $cart['tProduct']['name']; ?></a>
                                    </p>
                                    <p class="price text-right">
                                        <span><?php echo (int)$cart['tShoppingCart']['quantity'] * (int)$cart['tProduct']['finish_price']; ?></span>
                                    </p>
                                </div>
                            <?php endforeach ?>
                        </div>
                        <div class="card-body list-info-price">
                            <div class="li">
                                <p class="title text-left">Tạm tính</p>
                                <p class="text-right provisonal">
                                    <span></span>
                                </p>
                            </div>
                            <div class="li">
                                <p class="title text-left">Phí vận chuyển</p>
                                <p class="text-right fee-ship">
                                    <span></span>
                                </p>
                            </div>
                            
                        </div>
                        <div class="card-body total">
                            <div>
                                <p class="title text-left">Thành tiền:</p>
                                <p class="text-right price-total">
                                    <span></span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

