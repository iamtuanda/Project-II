<div class="modal fade" id="signin-modal" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
    <div class=" modal-dialog" role="document" style="max-width: 100%;">
        <div class="container">
            <div class="row main-content text-center bg-light" style="pointer-events: auto;">
                <div class="col-md-4 text-center signin-img">
                    <h2>Signin & Signup</h2>
                    <p>Signin, Signup to be able to buy useful products from us.</p>
                    <img src="../img/sign-up.png" alt="" >
                </div>
                <div class="col-md-8 col-xs-12 col-sm-12 signin-form ">
                    <div class="card">
                        <article class="card-body">
                            <div class="container">
                                <div class="justify-content-center">
                                    <ul class="nav nav-pills nav-fill mb-1" id="pills-tab" role="tablist">
                                        <li class="nav-item"> 
                                            <a class="nav-link text-center mb-4 mt-1 active " id="pills-signin-tab" data-toggle="pill" href="#pills-signin" role="tab" aria-controls="pills-signin" aria-selected="true">Sign In</a> 
                                        </li>
                                        <li class="nav-item"> 
                                            <a class="nav-link text-center mb-4 mt-1" id="pills-signup-tab" data-toggle="pill" href="#pills-signup" role="tab" aria-controls="pills-signup" aria-selected="false">Sign Up
                                            </a> 
                                        </li>
                                        <button type="button" class="close signin-set-btn" data-dismiss="modal" aria-label="Close"> 
                                            <span aria-hidden="true">&times;</span> 
                                        </button>
                                    </ul>
                                </div>
                                <hr>
                                <!-- SignIn -->
                                <div class="tab-content" id="pills-tabContent">
                                    <div class="tab-pane fade show active" id="pills-signin" role="tabpanel" aria-labelledby="pills-signin-tab">
                                        <div class="form-group">
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"> <i class="fa fa-user"></i> </span>
                                                </div>
                                                <input name="name" id="singin" class="form-control username-login" placeholder="Enter your login name" type="name" required="">

                                            </div>
                                            <label for="error" class="error error-signin-name">Please fill out this field</label> 
                                        </div>
                                        <div class="form-group">
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                                                </div>
                                                <input type="password" name="password" id="signinpassword" class="form-control password-login" placeholder="Enter a password between 6 and 20 characters"
                                                required>
                                            </div>
                                            <span class="eye" onclick="iconShowHide();">
                                                <i id="enable" class="far fa-eye" aria-hidden="true"></i>
                                                <i id="disable" class="far fa-eye-slash" aria-hidden="true"></i>
                                            </span>
                                            <label for="error" class="error error-signin-pwd">Please fill out this field</label>
                                        </div>
                                        <div class="form-group">
                                            <button class="btn btn-primary btn-block btn-signin"> Sign  in  </button>
                                        </div>
                                        <div class="singin-text text-center">
                                        </div>
                                    </div>
                                    <!-- Signup -->
                                    <div class="tab-pane fade" id="pills-signup" role="tabpanel" aria-labelledby="pills-signup-tab">
                                        <div class="col-sm-12 pt-2">
                                            <form id="signupFrom">
                                                <div class="form-group form-inline">
                                                    <label class="font-weight-bold"> Username
                                                        <span class="text-danger">*</span>
                                                    </label>
                                                    <input type="text"name="signupusername" id="signupusername" class="form-control form-control-name signup-name" placeholder="Your user name" required>
                                                    <div class="text-gray-dark">
                                                        <em>This will be your login name!</em>
                                                    </div>
                                                    <label for="error" class="error error-signup-name">Please enterer your name</label>
                                                </div>
                                                <div class="form-group form-inline">
                                                    <label class="font-weight-bold">Email 
                                                        <span class="text-danger">*</span>
                                                    </label>
                                                    <input type="email" name="signupemail" id="signupemail" class="form-control form-control-email signup-email" placeholder="example@com.vn" required>
                                                    <label for="error" class="error error-signup-email">Please enterer your email</label>
                                                </div>
                                                <div class="form-group form-inline">
                                                    <label class="font-weight-bold">Password 
                                                        <span class="text-danger">*</span>
                                                    </label>
                                                    <input type="password" name="signuppassword" id="signuppassword" class="form-control form-control-pwd signup-pwd" placeholder="***********"required>
                                                </div>
                                                <span class="eyesu" onclick="hidePass();">
                                                    <i id="enablesu" class="far fa-eye" style="display: none;" aria-hidden="true"></i>
                                                    <i id="disablesu" class="far fa-eye-slash" aria-hidden="true"></i>
                                                </span>
                                                <label for="error" class="error error-signup-pwd">Please enterer your password</label>
                                                <div class="form-group form-inline">
                                                    <label class="font-weight-bold">Confirm Password 
                                                        <span class="text-danger">*</span>
                                                    </label>
                                                    <input type="password" name="signupcpassword" id="signupcpassword" class="form-control form-control-cpwd signup-pwd-cf" placeholder="***********" required>
                                                    <label for="error" class="error error-signup-cpwd"> Please enterer your password </label>
                                                </div>
                                                <div class="form-group form-inline">
                                                    <label for="" class="font-weight-bold"> Gender </label>
                                                    <div class="form-control-gender form-inline">
                                                        <label for="" class="radio-container pl-5 pr-5"> 
                                                            Male
                                                            <input type="radio" checked="ckecked" name="gender" class="signup-gender">
                                                            <span class="checkmark"></span>
                                                        </label>
                                                        <label for="" class="radio-container pl-5 pr-5"> Female
                                                            <input type="radio" name="gender" class="signup-gender" >
                                                            <span class="checkmark"></span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div class="form-group form-inline">
                                                    <div class="input-group">
                                                        <label class="font-weight-bold">Birthday</label>
                                                        <div class="form-group-inputdate">
                                                            <input type="text" name="birthday" class="form-control-birthday date signup-birthday info-birthday" id="datepicker" readonly>
                                                            <label ><i class="far fa-calendar-alt fa-2x pb-1"></i></label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label>
                                                        <input type="checkbox" name="signupcondition" id="signupcondition" required> I agree with the <a href="javascript:;">Mishon team</a> for Registration.
                                                    </label>
                                                </div>
                                                <div class="form-group">
                                                    <input type="button" name="signupsubmit" value="Sign Up" class="btn btn-block btn-primary signup-btn">
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div> 
                </div>
            </div>
        </div>  
    </div>
</div>