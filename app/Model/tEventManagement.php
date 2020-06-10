<?php
App::uses('AppModel', 'Model');

class tEventManagement extends AppModel {
    public $useTable = 't_event';

    function getEvents() {
        return $this->find('all', array(
            'order' => array('tEventManagement.id DESC'),
            'limit' => 10
        ));
    }

    function getPageNumber() {
        return ceil($this->find('count') / 10);
    }

    function getEventById($idE) {
        return $this->find('first', array(
            'conditions' => array(
                'tEventManagement.id' => $idE
            )
        ));
    }

    function loadEvents($page) {
        $index = ((int) $page - 1) * 10;
        return $this->find('all', array(
            'order' => array('tEventManagement.id DESC'),
            'limit' => 10,
            'offset' => $index
        ));
    }

    function addEvents($event) {
        $this->save($event);
        return $this->getLastInsertID();
    }

    function checkStatus($idE) {
        $event = $this->find('first', array(
            'conditions' => array(
                'status' => 'Apply',
                'NOT' => array(
                    'id' => $idE
                )
            )
        ));
        if ($event == Null) {
            return '0';
        }

        return '1';
    }

    function eventViewMode($view_mode) {
        if ($view_mode == 'apply') {
            return $this->find('all', array(
                'conditions' => array(
                    'status' => 'Apply'
                ),
                'order' => array('tEventManagement.id DESC')
            ));
        } else if ($view_mode == 'not apply') {
            return $this->find('all', array(
                'conditions' => array(
                    'status' => 'Not apply'
                ),
                'order' => array('tEventManagement.id DESC')
            ));
        }
    }

    function editEvent($idE, $event) {
        $this->id = $idE;
        $this->save($event);
    }

    function searchEvent($key_word) {
        $key_array = explode(' ', $key_word);
        $key_word = '%' . implode("%", $key_array) . '%';
        return $this->find('all', array(
            'conditions' => array(
                'OR' => array(
                    'title LIKE' => $key_word,
                    'start_date LIKE' => $key_word,
                    'due_date LIKE' => $key_word,
                    'status' => $key_word
                ),
            ),
            'order' => array('tEventManagement.id DESC')
        ));
    }

    function changeStatus($idE, $status) {
        if ($status == 'Not apply') {
            $this->id = $idE;
            $this->save(array(
                'status' => 'Not apply'
            ));
        } else {
            if ($this->checkStatus($idE)) {
                return false;
            } else {
                $this->id = $idE;
                $this->save(array(
                    'status' => 'Apply'
                ));
            }
        }
        return true;
    }

    function deleteEvents($idE) {
        $this->bindModel(array(
            'hasMany' => array(
                'EventDetailManagement' => array(
                    'className' => 'tEventDetailManagement',
                    'foreignKey' => 'event_id',
                    'dependent' => true
                )
            )
        ), false);

        $this->deleteAll(array('tEventManagement.id' => $idE), true);
        $this->unbindModel(array(
            'hasMany' => array('EventDetailManagement')
        ));
    }
}