<?php
class tPaymentMethodsCashier extends Model {
    public $useTable = 't_payment_methods';

    public function addPaymentMethods($pay_methods){
        $this->save($pay_methods);
        return $this->getAffectedRows();
    }
}