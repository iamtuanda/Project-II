<?php
App::uses('AppModel', 'Model');

class tProductCashier extends Model {
    public $useTable = 't_product';

    public $belongsTo = array(
        'tCategoriesTypeCashier' => array(
            'className' => 'tCategoriesTypeCashier',
            'foreignKey' => 'categories_types_id'
         )
    );

    public function searchProduct($key_search){
        $key_array = explode(" ", $key_search);
        $search = "%". implode("%", $key_array) ."%";
        $product = $this->find('all',array(
                'conditions' => array(
                    "or" => array(
                        'code LIKE' => $search,
                        'name LIKE' => $search
                    )
                )
            )
        );

        return $product;
    }

    public function findProduct($code){
        $product = $this->find('first', array(
            'conditions' => array(
                'code' => $code
            )
        ));

        return $product;
    }

    public function increaseQuantityProductSold($id, $quantity){
        $product = $this->findById($id);

        $sold_current = (int)$product['tProductCashier']['sold'];
        $sold_after = (int)$quantity + $sold_current;

        $this->save(array(
            'id' => $id,
            'sold' => $sold_after
        ));

        return $this->getAffectedRows();
    }
}
