<?php
    echo $this->Html->css(
        array(
            'customer/order',
            'customer/icon',
            'customer/header',
            'customer/home',
            'customer/shipping',
            'customer/info',
            'customer/payment'
        ),
        array(
            'inline' => false
        )
    );

    echo $this->Html->script(
        array(
            'jquery-ui/jquery-ui',
            'customer/order',
            'customer/header',
            'customer/add_to_cart',
            'bootstrap/bootstrap-datepicker.min',
            'lib/address',
            'customer/function'
        ),
        array(
            'inline' => false
        )
    );

    $user = $this->Session->read('user');
    echo $this->element('home/header');
?>
<?php if ($quantity == '1') { ?>
    <?php if ($order_detail['tOrder']['customer_id'] == $user['id']) { ?>
        <?php
            switch ($order_detail['tOrder']['statement']) {
                case 'Successful':
                    $status = 'Đặt hàng thành công';
                    break;
                case 'Delivering':
                    $status = 'Đang vận chuyển';
                    break;
                case 'Delivered':
                    $status = 'Giao hàng thành công';
                    break;
            }
        ?>
        <div id="order-view" >
            <div class="container">
                <div class="row order-header">
                    <div class="col-12 col-sm-12 col-md-6 col-lg-6 order-status">
                        Chi tiết đơn hàng #<span><?php echo $order_detail['tOrder']['id']; ?></span> - <strong><?php echo $status; ?></strong>
                    </div>
                    <div class="col-12 col-sm-12 col-md-6 col-lg-6 order-time">
                        Ngày đặt hàng: <?php echo $order_detail['tOrder']['time']; ?>
                    </div>
                </div>
                <div class="row order-info">
                    <div class="col-12 col-sm-6 col-md-4 col-lg-4 order-address">
                        <h4>ĐỊA CHỈ NGƯỜI NHẬN</h4>
                        <div class="card card-default">
                            <?php echo $order_detail['tOrder']['contact']; ?>
                        </div>
                    </div>
                    <div class="col-12 col-sm-6 col-md-4 col-lg-4 order-method-shipping">
                        <h4>HÌNH THỨC GIAO HÀNG</h4>
                        <div class="card card-default">
                            Giao trước <?php echo $order_detail['tOrderTrack']['expected_time']; ?>
                            <br/>Phí vận chuyển: <?php echo preg_replace('/\,/', '.', $order_detail['tOrder']['ship-fee']);  ?>đ
                        </div>
                    </div>
                    <div class="col-12 col-sm-6 col-md-4 col-lg-4 order-method-payment">
                        <h4>HÌNH THỨC THANH TOÁN</h4>
                        <div class="card card-default">
                            Thanh toán tiền mặt khi nhận hàng
                        </div>
                    </div>
                </div>
                <div class="row order-content">
                    <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                        <div class="card card-default">
                            <table class="table text-nowrap table-responsive">
                                <thead class="text-center">
                                    <tr>
                                        <th width="60%">Sản phẩm</th>
                                        <th width="10%">Giá</th>
                                        <th width="10%">Số lượng</th>
                                        <th width="10%">Giảm giá</th>
                                        <th width="10%">Tạm tính</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php foreach ($products as $key => $product) : ?>
                                        <?php 
                                            $images = explode(",",$product['tProductSold']['image']);
                                            $image = $images[0];
                                        ?>
                                        <tr>
                                            <td>
                                                <img class="img-responsive thumb" src="../img/products/<?php echo $image; ?>" />
                                                <div class="product-info">
                                                    <a class="name" href="product_detail?code=<?php echo base64_encode($product['tProductSold']['product_code']); ?>" target="_blank">
                                                    <?php echo $product['tProductSold']['name']; ?></a>
                                                </div>
                                            </td>
                                            <td class="text-center begin-price"><?php echo $product['tOrderDetail']['price']; ?> đ</td>
                                            <td class="text-center"><?php echo $product['tOrderDetail']['quantity']; ?></td>
                                            <td class="text-center discount-price"><?php echo $product['tOrderDetail']['price'] - $product['tOrderDetail']['discount_price']; ?> đ</td>
                                            <td class="text-center finish-price"><?php echo $product['tOrderDetail']['discount_price'] * $product['tOrderDetail']['quantity']; ?> đ</td>
                                        </tr>
                                    <?php endforeach ?>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="4">Tạm tính</td>
                                        <td class="provisonal-price"> đ</td>
                                    </tr>
                                    <tr>
                                        <td colspan="4">Phí vẫn chuyển</td>
                                        <td class="fee-price"><?php echo preg_replace('/\,/', '.', $order_detail['tOrder']['ship-fee']);  ?> đ</td>
                                    </tr>
                                    <?php if ($order_detail['tPaymentMethods']['point'] != NULL) { ?>
                                        <tr>
                                            <td colspan="4">Sử dụng điểm</td>
                                            <td class="point-price"><?php echo $order_detail['tPaymentMethods']['point']; ?> đ</td>
                                        </tr>
                                    <?php } ?>
                                    <tr>
                                        <td colspan="4">Tổng cộng</td>
                                        <td class="total-price"><?php echo $order_detail['tOrder']['total_price']; ?> đ</td> 
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="row order-footer">
                    <div class="col-12 col-sm-12 col-md-3 col-lg-3 show-orders">
                        <a href="order"> <i class="fas fa-angle-double-left"></i> Quay lại đơn hàng của tôi</a>
                    </div>
                    <div class="col-0 col-sm-0 col-md-2 col-lg-2">
                        
                    </div>
                    <?php if ($order_detail['tOrder']['statement'] == 'Successful') { ?>
                        <div class="col-12 col-sm-12 col-md-3 col-lg-3 cancel-order">
                            <button class="btn btn-danger btn-block">Huỷ đơn hàng</button>
                        </div>
                    <?php } else { ?>
                        <div class="col-12 col-sm-12 col-md-3 col-lg-3"></div>
                    <?php } ?>
                    <div class="col-12 col-sm-12 col-md-4 col-lg-4 track-order">
                        <a href="track?view=<?php echo $order_detail['tOrder']['id']; ?>"class="btn btn-info btn-block">Theo dõi đơn hàng</a>
                    </div>
                </div>
            </div>
        </div>
    <?php } else { ?>
        <?php header("Location: order"); exit;?>
    <?php } ?>
<?php } else { ?>
    <?php if (sizeof($orders) == 0) { ?>
        <div id="orders">
            <div class="container">
                <div class="row order">
                    <div class="col-12 col-sm-12 col-md-12 col-lg-12 cart-empty">
                        <div class="text-center bg-white">
                            <span class="no-order">You have no orders.</span>
                            <a href="home"><span class="btn btn-warning continue-shopping">Continue shopping</span></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <?php } else { ?>
    <div id="orders">
        <div class="container">
            <div class="row orders-content">
                <h4>Danh sách đơn hàng của tôi: </h4>
                <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="card card-default">
                        <table class="table text-nowrap table-responsive">
                            <thead class="text-center">
                                <tr>
                                    <th width="10%">Mã đơn hàng</th>
                                    <th width="10%">Ngày mua</th>
                                    <th width="60%">Sản phẩm</th>
                                    <th width="10%">Tổng tiền</th>
                                    <th width="10%">Trạng thái đơn hàng</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($orders as $key => $order) { ?>
                                <?php 
                                    switch ($order['tOrder']['statement']) {
                                        case 'Successful':
                                            $status = 'Đặt hàng thành công';
                                            break;
                                        case 'Delivering':
                                            $status = 'Đang vận chuyển';
                                            break;
                                        case 'Delivered':
                                            $status = 'Giao hàng thành công';
                                            break;
                                    }
                                ?>
                                <tr>
                                    <td><a href="order?code=<?php echo $order['tOrder']['id']; ?>"><?php echo $order['tOrder']['id']; ?></a></td>
                                    <td><?php echo $order['tOrder']['time']; ?></td>
                                    <td>
                                        <ul>
                                            <?php foreach ($order['tOrderDetail'] as $key => $orderDetail) { ?>
                                                <?php foreach ($products as $key => $product) {  ?>
                                                    <?php if ($orderDetail['product_sold_id'] == $product['tProductSold']['id']) { ?>
                                                        <li> - <?php echo $product['tProductSold']['name']; ?></li>
                                                    <?php } ?>
                                                <?php } ?>
                                            <?php } ?>
                                        </ul>
                                    </td>
                                    <td class="orders-total-price"><?php echo $order['tOrder']['total_price']; ?> đ</td>
                                    <td><?php echo $status; ?></td>
                                </tr>
                                <?php } ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php } ?>
<?php } ?>
<?php echo $this->element('home/footer'); ?>
