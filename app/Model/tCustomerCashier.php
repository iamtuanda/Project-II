<?php
class tCustomerCashier extends Model {
    public $useTable = 't_customer';

    public function searchCustomer($key_search){

        $key_array = explode(" ", $key_search);
        $search = "%". implode("%", $key_array) ."%";
        $customer = $this->find('all',array(
                'conditions' => array(
                    "or" => array(
                        'fullname LIKE' => $search,
                        'phone LIKE' => $search
                    )
                )
            )
        );

        return $customer;
    }

    public function addPoint($id, $plus_point){

        $customer = $this->findById($id);

        $point_current = (float)$customer['tCustomerCashier']['point'];
        $point_after = $point_current + (float)$plus_point;

        $this->save(array(
            'id' => $id,
            'point' => $point_after
        ));

        return $this->getAffectedRows();
    }

    public function minusPoint($id, $minus_point){

        $customer = $this->findById($id);

        $point_current = (float)$customer['tCustomerCashier']['point'];
        $point_after = $point_current - (float)$minus_point;

        $this->save(array(
            'id' => $id,
            'point' => $point_after
        ));

        return $this->getAffectedRows();
    }
}