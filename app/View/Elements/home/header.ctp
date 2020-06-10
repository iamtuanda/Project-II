<?php
    if ($this->Session->read('user')) {
        $user = $this->Session->read('user');
        $login = "true";
        $id = base64_encode($user['id']);
    } else {
        $id = base64_encode(0);
        $login = "false";
    } 
?>
<div id="header" data-login="<?php echo $login; ?>" data-id="<?php echo $id; ?>">
    <div id="header-container" class="container">
        <input type="checkbox" id="chk">
        <label for="chk" class="show-menu-btn">
            <i class="material-icons">
                menu
            </i>
        </label>
        <div id="logo">
            <a href="home">
                <img src="../img/logo_mishon.png" alt="" />
            </a>
        </div>
        <div id="header-right">
            <div id="header-info" href="#signin-modal" data-toggle="modal">
                <?php if ($this->Session->read('user')){ ?>
                    <div id="header-info-avt">
                        <img src="<?php echo '../img/customers/'.$user['avatar']; ?>" alt="">
                    </div>
                    <div class="header-info">
                        <span id="header-info-person"><?php echo $user['username']; ?></span>   
                        <br>
                    </div>
                <?php } else { ?>
                    <div id="header-info-avt">
                        <img src="../img/person_default.png" alt="">
                    </div>
                    <div class="header-info">
                        <span id="header-info-person">Login</span>
                    </div>
                <?php } ?>
            </div>
            <?php if ($this->Session->read('user')){ ?>
                <div id="header-menu-toggle">
                    <div id="header-menu-content">
                        <ul>
                            <li class="point-customer">
                                <div> <i class="fas fa-coins coin"></i> Point: <span></span></div>
                            </li>
                            <li>
                                <a href="info"> <i class="fa fa-user"></i> Information personal</a>
                            </li>
                            <li>
                                <a href="cart"> <i class="fas fa-shopping-cart"></i> Shopping-Cart</a>
                            </li>
                            <li>
                                <a href="order"> <i class="fas fa-truck"></i> Track orders</a>
                            </li>
                            <li>
                                <a href="logout"> <i class="fas fa-sign-out-alt"></i> Logout</a>
                            </li>
                            <li>
                        </ul>
                    </div>
                </div>
            <?php } ?>
        </div>
        <div class="notification-bell">
            <div class="notification-icon">
                <span class="far fa-bell"></span>
                <span class="badge badge-danger badge-notify">0</span>
            </div>
            <div id="notification-toggle-small">
                <div class="notification-content">
                </div>
            </div>
        </div>
        <div id="search">
            <div class="searchBox">
                <form action="product_search" method="GET">
                    <input class="searchInput"type="text" name="search" placeholder="Search" autocomplete="off">
                    <button class="searchButton" href="#">
                        <i class="material-icons">
                            search
                        </i>
                    </button>
                </form>
            </div>
        </div>
        <nav id="navigation">
            <ul id="responsive">
                <?php if ($this->Session->read('user')){ ?>
                <li>
                    <a href="order" class="current">
                        <span>
                            <span class="fas fa-truck"></span>
                        </span>
                        <span>Track orders</span>
                    </a>
                </li>
                <?php } else { ?>
                <li href="#signin-modal" data-toggle="modal">
                    <a class="current" style="cursor: pointer;">
                        <span>
                            <span class="fas fa-truck"></span>
                        </span>
                        <span>Track orders</span>
                    </a>
                </li>
                <?php } ?>
                <li id="notification">
                    <a href="#" class="bell">
                        <span>
                            <span class="far fa-bell"></span>
                        </span>
                        <span>Notifications</span>
                        <span class="badge badge-danger badge-notify">0</span>
                    </a>
                    <div id="notification-toggle">
                        <div class="notification-content">
                            <div class="notification-content-header">
                                <span class="float-left">Thông báo</span>
                                <a href="" class="float-right">Đánh dấu tất cả đã đọc</a>
                            </div>
                            <a class="notification-content-detail">
                                <p class="notification-content-detail-description">Đơn hàng #444 đang được vận chuyển </p>
                                <p class="notification-content-detail-time">
                                    <i class="far fa-clock"></i> <span>2 giờ trước</span>
                                </p>
                            </a>
                        </div>
                    </div>
                </li>
                <li>
                    <a href="cart">
                        <span>
                            <span class="fas fa-shopping-cart"></span>
                        </span>
                        <span>Shopping-Cart</span>
                        <span class="badge badge-danger badge-cart">0</span>
                    </a>
                </li>

            </ul>
            <label for="chk" class="hide-menu-btn">
                <i class="material-icons">
                    clear
                </i>
            </label>
        </nav>
    </div>
</div>