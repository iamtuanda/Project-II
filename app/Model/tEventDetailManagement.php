<?php
App::uses('AppModel', 'Model');

class tEventDetailManagement extends AppModel {
    public $useTable = 't_event_detail';

    public $belongsTo = array(
        'EventManagement' => array(
            'className' => 'tEventManagement',
            'foreignKey' => 'event_id'
        ),
        'ProductManagement' => array(
            'className' => 'tProductManagement',
            'foreignKey' => 'product_id'
        )
    );

    function getIdProductCategory($idE) {
        return $this->find('all', array(
            'fields' => array('DISTINCT ProductManagement.categories_types_id'),
            'conditions' => array(
                'event_id' => $idE
            )
        ));
    }

    function getEventById($idE) {
        return $this->find('all', array(
            'conditions' => array(
                'event_id' => $idE
            ),
            'order' => array('tEventDetailManagement.id DESC')
        ));
    }

    function getEventsByIdC($idE, $idC) {
        return $this->find('all', array(
            'conditions' => array(
                'tEventDetailManagement.event_id' => $idE,
                'ProductManagement.categories_types_id' => $idC
            )
        ));
    }

    function addEventDetail($id_event, $product_id) {
        $this->saveAll(array(
            'event_id' => $id_event,
            'product_id' => $product_id
        ));
    }

    function deleteEventDetail($event_id) {
        $this->deleteAll(
            array('EventManagement.id' => $event_id), true
        );
    }
}