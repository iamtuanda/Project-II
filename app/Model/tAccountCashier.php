<?php
class tAccountCashier extends Model {
    public $useTable = 't_account';

    public function updateInfo($info){
        $this->save($info);
        return $this->getAffectedRows();
    }

    public function checkPassword($id, $password){
        $pass_match = $this->find('first', array(
            'conditions' => array(
                'password' => $password
            )
        ));
        if(!empty($pass_match)){
            return 1;
        } else return 0;
    }

    public function changePassword($id, $password){
        $this->save(array(
            'id' => $id,
            'password' => $password
        ));
        return $this->getAffectedRows();
    }
}