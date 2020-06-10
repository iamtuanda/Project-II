<?php
echo $this->Html->css(
    array(
        'admin/admin',
        'admin/search',
        'admin/check-delete',
        'admin/event',
        'bootstrap/bootstrap-datetimepicker.min'
    ),
    array('inline' => false));
echo $this->Html->script(
    array(
        'admin/admin',
        'admin/event',
        'ckeditor/ckeditor',
        'bootstrap/bootstrap-datetimepicker.min'
    ),
    array('inline' => false));
?>
<div id="wrapper">
    <div id="content-wrapper" class='d-flex flex-column'>
        <?php echo $this->element('admin/header'); ?>
        <div class="container" id='events-management'>
            <div class="row" id="events">
                <div class="col-sm-12 header">
                    <div class="add-event">
                        <ul class="add-new-event">
                            <li>
                                <a href="#"><i class="fas fa-plus icon-add-event"></i>Add new event</a>
                            </li>
                        </ul>
                    </div>
                    <div class="primary">
                        <div class="inner-search">
                            <div class="input-field search" id="search">
                                <input class="input" id="inputFocus" type="text" placeholder="Keyword">
                                <button class="clear" id="clear">
                                    <i class="fas fa-times button-close"></i>
                                </button>
                            </div>
                        </div>
                        <div class="dropdown view-mode view-modeE">
                            <div class="dropdown-toggle" data-toggle="dropdown">
                                <input type="text" class="form-control" value="All events" disabled>
                            </div>
                            <div class="dropdown-menu dropdown-menu-right event">
                                <a class="dropdown-item active">All events</a>
                                <a class="dropdown-item">Apply</a>
                                <a class="dropdown-item">Not apply</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 events-list">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th class="check-allE"><input type="checkbox" class="form-check-inputE" value=""></th>
                                    <th class="event-code order">Order</th>
                                    <th>Title</th>
                                    <th>Start date</th>
                                    <th>Due date</th>
                                    <th class="right">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php if(sizeof($events) > 0) {?>
                                <?php foreach($events as $key => $event) :?>
                                <tr class="sh-infoE">
                                    <td class="check-boxE"><input type="checkbox" class="form-check-inputE" value=""></td>
                                    <td class="order">
                                        <?php echo $key + 1; ?>
                                    </td>
                                    <td>
                                        <?php echo $event['tEventManagement']['title']; ?>
                                    </td>
                                    <td>
                                        <?php echo $event['tEventManagement']['start_date']; ?>
                                    </td>
                                    <td>
                                        <?php echo $event['tEventManagement']['due_date']; ?>
                                    </td>
                                    <td align="right">
                                        <?php echo $event['tEventManagement']['status']; ?>
                                    </td>
                                </tr>
                                <tr class="event-detail">
                                    <td colspan="6">
                                        <div class="title">
                                            <h3>Event detail</h3>
                                        </div>
                                        <div class="detail-info">
                                            <div class="row">
                                                <div class="col-sm-12 col-lg-6">
                                                    <div class="main-image"><img src="../img/events/<?php echo $event['tEventManagement']['image']; ?>" alt=""></div>
                                                </div>
                                                <div class="col-sm-12 col-lg-6">
                                                    <div class="form-group form-control event-key">
                                                        <label for="" class="form-label control-label">Event code:</label>
                                                        <strong><?php echo $event['tEventManagement']['id']; ?></strong>
                                                        <strong class="status"><?php echo $event['tEventManagement']['status']; ?></strong>
                                                    </div>
                                                    <div class="form-group form-control event-title">
                                                        <label for="" class="form-label control-label">Title:</label>
                                                        <strong><?php echo $event['tEventManagement']['title']; ?></strong>
                                                    </div>
                                                    <div class="form-group form-control event-startD">
                                                        <label for="" class="form-label control-label">Start date:</label>
                                                        <strong><?php echo $event['tEventManagement']['start_date']; ?></strong>
                                                    </div>
                                                    <div class="form-group form-control event-dueD">
                                                        <label for="" class="form-label control-label">Due date:</label>
                                                        <strong><?php echo $event['tEventManagement']['due_date']; ?></strong>
                                                    </div>
                                                    <div class="form-group form-control event-category">
                                                        <label for="" class="form-label control-label">Category:</label>
                                                        <strong class="type"><?php echo $event['tEventManagement']['category']; ?></strong>
                                                        <i class="value"><?php echo $event['tEventManagement']['value_deal'];?></i>
                                                        <i class="unit"><?php echo $event['tEventManagement']['category'] == 'Free ship' ? "$" : "%"; ?></i>
                                                    </div>
                                                    <div class="form-group event-content">
                                                        <textarea class="content" rows="9" disabled><?php echo $event['tEventManagement']['content']; ?></textarea>
                                                        <label for="" class="control-label">Content:</label>
                                                    </div>
                                                </div>
                                                <?php if(array_key_exists('Category', $event)) :?>
                                                    <div class="col-sm-12">
                                                        <h4 class="product-title">Products are applied</h4>
                                                    </div>
                                                    <div class="col-sm-12">
                                                        <div class="cate-list d-flex flex-column">
                                                            <?php foreach($event['Category'] as $key1 => $category) :?>
                                                                <div class="category">
                                                                    <div class="category-type">
                                                                        <p class="category-name"><?php echo $category['name']; ?></p>
                                                                        <i class="fas fa-caret-down icon"></i>
                                                                    </div>
                                                                    <div class="products-list">
                                                                        <?php foreach($category['Products'] as $key2 => $product) :?>
                                                                            <div class="product">
                                                                                <img src="../img/products/<?php echo $product['image'] != '' ? $product['image'] : 'default-product-img.jpg'; ?>" alt="" class="product-img">
                                                                                <p class="commodity-code"><?php echo $product['code']; ?></p>
                                                                                <p class="product-name"><?php echo $product['name']; ?></p>
                                                                            </div>
                                                                        <?php endforeach ?>
                                                                    </div>
                                                                </div>
                                                            <?php endforeach ?>
                                                        </div>
                                                    </div>
                                                <?php endif; ?>
                                                <div class="manipulation">
                                                    <a class="btn btn-default update"><i class="fas fa-pencil-alt icon-manipulation"></i>Update</a>
                                                    <?php if($event['tEventManagement']['status'] == 'Apply') {?>
                                                        <a class="btn btn-default nApply"><i class="fas fa-eye-slash icon-manipulation"></i>Not apply</a>
                                                    <?php } else { ?>
                                                        <a class="btn btn-default apply"><i class="fas fa-eye icon-manipulation"></i>Apply</a>
                                                    <?php } ?>
                                                    <a class="btn btn-default deleteE"><i class="fas fa-trash-alt icon-manipulation"></i>delete</a>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <?php endforeach ?>
                                <?php } else { ?>
                                <tr class="empty">
                                    <td colspan="6">Event is currently empty, please add event!!!</td>
                                </tr>
                                <?php } ?>
                            </tbody>
                        </table>
                    </div>
                    <button type="button" class="btn btn-danger delete-allE"><i class="fas fa-trash-alt icon-delete-allE"></i>Delete all</button>
                    <div class="checked-messageE checked-messageB">
                        <span>there</span>
                        <span class="quantityE"></span>
                        <span>-</span>
                        <a class='unchecked-allE'><i class="fas fa-times icon-unchecked-allE"></i>uncheckedall</a>
                    </div>
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
        <div class="check-delete">
            <div class="yes-no">
                <div class="header">
                    <p>Delete the event</p>
                    <i class="fas fa-times close-yes-no"></i>
                </div>
                <div class="content">
                    <p>The system will <b>completely delete <i class='code_E'></i> </b> event on the entire branch but will retain the goods information in historical transactions if any. Are you sure you want to delete?</p>
                </div>
                <div class="ids_list" hidden></div>
                <div class="footer">
                    <button type="submit" class="btn btn-primary yes-bt"><i class="fas fa-check icon"></i>Yes</button>
                    <button type="button" class="btn btn-secondary no-bt"><i class="fas fa-ban icon"></i>No</button>
                </div>
            </div>
        </div>
        <div class="frame-check-delete"></div>
        <div class="modal-add-products">
            <div class="modal-dialog-add-products">
                <div class="container add-products">
                    <div class="row">
                        <div class="col-sm-3 text-center">
                            <div class="categories">
                                <div class="title">
                                    <span class="name">Categories</span>
                                </div>
                                <ul class="categories-list d-flex flex-column">
                                    <?php foreach($allCategories['nameCategory'] as $key => $nameCategory) :?>
                                    <li class="categories-list-item">
                                        <?php echo $nameCategory['tCategoryManagement']['category']; ?>
                                    </li>
                                    <?php endforeach ?>
                                </ul>
                            </div>
                        </div>
                        <div class="col-sm-9 right-col">
                            <div class="row">
                                <?php foreach($allCategories['nameCategory'] as $key => $nameCategory) :?>
                                    <div class="products-list">
                                        <div class="col-sm-12 list-tabs">
                                            <ul class="nav nav-tabs" role="tablist">
                                                <?php foreach($allCategories['categories'] as $key1 => $category) :?>
                                                    <?php if($category['tCategoryManagement']['category'] == $nameCategory['tCategoryManagement']['category']):?>
                                                        <li class="nav-item">
                                                            <a class="nav-link" data-toggle="tab" href="#E<?php echo $category['tCategoryManagement']['id']; ?>"><?php echo $category['tCategoryManagement']['type']; ?></a>
                                                        </li>
                                                    <?php endif ?>
                                                <?php endforeach ?>
                                            </ul>
                                        </div>
                                        <div class="col-sm-12 products">
                                            <div class="tab-content">
                                                <?php foreach($allCategories['categories'] as $key1 => $category) :?>
                                                    <?php if($category['tCategoryManagement']['category'] == $nameCategory['tCategoryManagement']['category']):?>
                                                        <div id="E<?php echo $category['tCategoryManagement']['id']; ?>" class="container tab-pane fade"><br>
                                                            <div class="row">
                                                                <?php foreach($products as $key2 => $product) :?>
                                                                    <?php if($product['tProductManagement']['categories_types_id'] == $category['tCategoryManagement']['id']):?>
                                                                        <div class="col-sm-3 one-product">
                                                                            <div class="product">
                                                                                <img src="../img/products/<?php if($product['tProductManagement']['image'] != '') { $img = explode(',',$product['tProductManagement']['image']); echo $img[0]; } else { echo 'default-product-img.jpg'; } ?>" alt="" class="product-img">
                                                                                <p class="commodity-code"><?php echo $product['tProductManagement']['code']; ?></p>
                                                                                <p class="product-name"><?php echo $product['tProductManagement']['name']; ?></p>
                                                                                <input type="checkbox" class="check-product">
                                                                            </div>
                                                                        </div>
                                                                    <?php endif ?>
                                                                <?php endforeach ?>
                                                                <div class="col-sm-12">
                                                                    <div class="select-all-products">
                                                                        <input type="checkbox" class="check-all-products">
                                                                        <i>choose all type</i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    <?php endif ?>
                                                <?php endforeach ?>
                                            </div>
                                        </div>
                                    </div>
                                <?php endforeach ?>
                                <div class="col-sm-12">
                                    <div class="footer">
                                        <button type="submit" class="btn btn-success button-addP"><i class="far fa-save icon-addP"></i>Add</button>
                                        <button type="button" class="btn btn-secondary button-close-addP"><i class="fas fa-ban icon-close-addP"></i>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="frame-add-product"></div>
        <?php echo $this->element('admin/information-personal'); ?>
    </div>
</div>
<div class="modal fade" id="addEvent" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Add new event</h4>
                <button type="button" class="close closeE" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                <form action="" class="needs-validation">
                    <div class="new-event-image">
                        <img src="../img/admin/nami.jpg" alt="" class="default-img-event img-event">
                        <div class="edit-image">
                            <input type="file" name="input-edit" id="input-edit" class="input-edit" accept="image/gif, image/jpeg, image/jpg, image/png" />
                            <label for="input-edit">
                                <span class="hover-edit">
                                    <i class="fas fa-pencil-alt"></i>
                                </span>
                            </label>
                        </div>
                        <div class="notBlank">
                            <i class="fas fa-exclamation-circle icon-warn"></i>
                            <label for="" class="eBlank">Please add image!</label>
                        </div>
                    </div>
                    <div class="form-group d-flex flex-row">
                        <label for="titleE">Title</label>
                        <input type="text" class="form-control titleE" name="titleE" required>
                        <div class="notBlank">
                            <i class="fas fa-exclamation-circle icon-warn"></i>
                            <label for="" class="eBlank">Please fill out this field!</label>
                        </div>
                    </div>
                    <div class="form-group d-flex flex-row">
                        <label for="">Start working</label>
                        <div class="input-append date form_datetime">
                            <input type="text" class="form-control date_start" value="" readonly>
                            <span class="add-on"><img src="../img/admin/calendar.png" class='icon-th'></span>
                        </div>
                        <div class="notBlank">
                            <i class="fas fa-exclamation-circle icon-warn"></i>
                            <label for="" class="eBlank">Please fill out this field!</label>
                        </div>
                    </div>
                    <div class="form-group d-flex flex-row">
                        <label for="">Due working</label>
                        <div class="input-append date form_datetime">
                            <input type="text" class="form-control date_due" value="" readonly>
                            <span class="add-on"><img src="../img/admin/calendar.png" class='icon-th'></span>
                        </div>
                        <div class="notBlank">
                            <i class="fas fa-exclamation-circle icon-warn"></i>
                            <label for="" class="eBlank">Please fill out this field!</label>
                        </div>
                    </div>
                    <div class="form-group d-flex flex-row">
                        <label for="">Category</label>
                        <select class="form-control categoryE" id="categoryE" name="categoryE">
                            <option value="Offer a discount">Offer a discount</option>
                            <option value="Free ship">Free ship</option>
                        </select>
                        <input type="text" class="form-control valueE">
                        <i class="unit">%</i>
                        <div class="notBlank">
                            <i class="fas fa-exclamation-circle icon-warn"></i>
                            <label for="" class="eBlank">Please fill out this field!</label>
                        </div>
                    </div>
                    <div class="form-group d-flex flex-row">
                        <label for="">Status</label>
                        <div class="status">
                            <input type="radio" class="" name="status" value="Not apply" checked> Not apply
                            <input type="radio" class="" name="status" value="Apply"> Apply
                        </div>
                        <div class="notBlank">
                            <i class="fas fa-exclamation-circle icon-warn"></i>
                            <label for="" class="eBlank">There is currently an event in progress so this event cannot be applied!</label>
                        </div>
                    </div>
                    <div class="form-group d-flex flex-column">
                        <label for="">Content</label>
                        <textarea id="editor1" name="editor1" cols="80" rows="10"></textarea>
                    </div>
                    <div class="add-product">
                        <span class="text-add">Products are applied: <b class="quantity-product">0</b> goods</span>
                        <div class="list-ids" hidden></div>
                        <i class="fas fa-plus-circle icon-manipulation addP"></i>
                        <div class="notBlank">
                            <i class="fas fa-exclamation-circle icon-warn"></i>
                            <label for="" class="eBlank">Please fill out this field!</label>
                        </div>
                    </div>
                    <div class="cate-list d-flex flex-column">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary addEvent"><i class="far fa-save icon-eadd"></i>Add</button>
                <button type="button" class="btn btn-secondary button-closeE" data-dismiss="modal"><i class="fas fa-ban icon-close"></i>Close</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="editEvent" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Edit event</h4>
                <button type="button" class="close closeE" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                <form action="" class="needs-validation">
                    <div class="new-event-image">
                        <img src="../img/admin/nami.jpg" alt="" class="default-img-event img-event">
                        <div class="edit-image">
                            <input type="file" name="input-edit" id="input-edit2" class="input-edit" accept="image/gif, image/jpeg, image/jpg, image/png" />
                            <label for="input-edit2">
                                <span class="hover-edit">
                                    <i class="fas fa-pencil-alt"></i>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div class="event_id" hidden></div>
                    <div class="form-group d-flex flex-row">
                        <label for="titleE">Title</label>
                        <input type="text" class="form-control titleE" name="titleE" required>
                        <div class="notBlank">
                            <i class="fas fa-exclamation-circle icon-warn"></i>
                            <label for="" class="eBlank">Please fill out this field!</label>
                        </div>
                    </div>
                    <div class="form-group d-flex flex-row">
                        <label for="">Start working</label>
                        <div class="input-append date form_datetime">
                            <input type="text" class="form-control start-date" value="" readonly>
                            <span class="add-on"><img src="../img/admin/calendar.png" class='icon-th'></span>
                        </div>
                        <div class="notBlank">
                            <i class="fas fa-exclamation-circle icon-warn"></i>
                            <label for="" class="eBlank">Please fill out this field!</label>
                        </div>
                    </div>
                    <div class="form-group d-flex flex-row">
                        <label for="">Due working</label>
                        <div class="input-append date form_datetime">
                            <input type="text" class="form-control due-date" value="" readonly>
                            <span class="add-on"><img src="../img/admin/calendar.png" class='icon-th'></span>
                        </div>
                        <div class="notBlank">
                            <i class="fas fa-exclamation-circle icon-warn"></i>
                            <label for="" class="eBlank">Please fill out this field!</label>
                        </div>
                    </div>
                    <div class="form-group d-flex flex-row">
                        <label for="">Category</label>
                        <select class="form-control categoryE" id="categoryE2" name="categoryE">
                            <option value="Offer a discount">Offer a discount</option>
                            <option value="Free ship">Free ship</option>
                        </select>
                        <input type="text" class="form-control valueE">
                        <i class="unit">%</i>
                        <div class="notBlank">
                            <i class="fas fa-exclamation-circle icon-warn"></i>
                            <label for="" class="eBlank">Please fill out this field!</label>
                        </div>
                    </div>
                    <div class="form-group d-flex flex-row">
                        <label for="">Status</label>
                        <div class="status">
                            <input type="radio" class="" name="status" value="Not apply" checked> Not apply
                            <input type="radio" class="" name="status" value="Apply"> Apply
                        </div>
                        <div class="notBlank">
                            <i class="fas fa-exclamation-circle icon-warn"></i>
                            <label for="" class="eBlank">There is currently an event in progress so this event cannot be applied!</label>
                        </div>
                    </div>
                    <div class="form-group d-flex flex-column">
                        <label for="">Content</label>
                        <textarea id="editor2" name="editor2" cols="80" rows="10"></textarea>
                    </div>
                    <div class="add-product">
                        <span class="text-add">Products are applied: <b class="quantity-product">0</b> goods</span>
                        <div class="list-ids" hidden></div>
                        <i class="fas fa-plus-circle icon-manipulation addP"></i>
                        <div class="notBlank">
                            <i class="fas fa-exclamation-circle icon-warn"></i>
                            <label for="" class="eBlank">Please fill out this field!</label>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary editEvent"><i class="far fa-save icon-eedit"></i>Update</button>
                <button type="button" class="btn btn-secondary button-closeE" data-dismiss="modal"><i class="fas fa-ban icon-close"></i>Close</button>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
$(".form_datetime").datetimepicker({
    format: "mm/dd/yyyy hh:ii",
    autoclose: true,
    todayHighlight: true,
    todayBtn: true,
    minuteStep: 10,
});
</script>