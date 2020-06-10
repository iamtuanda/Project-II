<?php

App::uses('AppModel', 'Model');

class tNotificationCustomer extends AppModel {
    public $useTable = 't_notification_customer';

    function addNotification($order_id, $notification) {
        $order = $this->find('first', array(
            'conditions' => array(
                'tNotificationCustomer.order_id' => $order_id
            )
        ));
        if ($order != Null) {
            $this->id = $order['tNotificationCustomer']['id'];
        }
        $this->save($notification);
    }

    public function deleteNotification($id) {
        $this->delete($id);
        return $this->getAffectedRows();
    }
}