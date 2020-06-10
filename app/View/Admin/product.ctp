<?php
echo $this->Html->css(
    array(
        'admin/admin',
        'admin/search',
        'admin/check-delete',
        'admin/product',
        'bootstrap/bootstrap-datepicker'
    ),
    array('inline' => false));
echo $this->Html->script(
    array(
        'admin/admin',
        'admin/product',
        'ckeditor/ckeditor',
    ),
    array('inline' => false));
?>
<div id="wrapper">
    <div id="content-wrapper" class='d-flex flex-column'>
        <?php echo $this->element('admin/header'); ?>
        <div class="container" id="product-management">
            <div class="row">
                <div class="col-sm-3 text-center">
                    <div id="categories">
                        <div class="title">
                            <span class="name">Categories</span>
                            <div class="manipulation">
                                <i class="fas fa-plus-circle icon-manipulation add"></i>
                            </div>
                        </div>
                        <ul class="list-categories d-flex flex-column">
                            <?php foreach($allCategories['nameCategory'] as $key => $nameCategory) :?>
                                <li class="list-categories-item">
                                    <div class="name-category">
                                        <div class="name-category-detail"><?php echo $nameCategory['tCategoryManagement']['category'] ?></div>
                                        <i class="fas fa-pencil-alt edit-category edit-menu-parent" data-toggle="modal" data-target="#editCategory"></i>
                                    </div>
                                    <div class="sub-menu">
                                        <ul class="sub-menu-1">
                                            <?php foreach($allCategories['categories'] as $key1 => $category) :?>
                                                <?php if($category['tCategoryManagement']['category'] == $nameCategory['tCategoryManagement']['category']):?>
                                                    <li class="sub-menu-item">
                                                        <a href="#"><?php echo $category['tCategoryManagement']['type']; ?><i class="fas fa-pencil-alt edit-category edit-menu-child" data-toggle="modal" data-target="#editCategory"></i></a>
                                                    </li>
                                                <?php endif ?>
                                            <?php endforeach ?>
                                        </ul>
                                    </div>
                                </li>
                            <?php endforeach ?>
                        </ul>
                    </div>
                </div>
                <div class="col-sm-9">
                    <div id='list-products'>
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="inner-search">
                                    <div class="input-field search" id="search">
                                        <input class="input" id="inputFocus" type="text" placeholder="Keyword">
                                        <button class="clear" id="clear">
                                            <i class="fas fa-times button-close"></i>
                                        </button>
                                    </div>
                                </div>
                                <div id="add-product">
                                    <button type="button" class="btn btn-success"><i class="fas fa-plus icon-add-product"></i>Add new product</button>
                                </div>
                            </div>
                            <div class="col-sm-12 products">
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th class="check-allP"><input type="checkbox" class="form-check-inputP" value=""></th>
                                                <th class="commodity-code">Commodity codes</th>
                                                <th>Avatar</th>
                                                <th>Infomation</th>
                                                <th>price</th>
                                                <th>Sold</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                                <button type="button" class="btn btn-danger delete-allP"><i class="fas fa-trash-alt icon-delete-allP"></i>Delete all</button>
                                <div class="checked-messageP">
                                    <span>there</span>
                                    <span class="quantityP"></span>
                                    <span>-</span>
                                    <a class='unchecked-allP'><i class="fas fa-times icon-unchecked-allP"></i>uncheckedall</a>
                                </div>
                            </div>
                            <div class="pagination"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="check-delete">
            <div class="yes-no">
                <div class="header">
                    <p>Delete the goods</p>
                    <i class="fas fa-times close-yes-no"></i>
                </div>
                <div class="content">
                    <p>The system will <b>completely delete <i class="code"></i></b> goods on the entire branch but will retain the goods information in historical transactions if any. Are you sure you want to delete?</p>
                    <div class="product-info" hidden>
                        <div class="product-info-id"></div>
                        <div class="product-info-category"></div>
                    </div>
                </div>
                <div class="footer">
                    <button type="button" class="btn btn-primary yes-bt yesP"><i class="fas fa-check icon"></i>Yes</button>
                    <button type="button" class="btn btn-secondary no-bt"><i class="fas fa-ban icon"></i>No</button>
                </div>
            </div>
        </div>
        <div class="check-deleteC">
            <div class="yes-noC">
                <div class="header">
                    <p>Delete the category</p>
                    <i class="fas fa-times close-yes-no"></i>
                </div>
                <div class="content">
                    <p>The system will <b>completely delete <i class="code"></i></b> category on the entire branch but will retain the goods information in historical transactions if any. Are you sure you want to delete?</p>
                </div>
                <div class="footer">
                    <button type="submit" class="btn btn-primary yes-bt yesC"><i class="fas fa-check icon"></i>Yes</button>
                    <button type="button" class="btn btn-secondary no-bt"><i class="fas fa-ban icon"></i>No</button>
                </div>
            </div>
        </div>
        <div class="frame-check-delete"></div>
    </div>
    <?php echo $this->element('admin/information-personal'); ?>
</div>
</div>
<div class="modal fade" id="addProduct" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Add new product</h4>
                <button type="button" class="close close-product">&times;</button>
            </div>
            <div class="modal-body">
                <form action="" class="needs-validation">
                    <div class="form-group d-flex flex-row">
                        <label for="pname">Name of goods</label>
                        <input type="text" class="form-control" id="pname" name="pname">
                        <div class="notBlank">
                            <i class="fas fa-exclamation-circle icon-warn"></i>
                            <label for="" class="eBlank">Please fill out this field</label>
                        </div>
                    </div>
                    <div class="form-group d-flex flex-row">
                        <label>Code</label>
                        <input type="text" class="form-control text-right codeP">
                        <div class="notBlank">
                            <i class="fas fa-exclamation-circle icon-warn"></i>
                            <label for="" class="eBlank">Code already exists!!!</label>
                        </div>
                    </div>
                    <div class="form-group d-flex flex-row">
                        <label>Price</label>
                        <input type="text" class="form-control text-right input-price" id="pprice" name="pprice">
                        <div class="notBlank">
                            <i class="fas fa-exclamation-circle icon-warn"></i>
                            <label for="" class="eBlank">Please fill out this field</label>
                        </div>
                    </div>
                    <div class="form-group d-flex flex-row">
                        <label class='select' for="pgroup">Group of goods</label>
                        <select class="form-control" id="pgroup" name="pgroup">
                            <?php foreach($allCategories['nameCategory'] as $key => $nameCategory) :?>
                                <?php foreach($allCategories['categories'] as $key1 => $category) :?>
                                    <?php if($category['tCategoryManagement']['category'] == $nameCategory['tCategoryManagement']['category']):?>
                                        <option value="<?php echo $nameCategory['tCategoryManagement']['category']; ?>>><?php echo $category['tCategoryManagement']['type']; ?>">
                                            <?php echo $nameCategory['tCategoryManagement']['category']; ?>>><?php echo $category['tCategoryManagement']['type']; ?>
                                        </option>
                                    <?php endif ?>
                                <?php endforeach ?>
                            <?php endforeach ?>
                        </select>
                        <button type="button" class="btn btn-light button-add-cate"><i class="fas fa-plus icon-add-cate"></i></button>
                        <div class="notBlank">
                            <i class="fas fa-exclamation-circle icon-warn"></i>
                            <label for="" class="eBlank">Please fill out this field</label>
                        </div>
                    </div>
                    <div class="form-group d-flex flex-column">
                        <label for="">Description</label>
                        <textarea id="editor1" name="editor1" cols="80" rows="10"></textarea>
                    </div>
                    <div class="list-image">
                        <label for="">Product image</label>
                        <ul class="chosen-list-image">
                        </ul>
                        <ul class="add-list-image">
                            <li class="add-image">
                                <input type="file" name="file" id="file" class="inputfile" accept="image/gif, image/jpeg, image/jpg, image/png" />
                                <label for="file">
                                    <span class="hover-add">
                                        <span>+ Add</span>
                                    </span>
                                    <img src="../img/admin/default-product-img.jpg" alt="" class="">
                                </label>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary addP"><i class="far fa-save icon-padd"></i>Add</button>
                <button type="button" class="btn btn-secondary button-close button-close-product" data-dismiss="modal"><i class="fas fa-ban icon-close"></i>Close</button>
            </div>
        </div>
    </div>
</div>
<div id="addCategory">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Add new category</h4>
                <button type="button" class="close close-addC" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                <form class="needs-validation">
                    <div class="form-group d-flex flex-row">
                        <label for="gname">Group name</label>
                        <input type="text" class="form-control" id="gname" name="gname" required>
                        <div class="notBlank">
                            <i class="fas fa-exclamation-circle icon-warn"></i>
                            <label for="" class="eBlank">Please fill out this field</label>
                        </div>
                    </div>
                    <div class="form-group d-flex flex-row">
                        <label class='select' for="sel1">Parent group</label>
                        <select class="form-control category" id="sel1" name="sellist1">
                            <option value="None">None</option>
                            <?php foreach($allCategories['nameCategory'] as $key => $nameCategory) :?>
                                <option value="<?php echo $nameCategory['tCategoryManagement']['category']?>"><?php echo $nameCategory['tCategoryManagement']['category']?></option>
                            <?php endforeach ?>
                        </select>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary addC"><i class="far fa-save icon-add"></i>Add</button>
                <button type="button" class="btn btn-secondary button-close-addC"><i class="fas fa-ban icon-add"></i>Close</button>
            </div>
        </div>
    </div>
</div>
<div class="frame-add-category"></div>
</div>
<div class="modal fade" id="editProduct" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Edit the product</h4>
                <button type="button" class="close close-product">&times;</button>
            </div>
            <div class="modal-body">
                <form action="" class="needs-validation">
                    <div class="form-group d-flex flex-row">
                        <label for="pname">Name of goods</label>
                        <input type="text" class="form-control" id="pname2" name="pname2">
                        <div class="notBlank">
                            <i class="fas fa-exclamation-circle icon-warn"></i>
                            <label for="" class="eBlank">Please fill out this field!!!</label>
                        </div>
                    </div>
                    <div class="form-group d-flex flex-row">
                        <label>Code</label>
                        <input type="text" class="form-control text-right codeP" data-codeP=''>
                        <div class="notBlank">
                            <i class="fas fa-exclamation-circle icon-warn"></i>
                            <label for="" class="eBlank">Code already exists!!!</label>
                        </div>
                    </div>
                    <div class="form-group d-flex flex-row">
                        <label for="pprice">Price</label>
                        <input type="text" class="form-control text-right input-price" id="pprice2" name="pprice">
                        <div class="notBlank">
                            <i class="fas fa-exclamation-circle icon-warn"></i>
                            <label for="" class="eBlank">Please fill out this field!!!</label>
                        </div>
                    </div>
                    <div class="form-group d-flex flex-row">
                        <label class='select' for="pgroup">Group of goods</label>
                        <select class="form-control" id="pgroup2" name="pgroup">
                            <?php foreach($allCategories['nameCategory'] as $key => $nameCategory) :?>
                                <?php foreach($allCategories['categories'] as $key1 => $category) :?>
                                    <?php if($category['tCategoryManagement']['category'] == $nameCategory['tCategoryManagement']['category']):?>
                                        <option value="<?php echo $nameCategory['tCategoryManagement']['category']; ?>>><?php echo $category['tCategoryManagement']['type']; ?>">
                                            <?php echo $nameCategory['tCategoryManagement']['category']; ?>>><?php echo $category['tCategoryManagement']['type']; ?>
                                        </option>
                                    <?php endif ?>
                                <?php endforeach ?>
                            <?php endforeach ?>
                        </select>
                        <button type="button" class="btn btn-light button-add-cate"><i class="fas fa-plus icon-add-cate"></i></button>
                        <div class="notBlank">
                            <i class="fas fa-exclamation-circle icon-warn"></i>
                            <label for="" class="eBlank">Please fill out this field!!!</label>
                        </div>
                    </div>
                    <div class="form-group d-flex flex-column">
                        <label for="">Description</label>
                        <textarea id="editor2" name="editor2" cols="80" rows="10"></textarea>
                    </div>
                    <div class="list-image">
                        <label for="">Product image</label>
                        <ul class="chosen-list-image">
                        </ul>
                        <ul class="add-list-image">
                            <li class="add-image">
                                <input type="file" name="file2" id="file2" class="inputfile" accept="image/gif, image/jpeg, image/jpg, image/png" />
                                <label for="file2">
                                    <span class="hover-add">
                                        <span>+ Add</span>
                                    </span>
                                    <img src="../img/admin/default-product-img.jpg" alt="" class="">
                                </label>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary editP"><i class="far fa-save icon-padd icon-edit"></i>Save</button>
                <button type="button" class="btn btn-secondary button-close button-close-product"><i class="fas fa-ban icon-close"></i>Close</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="editCategory" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Edit the category</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                <form action="" class="needs-validation">
                    <div class="form-group d-flex flex-row">
                        <label>Group name</label>
                        <input type="text" class="form-control" id="gname1" data-gname='' data-pgroup='' required>
                        <div class="notBlank">
                            <i class="fas fa-exclamation-circle icon-warn"></i>
                            <label for="" class="eBlank">Please fill out this field</label>
                        </div>
                    </div>
                    <div class="form-group d-flex flex-row">
                        <label class='select' for="sel2">Parent group</label>
                        <select class="form-control category" id="sel2" name="sellist2">
                            <option value="None">None</option>
                            <?php foreach($allCategories['nameCategory'] as $key => $nameCategory) :?>
                                <option value="<?php echo $nameCategory['tCategoryManagement']['category']?>"><?php echo $nameCategory['tCategoryManagement']['category']?></option>
                            <?php endforeach ?>
                        </select>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-primary editC"><i class="far fa-save icon-edit"></i>Edit</button>
                <button type="button" class="btn btn-danger deleteC"><i class="fas fa-trash-alt icon-edit"></i>Delete</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal"><i class="fas fa-ban icon-edit"></i>Close</button>
            </div>
        </div>
    </div>
</div>