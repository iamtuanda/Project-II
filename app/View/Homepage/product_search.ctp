<?php
    echo $this->Html->css(
        array(
            'customer/icon',
            'customer/header',
            'customer/product_search',
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
            'customer/product_search',
            'customer/header',
            'customer/add_to_cart',
            'bootstrap/bootstrap-datepicker.min',
            'lib/sweetalert.min',
            'customer/function'
        ),
        array(
            'inline' => false
        )
    );
    if ($this->Session->read('user')) {
        $user = $this->Session->read('user');
    } else {
        echo $this->element('home/sign');
    }
    
    echo $this->element('home/header');
?>
<div id="products">
    <div class="container">
        <div class="row product-element">
            <div class="col-12 col-sm-12 col-md-12 col-lg-">
                <div id="search-product-title">
                    <div class="search-product-key">Từ khoá ' <span><?php echo $key; ?></span> ': </div>
                    <div class="search-product-result"><span><?php echo $count; ?></span> kết quả</div>
                </div>
            </div>
        </div>
        <?php if ((int)$count != 0 ){ ?>
        <div class="row product-element">
            <ul>
                <li class="diff">Ưu tiên xem: </li>
                <li class="orderBy">Hàng mới</li>
                <li class="orderBy">Bán chạy</li>
                <li class="orderBy">Giá thấp</li>
                <li class="orderBy">Giá cao</li>
            </ul>
        </div>
        <?php } else { ?>
        <div class="row not-found">
            <a href="home">
                <span class="btn btn-outline-danger">Tiếp tục mua sắm</span>
            </a>
        </div>
        <?php } ?>
        <div class="row product-show">
            <?php foreach ($products as $key => $product): ?>
            <?php
                $images = explode(",",$product['tProduct']['image']);
            ?>
            <a class="col-sm-6 col-md-4 col-lg-3 product-result" href="product_detail?p=<?php echo base64_encode($product['tProduct']['id']); ?>">
                <div class="product-img">
                    <?php echo $this->Html->image('products/'.$images[0]); ?>
                </div>
                <p class="product-name"><?php echo $product['tProduct']['name']; ?></p>
                <?php if ($product['tProduct']['price'] != $product['tProduct']['finish_price']) { ?>
                    <p class="product-price"><strike><span><?php echo $product['tProduct']['price']; ?></span> VNĐ</strike></p>
                <?php } else { ?>
                    <p class="empty"></p>
                <?php } ?>
                <p class="product-last-price"><span><?php echo $product['tProduct']['finish_price']; ?></span> VNĐ</p>
                <div class="btn btn-outline-danger product-add-to-cart"> <i class="fas fa-cart-plus"></i> Add to cart</div>
            </a>
            <?php endforeach; ?>
        </div>
        <?php if ((int)$count != 0 && $page > 1): ?>
        <nav aria-label="Pagination with font-awesome icons">
            <ul class="pagination">
                <li class="page-item page-prev">
                    <a class="page-link" aria-label="Previous">
                        <i class="fas fa-arrow-left" aria-hidden="true"></i>
                        <span class="sr-only">Previous</span>
                    </a>
                </li>
                <?php for ($i=1; $i <= $page; $i++) { ?>
                    <?php if ($i == 1) { ?>
                        <li class="page-item page-active active"><a class="page-link"> <?php echo $i; ?></a></li>
                    <?php } else { ?>
                        <li class="page-item page-active"><a class="page-link"> <?php echo $i; ?></a></li>
                    <?php } ?>
                <?php } ?>
                <li class="page-item page-next">
                    <a class="page-link" aria-label="Previous">
                        <i class="fas fa-arrow-right" aria-hidden="true"></i>
                        <span class="sr-only">Previous</span>
                    </a>
                </li>
            </ul>
        </nav>
        <?php endif; ?>
    </div>
</div>
<?php echo $this->element('home/footer'); ?>
