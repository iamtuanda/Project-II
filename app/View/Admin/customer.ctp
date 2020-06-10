<?php
echo $this->Html->css(
    array(
        'admin/admin',
        'admin/search',
        'admin/check-delete',
        'admin/customer',
    ),
    array('inline' => false));
echo $this->Html->script(
    array(
        'admin/admin',
        'admin/customer',
    ),
    array('inline' => false));
?>
<div id="wrapper">
    <div id="content-wrapper" class='d-flex flex-column'>
        <?php echo $this->element('admin/header'); ?>
        <div class="container" id='customer-management'>
            <div class="row" id='customers-list'>
                <div class="col-lg-12 header">
                    <div class="title">
                        Customer lists
                    </div>
                    <div class="inner-searchC">
                        <div class="input-fieldC searchC" id="searchC">
                            <input class="inputC" id="inputFocusC" type="text" placeholder="Keyword">
                            <button class="clearC" id="clearC">
                                <i class="fas fa-times button-closeC"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12 table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th class="check-all"><input type="checkbox" class="form-check-input" value=""></th>
                                <th>#</th>
                                <th>Avatar</th>
                                <th>Name</th>
                                <th>User name</th>
                                <th>Phone Number</th>
                                <th>Point</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php if(sizeof($customers) > 0) {?>
                                <?php foreach($customers as $key => $customer) :?>
                                    <tr>
                                        <td class="check-box"><input type="checkbox" class="form-check-input" value=""></td>
                                        <td>
                                            <?php echo ($key + 1); ?>
                                        </td>
                                        <td class="customer-image"><img src="../img/customers/<?php echo $customer['tCustomerManagement']['avatar'] == '' ? $customer['tCustomerManagement']['avatar'] = 'zoro.jpg' : $customer['tCustomerManagement']['avatar'];?>" alt=""></td>
                                        <td>
                                            <?php echo  $customer['tCustomerManagement']['username']; ?>
                                        </td>
                                        <td>
                                            <?php echo  $customer['tCustomerManagement']['email']; ?>
                                        </td>
                                        <td>
                                            <?php echo  $customer['tCustomerManagement']['phone']; ?>
                                        </td>
                                        <td>
                                            <?php echo  $customer['tCustomerManagement']['point']; ?>
                                        </td>
                                        <td>
                                            <button type="button" class="deleteC">
                                                <i class="fas fa-trash-alt icon-deleteC"></i>
                                            </button>
                                        </td>
                                    </tr>
                                <?php endforeach ?>
                            <?php } else { ?>
                                    <tr>
                                        <td colspan="8">
                                            <p class="empty">Customer is currently empty!!!</p>
                                        </td>
                                    </tr>
                            <?php } ?>
                        </tbody>
                    </table>
                </div>
                <button type="button" class="btn btn-danger delete-all"><i class="fas fa-trash-alt icon-delete-all"></i>Delete all</button>
                <div class="checked-message">
                    <span>there</span>
                    <span class="quantity">is <b>1</b> selected customer</span>
                    <span>-</span>
                    <a class='unchecked-all'><i class="fas fa-times icon-unchecked-all"></i>uncheckedall</a>
                </div>
                <div class="pagination">
                    <?php if($page_number > 0) {?>
                        <div class="page">
                            <ul class="list-page">
                                <?php if($page_number > 1) {?>
                                    <li class="page-item prev-page-item hide"><a class="prev-page">prev</a></li>
                                        <?php for($i = 0; $i < $page_number; $i++) {?>
                                            <?php if($i == 0) {?>
                                                <li class="page-item page_link active"><a>1</a></li>
                                            <?php } else { ?>
                                                <li class="page-item page_link"><a>
                                                <?php echo ($i + 1); ?></a></li>
                                            <?php } ?>
                                        <?php } ?>
                                    <li class="page-item next-page-item"><a class="next-page">next</a></li>
                                <?php } ?>
                            </ul>
                        </div>
                    <?php } ?>
                </div>
            </div>
        </div>
        <?php echo $this->element('admin/information-personal'); ?>
        <div class="check-delete">
            <div class="yes-no">
                <div class="header">
                    <p>Delete the cashier</p>
                    <i class="fas fa-times close-yes-no"></i>
                </div>
                <div class="content">
                    <p>The system will <b>completely delete <i class='user_email'>SP000001</i> </b> goods on the entire branch but will retain the goods information in historical transactions if any. Are you sure you want to delete?</p>
                    <div class="email-list" hidden></div>
                </div>
                <div class="footer">
                    <button type="submit" class="btn btn-primary yes-bt"><i class="fas fa-check icon"></i>Yes</button>
                    <button type="button" class="btn btn-secondary no-bt"><i class="fas fa-ban icon"></i>No</button>
                </div>
            </div>
        </div>
        <div class="frame-check-delete"></div>
    </div>
</div>
</div>
<div class="delete-alert">
    <i class="fas fa-trash-alt icon-delete-alert"></i>
    <p>Delete successful!!!</p>
</div>