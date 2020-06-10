<?php
App::uses('Controller', 'Controller');

class AppController extends Controller {
    function returnJsonEncode($data) {
        header('Content-type: application/json;charset=utf-8', true);
        echo json_encode($data);
    }
}
