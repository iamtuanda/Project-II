<?php
class tCategoriesType extends Model {
    public $useTable = 't_categories_types';

    function getCategories() {
        return array(
            'nameCategory' => $this->find('all', array(
                'fields' => array('DISTINCT tCategoriesType.category'),
                'order' => array('tCategoriesType.category ASC'),
                'conditions' => array(
                    'NOT' => array(
                        'tCategoriesType.type' => ''
                    )
                )
            )),
            'categories' => $this->find('all', array(
                'order' => array('tCategoriesType.category ASC', 'tCategoriesType.type ASC'),
                'conditions' => array(
                    'NOT' => array(
                        'tCategoriesType.type' => ''
                    )
                )
            ))
        );
    }
}