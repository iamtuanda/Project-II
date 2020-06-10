<?php
echo $this->Html->css(
    array(
        'admin/admin',
        'admin/search',
        'admin/check-delete',
        'admin/cashier',
        'bootstrap/bootstrap-datepicker',
    ),
    array('inline' => false));
echo $this->Html->script(
    array(
        'admin/admin',
        'admin/cashier',
        'ckeditor/ckeditor',
        'bootstrap/bootstrap-datepicker.min',
    ),
    array('inline' => false));
?>
<div id="wrapper">
    <div id="content-wrapper" class='d-flex flex-column'>
        <?php echo $this->element('admin/header'); ?>
        <div class="container" id='cashier-management'>
            <div class="row" id='cashiers-list'>
                <div class="col-sm-12 header">
                    <div class="inner-search">
                        <div class="input-field search" id="search">
                            <input class="input" id="inputFocus" type="text" placeholder="Keyword">
                            <button class="clear" id="clear">
                                <i class="fas fa-times button-close"></i>
                            </button>
                        </div>
                    </div>
                    <div id="add-cashier">
                        <button type="button" class="btn btn-success"><i class="fas fa-plus icon-add-cashier"></i>Add new cashier</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="check-delete">
            <div class="yes-no">
                <div class="header">
                    <p>Delete the cashier</p>
                    <i class="fas fa-times close-yes-no"></i>
                </div>
                <div class="content">
                    <p>The system will <b>completely delete <i class='name_C'></i> with phone number <i class="phone_C"></i> </b> goods on the entire branch but will retain the goods information in historical transactions if any. Are you sure you want to delete?</p>
                </div>
                <div class="footer">
                    <button type="submit" class="btn btn-primary yes-bt"><i class="fas fa-check icon"></i>Yes</button>
                    <button type="button" class="btn btn-secondary no-bt"><i class="fas fa-ban icon"></i>No</button>
                </div>
            </div>
        </div>
        <div class="frame-check-delete"></div>
    </div>
    <?php echo $this->element('admin/information-personal'); ?>
</div>
</div>
<div class="modal fade" id="addCashier">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Add new cashier</h4>
                <button type="button" class="close close-addC" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                <form action="" class="needs-validation">
                    <div class="new-cashier-image">
                        <img src="../img/admin/nami.jpg" alt="" class="default-img-cashier img-cashier" id="default-img-cashier">
                        <div class="edit-image">
                            <input type="file" name="input-edit" id="input-edit3" class="input-edit" accept="image/gif, image/jpeg, image/jpg, image/png" />
                            <label for="input-edit3">
                                <span class="hover-edit">
                                    <i class="fas fa-pencil-alt"></i>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div class="form-group d-flex flex-row">
                        <label for="cname">Cashier name</label>
                        <input type="text" class="form-control" id="cname" name="cname">
                        <div class="notBlank">
                            <i class="fas fa-exclamation-circle icon-warn"></i>
                            <label for="" class="eBlank">Please fill out this field</label>
                        </div>
                    </div>
                    <div class="form-group d-flex flex-row">
                        <label for="pcashier">Phone number</label>
                        <input type="text" class="form-control text-right input-phone" id="pcashier" name="pcashier" maxlength="10">
                        <div class="notBlank">
                            <i class="fas fa-exclamation-circle icon-warn"></i>
                            <label for="" class="eBlank">Please fill out this field</label>
                        </div>
                    </div>
                    <div class="form-group d-flex flex-row">
                        <label for="dcahier">Start working</label>
                        <div class="input-group date">
                            <input type="text" class="form-control"><span class="input-group-addon"><img src="../img/admin/calendar.png" class='icon-date'></span>
                        </div>
                        <div class="notBlank">
                            <i class="fas fa-exclamation-circle icon-warn"></i>
                            <label for="" class="eBlank">Please fill out this field</label>
                        </div>
                    </div>
                    <div class="form-group d-flex flex-column">
                        <label for="">Description</label>
                        <textarea id="editor1" name="editor1" cols="80" rows="10"></textarea>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary addCashier"><i class="far fa-save icon-cadd"></i>Add</button>
                <button type="button" class="btn btn-secondary button-close-addC" data-dismiss="modal"><i class="fas fa-ban icon-close"></i>Close</button>
            </div>
        </div>
    </div>
</div>
<script>
$('.datetimepicker, .input-group.date').datepicker({
    todayBtn: true,
    daysOfWeekHighlighted: "0,6",
    autoclose: true,
    todayHighlight: true
});
</script>