<?php
    echo $this->Html->css(
        array(
            'customer/icon',
            'customer/header',
            'customer/home',
            'customer/sign',
            'customer/info',
            'customer/product_search',
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
            'customer/add_to_cart',
            'customer/header',
            'bootstrap/bootstrap-datepicker.min',
            'customer/function',
            'lib/sweetalert.min'
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
    echo $this->element('home/banner');
?>
<div class="body">
    <div class="container">
        <div class="row text-center padding set-picture">
            <?php foreach ($sale_product as $key => $product) { ?>
                <?php 
                $images = explode(",",$product['tProduct']['image']);
                $image = $images[0];
                ?>
                <a class="col-md-3 col-sm-6 col-6 in-padding-pic product-sale" href="product_detail?p=<?php echo base64_encode($product['tProduct']['id']); ?>" >
                    <div class="card home-card-face1">
                        <div class="home-card-face1-img">
                            <img src="../img/products/<?php echo $image; ?>" alt="">
                            <?php if ($product['tProduct']['price'] != $product['tProduct']['finish_price']) { ?>
                                <span class="percent deal"></span>
                            <?php } ?>
                        </div>
                    </div>
                    <div class="home-card-face2">   
                        <div class="home-card-face2-img">
                            <p class="home-card-face2-title">
                                <?php echo $product['tProduct']['name']; ?>
                            </p>
                            <p class="home-card-face2-price"> 
                                <span class="product-price"><?php echo $product['tProduct']['finish_price']; ?></span>
                                <?php if ($product['tProduct']['price'] != $product['tProduct']['finish_price']) { ?>
                                    <span class="home-card-face2-deal product-price">
                                        <?php echo $product['tProduct']['price']; ?>
                                    </span>
                                <?php } ?>
                            </p>
                            <div>
                                <button class="btn btn-primary btn-sm btn-block mb-2 home-add-to-cart" type="button" data-toggle="toast" data-target="#cart-toast">
                                    <i class="fas fa-shopping-cart mr-1"></i>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>  
                </a>
            <?php } ?>
        </div>
    </div>
    <br>   
    <div class="container">
        <div class="sell-product">
            <div class="home-product-deal">
                <span><img src="../img/deal.png"></span>
                <div>
                    <h3 class="title home-deal">Mishon Deal</h3>
                    <p class="home-description">Cập nhật hàng giờ tất cả những deal giảm giá đặc biệt trên Mishon. Hãy bookmark trang này và quay lại thường xuyên để không bỏ lỡ bạn nhé!</p>
                </div>
            </div>
            <?php if (sizeof($mishon_deal) == 0) { ?>
                <p class="text-center no-product-sale">
                    Hiện tại chưa có sản phẩm nào giảm giá! Hãy theo dõi website để nhận thông báo mới nhất nhé!
                </p>
            <?php } else { ?>
                <div class="row">
                    <?php foreach ($mishon_deal as $key => $mishon_deal) { ?>
                        <?php 
                        $images = explode(",",$mishon_deal['tProduct']['image']);
                        $image = $images[0];
                        ?>
                        <a class="col-md-3 col-sm-6 col-xs-12 product-mishon-deal" href="product_detail?p=<?php echo base64_encode($product['tProduct']['id']); ?>">
                            <div class="product-info home-product-hover">
                                <div class="card border-0">
                                    <img src="../img/products/<?php echo $image; ?>" alt="<?php echo $mishon_deal['tProduct']['name']; ?>" class="home-product-img">
                                    <div class="card-body">
                                        <p class="home-product-meta"><?php echo $mishon_deal['tProduct']['name']; ?></p>
                                        <div class="d-flex justify-content-between">
                                            <div>
                                                <h5>
                                                    <span class="text product-price"><?php echo $mishon_deal['tProduct']['finish_price']; ?></span>
                                                    <?php if ($mishon_deal['tProduct']['price'] != $mishon_deal['tProduct']['finish_price']) { ?>
                                                        <span class="original product-price"><?php echo $mishon_deal['tProduct']['price']; ?></span>
                                                    <?php } ?>
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    <?php } ?>
                </div>
                <div class="home-product-button">
                    <a class="home-product-view button-view" href="products?key=sale">More product</a>
                </div>
            <?php } ?>
        </div>
    </div>

    <br>

    <div class="container set-container">
        <div class="menu-product home-slide-menu">
            <img src="../img/trend.png">
            <div> 
                <p>Industry Interested</p>
            </div>
        </div>
        <div id="gallery" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <div class="row ">
                        <?php foreach ($product_interest1 as $key => $product) { ?>
                            <?php 
                            $images = explode(",",$product['tProduct']['image']);
                            $image = $images[0];
                            ?>
                            <div class="col col-set-img">
                                <a class="home-slide" href="product_detail?p=<?php echo base64_encode($product['tProduct']['id']); ?>">
                                    <div class="home-slide-img">
                                        <img class="img-thumbnail" src="../img/products/<?php echo $image; ?>" alt="<?php echo $product['tProduct']['name']; ?> ">
                                    </div>
                                    <p class="name-product"><?php echo $product['tProduct']['name']; ?></p>
                                </a>
                            </div>
                        <?php } ?>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="row">
                        <?php foreach ($product_interest2 as $key => $product) { ?>
                            <?php 
                            $images = explode(",",$product['tProduct']['image']);
                            $image = $images[0];
                            ?>
                            <div class="col col-set-img">
                                <a class="home-slide" href="product_detail?p=<?php echo base64_encode($product['tProduct']['id']); ?>">
                                    <div class="home-slide-img">
                                        <img class="img-thumbnail" src="../img/products/<?php echo $image; ?>" alt="<?php echo $product['tProduct']['name']; ?> ">
                                    </div>
                                    <p class="name-product"><?php echo $product['tProduct']['name']; ?></p>
                                </a>
                            </div>
                        <?php } ?>
                    </div>
                </div>
            </div>
            <a class="carousel-control-prev home-industry-prev" href="#gallery" role="button" data-slide="prev">
                <span class="icon-prev-next">
                    <i class="fas fa-arrow-circle-left fa-2x"></i>
                </span>
            </a>
            <a class="carousel-control-next home-industry-next" href="#gallery" role="button" data-slide="next">
                <span class="icon-prev-next">
                    <i class="fas fa-arrow-circle-right fa-2x"></i>
                </span>
            </a>
        </div>
    </div>

    <br>

    <section class="container set-container">
        <div class="home-trending">
            <img src="../img/trending.png">
            <h2 class="h3 text-center text-center-set">Trending product </h2>
            <img src="../img/trending.png">
        </div>
        <div class="row ">
            <?php foreach ($product_trending as $key => $product) { ?>
                <?php 
                $images = explode(",",$product['tProduct']['image']);
                $image = $images[0];
                ?>
                <a class="col-lg-3 col-md-3 col-sm-6 trending-product" href="product_detail?p=<?php echo base64_encode($product['tProduct']['id']); ?>">
                    <div class="card product-card">
                        <img src="../img/products/<?php echo $image; ?>" alt="<?php echo $product['tProduct']['name']; ?>" class="Product">
                        <div class="card-body py-2">
                            <p class="product-meta d-block"><?php echo $product['tProduct']['name']; ?></p>
                            <div class="d-flex justify-content-between">
                                <div class="">
                                    <span class="text-accent product-price"><?php echo $product['tProduct']['finish_price']; ?></span>
                                </div>
                            </div>
                            <div>
                                <button class="btn btn-primary btn-sm btn-block mb-2 home-add-to-cart" type="button" data-toggle="toast" data-target="#cart-toast">
                                    <i class="fas fa-shopping-cart mr-1"></i>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </a>
            <?php } ?>
        </div>
        <div class="text-center">
            <a class="btn home-product-view home-button-more" href="products?key=all">More products
                <i class="fas fa-angle-double-right"></i>
            </a>
        </div>
    </section>
</div>

<?php echo $this->element('home/footer'); ?>

















