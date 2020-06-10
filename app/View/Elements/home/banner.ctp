<div class="container main">
    <div class="row">
        <div class="col-md-3 col-3 in-padding ">
            <ul class="ul-set-margin">
                <?php foreach ($categories['nameCategory'] as $key => $nameCategory) { ?>
                    <li class="home-main-hover-li"> 
                        <a class="nav-link home-set-col3" href="#">
                            <span class="icon-wrap">
                                <img src="../img/logo_mishon.png" alt="logo">
                            </span>
                            <span class="text"><?php echo $nameCategory['tCategoriesType']['category']; ?></span>
                        </a>
                        <div class="home-main-hover">
                            <ul>
                                <li class="home-main-type">
                                    <?php foreach ($categories['categories'] as $key => $category) { ?>
                                        <?php if ($category['tCategoriesType']['category'] == $nameCategory['tCategoriesType']['category']) { ?>
                                            <span class="home-main-type-a"> <a href="products?type=<?php echo base64_encode($category['tCategoriesType']['id']); ?>"><?php echo $category['tCategoriesType']['type']; ?></a></span>
                                        <?php } ?>
                                    <?php } ?>
                                </li>
                            </ul>
                        </div>
                    </li>
                <?php } ?>
            </ul>
        </div>
        <div class="col-md-9 col-9 no-padding">
            <div id="slides" class="carousel slide" data-ride="carousel">
                <ul class="carousel-indicators">
                    <?php if ($event == false) { ?>
                        <li data-target="#slides" data-slide-to="0" class="active"></li>
                    <?php } else { ?>
                        <li data-target="#slides" data-slide-to="0" class="active"></li>
                        <li data-target="#slides" data-slide-to="1"></li>
                    <?php } ?>
                </ul>
                <div class="carousel-inner img-setpicture js-carouselList">
                    <?php if ($event == false) { ?>
                        <div class="carousel-item active">
                            <img src="../img/events/event_default.png">
                            <div class="carousel-caption">
                                <h3>Mishon</h3>
                                <a type="button" class="btn btn-outline-light btn-lg" href="products?key=all">
                                    View Products
                                </a>
                            </div>   
                        </div>
                    <?php } else { ?>
                        <div class="carousel-item active">
                            <img src="../img/events/event_default.png">
                            <div class="carousel-caption">
                                <h3>Mishon</h3>
                                <a type="button" class="btn btn-outline-light btn-lg" href="products?key=all">
                                    View Products
                                </a>
                            </div>   
                        </div>
                        <?php if ($event['tEvent']['category'] == 'Offer a discount') { ?>
                            <div class="carousel-item">
                                <img src="../img/events/<?php echo $event['tEvent']['image']; ?> " alt="<?php echo $event['tEvent']['title'];?>" >
                                <div class="carousel-caption">
                                    <h1 class="display-4">Sale <?php echo $event['tEvent']['value_deal']; ?>%</h1>
                                    <h3>Mishon</h3>
                                    <a type="button" class="btn btn-outline-light btn-lg" href='products?key=sale'>
                                        View Products
                                    </a>
                                </div>   
                            </div>
                        <?php } else if ($event['tEvent']['category'] == 'Free ship') { ?>
                            <div class="carousel-item">
                                <img src="../img/events/<?php echo $event['tEvent']['image']; ?> " alt="<?php echo $event['tEvent']['title'];?>" >
                                <div class="carousel-caption">
                                    <h3 class="display-4">Free ship for order over <?php echo $event['tEvent']['value_deal']; ?></h3>
                                    <h3>Mishon</h3>
                                    <a type="button" class="btn btn-outline-light btn-lg" href='products?key=all'>
                                        View Products
                                    </a>
                                </div>   
                            </div>
                        <?php } ?>
                        
                    <?php } ?>
                </div>
                <a class="carousel-control-prev" href="#slides" data-slide="prev">
                    <span class="icon-prev-next">
                        <i class="fas fa-arrow-circle-left fa-2x"></i>
                    </span>
                </a>
                <a class="carousel-control-next" href="#slides" data-slide="next">
                    <span class="icon-prev-next">
                        <i class="fas fa-arrow-circle-right fa-2x"></i>
                    </span>
                </a>
            </div>
        </div>
    </div>
</div>