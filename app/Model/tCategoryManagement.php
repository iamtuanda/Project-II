<?php
App::uses('AppModel', 'Model');

class tCategoryManagement extends AppModel {
    public $useTable = 't_categories_types';

    function getCategories() {
        return array(
            'nameCategory' => $this->find('all', array(
                'fields' => array('DISTINCT tCategoryManagement.category'),
                'order' => array('tCategoryManagement.category ASC')
            )),
            'categories' => $this->find('all', array(
                'order' => array(
                    'tCategoryManagement.category ASC',
                    'tCategoryManagement.type ASC'
                ),
                'conditions' => array(
                    'NOT' => array(
                        'tCategoryManagement.type' => ''
                    )
                )
            ))
        );
    }

    function getCategoriesForEvent($list_idC) {
        return array(
            'nameCategory' => $this->find('all', array(
                'fields' => array('DISTINCT tCategoryManagement.category'),
                'order' => array('tCategoryManagement.category ASC'),
                'conditions' => array(
                    'id' => $list_idC
                )
            )),
            'categories' => $this->find('all', array(
                'order' => array('tCategoryManagement.category ASC', 'tCategoryManagement.type ASC'),
                'conditions' => array(
                    'id' => $list_idC
                )
            ))
        );
    }

    function getCategoryById($idC) {
        return $this->find('first', array(
            'conditions' => array(
                'id' => $idC
            )
        ));
    }

    function findIdC($category, $type) {
        $category = $this->find('first', array(
            'conditions' => array(
                'category' => $category,
                'type' => $type
            )
        ));

        return $category['tCategoryManagement']['id'];
    }

    function checkExitC($g_name) {
        $check = $this->find('first', array(
            'conditions' => array(
                'category' => $g_name
            )
        ));

        if ($check == Null) {
            return true;
        }

        return false;
    }

    function checkExitT($g_name, $p_group) {
        $check = $this->find('first', array(
            'conditions' => array(
                'category' => $p_group,
                'type' => $g_name
            )
        ));

        if ($check == Null) {
            return true;
        }

        return false;
    }

    function insertCategory($g_name, $p_group) {
        if ($p_group == '') {
            $this->save(array(
                'category' => $g_name,
                'type' => $p_group
            ));
        } else {
            $this->save(array(
                'category' => $p_group,
                'type' => $g_name
            ));
        }
    }

    function addCategory($g_name, $p_group) {
        $g_name = ucfirst(strtolower($g_name));

        if ($p_group == "None") {
            if ($this->checkExitC($g_name)) {
                $this->insertCategory($g_name, '');
            } else {
                return "duplicatedC";
            }
        } else {
            if ($this->checkExitT($g_name, $p_group)) {
                $this->insertCategory($g_name, $p_group);
            } else {
                return "duplicatedT";
            }
        }

        return $this->getCategories();
    }

    function updateCategory($old_gname, $g_name, $p_group, $old_pgroup) {
        if ($p_group == '') {
            $sql = 'UPDATE t_categories_types SET category = "' . $g_name . '" WHERE category = "' . $old_gname . '"';
            $this->query($sql);
        } else {
            if ($p_group == "None") {
                $sql = 'DELETE FROM t_categories_types WHERE category = "' . $old_pgroup . '" AND type = "' . $old_gname . '"';
                $this->query($sql);
                $this->save(array(
                    'category' => $g_name
                ));
            } else if ($p_group == $old_pgroup) {
                $sql = 'UPDATE t_categories_types SET type = "' . $g_name . '" WHERE category = "' . $old_pgroup . '" AND type = "' . $old_gname . '"';
                $this->query($sql);
            } else {
                $sql = 'DELETE FROM t_categories_types WHERE category = "' . $old_pgroup . '" AND type = "' . $old_gname . '"';
                $this->query($sql);
                $this->save(array(
                    'category' => $p_group,
                    'type' => $g_name
                ));
            }
        }
    }

    function editCategory($old_gname, $g_name, $p_group, $old_pgroup) {
        $old_gname = ucfirst(strtolower($old_gname));
        $g_name = ucfirst(strtolower($g_name));
        $data;
        if ($p_group == "None" && $old_pgroup == '') {
            if ($this->checkExitC($g_name)) {
                $this->updateCategory($old_gname, $g_name, '', '');
            } else {
                return "duplicatedC";
            }
        } else {
            if ($this->checkExitT($g_name, $p_group)) {
                $this->updateCategory($old_gname, $g_name, $p_group, $old_pgroup);
            } else {
                return "duplicatedT";
            }
        }
        return $this->getCategories();
    }

    function deleteCategory($g_name, $p_group) {
        $categories = '';
        $idC = array();
        $idC_main = array();
        if ($p_group == '') {
            $categories = $this->find('all', array(
                'conditions' => array('category' => $g_name)
            ));

            foreach ($categories as $key => $category) {
                array_push($idC, $category['tCategoryManagement']['id']);
            }
        } else {
            $category = $this->find('first', array(
                'conditions' => array(
                    'category' => $p_group,
                    'type' => $g_name
                )
            ));
            array_push($idC, $category['tCategoryManagement']['id']);
        }

        $this->deleteAll(array('id' => $idC), true);
        return $idC;
    }
}