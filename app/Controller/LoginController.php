<?php
App::uses('Controller', 'Controller');
App::uses('SimplePasswordHasher', 'Controller/Component/Auth');

class LoginController extends AppController {
    public $uses = array('tCashierManagement');

    public function index() {
        if ($this->Session->check('manager')) {
            return $this->redirect(array(
                'controller' => 'admin',
                'action' => 'home',
            ));
        }
        $this->set('title', 'Log in');
    }

    function ajaxLogIn() {
        if (!$this->request->is('post')) {
            return false;
        }
        $this->autoRender = false;

        $passwordHasher = new SimplePasswordHasher(array('hashType' => 'sha256'));
        $password = $passwordHasher->hash($this->request->data('password'));
        $user = $this->tCashierManagement->checkUser(
            $this->request->data('phonenumber'),
            $password
        );

        if (sizeof($user) == 0) {
            $this->returnJsonEncode('false');
        }

        $this->Session->write('manager', $user['tCashierManagement']);
        $this->returnJsonEncode('true');
    }
}