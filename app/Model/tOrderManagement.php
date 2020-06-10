<?php
App::uses('AppModel', 'Model');

class tOrderManagement extends AppModel {
    public $useTable = 't_order';

    public $belongsTo = array(
        'CustomerManagement' => array(
            'className' => 'tCustomerManagement',
            'foreignKey' => 'customer_id',
        ),
        'AccountManagement' => array(
            'className' => 'tCashierManagement',
            'foreignKey' => 'account_id',
        ),
    );

    public $hasOne = array(
        'OrderTrack' => array(
            'className' => 'tOrderTrack',
            'foreignKey' => 'order_id',
            'dependent' => true,
        ),
    );

    function getAllOrder() {
        return $this->find('all', array(
            'order' => array('tOrderManagement.id DESC'),
            'limit' => 10,
        ));
    }

    function getPageNumber() {
        return ceil($this->find('count') / 10);
    }

    function loadOrders($page) {
        $index = ((int) $page - 1) * 10;
        return $this->find('all', array(
            'order' => array('tOrderManagement.id DESC'),
            'limit' => 10,
            'offset' => $index,
        ));
    }

    function orderViewMode($view_mode) {
        if ($view_mode == 'unconfimred') {
            return $this->find('all', array(
                'conditions' => array(
                    'tOrderManagement.statement' => 'Successful',
                ),
                'order' => array('tOrderManagement.id DESC'),
            ));
        } else if ($view_mode == 'delivering') {
            return $this->find('all', array(
                'conditions' => array(
                    'tOrderManagement.statement' => 'Delivering',
                ),
                'order' => array('tOrderManagement.id DESC'),
            ));
        } else if ($view_mode == 'delivered') {
            return $this->find('all', array(
                'conditions' => array(
                    'tOrderManagement.statement' => 'Delivered',
                ),
                'order' => array('tOrderManagement.id DESC'),
            ));
        }
    }

    function searchOrder($key_word) {
        $key_array = explode(' ', $key_word);
        $key_word = '%' . implode("%", $key_array) . '%';
        return $this->find('all', array(
            'conditions' => array(
                'OR' => array(
                    'tOrderManagement.order_code LIKE' => $key_word,
                    'tOrderManagement.time LIKE' => $key_word,
                    'CustomerManagement.username LIKE' => $key_word,
                    'AccountManagement.fullname LIKE' => $key_word,
                ),
            ),
            'order' => array('tOrderManagement.id DESC'),
        ));
    }

    function updateStatus($order_code, $aid, $status) {
        $order = $this->find('first', array(
            'conditions' => array(
                'tOrderManagement.order_code' => $order_code,
            ),
        ));
        $this->id = $order['tOrderManagement']['id'];
        $this->save(array(
            'statement' => $status,
            'account_id' => $aid,
        ));
        return $order;
    }

    function saveOrder($order_id, $note) {
        $this->id = $order_id;
        $this->save(array(
            'note' => $note,
        ));
    }

    function deleteOrders($idO) {
        $this->bindModel(array(
            'hasOne' => array(
                'PaymentMethodManagement' => array(
                    'className' => 'tPaymentMethodManagement',
                    'foreignKey' => 'order_id',
                    'dependent' => true,
                ),
            ),
        ), false);

        $this->bindModel(array(
            'hasMany' => array(
                'OrderDetailManagement' => array(
                    'className' => 'tOrderDetailManagement',
                    'foreignKey' => 'order_id',
                    'dependent' => true,
                ),
            ),
        ), false);

        $this->deleteAll(array('tOrderManagement.id' => $idO), true);
        $this->unbindModel(array(
            'hasOne' => array('PaymentMethodManagement'),
            'hasMany' => array('OrderDetailManagement'),
        ));
    }

    function getOrderToday() {
        $current_date = new DateTime();
        $current_date = $current_date->format('d/m/Y');
        $current_date .= " 00:00";

        return $this->find('all', array(
            'conditions' => array(
                "STR_TO_DATE(OrderTrack.receive_time, '%d/%m/%Y %H:%i') >= STR_TO_DATE('" . $current_date . "', '%d/%m/%Y %H:%i')",
                'tOrderManagement.statement' => 'Delivered',
            ),
        ));
    }

    function getOrderYesterday() {
        $current_date = new DateTime();
        $current_date = $current_date->format('d/m/Y');
        $current_date .= " 00:00";
        $yesterday = date('d/m/Y', strtotime('-1 days'));
        $yesterday .= " 00:00";

        return $this->find('all', array(
            'conditions' => array(
                "STR_TO_DATE(OrderTrack.receive_time, '%d/%m/%Y %H:%i') >= STR_TO_DATE('" . $yesterday . "', '%d/%m/%Y %H:%i')",
                "STR_TO_DATE(OrderTrack.receive_time, '%d/%m/%Y %H:%i') < STR_TO_DATE('" . $current_date . "', '%d/%m/%Y %H:%i')",
                'tOrderManagement.statement' => 'Delivered',
            ),
        ));
    }

    function getOrderByDay($day) {
        $day = $day . '%';
        return $this->find('all', array(
            'conditions' => array(
                'OrderTrack.receive_time LIKE' => $day,
                'tOrderManagement.statement' => 'Delivered',
            ),
        ));
    }

    function getOrderByMonth($year, $month) {
        $date = '%/' . $month . '/' . $year . '%';
        return $this->find('all', array(
            'conditions' => array(
                'OrderTrack.receive_time LIKE' => $date,
                'tOrderManagement.statement' => 'Delivered',
            ),
        ));
    }
}