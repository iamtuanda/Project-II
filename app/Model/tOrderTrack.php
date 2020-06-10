<?php
App::uses('AppModel', 'Model');

class tOrderTrack extends AppModel {
    public $useTable = "t_order_track";

    public function insert($order_track){
        $this->save($order_track);

        return $this->getLastInsertID();
    }
}