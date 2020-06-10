<?php
App::uses('AppModel', 'Model');

class tOrder extends AppModel {
    public $useTable = "t_order";

    public $hasMany = array(
        'tOrderDetail' => array(
            'className' => 'tOrderDetail',
            'foreignKey' => 'order_id',
            'dependent' => true
        )
    );

    public $hasOne = array(
        'tOrderTrack' => array(
            'className' => 'tOrderTrack',
            'foreignKey' => 'order_id',
            'dependent' => true
        ),
        'tPaymentMethods' => array(
            'className' => 'tPaymentMethods',
            'foreignKey' => 'order_id',
            'dependent' => true
        )
    );
    
    public function addOrder($order) {
        $this->save($order);
        return $this->getLastInsertID();
    }

    public function updateOrderCode($order){
        $this->save($order);
    }
}