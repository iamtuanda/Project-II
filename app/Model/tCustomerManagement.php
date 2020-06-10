<?php
App::uses('AppModel', 'Model');

class tCustomerManagement extends AppModel {
    public $useTable = 't_customer';

    function getCustomers() {
        return $this->find('all', array(
            'order' => array('point DESC'),
            'fields' => array(
                'id', 
                'username', 
                'email', 
                'address', 
                'point', 
                'avatar', 
                'phone'
            ),
            'limit' => 10
        ));
    }

    function getCustomerById($idC) {
        return $this->find('first', array(
            'conditions' => array(
                'id' => $idC,
            ),
            'fields' => array(
                'id', 
                'username', 
                'email', 
                'address', 
                'point', 
                'avatar', 
                'phone'
            )
        ));
    }

    function getPageNumber() {
        return ceil($this->find('count') / 10);
    }

    function loadCustomers($page) {
        $index = ((int) $page - 1) * 10;
        return $this->find('all', array(
            'order' => array('id DESC'),
            'fields' => array(
                'id', 
                'username', 
                'email', 
                'address', 
                'point', 
                'avatar', 
                'phone'
            ),
            'limit' => 10,
            'offset' => $index
        ));
    }

    function searchCustomer($key_word) {
        $key_array = explode(' ', $key_word);
        $key_word = '%' . implode("%", $key_array) . '%';
        return $this->find('all', array(
            'order' => array('point DESC'),
            'fields' => array('id', 
                'username', 
                'email', 
                'address', 
                'point', 
                'avatar', 
                'phone'
            ),
            'conditions' => array(
                'OR' => array(
                    'username LIKE' => $key_word,
                    'email LIKE' => $key_word,
                    'phone LIKE' => $key_word
                ),
            ),
        ));
    }

    function deleteCustomer($email) {
        $this->deleteAll(array(
            'email' => $email
        ), true);
    }

    function savePoint($idC, $point) {
        $this->id = $idC;
        $this->save(array(
            'point' => $point
        ));
    }
}