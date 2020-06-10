<?php
class tBillDetailCashier extends Model {
    public $useTable = 't_bill_detail';

    public function addBillDetail($bill_detail){
        $this->save($bill_detail);
        return $this->getLastInsertID();
    }
}