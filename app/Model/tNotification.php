<?php

App::uses('AppModel', 'Model');

class tNotification extends AppModel {
    public $useTable = 't_notification';

    function loadNotifications($page_number) {
        $index = ((int) $page_number - 1) * 10;

        return $this->find('all', array(
            'order' => array('STR_TO_DATE(tNotification.time, "%d/%m/%Y %H:%i") DESC'),
            'limit' => 10,
            'offset' => $index
        ));
    }

    function getFirstNotification() {
        return $this->find('first', array(
            'order' => array('STR_TO_DATE(tNotification.time, "%d/%m/%Y %H:%i") ASC')
        ));
    }

    function getNotifications($page_index) {
        //Get notifications
        $notifications = $this->loadNotifications($page_index);
        $firstNotification = $this->getFirstNotification();
        $last_notification = 'false';
        if (sizeof($firstNotification) > 0) {
            foreach ($notifications as $notification) {
                if ($firstNotification['tNotification']['id'] == $notification['tNotification']['id']) {
                    $last_notification = 'true';
                    break;
                }
            }
        }

        $dataForNotifications = array($notifications, $last_notification);
        return $dataForNotifications;
    }

    function addNotification($notification) {
        $this->save($notification);
    }

    public function insert($notification) {
        $this->save($notification);

        return $this->getLastInsertID();
    }
}