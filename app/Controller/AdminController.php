<?php

App::uses('AppController', 'Controller');
App::uses('SimplePasswordHasher', 'Controller/Component/Auth');
App::uses('Component', 'Controller');

class AdminController extends AppController {
    public $components = array('FormatData');
    public $uses = array(
        'tCategoryManagement',
        'tProductManagement',
        'tCashierManagement',
        'tCustomerManagement',
        'tBillManagement',
        'tBillDetailManagement',
        'tOrderManagement',
        'tOrderDetailManagement',
        'tOrderTrackManagement',
        'tPaymentMethodManagement',
        'tEventManagement',
        'tEventDetailManagement',
        'tNotification',
        'tNotificationCustomer',
    );

    public function beforeFilter() {
        if (!$this->Session->read('manager')) {
            return $this->redirect(array(
                'controller' => 'login',
                'action' => 'index')
            );
        }
    }

    public function home() {
        // Get result today
        $today_result = array(
            'transactions_total' => 0,
            'price_total' => 0,
            'products_quantity' => 0,
        );
        $yesterday_total_price = 0;

        $comparison_results = array(
            'ratio' => 0,
            'status' => '',
        );

        $today_bills = $this->tBillManagement->getBillToday();
        $bills_total_today = sizeof($today_bills);
        foreach ($today_bills as $today_bill) {
            $today_result['price_total'] += (int) ($today_bill['tBillManagement']['total_price']);
            $bills_detail = $this->tBillDetailManagement->getBillDetail($today_bill['tBillManagement']['id']);
            foreach ($bills_detail as $bill_detail) {
                $today_result['products_quantity'] += (int) ($bill_detail['tBillDetailManagement']['quantity']);
            }
        }
        $today_orders = $this->tOrderManagement->getOrderToday();
        $orders_total_today = sizeof($today_orders);
        foreach ($today_orders as $today_order) {
            $today_result['price_total'] += (int) ($today_order['tOrderManagement']['total_price']);
            $orders_detail = $this->tOrderDetailManagement->getOrderDetail($today_order['tOrderManagement']['id']);
            foreach ($orders_detail as $order_detail) {
                $today_result['products_quantity'] += (int) ($order_detail['tOrderDetailManagement']['quantity']);
            }
        }
        $today_result['transactions_total'] = $bills_total_today + $orders_total_today;
        $yesterday_bills = $this->tBillManagement->getBillYesterday();
        foreach ($yesterday_bills as $yesterday_bill) {
            $yesterday_total_price += (int) ($yesterday_bill['tBillManagement']['total_price']);
        }
        $yesterday_orders = $this->tOrderManagement->getOrderYesterday();
        foreach ($yesterday_orders as $yesterday_order) {
            $yesterday_total_price += (int) ($yesterday_order['tOrderManagement']['total_price']);
        }

        if ($yesterday_total_price == 0 && $today_result['price_total'] == 0) {
            $comparison_results['ratio'] = 0;
        } elseif ($yesterday_total_price == 0 && $today_result['price_total'] != 0) {
            $comparison_results['ratio'] = 100;
        } else {
            $comparison_results['ratio'] = round((float) (abs(($yesterday_total_price - $today_result['price_total'])) / $yesterday_total_price), 2) * 100;
        }

        if ($yesterday_total_price > $today_result['price_total']) {
            $comparison_results['status'] = 'deincrease';
        } else {
            $comparison_results['status'] = 'increase';
        }

        // Get figure 7 days ago
        $days_list = array();
        $figure7DaysAgo = array();
        for ($i = 0; $i < 7; $i++) {
            $day = '-' . ($i + 1) . ' days';
            array_push($days_list, date('d/m', strtotime($day)));
            $day = date('d/m/Y', strtotime($day));
            $total_price = 0;
            $bills = $this->tBillManagement->getBillByDay($day);
            foreach ($bills as $bill) {
                $total_price += (int) $bill['tBillManagement']['total_price'];
            }
            $orders = $this->tOrderManagement->getOrderByDay($day);
            foreach ($orders as $order) {
                $total_price += (int) $order['tOrderManagement']['total_price'];
            }
            array_push($figure7DaysAgo, $total_price);
        }

        // Get figure 12 months
        $months_list = array();
        $figure12Months = array();
        for ($i = 0; $i < 12; $i++) {
            $year = date('Y');
            if ($i < 9) {
                $month = '0' . ($i + 1);
            } else {
                $month = $i + 1;
            }
            array_push($months_list, $month);
            $total_price = 0;
            $bills = $this->tBillManagement->getBillByMonth($year, $month);
            foreach ($bills as $bill) {
                $total_price += (int) $bill['tBillManagement']['total_price'];
            }
            $orders = $this->tOrderManagement->getOrderByMonth($year, $month);
            foreach ($orders as $order) {
                $total_price += (int) $order['tOrderManagement']['total_price'];
            }
            array_push($figure12Months, $total_price);
        }

        $this->set(array(
            'products' => $this->tProductManagement->getSellOutPtoducts(),
            'dataForNotifications' => $this->tNotification->getNotifications('1'),
            'today_result' => $today_result,
            'comparison_results' => $comparison_results,
            'days_list' => $days_list,
            'figure7DaysAgo' => $figure7DaysAgo,
            'months_list' => $months_list,
            'figure12Months' => $figure12Months,
            'figureCategories' => $this->tProductManagement->getFigureCategories(),
            'manager' => $this->Session->read('manager'),
            'title' => 'Admin home',
        ));
    }

    public function product() {
        $this->set(array(
            'allCategories' => $this->tCategoryManagement->getCategories(),
            'manager' => $this->Session->read('manager'),
            'title' => 'Product management',
        ));
    }

    public function cashier() {
        if ($this->Session->read('manager.role') == 'cashier') {
            return $this->redirect("home");
        }

        $this->set(array(
            'manager' => $this->Session->read('manager'),
            'title' => 'Cashier management',
        ));
    }

    public function customer() {
        if ($this->Session->read('manager.role') == 'cashier') {
            return $this->redirect("home");
        }

        $this->set(array(
            'page_number' => $this->tCustomerManagement->getPageNumber(),
            'customers' => $this->tCustomerManagement->getCustomers(),
            'manager' => $this->Session->read('manager'),
            'title' => 'Customer management',
        ));
    }

    public function transaction() {
        $bills = $this->tBillManagement->getAllBill();
        $total_price_bill = 0;
        $orders = $this->tOrderManagement->getAllOrder();
        $total_price_order = 0;

        foreach ($bills as $bill) {
            $total_price_bill += (int) $bill['tBillManagement']['total_price'];
        }

        foreach ($orders as $order) {
            $total_price_order += (int) $order['tOrderManagement']['total_price'];
        }

        $bills = $this->FormatData->formatBills($bills);
        $orders = $this->FormatData->formatOrders($orders);

        $this->set(array(
            'bills' => $bills,
            'total_price_bill' => $total_price_bill,
            'bill_page_number' => $this->tBillManagement->getPageNumber(),
            'orders' => $orders,
            'total_price_order' => $total_price_order,
            'order_page_number' => $this->tOrderManagement->getPageNumber(),
            'manager' => $this->Session->read('manager'),
            'title' => 'Transactions management',
        ));
    }

    public function event() {
        $products = $this->tProductManagement->getProductsForEvent();
        $events = $this->tEventManagement->getEvents();

        $events = $this->FormatData->formatEvents($events);

        $categories = $this->tProductManagement->getIdCategories();
        $list_idC = array();
        foreach ($categories as $category) {
            array_push($list_idC, $category['tProductManagement']['categories_types_id']);
        }

        $this->set(array(
            'allCategories' => $this->tCategoryManagement->getCategoriesForEvent($list_idC),
            'products' => $products,
            'events' => $events,
            'page_number' => $this->tEventManagement->getPageNumber(),
            'manager' => $this->Session->read('manager'),
            'title' => 'Event',
        ));
    }

    public function logout() {
        $this->Session->delete('manager');
        return $this->redirect(
            array(
                'controller' => 'login',
                'action' => 'index',
            )
        );
    }

    public function ajaxLoadMoreNotification() {
        if (!$this->request->is('post')) {
            return false;
        }
        $this->autoRender = false;

        $dataForNotifications = $this->tNotification->getNotifications($this->request->data('page_index'));
        $this->returnJsonEncode($dataForNotifications);
    }

    public function ajaxAddCategory() {
        if (!$this->request->is('post')) {
            return false;
        }
        $this->autoRender = false;
        $this->returnJsonEncode($this->tCategoryManagement->addCategory(
            $this->request->data('g_name'),
            $this->request->data('p_group')
        ));
    }

    public function ajaxEditCategory() {
        if (!$this->request->is('post')) {
            return false;
        }
        $this->autoRender = false;

        $this->returnJsonEncode($this->tCategoryManagement->editCategory(
            $this->request->data('old_gname'),
            $this->request->data('g_name'),
            $this->request->data('p_group'),
            $this->request->data('old_pgroup')
        ));
    }

    public function ajaxDeleteCategory() {
        if (!$this->request->is('post')) {
            return false;
        }
        $this->autoRender = false;

        $g_name = ucfirst(strtolower($this->request->data('g_name')));
        $idC = $this->tCategoryManagement->deleteCategory(
            $g_name,
            $this->request->data('p_group')
        );
        $codeP = array();
        $page_number = '0';
        $products;
        for ($i = 0; $i < sizeof($idC); $i++) {
            $product = $this->tProductManagement->getProductsByIdC($idC[$i]);
            if (sizeof($product) > 0) {
                array_push(
                    $codeP,
                    $product['tProductManagement']['code']
                );
            }
        }
        $this->tProductManagement->deleteProduct($codeP);
        $getMostCateId = $this->tProductManagement->getMostCategory();
        if (sizeof($getMostCateId) > 0) {
            $products = $this->tProductManagement->findPByIdC($getMostCateId[0]['t_product']['categories_types_id'], '1');
            $page_number = $this->tProductManagement->getPageNumber($getMostCateId[0]['t_product']['categories_types_id']);
        } else {
            $products = '';
        }
        $data = array(
            $this->tCategoryManagement->getCategories(),
            $products,
            $page_number,
        );
        $this->returnJsonEncode($data);
    }

    public function ajaxGetProducts() {
        $this->autoRender = false;

        $page_number = '0';
        $products;
        if ($this->request->data('g_name')) {
            $idC = $this->tCategoryManagement->findIdC(
                $this->request->data('p_group'),
                $this->request->data('g_name')
            );
            $products = $this->tProductManagement->findPByIdC($idC, '1');
            $page_number = $this->tProductManagement->getPageNumber($idC);
        } else {
            $getMostCateId = $this->tProductManagement->getMostCategory();
            if (sizeof($getMostCateId) > 0) {
                $products = $this->tProductManagement->findPByIdC($getMostCateId[0]['t_product']['categories_types_id'], '1');
                $page_number = $this->tProductManagement->getPageNumber($getMostCateId[0]['t_product']['categories_types_id']);
            } else {
                $products = '';
            }
        }

        $data = array(
            $products,
            $page_number,
        );
        $this->returnJsonEncode($data);
    }

    public function ajaxLoadPage() {
        if (!$this->request->is('post')) {
            return false;
        }
        $this->autoRender = false;

        $idC = $this->tCategoryManagement->findIdC(
            $this->request->data('p_group'),
            $this->request->data('g_name')
        );

        $this->returnJsonEncode($this->tProductManagement->findPByIdC(
            $idC,
            $this->request->data('page_index')
        ));
    }

    public function ajaxAddProduct() {
        if (!$this->request->is('post')) {
            return false;
        }
        $this->autoRender = false;

        $pname = ucfirst(strtolower($this->request->data('pname')));
        $data;

        if (!$this->tProductManagement->checkCode($this->request->data('codeP'))) {
            $this->returnJsonEncode("duplicatedC");
            exit();
        }

        $image_list = '';
        $idC = $this->tCategoryManagement->findIdC(
            $this->request->data('p_group'),
            $this->request->data('g_name')
        );

        if ($_FILES) {
            $count_image = count($_FILES['imgList']['name']);
            for ($i = 0; $i < $count_image; $i++) {
                $image_type = end(explode('.', $_FILES['imgList']['name'][$i]));
                $image_name = $this->getUniqueFileName($_FILES['imgList']['name'][$i]) . "." . $image_type;
                $uploadImg = WWW_ROOT . "img/products/" . $image_name;
                $image_list .= $image_name;
                move_uploaded_file($_FILES['imgList']['tmp_name'][$i], $uploadImg);

                if ($i < $count_image - 1) {
                    $image_list .= ',';
                }
            }
        }

        $this->tProductManagement->addProduct(
            $pname, $this->request->data('codeP'),
            $this->request->data('pprice'),
            $idC,
            $this->request->data('description'),
            $this->request->data('detail_content'),
            $image_list
        );

        $page_number = $this->tProductManagement->getPageNumber($idC);
        $data = array(
            $this->tProductManagement->findPByIdC(
                $idC,
                '1'
            ),
            $page_number,
        );
        $this->returnJsonEncode($data);
    }

    public function ajaxEditProduct() {
        if (!$this->request->is('post')) {
            return false;
        }
        $this->autoRender = false;
        $data;

        $pname = ucfirst(strtolower($this->request->data('pname')));

        if ($this->request->data('codeP') != $this->request->data('old_codeP')) {
            if (!$this->tProductManagement->checkCode($this->request->data('codeP'))) {
                $this->returnJsonEncode("duplicatedC");
                exit();
            }
        }

        $image_list = '';
        $idC = $this->tCategoryManagement->findIdC(
            $this->request->data('p_group'),
            $this->request->data('g_name')
        );

        if ($_FILES) {
            $count_image = count($_FILES['imgList']['name']);
            for ($i = 0; $i < $count_image; $i++) {
                $image_type = end(explode('.', $_FILES['imgList']['name'][$i]));
                $image_name = $this->getUniqueFileName($_FILES['imgList']['name'][$i]) . "." . $image_type;
                $uploadImg = WWW_ROOT . "img/products/" . $image_name;
                $image_list .= $image_name;
                move_uploaded_file($_FILES['imgList']['tmp_name'][$i], $uploadImg);

                if ($i < $count_image - 1) {
                    $image_list .= ',';
                }
            }
        }

        if ($this->request->data('image_list_exist') != '') {
            if ($image_list != '') {
                $image_list = $this->request->data('image_list_exist') . ',' . $image_list;
            } else {
                $image_list = $this->request->data('image_list_exist');
            }
        }

        $this->tProductManagement->editProduct(
            $pname,
            $this->request->data('codeP'),
            $this->request->data('old_codeP'),
            $this->request->data('pprice'),
            $idC,
            $this->request->data('description'),
            $this->request->data('detail_content'),
            $image_list
        );

        $data = $this->tProductManagement->findPByIdC(
            $idC,
            $this->request->data('index')
        );
        $this->returnJsonEncode($data);
    }

    public function ajaxDeleteProduct() {
        if (!$this->request->is('post')) {
            return false;
        }
        $this->autoRender = false;

        $idC = $this->tCategoryManagement->findIdC(
            $this->request->data('p_group'),
            $this->request->data('g_name')
        );
        $this->tProductManagement->deleteProduct($this->request->data('idP'));
        $data = array(
            $this->tProductManagement->findPByIdC(
                $idC,
                '1'
            ),
            $this->tProductManagement->getPageNumber($idC),
        );

        $this->returnJsonEncode($data);
    }

    public function ajaxSearchProduct() {
        if (!$this->request->is('post')) {
            return false;
        }
        $this->autoRender = false;

        $this->returnJsonEncode($this->tProductManagement->searchProduct($this->request->data('key_word')));
    }

    public function ajaxGetCashiers() {
        $this->autoRender = false;

        $this->returnJsonEncode($this->FormatData->formatCashiers($this->tCashierManagement->getAllCashiers()));
    }

    public function ajaxSearchCashier() {
        if (!$this->request->is('post')) {
            return false;
        }
        $this->autoRender = false;

        $this->returnJsonEncode($this->FormatData->formatCashiers(
            $this->tCashierManagement->searchCashier($this->request->data('key_word'))
        ));
    }

    public function ajaxAddCashier() {
        if (!$this->request->is('post')) {
            return false;
        }
        $this->autoRender = false;

        $image_name = '';
        $cname = ucfirst(strtolower($this->request->data('cname')));
        $data;

        if (!$this->tCashierManagement->checkCashier($this->request->data('cphone'))) {
            $this->returnJsonEncode('duplicatedC');
            exit();
        }

        if ($_FILES) {
            $image_type = end(explode('/', $_FILES['image']['type']));
            $image_name = $this->getUniqueFileName($_FILES['image']['name']) . "." . $image_type;
            $uploadImg = WWW_ROOT . "img/cashiers/" . $image_name;
            move_uploaded_file($_FILES['image']['tmp_name'], $uploadImg);
        }
        $passwordHasher = new SimplePasswordHasher(array('hashType' => 'sha256'));
        $password = $passwordHasher->hash('123456');
        $this->tCashierManagement->addCashier(
            $cname,
            $this->request->data('cphone'),
            $this->request->data('startd'),
            $password,
            $this->request->data('description'),
            $image_name
        );

        $data = $this->FormatData->formatCashiers(
            $this->tCashierManagement->getAllCashiers()
        );
        $this->returnJsonEncode($data);
    }

    public function ajaxEditCashier() {
        if (!$this->request->is('post')) {
            return false;
        }
        $this->autoRender = false;

        $image_name = '';
        $cname = ucfirst(strtolower($this->request->data('cname')));
        $data;

        if ($this->request->data('cphone') != $this->request->data('old_cphone')) {
            if (!$this->tCashierManagement->checkCashier($this->request->data('cphone'))) {
                $this->returnJsonEncode('duplicatedC');
                exit();
            }
        }

        if ($_FILES) {
            $image_type = end(explode('/', $_FILES['image']['type']));
            $image_name = $this->getUniqueFileName($_FILES['image']['name']) . "." . $image_type;
            $uploadImg = WWW_ROOT . "img/cashiers/" . $image_name;
            move_uploaded_file($_FILES['image']['tmp_name'], $uploadImg);
        }
        $this->tCashierManagement->editCashier(
            $cname,
            $this->request->data('cphone'),
            $this->request->data('old_cphone'),
            $this->request->data('startd'),
            $this->request->data('description'),
            $image_name
        );

        $data = $this->FormatData->formatCashiers(
            $this->tCashierManagement->getAllCashiers()
        );
        $this->returnJsonEncode($data);
    }

    public function ajaxResetPassword() {
        if (!$this->request->is('post')) {
            return false;
        }
        $this->autoRender = false;
        $this->returnJsonEncode($this->tCashierManagement->resetPassword($this->request->data('phonenumber')));
    }

    public function ajaxEditInfo() {
        if (!$this->request->is('post')) {
            return false;
        }
        $this->autoRender = false;

        $image_name = '';
        $username = ucfirst(strtolower($this->request->data('username')));
        $data = '';

        if ($this->request->data('phone') != $this->Session->read('manager.phone')) {
            if (!$this->tCashierManagement->checkCashier($this->request->data('phone'))) {
                $data = 'duplicatedP';
            }
        }

        if ($_FILES) {
            $image_type = end(explode('/', $_FILES['image']['type']));
            $image_name = $this->getUniqueFileName($_FILES['image']['name']) . "." . $image_type;
            $uploadImg = WWW_ROOT . "img/cashiers/" . $image_name;
            move_uploaded_file($_FILES['image']['tmp_name'], $uploadImg);
        }
        $this->tCashierManagement->editCashier(
            $username,
            $this->request->data('phone'),
            $this->Session->read('manager.phone'),
            '',
            $this->request->data('address'),
            $image_name
        );

        if ($data != 'duplicatedP') {
            $user = $this->tCashierManagement->getAccount($this->request->data('phone'));
            $this->Session->write('manager', $user['tCashierManagement']);
        }

        $this->returnJsonEncode($data);
    }

    public function ajaxChangePassword() {
        if (!$this->request->is('post')) {
            return false;
        }
        $this->autoRender = false;
        $passwordHasher = new SimplePasswordHasher(array('hashType' => 'sha256'));
        $this->returnJsonEncode($this->tCashierManagement->changePassword(
            $this->Session->read('manager.phone'),
            $passwordHasher->hash($this->request->data('current_password')),
            $passwordHasher->hash($this->request->data('new_password'))
        ));
    }

    public function ajaxDeleteCashier() {
        if (!$this->request->is('post')) {
            return false;
        }
        $this->autoRender = false;

        $this->tCashierManagement->deleteCashier($this->request->data('cphone'));
        $this->returnJsonEncode($this->FormatData->formatCashiers(
            $this->tCashierManagement->getAllCashiers()
        ));
    }

    public function ajaxSearchCustomer() {
        if (!$this->request->is('post')) {
            return false;
        }
        $this->autoRender = false;

        $customers = $this->tCustomerManagement->searchCustomer($this->request->data('key_word'));
        $data;
        if ($this->request->data('key_word') == '') {
            $data = array($customers, $this->tCustomerManagement->getPageNumber());
        } else {
            $data = $customers;
        }

        $this->returnJsonEncode($data);
    }

    public function ajaxLoadCustomer() {
        if (!$this->request->is('post')) {
            return false;
        }
        $this->autoRender = false;

        $this->returnJsonEncode($this->tCustomerManagement->loadCustomers(
            $this->request->data('page_index')
        ));
    }

    public function ajaxDeleteCustomer() {
        if (!$this->request->is('post')) {
            return false;
        }
        $this->autoRender = false;

        $this->tCustomerManagement->deleteCustomer($this->request->data('email_list'));
        $data = array(
            $this->tCustomerManagement->getCustomers(),
            $this->tCustomerManagement->getPageNumber(),
        );

        $this->returnJsonEncode($data);
    }

    public function ajaxLoadBills() {
        if (!$this->request->is('post')) {
            return false;
        }
        $this->autoRender = false;

        $bills = $this->tBillManagement->loadBills($this->request->data('page_index_bill'));
        $total_price_bill = 0;
        foreach ($bills as $bill) {
            $total_price_bill += (int) $bill['tBillManagement']['total_price'];
        }

        $bills = $this->FormatData->formatBills($bills);
        $data = array($bills, $total_price_bill);

        $this->returnJsonEncode($data);
    }

    public function ajaxSaveBill() {
        if (!$this->request->is('post')) {
            return false;
        }
        $this->autoRender = false;

        $this->returnJsonEncode($this->tBillManagement->saveBill(
            $this->request->data('transaction_id'),
            $this->request->data('note')
        ));
    }

    public function ajaxBillsViewMode() {
        if (!$this->request->is('post')) {
            return false;
        }
        $this->autoRender = false;

        $view_mode = strtolower($this->request->data('view_mode'));
        $data;
        if ($view_mode == 'all bill') {
            $bills = $this->tBillManagement->getAllBill();
            $total_price_bill = 0;

            foreach ($bills as $bill) {
                $total_price_bill += (int) $bill['tBillManagement']['total_price'];
            }

            $bills = $this->FormatData->formatBills($bills);
            $data = array($bills, $total_price_bill, $this->tBillManagement->getPageNumber());
        } else {
            $bills = $this->tBillManagement->billViewMode($view_mode);
            $total_price_bill = 0;

            foreach ($bills as $bill) {
                $total_price_bill += (int) $bill['tBillManagement']['total_price'];
            }

            $bills = $this->FormatData->formatBills($bills);
            $data = array($bills, $total_price_bill);
        }

        $this->returnJsonEncode($data);
    }

    public function ajaxSearchBill() {
        if (!$this->request->is('post')) {
            return false;
        }
        $this->autoRender = false;

        $data;

        if ($this->request->data('key_word') == '') {
            $bills = $this->tBillManagement->getAllBill();
            $total_price_bill = 0;

            foreach ($bills as $bill) {
                $total_price_bill += (int) $bill['tBillManagement']['total_price'];
            }

            $bills = $this->FormatData->formatBills($bills);
            $data = array(
                $bills,
                $total_price_bill,
                $this->tBillManagement->getPageNumber(),
            );
        } else {
            $bills = $this->tBillManagement->searchBill($this->request->data('key_word'));
            $total_price_bill = 0;

            foreach ($bills as $bill) {
                $total_price_bill += (int) $bill['tBillManagement']['total_price'];
            }

            $bills = $this->FormatData->formatBills($bills);
            $data = array(
                $bills,
                $total_price_bill,
            );
        }

        $this->returnJsonEncode($data);
    }

    public function ajaxDeleteBills() {
        if (!$this->request->is('post')) {
            return false;
        }
        $this->autoRender = false;

        $idB = $this->request->data('idB');
        for ($i = 0; $i < sizeof($idB); $i++) {
            $payment_method = $this->tPaymentMethodManagement->getPaymentMethodForBill($idB[$i]);
            if ($payment_method['tPaymentMethodManagement']['point'] != '0') {
                $used_point = $payment_method['tPaymentMethodManagement']['point'];
                $used_point = str_replace(',', '', $used_point);
                $customer = $this->tCustomerManagement->getCustomerById($payment_method['BillManagement']['customer_id']);
                $point = ((float) ($customer['tCustomerManagement']['point']) + round((float) ($used_point), 2));
                $this->tCustomerManagement->savePoint(
                    $customer['tCustomerManagement']['id'],
                    $point
                );
            }
            $bills_detail = $this->tBillDetailManagement->getBillDetail($idB[$i]);
            foreach ($bills_detail as $bill_detail) {
                $product = $this->tProductManagement->getProductByCode($bill_detail['ProductSoldManagement']['product_code']);
                $sold_quantity = $bill_detail['tBillDetailManagement']['quantity'];
                $sold_quantity = ((int) ($product['tProductManagement']['sold']) - (int) ($sold_quantity));
                $this->tProductManagement->updateSoldProduct(
                    $product['tProductManagement']['id'],
                    $sold_quantity
                );
            }

            $notification = array(
                'name' => $this->Session->read('manager.fullname'),
                'status' => 'deleted bill #B' . $idB[$i],
                'price' => $payment_method['BillManagement']['total_price'],
                'time' => $this->request->data('delele_time'),
            );
            $this->tNotification->addNotification($notification);
        }

        $this->tBillManagement->deleteBills($idB);

        $bills = $this->tBillManagement->getAllBill();
        $total_price_bill = 0;

        foreach ($bills as $bill) {
            $total_price_bill += (int) $bill['tBillManagement']['total_price'];
        }

        $bills = $this->FormatData->formatBills($bills);
        $data = array(
            $bills,
            $total_price_bill,
            $this->tBillManagement->getPageNumber(),
        );

        $this->returnJsonEncode($data);
    }

    public function ajaxOrdersViewMode() {
        if (!$this->request->is('post')) {
            return false;
        }
        $this->autoRender = false;

        $view_mode = strtolower($this->request->data('view_mode'));
        $data;

        if ($view_mode == 'all order') {
            $orders = $this->tOrderManagement->getAllOrder();
            $total_price_order = 0;

            foreach ($orders as $order) {
                $total_price_order += (int) $order['tOrderManagement']['total_price'];
            }
            $orders = $this->FormatData->formatOrders($orders);

            $data = array($orders, $total_price_order, $this->tOrderManagement->getPageNumber());
        } else {
            $orders = $this->tOrderManagement->orderViewMode($view_mode);
            $total_price_order = 0;

            foreach ($orders as $order) {
                $total_price_order += (int) $order['tOrderManagement']['total_price'];
            }

            $orders = $this->FormatData->formatOrders($orders);
            $data = array(
                $orders,
                $total_price_order,
            );
        }

        $this->returnJsonEncode($data);
    }

    public function ajaxSearchOrder() {
        if (!$this->request->is('post')) {
            return false;
        }
        $this->autoRender = false;

        $data;
        if ($this->request->data('key_word') == '') {
            $orders = $this->tOrderManagement->getAllOrder();
            $total_price_order = 0;

            foreach ($orders as $order) {
                $total_price_order += (int) $order['tOrderManagement']['total_price'];
            }
            $orders = $this->FormatData->formatOrders($orders);

            $data = array(
                $orders,
                $total_price_order,
                $this->tOrderManagement->getPageNumber(),
            );
        } else {
            $orders = $this->tOrderManagement->searchOrder($this->request->data('key_word'));

            $total_price_order = 0;

            foreach ($orders as $order) {
                $total_price_order += (int) $order['tOrderManagement']['total_price'];
            }

            $orders = $this->FormatData->formatOrders($orders);
            $data = array(
                $orders,
                $total_price_order,
            );
        }

        $this->returnJsonEncode($data);
    }

    public function ajaxDeliveringOrder() {
        if (!$this->request->is('post')) {
            return false;
        }
        $this->autoRender = false;

        $order = $this->tOrderManagement->updateStatus(
            $this->request->data('order_code'),
            $this->Session->read('manager.id'),
            'Delivering'
        );

        $this->tOrderTrackManagement->updateDeliveryDay(
            $order['tOrderManagement']['id'],
            $this->request->data('delivering_time'),
            'Delivering'
        );

        $notification = array(
            'name' => $this->Session->read('manager.fullname'),
            'status' => 'delivering order #' . $order['tOrderManagement']['order_code'],
            'price' => $order['tOrderManagement']['total_price'],
            'time' => $this->request->data('delivering_time'),
        );
        $this->tNotification->addNotification($notification);

        $notification_customer = array(
            'order_id' => $order['tOrderManagement']['id'],
            'customer_id' => $order['tOrderManagement']['customer_id'],
            'description' => 'delivering',
            'status' => 0,
            'time' => $this->request->data('delivering_time'),
        );
        $this->tNotificationCustomer->addNotification(
            $order['tOrderManagement']['id'],
            $notification_customer
        );

        $orders = $this->tOrderManagement->loadOrders($this->request->data('index'));
        $total_price_order = 0;

        foreach ($orders as $order) {
            $total_price_order += (int) $order['tOrderManagement']['total_price'];
        }

        $orders = $this->FormatData->formatOrders($orders);
        $data = array(
            $orders,
            $total_price_order,
        );

        $this->returnJsonEncode($data);
    }

    public function ajaxDeliveredOrder() {
        if (!$this->request->is('post')) {
            return false;
        }
        $this->autoRender = false;

        $order = $this->tOrderManagement->updateStatus(
            $this->request->data('order_code'),
            $this->Session->read('manager.id'),
            'Delivered'
        );

        $this->tOrderTrackManagement->updateDeliveryDay(
            $order['tOrderManagement']['id'],
            $this->request->data('delivered_time'),
            'Delivered'
        );

        $orders_detail = $this->tOrderDetailManagement->getOrderDetail($order['tOrderManagement']['id']);

        foreach ($orders_detail as $order_detail) {
            $product = $this->tProductManagement->getProductByCode($order_detail['ProductSoldManagement']['product_code']);
            if (sizeof($product) > 0) {
                $sold_quantity = (int) ($product['tProductManagement']['sold']) + (int) ($order_detail['tOrderDetailManagement']['quantity']);
                $this->tProductManagement->updateSoldProduct(
                    $product['tProductManagement']['id'],
                    $sold_quantity
                );
            }
        }

        $used_point = round(((float) $order['tOrderManagement']['total_price']) / 100000, 2);
        $customer = $this->tCustomerManagement->getCustomerById($order['tOrderManagement']['customer_id']);
        $point = $used_point + ((float) ($customer['tCustomerManagement']['point']));
        $this->tCustomerManagement->savePoint($customer['tCustomerManagement']['id'], $point);

        $notification = array(
            'name' => $this->Session->read('manager.fullname'),
            'status' => 'delivered order #' . $order['tOrderManagement']['order_code'],
            'price' => $order['tOrderManagement']['total_price'],
            'time' => $this->request->data('delivered_time'),
        );
        $this->tNotification->addNotification($notification);

        $notification_customer = array(
            'order_id' => $order['tOrderManagement']['id'],
            'customer_id' => $order['tOrderManagement']['customer_id'],
            'description' => 'delivered',
            'status' => 0,
            'time' => $this->request->data('delivered_time'),
        );
        $this->tNotificationCustomer->addNotification(
            $order['tOrderManagement']['id'],
            $notification_customer
        );

        $orders = $this->tOrderManagement->loadOrders($this->request->data('index'));
        $total_price_order = 0;

        foreach ($orders as $order) {
            $total_price_order += (int) $order['tOrderManagement']['total_price'];
        }

        $orders = $this->FormatData->formatOrders($orders);
        $data = array(
            $orders,
            $total_price_order,
        );

        $this->returnJsonEncode($data);
    }

    public function ajaxSaveOrder() {
        if (!$this->request->is('post')) {
            return false;
        }
        $this->autoRender = false;

        $this->returnJsonEncode($this->tOrderManagement->saveOrder(
            $this->request->data('transaction_id'),
            $this->request->data('note')
        ));
    }

    public function ajaxLoadOrders() {
        if (!$this->request->is('post')) {
            return false;
        }
        $this->autoRender = false;

        $orders = $this->tOrderManagement->loadOrders($this->request->data('page_index'));
        $total_price_order = 0;

        foreach ($orders as $order) {
            $total_price_order += (int) $order['tOrderManagement']['total_price'];
        }

        $orders = $this->FormatData->formatOrders($orders);
        $data = array(
            $orders,
            $total_price_order,
        );

        $this->returnJsonEncode($data);
    }

    public function ajaxDeleteOrders() {
        if (!$this->request->is('post')) {
            return false;
        }
        $this->autoRender = false;

        $idO = $this->request->data('idT');
        for ($i = 0; $i < sizeof($idO); $i++) {
            $payment_method = $this->tPaymentMethodManagement->getPaymentMethodForOrder($idO[$i]);
            if (array_key_exists('tPaymentMethodManagement', $payment_method)) {
                $used_point = $payment_method['tPaymentMethodManagement']['point'];
                $used_point = str_replace(',', '', $used_point);
                $used_point = round(((float) $used_point) / 1000, 2);
                $customer = $this->tCustomerManagement->getCustomerById($payment_method['OrderManagement']['customer_id']);
                $point = $used_point + ((float) ($customer['tCustomerManagement']['point']));
                $this->tCustomerManagement->savePoint($customer['tCustomerManagement']['id'], $point);
            }

            $orders_detail = $this->tOrderDetailManagement->getOrderDetail($idO[$i]);

            foreach ($orders_detail as $order_detail) {
                $product = $this->tProductManagement->getProductByCode($order_detail['ProductSoldManagement']['product_code']);
                $sold_quantity = (int) ($product['tProductManagement']['sold']) - (int) ($order_detail['tOrderDetailManagement']['quantity']);
                $this->tProductManagement->updateSoldProduct($product['tProductManagement']['id'], $sold_quantity);
            }

            $notification = array(
                'name' => $this->Session->read('manager.fullname'),
                'status' => 'deleted order #O' . $idO[$i],
                'price' => $payment_method['OrderManagement']['total_price'],
                'time' => $this->request->data('delele_time'),
            );
            $this->tNotification->addNotification($notification);
        }

        $this->tOrderManagement->deleteOrders($idO);

        $orders = $this->tOrderManagement->getAllOrder();
        $total_price_order = 0;

        foreach ($orders as $order) {
            $total_price_order += (int) $order['tOrderManagement']['total_price'];
        }

        $orders = $this->FormatData->formatOrders($orders);
        $data = array(
            $orders,
            $total_price_order,
            $this->tOrderManagement->getPageNumber(),
        );

        $this->returnJsonEncode($data);
    }

    public function ajaxLoadEvents() {
        if (!$this->request->is('post')) {
            return false;
        }
        $this->autoRender = false;

        $events = $this->tEventManagement->loadEvents($this->request->data('page_index'));
        $events = $this->FormatData->formatEvents($events);

        $this->returnJsonEncode($events);
    }

    public function ajaxAddEvent() {
        if (!$this->request->is('post')) {
            return false;
        }
        $this->autoRender = false;

        $image_name = '';
        $image_type = end(explode('/', $_FILES['image']['type']));
        $image_name = $this->getUniqueFileName($_FILES['image']['name']) . "." . $image_type;
        $uploadImg = WWW_ROOT . "img/events/" . $image_name;
        move_uploaded_file($_FILES['image']['tmp_name'], $uploadImg);

        $events = array(
            'title' => $this->request->data('title'),
            'start_date' => $this->request->data('date_start'),
            'due_date' => $this->request->data('date_due'),
            'category' => $this->request->data('category'),
            'status' => $this->request->data('status'),
            'content' => $this->request->data('content'),
            'image' => $image_name,
            'value_deal' => $this->request->data('valueE'),
        );

        $id_event = $this->tEventManagement->addEvents($events);

        if ($this->request->data('category') == 'Offer a discount') {
            $id_list = $this->request->data('codeP');
            $id_list = explode(',', $id_list);
            for ($i = 0; $i < sizeof($id_list); $i++) {
                $product = $this->tProductManagement->getProductByCode($id_list[$i]);
                $this->tEventDetailManagement->addEventDetail(
                    $id_event,
                    $product['tProductManagement']['id']
                );
                if ($this->request->data('status') == 'Apply') {
                    $last_price = (int) ($product['tProductManagement']['price']) - (
                        (int) ($product['tProductManagement']['price']) * (int) ($this->request->data('valueE')) / 100
                    );
                    $this->tProductManagement->updateLastPrice(
                        $product['tProductManagement']['id'],
                        $last_price
                    );
                }
            }
        }

        $events = $this->tEventManagement->getEvents();
        $events = $this->FormatData->formatEvents($events);

        $data = array(
            $events,
            $this->tEventManagement->getPageNumber(),
        );
        $this->returnJsonEncode($data);
    }

    public function ajaxCheckStatus() {
        $this->autoRender = false;
        return $this->tEventManagement->checkStatus($this->request->data('idE'));
    }

    public function ajaxEventViewMode() {
        if (!$this->request->is('post')) {
            return false;
        }
        $this->autoRender = false;

        $view_mode = strtolower($this->request->data('view_mode'));
        $data;

        if ($view_mode == 'all events') {
            $events = $this->tEventManagement->getEvents();
            $events = $this->FormatData->formatEvents($events);
            $data = array(
                $events,
                $this->tEventManagement->getPageNumber(),
            );
        } else {
            $events = $this->tEventManagement->eventViewMode($view_mode);
            $data = $this->FormatData->formatEvents($events);
        }

        $this->returnJsonEncode($data);
    }

    public function ajaxEditEvent() {
        if (!$this->request->is('post')) {
            return false;
        }
        $this->autoRender = false;

        $event;
        $image_name = '';
        if ($_FILES) {
            $image_type = end(explode('/', $_FILES['image']['type']));
            $image_name = $this->getUniqueFileName($_FILES['image']['name']) . "." . $image_type;
            $uploadImg = WWW_ROOT . "img/events/" . $image_name;
            move_uploaded_file($_FILES['image']['tmp_name'], $uploadImg);
        }

        $event = array(
            'title' => $this->request->data('title'),
            'start_date' => $this->request->data('date_start'),
            'due_date' => $this->request->data('date_due'),
            'category' => $this->request->data('category'),
            'status' => $this->request->data('status'),
            'content' => $this->request->data('content'),
            'value_deal' => $this->request->data('valueE'),
        );

        if ($image_name != '') {
            $event = array(
                'image' => $image_name,
            );
        }

        $this->tEventManagement->editEvent(
            $this->request->data('id'),
            $event
        );

        $id_event = $this->request->data('id');

        if ($this->request->data('category') == 'Offer a discount') {
            $this->tEventDetailManagement->deleteEventDetail($id_event);
            $id_list = $this->request->data('codeP');
            $id_list = explode(',', $id_list);
            foreach ($id_list as $id) {
                $product = $this->tProductManagement->getProductByCode($id);
                $this->tEventDetailManagement->addEventDetail(
                    $id_event,
                    $product['tProductManagement']['id']
                );
                if ($this->request->data('status') == 'Apply') {
                    $last_price = (int) ($product['tProductManagement']['price']) - (
                        (int) ($product['tProductManagement']['price']) * (int) ($this->request->data('valueE')) / 100
                    );
                    $this->tProductManagement->updateLastPrice(
                        $product['tProductManagement']['id'],
                        $last_price
                    );
                } else {
                    $this->tProductManagement->updateLastPrice(
                        $product['tProductManagement']['id'],
                        $product['tProductManagement']['price']
                    );
                }
            }
        }

        $events = $this->tEventManagement->loadEvents($this->request->data('index'));
        $events = $this->FormatData->formatEvents($events);

        $this->returnJsonEncode($events);
    }

    public function ajaxSearchEvent() {
        if (!$this->request->is('post')) {
            return false;
        }
        $this->autoRender = false;
        $data;

        if ($this->request->data('key_word') == '') {
            $events = $this->tEventManagement->getEvents();
            $events = $this->FormatData->formatEvents($events);

            $data = array($events, $this->tEventManagement->getPageNumber());
        } else {
            $events = $this->tEventManagement->searchEvent($this->request->data('key_word'));
            $data = $this->FormatData->formatEvents($events);
        }

        $this->returnJsonEncode($events);
    }

    public function ajaxChangeStatus() {
        if (!$this->request->is('post')) {
            return false;
        }
        $this->autoRender = false;
        $data;

        if (!$this->tEventManagement->changeStatus($this->request->data('idE'), $this->request->data('status'))) {
            $this->returnJsonEncode('false');
            exit();
        }

        if ($this->request->data('type') == 'Offer a discount') {
            $events = $this->tEventDetailManagement->getEventById($this->request->data('idE'));
            if ($this->request->data('status') == 'Apply') {
                foreach ($events as $event) {
                    $last_price = (int) (
                        (int) ($event['ProductManagement']['price']) - (
                            (int) ($event['ProductManagement']['price']) * (int) ($event['EventManagement']['value_deal']) / 100
                        )
                    );
                    $this->tProductManagement->updateLastPrice(
                        $event['tEventDetailManagement']['product_id'],
                        $last_price
                    );
                }
            } else {
                foreach ($events as $event) {
                    $this->tProductManagement->updateLastPrice(
                        $event['tEventDetailManagement']['product_id'],
                        $event['ProductManagement']['price']
                    );
                }
            }
        }
        $events = $this->tEventManagement->loadEvents($this->request->data('index'));
        $data = $this->FormatData->formatEvents($events);

        $this->returnJsonEncode($data);
    }

    public function ajaxDeleleEvents() {
        if (!$this->request->is('post')) {
            return false;
        }
        $this->autoRender = false;

        $list_id = $this->request->data('idE');
        for ($i = 0; $i < sizeof($list_id); $i++) {
            $event = $this->tEventManagement->getEventById($list_id[$i]);
            if ($event['tEventManagement']['category'] == 'Offer a discount') {
                if ($event['tEventManagement']['status'] == 'Apply') {
                    $events_detail = $this->tEventDetailManagement->getEventById($list_id[$i]);
                    foreach ($events_detail as $event_detail) {
                        $this->tProductManagement->updateLastPrice(
                            $event_detail['tEventDetailManagement']['product_id'],
                            $event_detail['ProductManagement']['price']
                        );
                    }
                }
            }
        }
        $this->tEventManagement->deleteEvents($this->request->data('idE'));

        $events = $this->tEventManagement->getEvents();
        $events = $this->FormatData->formatEvents($events);

        $data = array(
            $events,
            $this->tEventManagement->getPageNumber(),
        );

        $this->returnJsonEncode($data);
    }

    private function __getUniqueFileName($file) {
        return substr(md5($file . time() . "" . $this->Session->read('manager.phone')), 5, 15);
    }
}
