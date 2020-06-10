<?php
    echo $this->Html->css(
        array(
            'customer/track',
            'customer/icon',
            'customer/header',
            'customer/home',
            'customer/payment'
        ),
        array(
            'inline' => false
        )
    );

    echo $this->Html->script(
        array(
            'jquery-ui/jquery-ui',
            'customer/track',
            'customer/add_to_cart',
            'customer/header',
            'bootstrap/bootstrap-datepicker.min',
            'customer/function',
            'lib/address'
        ),
        array(
            'inline' => false
        )
    );
    $user = $this->Session->read('user');
    echo $this->element('home/header');
?>
<?php if ($order_detail['tOrder']['customer_id'] == $user['id']) { ?>
<?php
    switch ($order_detail['tOrder']['statement']) {
        case 'Successful':
            $status = 'Đặt hàng thành công';
            $level = 1;
            break;
        case 'Delivering':
            $status = 'Đang vận chuyển';
            $level = 2;
            break;
        case 'Delivered':
            $status = 'Giao hàng thành công';
            $level = 3;
            break;
    }
?>
<div id="track">
    <div class="container">
        <div class="row track-header">
            <div class="col-12 col-sm-12 col-md-6 col-lg-6 track-code">
                Theo dõi đơn hàng #<?php echo $order_detail['tOrder']['id']; ?>
            </div>
            <div class="col-12 col-sm-12 col-md-6 col-lg-6 track-show">
                <a href="order?code=<?php echo $order_detail['tOrder']['id']; ?>" class="btn btn-info float-right">Xem chi tiết đơn hàng</a>
            </div>
        </div>
        <div class="row track-status">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <h4>TRẠNG THÁI ĐƠN HÀNG</h4>
                <div class="card card-default">
                    <div class="progress-payment">
                        <ol class="my-progress">
                            <?php if ($level == 1) { ?>
                                <li class="is-active" data-step="1">
                                    Đặt hàng thành công
                                </li>
                                <li data-step="2">
                                    Đang vận chuyển
                                </li>
                                <li data-step="3" class="progress__last">
                                    Giao hàng thành công
                                </li>
                            <?php } else if ($level == 2) { ?>
                                <li class="is-complete" data-step="1">
                                    Đặt hàng thành công
                                </li>
                                <li data-step="2" class="is-active">
                                    Đang vận chuyển
                                </li>
                                <li data-step="3" class="progress__last">
                                    Giao hàng thành công
                                </li>
                            <?php } else if ($level == 3) { ?>
                                <li class="is-complete" data-step="1">
                                    Đặt hàng thành công
                                </li>
                                <li data-step="2" class="is-complete">
                                    Đang vận chuyển
                                </li>
                                <li data-step="3" class="progress__last is-active">
                                    Giao hàng thành công
                                </li>
                            <?php } ?>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
        <div class="row track-status-detail">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <h4>CHI TIẾT TRẠNG THÁI ĐƠN HÀNG</h4>
                <div class="card card-default">
                    <table class="table table-hover">
                        <tbody>
                            <?php if ($order_detail['tOrderTrack']['receive_time'] != '') { ?>
                                <tr>
                                    <td width="20%"><?php echo $order_detail['tOrderTrack']['receive_time']; ?></td>
                                    <td width="80%">Giao hàng thành công</td>
                                </tr>
                            <?php } ?>
                            <?php if ($order_detail['tOrderTrack']['delivery_time'] != '') { ?>
                                <tr>
                                    <td width="20%"><?php echo $order_detail['tOrderTrack']['delivery_time']; ?></td>
                                    <td width="80%">Đang vận chuyển</td>
                                </tr>
                            <?php } ?>
                            <?php if ($order_detail['tOrder']['time'] != '') { ?>
                            <tr>
                                <td width="20%"><?php echo $order_detail['tOrder']['time']; ?> </td>
                                <td width="80%">Đặt hàng thành công</td>
                            </tr>
                            <?php } ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="row track-include">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <h4>KIỆN HÀNG GỒM CÓ</h4>
                <div class="card card-default">
                    <ul>
                        <?php foreach ($products as $key => $product) : ?>
                            <?php 
                                $images = explode(",",$product['tProductSold']['image']);
                                $image = $images[0];
                            ?>
                            <li>
                                <img class="img-responsive thumb float-left" src="../img/products/<?php echo $image; ?>">
                                <div class="product-info float-left">
                                    <a class="name" href="product_detail?code=<?php echo base64_encode($product['tProductSold']['product_code']);?>" target="_blank" >
                                    <?php echo $product['tProductSold']['name'] ?></a>
                                </div>
                            </li>
                        <?php endforeach ?>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<?php 
    } else { 
        header("Location: order");
        exit; 
    } 
?>
<?php echo $this->element('home/footer'); ?>
