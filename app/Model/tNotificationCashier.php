<?php
App::uses('AppModel', 'Model');

class tNotificationCashier extends AppModel {
    public $useTable = "t_notification";

    public function insert($notification){
        $this->save($notification);

        return $this->getLastInsertID();
    }
}