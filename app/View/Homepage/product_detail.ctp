<?php
    echo $this->Html->css(
        array(
            'customer/icon',
            'customer/header',
            'customer/product_search',
            'customer/product_detail',
            'customer/home',
            'customer/sign',
            'jquery-ui/jquery-ui.min',
            'jquery-ui/jquery-ui.theme',
            'bootstrap/bootstrap-datepicker'
        ),
        array(
            'inline' => false
        )
    );

    echo $this->Html->script(
        array(
            'jquery-ui/jquery-ui',
            'customer/home',
            'customer/product_detail',
            'customer/header',
            'customer/product_search',
            'customer/add_to_cart',
            'bootstrap/bootstrap-datepicker.min',
            'customer/function',
            'lib/sweetalert.min'
        ),
        array(
            'inline' => false
        )
    );
    echo $this->element('home/header');
    if (!$this->Session->read('user')) {
        echo $this->element('home/sign');
    }
?>
<?php  
    if ($product) {
        $images = explode(",", $product['tProduct']['image']);
    }
?>
<div id="product-detail" data-product="<?php echo base64_encode($product['tProduct']['id']); ?>">
    <div class="container">
        <div class="row">
            <div class="col-12 col-sm-12 col-md-6 col-lg-6 images-product">
                <div class="row">
                    <div class="col-12 col-sm-12 col-md-12 col-lg-12 image-main">
                        <?php echo $this->Html->image('products/'.$images[0]); ?>
                    </div>
                    <div class="col-12 col-sm-12 col-md-12 col-lg-12 images">
                        <ul>
                            <?php foreach ($images as $key => $image): ?>
                                <li>
                                    <?php echo $this->Html->image('products/'.$image); ?>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-12 col-md-6 col-lg-6 info-product">
                <div class="info-product-name"><?php echo $product['tProduct']['name']; ?></div>
                <?php if ($product['tProduct']['price'] != $product['tProduct']['finish_price']) { ?>
                <div class="info-product-price"><strike><span><?php echo $product['tProduct']['price']; ?></span> vnđ</strike></div>
                <?php } else { ?>
                <div class="empty"></div>
                <?php } ?>
                <div class="info-product-last-price"><span><?php echo $product['tProduct']['finish_price']; ?></span> vnđ</div>
                <div class="info-product-description">
                    <?php echo $product['tProduct']['description']; ?>
                </div>
                <div class="info-prodict-addtocart">
                    <div class="row">
                        <div class="col-4 col-sm-3 col-md-4 col-lg-3 number">
                            <p>Số lượng</p>
                            <span class="minus">-</span>
                            <input type="text" value="1" class="quantity" />
                            <span class="plus">+</span>
                        </div>
                        <div class="col-8 col-sm-9 col-md-8 col-lg-9 addToCart">
                            <div class="btn btn-outline-danger btn-block btn-add">Thêm vào giỏ hàng</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php echo $this->element('home/footer'); ?>

