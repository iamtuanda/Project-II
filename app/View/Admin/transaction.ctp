<?php
echo $this->Html->css(
    array(
        'admin/admin',
        'admin/search',
        'admin/check-delete',
        'admin/transaction',
        'bootstrap/bootstrap-datepicker'
    ),
    array('inline' => false));
echo $this->Html->script(
    array(
        'admin/admin',
        'admin/transaction',
        'lib/print.min',
        'bootstrap/bootstrap-datepicker.min'
    ),
    array('inline' => false));
?>
<div id="wrapper">
    <div id="content-wrapper" class='d-flex flex-column'>
        <?php echo $this->element('admin/header'); ?>
        <div class="container" id='transaction-management'>
            <div class="row" id='transactions'>
                <div class="col-sm-12 list-tabs">
                    <ul class="nav nav-tabs" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" data-toggle="tab" href="#home">Bills</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#menu1">Orders</a>
                        </li>
                    </ul>
                </div>
                <div class="col-sm-12 content">
                    <div class="row">
                        <div class="col-sm-12 transaction">
                            <div class="tab-content">
                                <div id="home" class="container tab-pane active"><br>
                                    <div class="header">
                                        <div class="inner-search">
                                            <div class="input-field search" id="search">
                                                <input class="input" id="inputFocus" type="text" placeholder="Keyword">
                                                <button class="clear" id="clear">
                                                    <i class="fas fa-times button-close"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="dropdown view-mode">
                                            <div class="dropdown-toggle" data-toggle="dropdown">
                                                <input type="text" class="form-control" value="All bill" disabled>
                                            </div>
                                            <div class="dropdown-menu dropdown-menu-right bill">
                                                <a class="dropdown-item active">All bill</a>
                                                <a class="dropdown-item">7 days ago</a>
                                                <a class="dropdown-item">10 biggest bills</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="table-responsive bills">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th class="check-allT"><input type="checkbox" class="form-check-inputT check-bill" value=""></th>
                                                    <th class="trading-code">Trading code</th>
                                                    <th>Cashier</th>
                                                    <th>Customer</th>
                                                    <th>Time</th>
                                                    <th class="right">Total-price</th>
                                                </tr>
                                            </thead>
                                            <tbody class="tbody">
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td align="right" class="price_format"><?php echo $total_price_bill; ?></td>
                                                </tr>
                                                <?php if(sizeof($bills) > 0) { ?>
                                                <?php foreach($bills as $key => $bill) :?>
                                                <tr class="sh-infoT">
                                                    <td class="check-boxT"><input type="checkbox" class="form-check-inputT check-bill" value=""></td>
                                                    <td><?php echo $bill['tBillManagement']['bill_code']; ?></td>
                                                    <td><?php echo $bill['AccountManagement']['fullname']; ?></td>
                                                    <td><?php echo $bill['CustomerManagement']['username'] == Null ? "Guest" : $bill['CustomerManagement']['username']; ?></td>
                                                    <td><?php echo $bill['tBillManagement']['time']; ?></td>
                                                    <td align="right" class="price_format"><?php echo $bill['tBillManagement']['total_price'] ?></td>
                                                </tr>
                                                <tr class="transaction-detail">
                                                    <td colspan="6">
                                                        <div class="title">
                                                            <h3>Transaction detail</h3>
                                                        </div>
                                                        <div class="detail-info">
                                                            <div class="row">
                                                                <div class="col-sm-6 col-lg-4">
                                                                    <div class="form-group form-control tracsaction-key">
                                                                        <label for="" class="form-label control-label ">Trading code:</label>
                                                                        <strong><?php echo $bill['tBillManagement']['bill_code']; ?></strong>
                                                                    </div>
                                                                    <fieldset disabled="true">
                                                                        <div class="form-group form-control tracsaction-time">
                                                                            <label for="disabledInput" class="form-label control-label ">Time:</label>
                                                                            <strong><?php echo $bill['tBillManagement']['time']; ?></strong>
                                                                        </div>
                                                                    </fieldset>
                                                                    <div class="form-group form-control tracsaction-guest">
                                                                        <label for="" class="form-label control-label ">Guest:</label>
                                                                        <strong><?php $bill['CustomerManagement']['username'] == Null ? "Guest" : $bill['CustomerManagement']['username'];  ?></strong>
                                                                    </div>
                                                                    <?php if($bill['CustomerManagement']['username'] != Null) :?>
                                                                    <div class="form-group form-control tracsaction-phone">
                                                                        <label for="" class="form-label control-label">Phone number:</label>
                                                                        <strong><?php echo $bill['CustomerManagement']['phone'] ?></strong>
                                                                    </div>
                                                                    <?php endif; ?>
                                                                </div>
                                                                <div class="col-sm-6 col-lg-4">
                                                                    <?php if($bill['CustomerManagement']['username'] != Null) :?>
                                                                    <div class="form-group form-control tracsaction-point">
                                                                        <label for="" class="form-label control-label">Point:</label>
                                                                        <strong><?php echo $bill['CustomerManagement']['point'] ?></strong>
                                                                    </div>
                                                                    <div class="form-group form-control tracsaction-add">
                                                                        <label for="" class="form-label control-label ">Address:</label>
                                                                        <strong><?php echo $bill['CustomerManagement']['address'] ?></strong>
                                                                    </div>
                                                                    <?php endif; ?>
                                                                    <div class="form-group form-control tracsaction-cashier">
                                                                        <label for="" class="form-label control-label ">Cashier:</label>
                                                                        <strong><?php echo $bill['AccountManagement']['fullname']; ?></strong>
                                                                    </div>
                                                                    <div class="form-group form-control tracsaction-type">
                                                                        <label for="" class="form-label control-label ">Payment type:</label>
                                                                        <strong><?php echo $bill['PaymentMethod']['type']; ?></strong>
                                                                    </div>
                                                                </div>
                                                                <div class="col-sm-12 col-lg-4">
                                                                    <textarea class="description tracsaction-note" rows="9" data-add="Ha noi"><?php echo $bill['tBillManagement']['note']; ?></textarea>
                                                                </div>
                                                                <div class="col-sm-12 products-list">
                                                                    <table class="table">
                                                                        <thead>
                                                                            <tr>
                                                                                <th class="commodity-code">Commodity codes</th>
                                                                                <th>Product name</th>
                                                                                <th>goods of group</th>
                                                                                <th class="right">Quantity</th>
                                                                                <th class="right">Price</th>
                                                                                <th class="right">Provisional</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <?php foreach($bill['Products'] as $key1 => $product) :?>
                                                                                <tr>
                                                                                    <td><?php echo $product['product_code']; ?></td>
                                                                                    <td><?php echo $product['name']; ?></td>
                                                                                    <td><?php echo $product['category']; ?></td>
                                                                                    <td align="right"><?php echo $product['quantity']; ?></td>
                                                                                    <td align="right" class="price_format"><?php echo $product['price']; ?></td>
                                                                                    <td align="right" class="price_format"><?php echo ((int)$product['price'] * (int)$product['quantity']); ?></td>
                                                                                </tr>
                                                                            <?php endforeach; ?>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                                <div class="col-sm-12">
                                                                    <table class="summary">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="right">Total:</td>
                                                                                <td align="right" class="total-price price_format"><?php echo $bill['tBillManagement']['total_price']; ?></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td align="right">Use point:</td>
                                                                                <td align="right" class="use-point"><?php echo $bill['PaymentMethod']['point']; ?></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td align="right">Card:</td>
                                                                                <td align="right" class="use-card"><?php echo $bill['PaymentMethod']['card']; ?></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td align="right">Cash:</td>
                                                                                <td align="right" class="cash"><?php echo $bill['PaymentMethod']['cash']; ?></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td align="right">Change:</td>
                                                                                <td align="right" class="change price_format"><?php echo $bill['PaymentMethod']['change']; ?></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                                <div class="manipulation">
                                                                    <a class="btn btn-default save"><i class="far fa-save icon-manipulation"></i>save</a>
                                                                    <a class="btn btn-default print printB"><i class="fas fa-print icon-manipulation"></i>print</a>
                                                                    <a class="btn btn-default destroy"><i class="fas fa-trash-alt icon-manipulation"></i>delete</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <?php endforeach ?>
                                                <?php } else { ?>
                                                <tr class="sh-infoT">
                                                    <td colspan="6">Bills is currently empty!!!</td>
                                                </tr>
                                                <?php } ?>
                                            </tbody>
                                        </table>
                                    </div>
                                    <button type="button" class="btn btn-danger delete-allT delete-allB"><i class="fas fa-trash-alt icon-delete-allT"></i>Delete all</button>
                                    <div class="checked-messageT checked-messageB">
                                        <span>there</span>
                                        <span class="quantityT"></span>
                                        <span>-</span>
                                        <a class='unchecked-allT unchecked-allB'><i class="fas fa-times icon-unchecked-allT"></i>uncheckedall</a>
                                    </div>
                                    <div class="pagination paginationB">
                                        <?php if($bill_page_number > 0) {?>
                                            <div class="page pageB">
                                                <ul class="list-page">
                                                    <?php if($bill_page_number > 1) {?>
                                                        <li class="page-item page-itemB prev-page-item prev-page-itemB hide"><a class="prev-page">prev</a></li>
                                                            <?php for($i = 0; $i < $bill_page_number; $i++) {?>
                                                                <?php if($i == 0) {?>
                                                                    <li class="page-item page-itemB page_link page_linkB active"><a>1</a></li>
                                                                <?php } else { ?>
                                                                    <li class="page-item page-itemB page_link page_linkB"><a>
                                                                    <?php echo ($i + 1); ?></a></li>
                                                                <?php } ?>
                                                            <?php } ?>
                                                        <li class="page-item page-itemB next-page-item next-page-itemB"><a class="next-page">next</a></li>
                                                    <?php } ?>
                                                </ul>
                                            </div>
                                        <?php } ?>
                                    </div>
                                </div>
                                <div id="menu1" class="container tab-pane fade"><br>
                                    <div class="header">
                                        <div class="inner-search">
                                            <div class="input-field search" id="search">
                                                <input class="input" id="inputFocusO" type="text" placeholder="Keyword">
                                                <button class="clear" id="clearO">
                                                    <i class="fas fa-times button-close"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="dropdown view-mode">
                                            <div class="dropdown-toggle" data-toggle="dropdown">
                                                <input type="text" class="form-control" value="All order" disabled>
                                            </div>
                                            <div class="dropdown-menu dropdown-menu-right order">
                                                <a class="dropdown-item active">All order</a>
                                                <a class="dropdown-item">Unconfimred</a>
                                                <a class="dropdown-item">Delivering</a>
                                                <a class="dropdown-item">Delivered</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="table-responsive">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th class="check-allT"><input type="checkbox" class="form-check-inputT check-order" value=""></th>
                                                    <th class="trading-code">Trading code</th>
                                                    <th>Cashier</th>
                                                    <th>Customer</th>
                                                    <th>Order time</th>
                                                    <th>Status</th>
                                                    <th class="right">Total-price</th>
                                                </tr>
                                            </thead>
                                            <tbody class="orders">
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td align="right" class="price_format"><?php echo $total_price_order; ?></td>
                                                </tr>
                                                <?php if(sizeof($orders) > 0) { ?>
                                                <?php foreach($orders as $key => $order) :?>
                                                <tr class="sh-infoT">
                                                    <td class="check-boxT"><input type="checkbox" class="form-check-inputT check-order" value=""></td>
                                                    <td>
                                                        <?php echo $order['tOrderManagement']['order_code'] ?>
                                                    </td>
                                                    <td>
                                                        <?php echo $order['tOrderManagement']['account_id'] == '0' ? 'Not approval' : $order['AccountManagement']['fullname']; ?>
                                                    </td>
                                                    <td>
                                                        <?php echo $order['CustomerManagement']['username'] ?>
                                                    </td>
                                                    <td>
                                                        <?php echo $order['tOrderManagement']['time'] ?>
                                                    </td>
                                                    <td>
                                                        <?php echo $order['tOrderManagement']['statement'] == 'Successful' ? "Unconfimred" : $order['tOrderManagement']['statement'];?>
                                                    </td>
                                                    <td align="right" class="price_format"><?php echo $order['tOrderManagement']['total_price']; ?></td></tr>
                                                <tr class="transaction-detail">
                                                    <td colspan="7">
                                                        <div class="title">
                                                            <h3>Transaction detail</h3>
                                                        </div>
                                                        <div class="detail-info">
                                                            <div class="row">
                                                                <div class="col-sm-6 col-lg-4">
                                                                    <div class="form-group form-control tracsaction-key">
                                                                        <label for="" class="form-label control-label ">Trading code:</label>
                                                                        <strong><?php echo $order['tOrderManagement']['order_code'] ?></strong>
                                                                        <strong class="status"><?php echo $order['tOrderManagement']['statement'] == 'Successful' ? "Unconfimred" : $order['tOrderManagement']['statement']; ?></strong>
                                                                    </div>
                                                                    <fieldset disabled="true">
                                                                        <div class="form-group form-control tracsaction-time">
                                                                            <label for="disabledInput" class="form-label control-label ">Order time:</label>
                                                                            <strong><?php echo $order['tOrderManagement']['time'] ?></strong>
                                                                        </div>
                                                                    </fieldset>
                                                                    <div class="form-group form-control tracsaction-cashier">
                                                                        <label for="" class="form-label control-label ">Cashier:</label>
                                                                        <strong><?php echo $order['tOrderManagement']['account_id'] == '0' ? 'Not approval' : $order['AccountManagement']['fullname'];?></strong>
                                                                    </div>
                                                                    <div class="form-group form-control tracsaction-type">
                                                                        <label for="" class="form-label control-label ">Payment type:</label>
                                                                        <strong><?php echo $order['PaymentMethod']['type'] ?></strong>
                                                                    </div>
                                                                    <?php if($order['tOrderManagement']['delivering_date'] != '') :?>
                                                                        <div class="form-group form-control delivering-date">
                                                                            <label for="" class="form-label control-label ">Delivering date:</label>
                                                                            <strong><?php echo $order['tOrderManagement']['delivering_date']; ?></strong>
                                                                        </div>
                                                                    <?php endif ?>
                                                                    <?php if($order['tOrderManagement']['delivered_date'] != '') :?>
                                                                        <div class="form-group form-control delivered-date">
                                                                            <label for="" class="form-label control-label ">Deliverd date:</label>
                                                                            <strong><?php echo $order['tOrderManagement']['delivered_date']; ?></strong>
                                                                        </div>
                                                                    <?php endif ?>
                                                                </div>
                                                                <div class="col-sm-6 col-lg-4">
                                                                    <div class="form-group form-control tracsaction-guest">
                                                                        <label for="" class="form-label control-label ">Guest:</label>
                                                                        <strong><?php echo $order['CustomerManagement']['username'] ?></strong>
                                                                    </div>
                                                                    <div class="form-group form-control tracsaction-phone">
                                                                        <label for="" class="form-label control-label ">Phone number:</label>
                                                                        <strong><?php echo $order['CustomerManagement']['phone'] ?></strong>
                                                                    </div>
                                                                    <div class="form-group form-control tracsaction-point">
                                                                        <label for="" class="form-label control-label ">Point:</label>
                                                                        <strong><?php echo $order['CustomerManagement']['point'] ?></strong>
                                                                    </div>
                                                                    <div class="form-group form-control tracsaction-add">
                                                                        <label for="" class="form-label control-label ">Contact:</label>
                                                                        <strong><?php echo $order['tOrderManagement']['contact'] ?></strong>
                                                                    </div>
                                                                </div>
                                                                <div class="col-sm-12 col-lg-4">
                                                                    <textarea class="description tracsaction-note" rows="9"><?php echo $order['tOrderManagement']['note'] ?></textarea>
                                                                </div>
                                                                <div class="col-sm-12 products-list">
                                                                    <table class="table">
                                                                        <thead>
                                                                            <tr>
                                                                                <th class="commodity-code">Commodity codes</th>
                                                                                <th>Product name</th>
                                                                                <th>goods of group</th>
                                                                                <th class="right">Quantity</th>
                                                                                <th class="right">Price</th>
                                                                                <th class="right">Provisional</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <?php foreach($order['Products'] as $key1 => $product) :?>
                                                                                <tr>
                                                                                    <td><?php echo $product['product_code']; ?></td>
                                                                                    <td><?php echo $product['name']; ?></td>
                                                                                    <td><?php echo $product['category']; ?></td>
                                                                                    <td align="right"><?php echo $product['quantity']; ?></td>
                                                                                    <td align="right" class="price_format"><?php echo $product['price']; ?></td>
                                                                                    <td align="right" class="price_format"><?php echo ((int)$product['price'] * (int)$product['quantity']); ?></td>
                                                                                </tr>
                                                                            <?php endforeach; ?>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                                <div class="col-sm-12">
                                                                    <table class="summary">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="right">Provisional:</td>
                                                                                <td align="right" class="provisional price_format"><?php echo $order['tOrderManagement']['provisional']; ?></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td align="right">Shipment fee:</td>
                                                                                <td align="right" class="shipment-fee"><?php echo $order['tOrderManagement']['ship-fee']; ?></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td align="right">Use point:</td>
                                                                                <td align="right" class="use-point"><?php echo $order['PaymentMethod']['point']; ?></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td align="right">Total:</td>
                                                                                <td align="right" class="total-price price_format"><?php echo $order['tOrderManagement']['total_price']; ?></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                                <div class="manipulation">
                                                                    <a class="btn btn-default save"><i class="far fa-save icon-manipulation"></i>save</a>
                                                                    <?php if($order['tOrderManagement']['statement'] != 'Delivered') :?>
                                                                        <a class="btn btn-default delivered"><i class="fas fa-check-double icon-manipulation"></i>delivered</a>
                                                                    <?php endif ?>
                                                                    <?php if($order['tOrderManagement']['statement'] != 'Delivering' && $order['tOrderManagement']['statement'] != 'Delivered') :?>
                                                                        <a class="btn btn-default delivering"><i class="fas fa-truck icon-manipulation"></i></i>delivering</a>
                                                                    <?php endif ?>
                                                                    <a class="btn btn-default print printO"><i class="fas fa-print icon-manipulation"></i>print</a>
                                                                    <a class="btn btn-default destroy"><i class="fas fa-trash-alt icon-manipulation"></i>delete</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <?php endforeach ?>
                                                <?php } else { ?>
                                                    <tr class="sh-infoT">
                                                        <td colspan="6">Orders is currently empty!!!</td>
                                                    </tr>
                                                <?php } ?>
                                            </tbody>
                                        </table>
                                    </div>
                                    <button type="button" class="btn btn-danger delete-allT delete-allO"><i class="fas fa-trash-alt icon-delete-allT"></i>Delete all</button>
                                    <div class="checked-messageT checked-messageO">
                                        <span>there</span>
                                        <span class="quantityT"></span>
                                        <span>-</span>
                                        <a class='unchecked-allT unchecked-allO'><i class="fas fa-times icon-unchecked-allT"></i>uncheckedall</a>
                                    </div>
                                    <div class="pagination paginationO">
                                        <?php if($order_page_number > 0) {?>
                                            <div class="page pageO">
                                                <ul class="list-page">
                                                    <?php if($order_page_number > 1) {?>
                                                        <li class="page-item page-itemO prev-page-item prev-page-itemO hide"><a class="prev-page">prev</a></li>
                                                        <?php for($i = 0; $i < $order_page_number; $i++) {?>
                                                            <?php if($i == 0) {?>
                                                                <li class="page-item page-itemO page_link page_linkO active"><a>1</a></li>
                                                            <?php } else { ?>
                                                                <li class="page-item page-itemO page_link page_linkO"><a><?php echo ($i + 1); ?></a></li>
                                                            <?php } ?>
                                                        <?php } ?>
                                                        <li class="page-item page-itemO next-page-item next-page-itemO"><a class="next-page">next</a></li>
                                                    <?php } ?>
                                                </ul>
                                            </div>
                                        <?php } ?>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
                    <p>The system will <b>completely delete <i class='code_T'></i> </b> transactions on the entire branch. Are you sure you want to delete?</p>
                    <div class="transaction_id" hidden></div>
                    <div class="transaction_type" hidden></div>
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
<div class="save-alert">
    <p>Save successful!!!</p>
</div>

<script>
$('.datetimepicker, .input-group.date').datepicker({
    todayBtn: true,
    daysOfWeekHighlighted: "0,6",
    autoclose: true,
    todayHighlight: true
});
</script>