<?php
App::uses('AppModel', 'Model');

class tCashierManagement extends AppModel {
    public $useTable = 't_account';

    public $hasMany = array(
        'BillManagement' => array(
            'className' => 'tBillManagement',
            'foreignKey' => 'account_id'
        ),
        'OrderManagement' => array(
            'className' => 'tOrderManagement',
            'foreignKey' => 'account_id'
        )
    );

    function checkCashier($cphone) {
        $check = $this->find('first', array(
            'conditions' => array(
                'phone' => $cphone
            ),
            'fields' => array(
                'tCashierManagement.id', 
                'tCashierManagement.fullname', 
                'tCashierManagement.phone', 
                'tCashierManagement.address', 
                'tCashierManagement.role', 
                'tCashierManagement.avatar', 
                'tCashierManagement.start_working'
            )
        ));
        if ($check == Null) {
            return true;
        }

        return false;
    }

    function getAllCashiers() {
        return $this->find('all', array(
            'conditions' => array(
                'role' => 'cashier'
            ),
            'order' => array('tCashierManagement.id DESC'),
            'fields' => array(
                'tCashierManagement.id', 
                'tCashierManagement.fullname', 
                'tCashierManagement.phone', 
                'tCashierManagement.address', 
                'tCashierManagement.role', 
                'tCashierManagement.avatar', 
                'tCashierManagement.start_working'
            )
        ));
    }

    function checkUser($phone, $pass) {
        return $this->find('first', array(
            'conditions' => array(
                'phone' => $phone,
                'password' => $pass
            ),
            'fields' => array(
                'tCashierManagement.id', 
                'tCashierManagement.fullname', 
                'tCashierManagement.phone', 
                'tCashierManagement.address', 
                'tCashierManagement.role', 
                'tCashierManagement.avatar'
            )
        ));
    }

    function searchCashier($key_word) {
        $key_array = explode(' ', $key_word);
        $key_word = '%' . implode("%", $key_array) . '%';
        return $this->find('all', array(
            'order' => array('tCashierManagement.id DESC'),
            'conditions' => array(
                'role' => 'cashier',
                'OR' => array(
                    'fullname LIKE' => $key_word,
                    'phone LIKE' => $key_word
                ),
            ),
            'fields' => array(
                'tCashierManagement.id', 
                'tCashierManagement.fullname', 
                'tCashierManagement.phone', 
                'tCashierManagement.address', 
                'tCashierManagement.role', 
                'tCashierManagement.avatar', 
                'tCashierManagement.start_working'
            )
        ));
    }

    function addCashier($cname, $cphone, $startd, $password, $description, $image_name) {
        $this->save(array(
            'fullname' => $cname,
            'password' => $password,
            'role' => 'cashier',
            'phone' => $cphone,
            'start_working' => $startd,
            'address' => $description,
            'avatar' => $image_name
        ));
    }

    function editCashier($cname, $cphone, $old_cphone, $startd, $description, $image_name) {
        $cashier = $this->find('first', array(
            'conditions' => array(
                'phone' => $old_cphone
            )
        ));
        $this->id = $cashier['tCashierManagement']['id'];
        if ($image_name == '') {
            $image_name = $cashier['tCashierManagement']['avatar'];
        }

        if ($startd == '') {
            $startd = $cashier['tCashierManagement']['start_working'];
        }
        $this->save(array(
            'fullname' => $cname,
            'phone' => $cphone,
            'start_working' => $startd,
            'address' => $description,
            'avatar' => $image_name,
        ));
    }

    function resetPassword($phonenumber) {
        $cashier = $this->find('first', array(
            'conditions' => array(
                'phone' => $phonenumber,
            ),
        ));

        if (sizeof($cashier) > 0) {
            $this->id = $cashier['tCashierManagement']['id'];
            $this->save(array(
                'password' => '579096efa9dc3226bfef05647908c94d436995adbef2090d143592063c19b883'
            ));
            return 'true';
        } else {
            return 'false';
        }
    }

    function checkOldPassword($phone, $password) {
        $user = $this->find('first', array(
            'conditions' => array(
                'phone' => $phone,
                'password' => $password
            ),
            'fields' => array(
                'tCashierManagement.id', 
                'tCashierManagement.fullname', 
                'tCashierManagement.phone', 
                'tCashierManagement.address', 
                'tCashierManagement.role', 
                'tCashierManagement.avatar', 
                'tCashierManagement.start_working'
            )
        ));

        if ($user == Null) {
            return false;
        }

        return true;
    }

    function updatePassword($phone, $password) {
        $user = $this->find('first', array(
            'conditions' => array(
                'phone' => $phone
            ),
        ));

        $this->id = $user['tCashierManagement']['id'];
        $this->save(array(
            'password' => $password
        ));
    }

    function changePassword($phone, $password, $new_password) {
        if ($this->checkOldPassword($phone, $password)) {
            $this->updatePassword($phone, $new_password);
            return 'true';
        }
        return 'false';
    }

    function deleteCashier($cphone) {
        $this->deleteAll(array(
            'phone' => $cphone
        ));
    }

    function getAccount($phone) {
        return $this->find('first', array(
            'conditions' => array(
                'phone' => $phone
            ),
            'fields' => array(
                'tCashierManagement.id', 
                'tCashierManagement.fullname', 
                'tCashierManagement.phone', 
                'tCashierManagement.address', 
                'tCashierManagement.role', 
                'tCashierManagement.avatar'
            )
        ));
    }
}