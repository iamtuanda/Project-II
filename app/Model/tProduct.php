<?php
App::uses('AppModel', 'Model');

class tProduct extends AppModel {
    public $useTable = "t_product";

    public function searchProduct($key_search){

        // orderBy : default, sold, new, increase, deincrease
        $key_search = $this->convert_vi_to_en($key_search);
        $key_search = str_replace("%20", " ", $key_search);
        $key_array = explode(" ", $key_search);
        $search = "%". implode("%", $key_array) ."%";
        
        $products = $this->find('all', array(
            'conditions' => array(
                'detail_content LIKE' => $search
            ), 
            'limit' => 8,
            'offset' => 0
        ));

        $count = $this->find('count',array(
                'conditions' => array(
                    'detail_content LIKE' => $search
                )
            )
        );

        $page_total = ceil($count/8);

        $result = array(
            'product' => $products,
            'page' => $page_total,
            'count' => $count
        );

        return $result;
    }

    public function searchProductWithAjax($key, $orderBy, $page){
        $key = $this->convert_vi_to_en($key);
        $key_array = explode(" ", $key);
        $search = "%". implode("%", $key_array) ."%";

        $orderBy = $this->getOrderBy($orderBy);
        $start = ((int)$page - 1) * 8;
        $sql = "SELECT * FROM t_product AS tProduct where detail_content LIKE '". $search ."' order by ". $orderBy ." limit ". $start .", 8";
        
        $products = $this->query($sql);
        return $products;
    }

    public function searchProductById($id){
        $product = $this->findById($id);
        return $product;
    }

    public function getRandomProduct($number){
        return $this->find('all', array(
            'order' => 'RAND()',
            'limit' => $number
        ));
    }

    public function getRandomProductSale(){
        return $this->find('all', array(
            'order' => 'RAND()',
            'limit' => 8,
            'conditions' => array(
                'price != finish_price'
            )
        ));
    }

    public function getTrendingProduct(){
        return $this->find('all', array(
            'order' => 'sold DESC',
            'limit' => 4
        ));
    }

    public function getProductByKey($key){
        if ($key == 'all') {
            $products = $this->find('all', array(
                'limit' => 8
            ));

            $count = $this->find('count');
            $page_total = ceil($count/8);

            $result = array(
                'product' => $products,
                'page' => $page_total,
                'count' => $count
            );
        } else if ($key == 'sale') {
            $products = $this->find('all', array(
                'conditions' => array(
                    'price != finish_price'
                ),
                'limit' => 8
            ));
            $count = $this->find('count', array(
                'conditions' => array(
                    'price != finish_price'
                )
            ));

            $page_total = ceil($count/8);

            $result = array(
                'product' => $products,
                'page' => $page_total,
                'count' => $count
            );
        }

        return $result;

    }

    public function getProductByType($categories_types_id){
        $products =  $this->find('all', array(
            'conditions' => array(
                'categories_types_id' => $categories_types_id
            ),
            'limit' => 8
        ));

        $count = $this->find('count', array(
            'conditions' => array(
                'categories_types_id' => $categories_types_id
            )
        ));

        $page_total = ceil($count/8);

        $result = array(
            'product' => $products,
            'page' => $page_total,
            'count' => $count
        );

        return $result;
    }

    public function orderByProduct($key, $orderBy, $page){
        $orderBy = $this->getOrderBy($orderBy);
        $start = ((int)$page - 1) * 8;
        if ($key == 'all') {
            $sql = "SELECT * FROM t_product AS tProduct order by ". $orderBy ." limit ". $start .", 8";
        } else if( $key == 'sale') {
            $sql = "SELECT * FROM t_product AS tProduct where price != finish_price order by ". $orderBy ." limit ". $start .", 8";
        } else {
            $sql = "SELECT * FROM t_product AS tProduct where categories_types_id = ". $key ." order by ". $orderBy ." limit ". $start .", 8";
        }
        
        $products = $this->query($sql);
        return $products;
    }

    private function getOrderBy($orderBy){
        $order = "";
        switch ($orderBy) {
            case 'default':
            $order = 'code DESC';
            break;
            case 'sold':
            $order = 'sold DESC';
            break;
            case 'new':
            $order = 'id DESC';
            break;
            case 'increase':
            $order = 'price ASC';
            break;
            case 'deincrease':
            $order = 'price DESC';
            break;
        }
        return $order;
    }

    private function convert_vi_to_en($str) {
        $str = preg_replace("/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/", 'a', $str);
        $str = preg_replace("/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/", 'e', $str);
        $str = preg_replace("/(ì|í|ị|ỉ|ĩ)/", 'i', $str);
        $str = preg_replace("/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/", 'o', $str);
        $str = preg_replace("/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/", 'u', $str);
        $str = preg_replace("/(ỳ|ý|ỵ|ỷ|ỹ)/", 'y', $str);
        $str = preg_replace("/(đ)/", 'd', $str);
        $str = preg_replace("/(À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ)/", 'A', $str);
        $str = preg_replace("/(È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ)/", 'E', $str);
        $str = preg_replace("/(Ì|Í|Ị|Ỉ|Ĩ)/", 'I', $str);
        $str = preg_replace("/(Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ)/", 'O', $str);
        $str = preg_replace("/(Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ)/", 'U', $str);
        $str = preg_replace("/(Ỳ|Ý|Ỵ|Ỷ|Ỹ)/", 'Y', $str);
        $str = preg_replace("/(Đ)/", 'D', $str);
        return $str;
    }
}