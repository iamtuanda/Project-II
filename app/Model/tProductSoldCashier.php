<?php
class tProductSoldCashier extends Model {
    public $useTable = 't_product_sold';
    
    public function insertProduct($product){
        $this->save($product);
        return $this->getLastInsertID();
    }

    public function checkProduct($product_code){
        $product = $this->find('first', array(
            'conditions' => array(
                'product_code' => $product_code
            )
        ));

        if (!empty($product))
            return $product['tProductSoldCashier']['id'];
        else return true;
    }
}