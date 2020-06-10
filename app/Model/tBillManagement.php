<?php
App::uses('AppModel', 'Model');

class tBillManagement extends AppModel {
    public $useTable = 't_bill';

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

    function getAllBill() {
        return $this->find('all', array(
            'order' => array('tBillManagement.id DESC'),
            'limit' => 10,
        ));
    }

    function getPageNumber() {
        return ceil($this->find('count') / 10);
    }

    function loadBills($page) {
        $index = ((int) $page - 1) * 10;
        return $this->find('all', array(
            'order' => array('tBillManagement.id DESC'),
            'limit' => 10,
            'offset' => $index,
        ));
    }

    function getBillById($idB) {
        return $this->find('first', array(
            'conditions' => array(
                'tBillManagement.id' => $idB,
            ),
        ));
    }

    function getBillToday() {
        $current_date = new DateTime();
        $current_date = $current_date->format('d/m/Y');
        $current_date .= " 00:00";

        return $this->find('all', array(
            'conditions' => array(
                "STR_TO_DATE(tBillManagement.time, '%d/%m/%Y %H:%i') >= STR_TO_DATE('" . $current_date . "', '%d/%m/%Y %H:%i')",
            ),
        ));
    }

    function getBillYesterday() {
        $current_date = new DateTime();
        $current_date = $current_date->format('d/m/Y');
        $current_date .= " 00:00";
        $yesterday = date('d/m/Y', strtotime('-1 days'));
        $yesterday .= " 00:00";

        return $this->find('all', array(
            'conditions' => array(
                "STR_TO_DATE(tBillManagement.time, '%d/%m/%Y %H:%i') >= STR_TO_DATE('" . $yesterday . "', '%d/%m/%Y %H:%i')",
                "STR_TO_DATE(tBillManagement.time, '%d/%m/%Y %H:%i') < STR_TO_DATE('" . $current_date . "', '%d/%m/%Y %H:%i')",
            ),
        ));
    }

    function getBillByDay($day) {
        $day = $day . '%';
        return $this->find('all', array(
            'conditions' => array(
                'tBillManagement.time LIKE' => $day,
            ),
        ));
    }

    function getBillByMonth($year, $month) {
        $date = '%/' . $month . '/' . $year . '%';
        return $this->find('all', array(
            'conditions' => array(
                'tBillManagement.time LIKE' => $date,
            ),
        ));
    }

    function getTotalPrice() {
        return $this->find('all', array(
            'fields' => array('total_price'),
        ));
    }

    function saveBill($bill_id, $note) {
        $this->id = $bill_id;
        return $this->save(array(
            'note' => $note,
        ));
    }

    function billViewMode($view_mode) {
        if ($view_mode == '7 days ago') {
            $current_date = new DateTime();
            $current_date = $current_date->format('d/m/Y');
            $current_date .= " 00:00";
            $seven_day_ago = date('d/m/Y', strtotime('-7 days'));
            $seven_day_ago .= " 00:00";

            return $this->find('all', array(
                'conditions' => array(
                    "STR_TO_DATE(tBillManagement.time, '%d/%m/%Y %H:%i') >= STR_TO_DATE('" . $seven_day_ago . "', '%d/%m/%Y %H:%i')",
                    "STR_TO_DATE(tBillManagement.time, '%d/%m/%Y %H:%i') < STR_TO_DATE('" . $current_date . "', '%d/%m/%Y %H:%i')",
                ),
                'order' => array('STR_TO_DATE(tBillManagement.time, "%d/%m/%Y %H:%i") DESC'),
            ));
        } else if ($view_mode == '10 biggest bills') {
            return $this->find('all', array(
                'order' => array('tBillManagement.total_price DESC'),
                'limit' => 10,
            ));
        }
    }

    function searchBill($key_word) {
        $key_array = explode(' ', $key_word);
        $key_word = '%' . implode("%", $key_array) . '%';
        return $this->find('all', array(
            'conditions' => array(
                'OR' => array(
                    'tBillManagement.bill_code LIKE' => $key_word,
                    'tBillManagement.time LIKE' => $key_word,
                    'CustomerManagement.username LIKE' => $key_word,
                    'AccountManagement.fullname LIKE' => $key_word,
                ),
            ),
            'order' => array('tBillManagement.id DESC'),
        ));
    }

    function deleteBills($idB) {
        $this->bindModel(array(
            'hasOne' => array(
                'PaymentMethodManagement' => array(
                    'className' => 'tPaymentMethodManagement',
                    'foreignKey' => 'bill_id',
                    'dependent' => true,
                ),
            ),
        ), false);

        $this->bindModel(array(
            'hasMany' => array(
                'BillDetailManagement' => array(
                    'className' => 'tBillDetailManagement',
                    'foreignKey' => 'bill_id',
                    'dependent' => true,
                ),
            ),
        ), false);

        $this->deleteAll(array('tBillManagement.id' => $idB), true);
        $this->unbindModel(array(
            'hasOne' => array('PaymentMethodManagement'),
            'hasMany' => array('BillDetailManagement'),
        ));
    }
}