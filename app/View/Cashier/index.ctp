<?php
    echo $this->Html->css(
        array(
            'cashier/font',
            'cashier/cashier',
            'cashier/motion-ui'
        ),
        array('inline' => false)
    );
?>
<div id="preloader">
    <div id="loader">
        <div>
            <?php echo $this->Html->image('loading.gif');?>
        </div>
    </div>
</div>
<div class="miloader">
    <div class="header-right">
        <ul>
            <li class="li_print">
                <a href="#">
                    <div class="button-switch">
                        <input type="checkbox" id="switch-blue" class="switch switch-print"  data-print="true" checked />
                        <label for="switch-blue" class="lbl-off">Off</label>
                        <label for="switch-blue" class="lbl-on">On</label>
                    </div>
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="fas fa-info-circle btn-shortcut-keys"></i>
                </a>
            </li>
            <li>
                <div class="fullname_cashier_header"><?php echo $manager['fullname']; ?></div>
            </li>
            <li class="dropdown">
                <div id="menu" class="dropdown-toggle" data-toggle="dropdown">
                    <i class="fas fa-bars"></i>
                </div>
                <ul class="dropdown-menu dropdown-menu-right">
                    <li class="dropdown-item dropdown-item-manager"><i class="fas fa-tasks menu_item"></i> <span>Manager</span></li>
                    <li class="dropdown-item dropdown-item-info" data-id= "<?php echo $manager['id']; ?>" data-fullname="<?php echo $manager['fullname']; ?>" data-phone="<?php echo $manager['phone']; ?>" data-address="<?php echo $manager['address']; ?>" data-avatar="./img/cashiers/<?php echo $manager['avatar']; ?>"><i class="fas fa-info menu_item"></i> <span>Infomation personal</span></li>
                    <li class="dropdown-item dropdown-item-logout"><i class="fas fa-sign-out-alt menu_item"></i> <span>Sign-out</span></li>
                </ul>
            </li>
        </ul>
    </div>
    <div id="tabs">
        <ul id="header">
            <li class="frame_search">
                <div id="search">
                    <div class="td">
                        <input type="text" placeholder="(F16) Search ... " class="form-control search_product" onFocus="this.select()">
                    </div>
                    <div class="td">
                        <i class="fas fa-search" id="search_product"></i>
                        <i class="fas fa-times" id="remove_search_product" hidden="true"></i>
                    </div>
                </div>
            </li>
            <li><a href="#tabs-1" class="tab_title">Bill 1</a> <i class="fas fa-times ui-icon-close-x" role="presentation" aria-hidden="true"></i></li>
            <button id="add_bill">+</button>
            <div id="found_product" hidden="true">
            </div>
        </ul>
        <div id="tabs-1" class="content_tabs">
            <div class="row" id="content-tabs">
                <div class="content-left col-md-9">
                    <table class="striped">
                        <tbody class="content_body">
                        </tbody>
                    </table>
                </div>
                <div class="content-right col-md-3">
                    <div class="row row1">
                        <div class="col-md-7">
                            <i class="fas fa-user" id="icon-user"></i>
                            <div class="fullname_cashier"><?php echo $manager['fullname']; ?></div>
                        </div>
                        <div class="col-md-3 payment_date"></div>
                        <div class="col-md-2 payment_time"></div>
                    </div>
                    <div class="row row2">
                        <i class="fas fa-search" id="icon_search_customer"></i>
                        <input placeholder="(F18) Search customer" class="search_customer" onFocus='this.select()' id="myInput" autocomplete="off">
                        <div class="found_customer" hidden="true">
                        </div>
                    </div>
                    <div class="row row2_2" hidden="true">
                        <i class="fas fa-user user" id="customer-icon"></i>
                        <div class="customer_found">
                            <div class="cid" hidden="true"></div>
                            <a class="name_customer_choose"></a>
                            <b hidden="true" class="phone_customer_choose"></b>
                        </div>
                        <i class="fas fa-times times" id="icon-remove-customer"></i>
                    </div>
                    <div class="row row2_3" hidden="true">
                        Point: 123
                    </div>
                    <div class="row row3">
                        <div class="row3_title">Bill</div>
                    </div>
                    <div class="row row4">
                        <div class="col-md-6 total_price">Total price <span class="badge badge-warning badge-product">0</span></div>
                        <div class="col-md-6 number_total_price">0</div>    
                    </div>
                    <div class="row row10">
                        <div class="col-md-6 paying">Paying
                            <div class="payment" hidden="true"><i class="fas fa-credit-card"></i></div>
                            <div class="methods">Cash</div>
                        </div>

                        <div class="col-md-6 number_paying">
                            <input class="input_paying" placeholder="0" onFocus="this.select()" disabled="true"></input>
                            <div class="use_point" hidden="true"></div>
                        </div>
                    </div>

                    <div class="row row7">
                        <div class="col-md-6 change">Change</div>
                        <div class="col-md-6 number_change">0</div>
                    </div>
                    <div class="row row11">
                        <div class="col-md-6 note">Note</div>
                    </div>
                    <div class="row row12">
                        <input type="text" class="input_note form-control" placeholder="note">
                    </div>

                    <div class="row row8">
                        <div class="btn btn-success btn-block btn-pay">PAY (F19)</div>
                    </div>
                    <div class="row row9">
                        <i class="fas fa-phone" aria-hidden="true"></i> Support : tien.dd166827@sis.hust.edu.vn
                    </div>
                </div>
            </div>
            <div class="pay_by_point">
                <div class="pbp_header">
                    <div class="pbp_title">Paying</div>
                    <div class="pbp_close"><i class="far fa-window-close icon-fa-close"></i></div>
                </div>
                <div class="pbp_content">
                    <div class="pbp_info">
                        <label>Name: </label>
                        <div class="pbp_name">JohnWick</div>
                        <label>| Phone: </label>
                        <div class="pbp_phone">0987042556</div>
                        <label>| Point: </label>
                        <div class="pbp_p">5</div>
                    </div>
                    <div class="pbp_to_pay">
                        <label class="enter_money">Money to pay</label>
                        <div class="pbp_to_pay_total"></div>
                    </div>
                    <div class="pbp_pay">
                        <label class="enter_money">Enter money</label>
                        <input type="text" class="pbp_input_money" onFocus='this.select()'>
                    </div>
                    <div class="pbp_methods_pay">
                        <button class="btn btn-default pbp_cash">Cash</button>
                        <button class="btn btn-default pbp_point">Point</button>
                        <button class="btn btn-default pbp_card">Card</button>
                    </div>
                    <div class="pbp_info_pay">
                        <div class="pbp_pay_change">
                            <label class="enter_money">Change</label>
                            <div class="pbp_change">0</div>
                        </div>
                    </div>
                </div>
                <div class="pbp_foot">
                    <button class="btn btn-success complete">
                        <i class="fa fa-check-square"></i> Complete
                    </button> 
                    <button class="btn btn-default cancel">
                        <i class="fa fa-ban"></i> Cancel
                    </button>
                </div>
            </div>

        </div>
    </div>
    <div class="bill_close">
        <div class="bill_close_header">
            <div class="bill_close_title">Close <b>bill 2</b></div>
            <div class="bill_close_close">
                <i class="fa fa-times bill-close-icon" aria-hidden="true"></i>
            </div>
        </div>
        <div class="bill_close_info">
            <div class="bill_close_notify">Info <b>Hóa đơn 2</b> will not be saved. Are you sure you want to close? </div>
            <div class="bill_close_footer text-right">
                <button class="btn btn-danger btn-confirm"><i class="fas fa-check-square"></i> Agree</button>
                <button class="btn btn-default btn-cancel"><i class="fas fa-ban"></i> Cancel</button>
            </div>
        </div>
    </div>
    
    <div id="information">
        <div class="info-left">
            <div class="information current">Information</div>
            <div class="change-password">Change password</div>
            <div class="info-close">CLOSE</div>
        </div>
        <div class="info-right">
            <div class="tab-info">
                <div class="info-edit"><i class="fas fa-user-edit"></i></div>
                <div class="info-back" hidden="true"><i class="fas fa-undo-alt"></i></div>
                <div class="avatar">
                    <img src="">
                    <div class="update-avatar" hidden="true">
                        <input type="file" name="file" class="avatar_cashier" id="file">
                        <label class="foot" for="file">
                            <i class="fas fa-camera" aria-hidden="true"></i> Update avatar
                        </label>
                    </div>
                </div>
                <div class="cashier_fullname">
                    <label class="label-fullname">Fullname</label>
                    <input type="text" class="form-control edit-fullname" value="" disabled="true">
                    <div class="check1">
                        <i class="fas fa-exclamation-circle"></i> Please fill out this field!
                    </div>
                </div>
                <div class="cashier_phone">
                    <label class="label-phone">Phone</label>
                    <input type="text" class="form-control edit-phone" value="" disabled="true">
                    <div class="check2">
                        <i class="fas fa-exclamation-circle"></i> Please fill out this field!
                    </div>
                </div>
                <div class="cashier_address">
                    <label class="label-address">Address</label>
                    <input type="text" class="form-control edit-address" value="" disabled="true">
                    <div class="check3">
                        <i class="fas fa-exclamation-circle"></i> Please fill out this field!
                    </div>
                </div>
                <button class="info-save btn btn-success" hidden="true">Save</button>
            </div>
            <div class="tab-change-password" hidden="true">
                <div class="form-group">
                    <label for="current-password">Current password</label>
                    <input type="password" class="form-control" id="current-password" placeholder="">
                    <label for="error" class="error1">You have entered the wrong password</label>
                </div>
                <div class="form-group">
                    <label for="new-password">New password</label>
                    <input type="password" class="form-control" id="new-password" placeholder="">
                    <label for="error" class="error2">You have entered the wrong password</label>
                </div>
                <div class="form-group">
                    <label for="confirm-new-password">Confirm new password</label>
                    <input type="password" class="form-control" id="confirm-new-password" placeholder="">
                    <label for="error" class="error3">You have entered the wrong password</label>
                </div>
                <button class="password-save btn btn-success">Save</button>
            </div>
        </div>
    </div>
    <div class="notification">
        Notification
    </div>
    <div class="background">

    </div>
</div>
<?php
    echo $this->Html->script(
        array(
            'jquery/jquery.min',
            'jquery-ui/jquery-ui',
            'lib/foundation.min',
            'cashier/cashier_loader',
            'cashier/cashier_shortcut_keys',
            'cashier/cashier_tabs',
            'bootstrap/bootstrap.min',
            'lib/print.min.js',
            'font-awsome/all',
            'lib/lodash.min.js',
            'cashier/cashier_product',
            'cashier/cashier_customer',
            'cashier/cashier_info',
            'cashier/cashier_pay',
            'cashier/cashier',
            'cashier/cashier_function'
        )
    );
?>
