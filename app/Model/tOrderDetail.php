<?php
App::uses('AppModel', 'Model');

class tOrderDetail extends AppModel {
    public $useTable = "t_order_detail";
    public $belongsTo = array(
        'tProductSold' => array(
            'className' => 'tProductSold',
            'foreignKey' => 'product_sold_id'
        )
    );

    public function addOrderDetail($order_detail){
        $this->save($order_detail);
        return $this->getLastInsertID();
    }

    public function getOrderDetail($order_id){
        return $this->find('all', array(
            'conditions' => array(
                'order_id' => $order_id
            )
        ));
    }
}