<?php
echo $this->Html->css(
    array(
        'admin/admin',
        'admin/login',
    ),
    array('inline' => false));
echo $this->Html->script(
    array(
        'admin/admin',
        'admin/login',
    ),
    array('inline' => false));
?>
<div class="container-login">
    <div class="container-fluid login">
        <div class="content-wrapper">
            <div class="row w-100">
                <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 mx-auto">
                    <div class="auto-form-wrapper">
                        <form>
                            <div class="form-group" id="phonenumber">
                                <label class="label">Phone number</label>
                                <div class="input-group">
                                    <input type="text" class="form-control phonenumber" maxlength="10">
                                </div>
                                <div class="notBlank">
                                    <i class="fas fa-exclamation-circle icon-warn"></i>
                                    <label for="" class="eBlank">Please fill out this field</label>
                                </div>
                            </div>
                            <div class="form-group" id="password">
                                <label class="label">Password</label>
                                <div class="input-group">
                                    <input type="password" class="form-control password" placeholder="*********">
                                </div>
                                <div class="notBlank">
                                    <i class="fas fa-exclamation-circle icon-warn"></i>
                                    <label for="" class="eBlank">Please fill out this field</label>
                                </div>
                            </div>
                            <div class="form-group">
                                <button class="btn btn-success btn-block sell">Sell</button>
                                <button class="btn btn-primary btn-block admin">Management</button>
                            </div>
                            <div class="form-group error">
                                <label for="">wrong phonenumber or password!!!</label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>