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
            'customer/info',
            'customer/header',
            'customer/product_search',
            'bootstrap/bootstrap-datepicker.min',
            'customer/function',
            'lib/sweetalert.min'
        ),
        array(
            'inline' => false
        )
    );
?>
<?php
    $user = $this->Session->read('user');
    if (!empty($customer_cart[0]['tCustomer']['address_code'])) {
        $address_code = explode(",", $customer_cart[0]['tCustomer']['address_code']);
        $province = $address_code[0];
        $county = $address_code[1];
        $ward = $address_code[2];
    }
?>
<?php echo $this->element('home/header'); ?>
<div class="container info-content mt-5">
    <div class="row">
        <div class="col-lg-3 col-md-4 col-sm-6 col-12">
            <div class="">
                <ul class="nav nav-info-col3 flex-column">
                    <div class="info-image text-center">
                        <div class="avatar">
                            <img src="<?php echo '../img/customers/'.$user['avatar']; ?>" class="rounded-circle mt-2 mb-3">
                            <div class="btn btn-danger edit"><i class="fas fa-pencil-alt"></i></div>
                            <div class="btn btn-danger update" hidden="true"><i class="far fa-save"></i></div>
                            <div class="update-avatar" hidden="true">
                                <input type="file" name="file" class="avatar_customer" id="file">
                                <label class="foot" for="file">
                                    <i class="fas fa-camera" aria-hidden="true"></i>
                                </label>
                            </div>
                        </div>
                        <div class="info-user-media-body">
                            <h6 class="mb-2" value=""><?php echo $customer['tCustomer']['fullname']; ?></h6>
                            <p class="mb-1"><i class="fas fa-phone fa-rotate-180 mr-1" style="color: #20c997;"></i><?php echo $customer['tCustomer']['phone']; ?></p>
                            <p><i class="fas fa-mail-bulk mr-1" style="color: red;"></i><?php echo $customer['tCustomer']['email']; ?></p>
                        </div>
                    </div>
                    <li class="nav-item mt-2"> 
                        <a href="" data-target="#information" data-toggle="tab" class="nav-link active" aria-expanded="true" >
                            <i class="fas fa-user mr-1"></i>Information
                        </a>
                    </li>
                    <li class="nav-item"> 
                        <a href="" data-target="#changepassword" data-toggle="tab" class="nav-link" aria-expanded="false"><i class="fas fa-key mr-1"></i>Change password</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="col-lg-9 col-md-8 col-sm-6 col-12 info-content-col9">
            <div class="tab-content">
                <div class="tab-pane active" id="information" aria-expanded="true">
                    <form role="form">
                        <div class="form-group row info-content-name">
                            <label class="col-lg-3 col-form-label form-control-label text-center">Username</label>
                            <div class="col-lg-9">
                                <input class="form-control info-id" type="text" value="<?php echo $customer['tCustomer']['id']; ?>" hidden="true">
                                <input class="form-control" type="text" value="<?php echo $customer['tCustomer']['username']; ?>" placeholder="" readonly>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label form-control-label text-center">Fullname</label>
                            <div class="col-lg-9">
                                <input class="form-control info-fullname" type="text" value="<?php echo $customer['tCustomer']['fullname']; ?>" placeholder="Your fullname">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label form-control-label text-center">Sex</label>
                            <div class="col-lg-9 d-flex">
                                <div class="info-label-male">
                                    <label>
                                        Male 
                                        <?php if ($customer['tCustomer']['gender'] == "Male") { ?>
                                            <input type="radio" name="gender"  id="gendermale" class="gender mr-2 info-gender" checked="checked" >
                                        <?php } else { ?>
                                            <input type="radio" name="gender"  id="gendermale" class="gender mr-2 info-gender">
                                        <?php } ?>
                                        
                                    </label>
                                </div>
                                <div class="info-label-female">
                                    <label>
                                        Female
                                        <?php if ($customer['tCustomer']['gender'] == "Female") {  ?>
                                            <input type="radio" name="gender"  id="genderfemale" class="gender mr-2 info-gender" checked="checked">
                                        <?php } else { ?>
                                            <input type="radio" name="gender"  id="genderfemale" class="gender mr-2 info-gender">
                                        <?php } ?>
                                        
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label form-control-label text-center">E-mail</label>
                            <div class="col-lg-9">
                                <input class="form-control" type="email" value="<?php echo $customer['tCustomer']['email']; ?>" placeholder="" readonly>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label form-control-label text-center">Phone</label>
                            <div class="col-lg-9">
                                <input class="form-control info-phone" type="text" value="<?php echo $customer['tCustomer']['phone']; ?>">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label form-control-label text-center">Birthday</label>
                            <div class="col-lg-9">
                                <input class="form-control info-birthday" type="text" value="<?php echo $customer['tCustomer']['birthday']; ?>" id="datepicker" placeholder="">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label form-control-label"></label>
                            <div class="col-lg-12 info-content-button">
                                <input type="reset" class="btn btn-secondary mr-2" value="Cancel">
                                <input type="button" class="btn btn-primary ml-2 info-save" value="Update">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="tab-pane" id="changepassword" aria-expanded="false">
                    <form action="" method="post" id="changePwd">
                        <div class="form-group row info-content-oldpwd ">
                            <label class="col-lg-3 col-form-label form-control-label">Current password</label>
                            <div class="col-lg-9 pass-show">
                                <input class="form-control pass-id" type="text" value="<?php echo $customer['tCustomer']['id']; ?>" hidden="true">
                                <input class="form-control" type="password" id="current-password">
                                <label for="error" class="errorpwd error-pwd"><i class="fas fa-exclamation-circle"></i>Please input your password</label>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label form-control-label">New password</label>
                            <div class="col-lg-9 pass-show">
                                <input type="password" id="new-password" class="form-control" placeholder="***********">
                                <span class="form-text small text-muted">
                                    The password must be 8-20 characters, and must <em>not</em> contain spaces.
                                </span>
                                <label for="error" class="errorpwd error-new-pwd"><i class="fas fa-exclamation-circle"></i>Please input new password</label> 
                            </div>
                            
                        </div>
                        <div class="form-group row ">
                            <label class="col-lg-3 col-form-label form-control-label">Confirm new password</label>
                            <div class="col-lg-9 pass-show">
                                <input type="password" id="confirm-new-password" class="form-control" placeholder="***********" >
                                <span class="form-text small text-muted">
                                    To confirm, type the new password again.
                                </span>
                                <label for="error" class="errorpwd error-confirm-pwd"><i class="fas fa-exclamation-circle"></i>Please confirm your new password</label>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label form-control-label"></label>
                            <div class="col-lg-12 info-content-button">
                                <input type="button" class="btn btn-primary ml-2 info-change-pwd" value="Change password">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="tab-pane" id="notification" aria-expanded="false">
                    <p class="text-center"> You have no notification</p>
                    <button class="btn info-notifi-btn btn-outline-primary">Continue shoping</button>
                </div>
                <div class="tab-pane" id="ordermanagement" aria-expanded="false">
                    <button class="btn info-notifi-btn btn-outline-primary">Continue shoping</button>
                </div>
            </div>
        </div>
    </div>
</div>

<?php echo $this->element('home/footer'); ?>    
