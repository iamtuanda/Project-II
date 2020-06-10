<?php
App::uses('Controller', 'Controller');

class HomepageController extends AppController {

    public $uses = array(
        'tAccount', 
        'tCustomer', 
        'tProduct', 
        'tShoppingCart', 
        'tOrder', 
        'tOrderDetail', 
        'tProductSold', 
        'tPaymentMethods', 
        'tNotification', 
        'tCategoriesType', 
        'tOrderTrack', 
        'tNotificationCustomer', 
        'tEvent', 
        'tEventDetail'
    );

    public function before() {
        if(!$this->Session->read('user')) {
            $this->redirect('home');
        }
    }

    public function home(){
        $categories = $this->tCategoriesType->getCategories();
        $sale_product = $this->tProduct->getRandomProduct(4);
        $mishon_deal = $this->tProduct->getRandomProductSale();
        $product_interest1 = $this->tProduct->getRandomProduct(5);
        $product_interest2 = $this->tProduct->getRandomProduct(5);
        $product_trending = $this->tProduct->getTrendingProduct();
        $event = $this->tEvent->find('first', array(
            'conditions' => array(
                'status' => 'Apply'
            )
        ));

        if (empty($event)) {
            $event = false;
        }

        $this->set(array(
            'categories' => $categories,
            'sale_product' => $sale_product,
            'mishon_deal' => $mishon_deal,
            'product_interest1' => $product_interest1,
            'product_interest2' => $product_interest2,
            'product_trending' => $product_trending,
            'event' => $event,
            'title' => 'MISHON'
        ));
    }

    public function logout(){
        $this->Session->delete('user');
        $this->redirect('home');
    }

    public function info(){
        $this->before();
        if ($this->Session->read('user.id')) {
            $customer = $this->tCustomer->findById($this->Session->read('user.id'));
            $this->set(array(
                'customer' => $customer,
                'title' => 'Information'
            ));
        }
    }

    public function cart(){
        $this->set('title', 'Cart');
    }

    public function shipping(){
        $this->before();
        if ($this->Session->read('user.id')) {
            $customer = $this->tCustomer->findById($this->Session->read('user.id'));
            $this->set(array(
                'customer' => $customer,
                'title' => 'Shipping'
            ));
        }
    }

    public function payment(){
        $this->before();
        $this->set('title', 'Payment');
        if ($this->Session->read('user.id')) {
            $customer_cart = $this->tShoppingCart->find('all', array(
                'conditions' => array(
                    'customer_id' => $this->Session->read('user.id')
                )
            ));

            $event = $this->tEvent->find('first', array(
                'conditions' => array(
                    'category' => "Free ship",
                    'status' => "Apply"
                )
            ));

            if (empty($event)) {
                $this->set('event', false);
            } else {
                $this->set('event', true);
                $this->set('value', $event['tEvent']['value_deal']);
            }
            $this->set('customer_cart', $customer_cart);
        }
    }

    public function products(){
        if (!$this->request->query('key') && !$this->request->query('type')) {
            return $this->redirect(
                array('controller' => 'Homepage', 'action' => 'home')
            );
        }

        if ($this->request->query('key')) {
            $result = $this->tProduct->getProductByKey($this->request->query('key'));
            $products = $result['product'];
            $page = $result['page'];
            $count = $result['count'];
            $view = $this->request->query('key');
            $categories_types_id = 0;
        } else {
            $result = $this->tProduct->getProductByType(base64_decode($this->request->query('type')));
            $products = $result['product'];
            $page = $result['page'];
            $count = $result['count'];
            $categories = $this->tCategoriesType->findById(base64_decode($this->request->query('type')));
            $view = $categories['tCategoriesType']['type'];
            $categories_types_id = base64_decode($this->request->query('type'));
        }
        $categories = $this->tCategoriesType->getCategories();

        $event = $this->tEvent->find('first', array(
            'conditions' => array(
                'status' => 'Apply'
            )
        ));

        if (empty($event)) {
            $event = false;
        }
        $this->set(array(
            'categories' => $categories,
            'products' => $products,
            'page' => $page,
            'count' => $count,
            'view' => $view,
            'categories_types_id' => $categories_types_id,
            'event' => $event,
            'title' => 'Products'
        ));
    }

    public function product_detail (){
        if ($this->request->query('p')) {
            $product = $this->tProduct->searchProductById(base64_decode($this->request->query('p')));
        } else {
            $product = $this->tProduct->find('first', array(
                'conditions' => array(
                    'code' => base64_decode($this->request->query('code'))
                )
            ));
        }
        $this->set(array(
            'product' => $product,
            'title' => $product['tProduct']['name']
        ));
    }
    

    public function product_search(){
        $products = $this->tProduct->searchProduct($this->request->query('search'));
        $this->set(array(
            'products' => $products['product'],
            'page' => $products['page'],
            'count' => $products['count'],
            'key' => $this->request->query('search'),
            'title' => 'Search : ' . $this->request->query('search')
        ));
    }

    public function order(){
        $this->before();
        $this->set('title', 'Order');
        if ($this->request->query('code')) {
            $order_detail = $this->tOrder->findById($this->request->query('code'));
            $products = $this->tOrderDetail->find('all', array(
                'conditions' => array(
                    'order_id' => $order_detail['tOrder']['id']
                )
            ));
            $this->set(array(
                'order_detail' => $order_detail,
                'products' => $products,
                'quantity' => '1'
            ));
        } else {
            $orders = $this->tOrder->find('all', array(
                'conditions' => array(
                    'customer_id' => $this->Session->read('user.id')
                ),
                'order' => array('tOrder.id DESC')
            ));
            $products = array();
            foreach ($orders as $key => $order) {
                foreach ($order['tOrderDetail'] as $key => $item) {
                    $found = false;
                    foreach ($products as $key => $item2) {
                        if ($item2['tProductSold']['id'] == $item['product_sold_id']) {
                            $found = true;
                            break;
                        } else {
                            $found = false;
                        }
                    }
                    if (!$found) {
                        $product = $this->tProductSold->findById($item['product_sold_id']);
                        array_push($products, $product);
                    }
                }
            }
            $this->set(array(
                'orders' => $orders,
                'products' => $products,
                'quantity' => 'n'
            ));
        }
    }

    public function track(){
        $this->before();
        if ($this->request->query('view')) {
            $order_detail = $this->tOrder->findById($this->request->query('view'));
            $products = $this->tOrderDetail->find('all', array(
                'conditions' => array(
                    'order_id' => $order_detail['tOrder']['id']
                )
            ));
            $this->set(array(
                'order_detail' => $order_detail,
                'products' => $products,
                'title' => 'Track View'
            ));
        } else {
            return $this->redirect(
                array('controller' => 'Homepage', 'action' => 'order')
            );
        }
    }

    /* AJAX */
    public function ajaxSignIn(){
        if(!$this->request->is('post')){
            return false;
        }

        $this->autoRender = false;
        $user = $this->tCustomer->find('first',array(
            'conditions' => array(
                'password' => md5($this->request->data('pass')),
                'username' => $this->request->data('user')
            )
        ));
        if(!empty($user)){
            $this->Session->write('user', $user['tCustomer']);
            $this->returnJsonEncode($user);
        } else {
             $this->returnJsonEncode(0);
        }
    }

    public function ajaxGetPointByID(){
        if(!$this->request->is('post')){
            return false;
        }

        $this->autoRender = false;
        $customer = $this->tCustomer->findById($this->request->data('customer_id'));
        $point = $customer['tCustomer']['point'];
        $this->returnJsonEncode($point);
    }

    function ajaxPostSignup() {
        if(!$this->request->is('post')){
            return false;
        }

        $this->autoRender = false;

        $user = $this->tCustomer->find('first', array(
            'conditions' => array(
                'OR' => array(
                    'email' => $this->request->data('e_mail'),
                    'username' => $this->request->data('userName'),
                )
            )
        ));
        if ($user == Null)  {
            $this->tCustomer->save(array(
                'email' => $this->request->data('e_mail'),
                'username' => $this->request->data('userName'),
                'password' => md5($this->request->data('password')),
                'birthday' => $this->request->data('birthday'),
                'gender'  => $this->request->data('gender'),
                'avatar' => 'user.png',
                'point' => 0
            ));
            $this->returnJsonEncode(1);
        } else {
            $this->returnJsonEncode(0);
        }
    }

    public function ajaxUpdateInfo() {
        if(!$this->request->is('post')){
            return false;
        }

        $this->autoRender = false;
        $info = array(
            'id' => $this->request->data('info_id'),
            'fullname' => $this->request->data('fullname'),
            'gender'  => $this->request->data('gender'),
            'phone' => $this->request->data('phone'),
            'birthday' => $this->request->data('birthday'),
        );

        $this->returnJsonEncode($this->tCustomer->updateInfo($info));
    }

    public function ajaxChangePassword(){
        if(!$this->request->is('post')){
            return false;
        }

        $this->autoRender = false;
        
        $pass_id = $this->request->data('pass_id');
        $current_password = $this->request->data('current_password');
        $new_password = $this->request->data('new_password');
        
        if($this->tCustomer->checkPassword($pass_id, $current_password)){
            $this->returnJsonEncode(
                $this->tCustomer->changePassword($pass_id, $new_password)
            );
        } else {
            $this->returnJsonEncode(false);
        }
    }

    public function ajaxUpdateAddress(){
        if(!$this->request->is('post')){
            return false;
        }

        $this->autoRender = false;
        $info = array(
            'id' => $this->request->data('customer_id'),
            'address' => $this->request->data('address'),
            'address_code' => $this->request->data('address_code'),
            'address_detail' => $this->request->data('address_detail'),
            'fullname' => $this->request->data('fullname'),
            'phone' => $this->request->data('phone')
        );
        $this->tCustomer->save($info);

        $this->returnJsonEncode(
            $this->tCustomer->getAffectedRows()
        );
    }
    
    public function ajaxSearchProduct(){
        if(!$this->request->is('post')){
            return false;
        }

        $this->autoRender = false;
        if (!$this->request->data('page')) {
            $page = 1;
        } else {
            $page = $this->request->data('page');
        }
        $key = $this->request->data('key');
        $orderBy = $this->request->data('orderBy');
        $products = $this->tProduct->searchProductWithAjax($key, $orderBy, $page);

        $this->returnJsonEncode($products);
    }

    public function ajaxAddToCart(){
        if(!$this->request->is('post')){
            return false;
        }

        $this->autoRender = false;

        $quantity = $this->request->data('quantity');
        $customer_id = $this->request->data('customer_id');
        $product_id = $this->request->data('product_id');

        $this->returnJsonEncode($this->tShoppingCart->addToCart($customer_id, $product_id, $quantity));
    }

    public function ajaxGetQuantityProductsForCart(){
        if(!$this->request->is('post')){
            return false;
        }

        $this->autoRender = false;

        $customer_id = $this->request->data('customer_id');

        $this->returnJsonEncode(
            $this->tShoppingCart->getQuantityProductsForCart($customer_id)
        );
    }

    public function ajaxDeleteCartByCustomerId(){
        if(!$this->request->is('post')){
            return false;
        }

        $this->autoRender = false;

        $this->tShoppingCart->deleteAll(array(
            'customer_id' => $this->request->data('customer_id')
        ));

        $this->returnJsonEncode(true);
    }

    public function ajaxGetShoppingCart(){
        if(!$this->request->is('post')){
            return false;
        }

        $this->autoRender = false;

        $products = $this->tShoppingCart->find('all', array(
            'conditions' => array(
                'customer_id' => $this->request->data('customer_id')
            )
        ));
        $this->returnJsonEncode($products);
    }

    public function ajaxUpdateShoppingCart(){
        if(!$this->request->is('post')){
            return false;
        }

        $this->autoRender = false;

        $products = $this->tShoppingCart->save(array(
            'id' => $this->request->data('id'),
            'quantity' => $this->request->data('quantity')
        ));

        $this->returnJsonEncode($this->tShoppingCart->getAffectedRows());
    }

    public function ajaxDeleteShoppingCart(){
        if(!$this->request->is('post')){
            return false;
        }

        $this->autoRender = false;

        $products = $this->tShoppingCart->delete(
            array(
                'id' => $this->request->data('id')
            )
        );

        $this->returnJsonEncode($this->tShoppingCart->getAffectedRows());
    }

    public function ajaxGetProductByID(){
        if(!$this->request->is('post')){
            return false;
        }

        $this->autoRender = false;

        $product = $this->tProduct->findById($this->request->data('id'));
        $this->returnJsonEncode($product);
    }

    public function ajaxGetInfoCustomer(){
        if(!$this->request->is('post')){
            return false;
        }

        $this->autoRender = false;

        $customer = $this->tCustomer->findById($this->request->data('customer_id'));
        $this->returnJsonEncode($customer);
    }

    public function ajaxAddOrder(){
        if(!$this->request->is('post')){
            return false;
        }

        $this->autoRender = false;

        $order = array(
            'time' => $this->request->data('time'),
            'total_price' => $this->request->data('total_price'),
            'customer_id' => $this->request->data('customer_id'),
            'statement' => $this->request->data('statement'),
            'contact' => $this->request->data('contact'),
            'note' => $this->request->data('note'),
            'ship-fee' => $this->request->data('ship_fee')
        );

        $order_id = $this->tOrder->addOrder($order);
        $order = array(
            'id' => $order_id,
            'order_code' => "O".$order_id
        );
        $this->tOrder->updateOrderCode($order);
        $this->returnJsonEncode($order_id);
    }

    public function ajaxOrderAddMethods(){
        if(!$this->request->is('post')){
            return false;
        }

        $this->autoRender = false;

        $pay_methods = array(
            'point' => $this->request->data('point'),
            'order_id' => $this->request->data('order_id'),
            'cash' => $this->request->data('cash'),
            'card' => $this->request->data('card')
        );

        $this->returnJsonEncode(
            $this->tPaymentMethods->addPaymentMethods($pay_methods)
        );
    }

    public function ajaxOrderMinusPoint(){
        if(!$this->request->is('post')){
            return false;
        }

        $this->autoRender = false;

        $id = $this->request->data('customer_id');
        $minus_point = $this->request->data('point');

        $this->returnJsonEncode(
            $this->tCustomer->minusPoint($id, $minus_point)
        );
    }

    public function ajaxOrderAddOrderDetail(){
        if(!$this->request->is('post')){
            return false;
        }

        $this->autoRender = false;

        $order_detail = array(
            'product_sold_id' => $this->request->data('product_sold_id'), 
            'order_id' => $this->request->data('order_id'), 
            'quantity' => $this->request->data('quantity'),
            'price' => $this->request->data('price'),
            'discount_price' => $this->request->data('finish_price')
        );

        $this->returnJsonEncode(
            $this->tOrderDetail->addOrderDetail($order_detail)
        );
    }

    public function ajaxOrderAddProductSold(){
        if(!$this->request->is('post')){
            return false;
        }

        $this->autoRender = false;
        
        $product = $this->tProduct->find('first', array(
            'conditions' => array(
                'code' => $this->request->data('code')
            )
        ));
        $categories_types_id = $product['tProduct']['categories_types_id'];
        $categories_types = $this->tCategoriesType->findById($categories_types_id);
        $category = $categories_types['tCategoriesType']['category'] . ">>" . $categories_types['tCategoriesType']['type'];
        $price = $product['tProduct']['price'];
        $product_code = $product['tProduct']['code'];
        $image = $product['tProduct']['image'];

        if (is_bool($this->tProductSold->checkProduct($product_code))) {
            $product  = array(
                'name' => $this->request->data('name'), 
                'price' => $price,
                'category' => $category,
                'product_code' => $product_code,
                'image' => $image
            );

            $this->returnJsonEncode(
                $this->tProductSold->insertProduct($product)
            );
        } else {
            $this->returnJsonEncode(
                $this->tProductSold->checkProduct($product_code)
            );
        }
    }

    public function ajaxInsertNotification(){
        if(!$this->request->is('post')){
            return false;
        }

        $this->autoRender = false;

        $notification = array(
            'name' => $this->request->data('name'),
            'status' => $this->request->data('status'),
            'price' => $this->request->data('price'),
            'time' => $this->request->data('time')
        );

        $this->returnJsonEncode(
            $this->tNotification->insert($notification)
        );
    }

    public function ajaxInsertTrackOrder(){
        if(!$this->request->is('post')){
            return false;
        }

        $this->autoRender = false;

        $order_track = array(
            'expected_time' => $this->request->data('expected_time'),
            'order_id' => $this->request->data('order_id')
        );

        $this->returnJsonEncode(
            $this->tOrderTrack->insert($order_track)
        );
    }

    public function ajaxDeleteOrder(){
        if(!$this->request->is('post')){
            return false;
        }

        $this->autoRender = false;

        $this->tOrder->delete($this->request->data('order_id'));

        $this->returnJsonEncode(
            $this->tOrder->getAffectedRows()
        );
    }

    public function ajaxAddPoint(){
        if(!$this->request->is('post')){
            return false;
        }

        $this->autoRender = false;

        $customer_id = $this->request->data('customer_id');
        $plus_point = $this->request->data('point');

        $this->returnJsonEncode(
            $this->tCustomer->addPoint($customer_id, $plus_point)
        );
    }

    public function ajaxGetNotification(){
        if(!$this->request->is('post')){
            return false;
        }

        $this->autoRender = false;

        $this->returnJsonEncode($this->tNotificationCustomer->find('all', array(
            'conditions' => array(
                'customer_id' => $this->request->data('customer_id'),
                'status' => 0
            )
        )));
    }

    public function ajaxDeleteNotification(){
        if(!$this->request->is('post')){
            return false;
        }
        $this->autoRender = false;


        $this->returnJsonEncode(
            $this->tNotificationCustomer->deleteNotification(
                $this->request->data('notification_id')
            )
        );
    }

    public function ajaxDeleteManyNotification(){
        if(!$this->request->is('post')){
            return false;
        }

        $this->returnJsonEncode(
            $this->tNotificationCustomer->deleteAll(array(
                    'customer_id' => $this->request->data('customer_id')
                )
            )
        );
    }

    public function ajaxProductOrderBy(){
        if(!$this->request->is('post')){
            return false;
        }
        $this->autoRender = false;
        $orderBy = $this->request->data('orderBy');

        $products = $this->tProduct->orderByProduct($this->request->data('key'), $orderBy, 1);
        $this->returnJsonEncode($products);
    }

    public function ajaxProductPagination(){
        if(!$this->request->is('post')){
            return false;
        }

        $this->autoRender = false;
        $orderBy = $this->request->data('orderBy');
        $page = $this->request->data('page');
        $products = $this->tProduct->orderByProduct($this->request->data('key'), $orderBy, $page);
        $this->returnJsonEncode($products);
    }

    public function ajaxUpdateAvatar(){
        if(!$this->request->is('post')){
            return false;
        }

        $this->autoRender = false;
        if ($_FILES) {
            $image_type = end(explode('/', $_FILES['image']['type']));
            $image_name = $this->getUniqueFileName($_FILES['image']['name']) . "." . $image_type;
            $uploadImg = WWW_ROOT . "img/customers/" . $image_name;
            if ( move_uploaded_file($_FILES['image']['tmp_name'], $uploadImg) ) {
                $this->Session->write('user.avatar', $image_name);

                $this->returnJsonEncode(
                    $this->tCustomer->updateAvatar($this->Session->read('user.id'), $image_name)
                );
            } else {
                $this->returnJsonEncode(0);
            }
        }
    }

    private function getUniqueFileName($file) {
        return substr(md5($file . time() . "" . $this->Session->read('user.id')), 5, 15);
    }
}