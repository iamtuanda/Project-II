<?php 
    App::uses('AppModel', 'Model');
    class tShoppingCart extends AppModel {
        public $useTable = "t_shopping_cart";

        public $belongsTo = array(
            'tCustomer' => array(
                'className' => 'tCustomer',
                'foreignKey' => 'customer_id',
            ),
            'tProduct' => array(
                'className' => 'tProduct',
                'foreignKey' => 'product_id'
        ));

        public function addToCart($customer_id, $product_id, $quantity){
            $product_exist = $this->checkProduct($customer_id, $product_id);

            if (empty($product_exist)) {
                $this->save(
                    array(
                        'customer_id' => $customer_id,
                        'product_id' => $product_id,
                        'quantity' => $quantity
                    )
                );
            } else {
                $this->save(
                    array(
                        'id' => $product_exist['tShoppingCart']['id'],
                        'quantity' => $product_exist['tShoppingCart']['quantity'] + $quantity
                    )
                );
            }

            return $this->find('all', array(
                'conditions' => array(
                    'customer_id' => $customer_id
                )
            ));
        }

        private function checkProduct($customer_id, $product_id){
            return $product_exist = $this->find('first', array(
                'conditions' => array(
                    'customer_id' => $customer_id,
                    'product_id' => $product_id
                )
            ));
        }

        public function getQuantityProductsForCart($customer_id){
            return $product_exist = $this->find('count', array(
                'conditions' => array(
                    'customer_id' => $customer_id
                )
            ));
        }
    }
?>