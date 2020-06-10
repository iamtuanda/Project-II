<?php
App::uses('AppModel', 'Model');

class tProductManagement extends AppModel {
    public $useTable = 't_product';

    public $belongsTo = array(
        'CategoryManagement' => array(
            'className' => 'tCategoryManagement',
            'foreignKey' => 'categories_types_id'
        )
    );

    function getPageNumber($idC) {
        return ceil($this->find('count', array(
            'conditions' => array(
                'categories_types_id' => $idC
            ),
        )) / 10);
    }

    function getMostCategory() {
        return $this->query("SELECT categories_types_id, COUNT(categories_types_id) AS count FROM t_product GROUP BY categories_types_id ORDER BY count DESC LIMIT 1");
    }

    function getCountCategories() {
        return $this->find('all', array(
            'group' => array('tProductManagement.categories_types_id')
        ));
    }

    function getIdCategories() {
        return $this->find('all', array(
            'fields' => array('DISTINCT tProductManagement.categories_types_id')
        ));
    }

    function updateSoldProduct($idP, $quantity) {
        $this->id = $idP;
        $this->save(array(
            'sold' => $quantity
        ));
    }

    function updateLastPrice($idP, $last_price) {
        $this->id = $idP;
        $this->save(array(
            'finish_price' => $last_price
        ));
    }

    function getProductsForEvent() {
        return $this->find('all', array(
            'order' => array('tProductManagement.id DESC')
        ));
    }

    function getSellOutPtoducts() {
        $products = $this->find('all', array(
            'conditions' => array(
                'sold >' => 0
            ),
            'order' => array('tProductManagement.sold DESC'),
            'limit' => 6
        ));
        foreach ($products as $key => $product) {
            $list_img = explode(',', $product['tProductManagement']['image']);
            $products[$key]['tProductManagement']['image'] = $list_img[0];
        }
        return $products;
    }

    function getQuantityProduct() {
        return $this->find('count');
    }

    function getCategory() {
        return $this->query("SELECT `tProductManagement`.`categories_types_id`, `CategoryManagement`.`category`, `CategoryManagement`.`type`, COUNT(categories_types_id) AS count FROM t_product AS tProductManagement LEFT JOIN `mishon`.`t_categories_types` AS `CategoryManagement` ON (`tProductManagement`.`categories_types_id` = `CategoryManagement`.`id`) GROUP BY categories_types_id ORDER BY count DESC");
    }

    function findPByIdC($idC, $page_number) {
        $index = ((int) $page_number - 1) * 10;
        return $this->find('all', array(
            'conditions' => array(
                'categories_types_id' => $idC
            ),
            'order' => array('tProductManagement.id DESC'),
            'limit' => 10,
            'offset' => $index
        ));
    }

    function checkCode($codeP) {
        $check = $this->getProductByCode($codeP);
        if ($check == Null) {
            return true;
        }

        return false;
    }

    function addProduct($pname, $codeP, $pprice, $idC, $description, $detail_content, $image_list) {
        if ($image_list == '') {
            $image_list = 'default-product-img.jpg';
        }
        $this->save(array(
            'name' => $pname,
            'price' => $pprice,
            'image' => $image_list,
            'description' => $description,
            'detail_content' => $detail_content,
            'categories_types_id' => $idC,
            'code' => $codeP,
            'finish_price' => $pprice
        ));
        if ($codeP == '') {
            $id = $this->getLastInsertID();
            $this->id = $id;
            $code = "P" . $id;
            $this->save(array(
                'code' => $code
            ));
        }
    }

    function editProduct($pname, $codeP, $old_codeP, $pprice, $idC, $description, $detail_content, $image_list) {
        if ($image_list == '') {
            $image_list = 'default-product-img.jpg';
        }
        $product = $this->getProductByCode($old_codeP);

        $this->id = $product['tProductManagement']['id'];
        $this->save(array(
            'name' => $pname,
            'price' => $pprice,
            'image' => $image_list,
            'description' => $description,
            'detail_content' => $detail_content,
            'categories_types_id' => $idC,
            'code' => $codeP,
            'finish_price' => $pprice
        ));
    }

    function deleteProduct($idP) {
        $id_list = array();
        for ($i = 0; $i < sizeof($idP); $i++) {
            $product = $this->find('first', array(
                'conditions' => array(
                    'tProductManagement.code' => $idP[$i]
                )
            ));
            array_push($id_list, $product['tProductManagement']['id']);
        }
        $this->bindModel(array(
            'hasMany' => array(
                'EventDetailManagement' => array(
                    'className' => 'tEventDetailManagement',
                    'foreignKey' => 'product_id',
                    'dependent' => true
                ),
                'ShoppingCart' => array(
                    'className' => 'tShoppingCart',
                    'foreignKey' => 'product_id',
                    'dependent' => true
                )
            )
        ), false);
        $this->deleteAll(array('tProductManagement.id' => $id_list), true);
        $this->unbindModel(array(
            'hasMany' => array('EventDetailManagement', 'ShoppingCart')
        ));
    }

    function searchProduct($key_word) {
        $key_array = explode(' ', $key_word);
        $key_word = '%' . implode("%", $key_array) . '%';
        return $this->find('all', array(
            'conditions' => array(
                'OR' => array(
                    'name LIKE' => $key_word,
                    'code LIKE' => $key_word
                )
            )
        ));
    }

    function getProductByCode($codeP) {
        return $this->find('first', array(
            'conditions' => array(
                'code' => $codeP
            )
        ));
    }

    function getProductsByIdC($idC) {
        return $this->find('first', array(
            'conditions' => array(
                'tProductManagement.categories_types_id' => $idC
            )
        ));
    }

    function updatePrice($idP, $last_price, $discount_percent) {
        $this->id = $idP;
        $this->save(array(
            'last_price' => $last_price,
            'discount_percent' => $discount_percent
        ));
    }

    function getFigureCategories() {
        $categories = $this->getCategory();
        $total_category = $this->getQuantityProduct();
        $figureCategories = array();
        foreach ($categories as $key => $category) {
            $figureCategories[$key]['category'] = $category['CategoryManagement']['category'] . '>>' . $category['CategoryManagement']['type'];
            $figureCategories[$key]['ratio'] = round((float) ((((int) $category[0]['count']) / $total_category) * 100), 2);
        }
        return $figureCategories;
    }
}