<?php
App::uses('AppModel', 'Model');

class tOrderTrackManagement extends AppModel {
    public $useTable = 't_order_track';

    function updateDeliveryDay($order_id, $deliveryDay, $status) {
        $order_track = $this->find('first', array(
            'conditions' => array(
                'tOrderTrackManagement.order_id' => $order_id
            )
        ));
        $this->id = $order_track['tOrderTrackManagement']['id'];
        if ($status == 'Delivering') {
            $this->save(array(
                'delivery_time' => $deliveryDay
            ));
        } else {
            $this->save(array(
                'receive_time' => $deliveryDay
            ));
        }

    }

    function getOrderTrack($order_id) {
        return $this->find('first', array(
            'conditions' => array(
                'tOrderTrackManagement.order_id' => $order_id
            )
        ));
    }
}