<?php
App::uses('AppModel', 'Model');

class tPaymentMethodManagement extends AppModel {
    public $useTable = 't_payment_methods';

    public $belongsTo = array(
        'BillManagement' => array(
            'className' => 'tBillManagement',
            'foreignKey' => 'bill_id'
        ),
        'OrderManagement' => array(
            'className' => 'tOrderManagement',
            'foreignKey' => 'order_id'
        )
    );

    function getPaymentMethodForBill($bill_id) {
        return $this->find('first', array(
            'conditions' => array(
                'bill_id' => $bill_id
            )
        ));
    }

    function getPaymentMethodForOrder($order_id) {
        return $this->find('first', array(
            'conditions' => array(
                'order_id' => $order_id
            )
        ));
    }
}