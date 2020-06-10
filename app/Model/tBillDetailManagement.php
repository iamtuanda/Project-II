<?php
App::uses('AppModel', 'Model');

class tBillDetailManagement extends AppModel {
    public $useTable = 't_bill_detail';

    public $belongsTo = array(
        'BillManagement' => array(
            'className' => 'tBillManagement',
            'foreignKey' => 'bill_id'
        ),
        'ProductSoldManagement' => array(
            'className' => 'tProductSoldManagement',
            'foreignKey' => 'product_sold_id'
        )
    );

    function getBillDetail($bill_id) {
        return $this->find('all', array(
            'conditions' => array(
                'bill_id' => $bill_id
            )
        ));
    }
}