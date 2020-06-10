<?php
class tBillCashier extends Model {
    public $useTable = 't_bill';

    public function addBill($bill){
        $this->save($bill);
        return $this->getLastInsertID();
    }

    public function updateBillCode($bill){
        $this->save($bill);
    }
}