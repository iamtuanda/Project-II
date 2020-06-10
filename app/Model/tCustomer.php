<?php
App::uses('AppModel', 'Model');

class tCustomer extends AppModel {
    public $useTable = "t_customer";

    public function updateInfo($info){
        $this->save($info);
        return $this->getAffectedRows();
    }

    public function checkPassword($id, $password){
        $pass_matching = $this->find('first', array(
            'conditions' => array(
                'password' => md5($password)
            )
        ));
        if(!empty($pass_matching)){
            return 1;
        } else return 0;
    }
    public function changePassword($id, $password){
        $this->save(array(
            'id' => $id,
            'password' => md5($password)
        ));
        return $this->getAffectedRows();
    }

    public function minusPoint($id, $minus_point){

        $customer = $this->findById($id);

        $point_current = (float)$customer['tCustomer']['point'];
        $point_after = $point_current - (float)$minus_point;

        $this->save(array(
            'id' => $id,
            'point' => $point_after
        ));

        return $this->getAffectedRows();
    }

    public function addPoint($id, $plus_point){

        $customer = $this->findById($id);

        $point_current = (float)$customer['tCustomer']['point'];
        $point_after = $point_current + (float)$plus_point;

        $this->save(array(
            'id' => $id,
            'point' => $point_after
        ));

        return $this->getAffectedRows();
    }

    public function updateAvatar($id, $avatar){
        $this->save(array(
            'id' => $id,
            'avatar' => $avatar
        ));
        return $this->getAffectedRows();
    }
}
