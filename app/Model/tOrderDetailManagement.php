<?php
App::uses('AppModel', 'Model');

class tOrderDetailManagement extends AppModel {
    public $useTable = 't_order_detail';

    public $belongsTo = array(
        'OrderManagement' => array(
            'className' => 'tOrderManagement',
            'foreignKey' => 'order_id'
        ),
        'ProductSoldManagement' => array(
            'className' => 'tProductSoldManagement',
            'foreignKey' => 'product_sold_id'
        )
    );

    function getOrderDetail($order_id) {
        return $this->find('all', array(
            'conditions' => array(
                'order_id' => $order_id
            )
        ));
    }
}