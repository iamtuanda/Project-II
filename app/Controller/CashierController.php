<?php
App::uses('Controller', 'Controller');
App::uses('SimplePasswordHasher', 'Controller/Component/Auth');

class CashierController extends AppController {
    public $uses = array(
        'tProductCashier',
        'tCustomerCashier',
        'tAccountCashier',
        'tBillCashier',
        'tPaymentMethodsCashier',
        'tBillDetailCashier',
        'tCategoriesTypeCashier',
        'tProductSoldCashier',
        'tNotificationCashier',
    );

    public function beforeFilter() {
        if (!$this->Session->read('manager')) {
            return $this->redirect(array(
                'controller' => 'admin',
                'action' => 'login',
            ));
        }
    }

    public function index() {
        $this->set(array(
            'manager' => $this->Session->read('manager'),
            'title' => 'PAYMENT',
        ));
    }

    public function ajaxSearchProduct() {
        if (!$this->request->is('post')) {
            return false;
        }

        $this->autoRender = false;
        if ($this->request->data('code')) {
            $product = $this->tProductCashier->findProduct($this->request->data('code'));
        } else {
            $key_search = $this->request->data('key_search');
            $product = $this->tProductCashier->searchProduct($key_search);
        }
        $this->returnJsonEncode($product);
    }

    public function ajaxSearchCustomer() {
        if (!$this->request->is('post')) {
            return false;
        }

        $this->autoRender = false;
        $key_search = $this->request->data('key_search');
        $customer = $this->tCustomerCashier->searchCustomer($key_search);

        $this->returnJsonEncode($customer);
    }

    public function ajaxChangePassword() {
        if (!$this->request->is('post')) {
            return false;
        }

        $this->autoRender = false;
        $passwordHasher = new SimplePasswordHasher(array('hashType' => 'sha256'));

        $cashier_id = $this->request->data('cashier_id');
        $current_password = $passwordHasher->hash($this->request->data('current_password'));
        $new_password = $passwordHasher->hash($this->request->data('new_password'));

        if ($this->tAccountCashier->checkPassword($cashier_id, $current_password)) {
            $this->returnJsonEncode(
                $this->tAccountCashier->changePassword($cashier_id, $new_password)
            );
        } else {
            $this->returnJsonEncode("false");
        }
    }

    public function ajaxPayAddBill() {
        if (!$this->request->is('post')) {
            return false;
        }

        $this->autoRender = false;

        $bill = array(
            'time' => $this->request->data('time'),
            'total_price' => $this->request->data('total_price'),
            'account_id' => $this->request->data('account_id'),
            'customer_id' => $this->request->data('customer_id'),
            'note' => $this->request->data('note'),
        );
        $bill_id = $this->tBillCashier->addBill($bill);

        $bill = array(
            'id' => $bill_id,
            'bill_code' => "B" . $bill_id,
        );
        $this->tBillCashier->updateBillCode($bill);

        $pay_methods = array(
            'point' => $this->request->data('point'),
            'cash' => $this->request->data('cash'),
            'card' => $this->request->data('card'),
            'bill_id' => $bill_id,
        );
        $this->tPaymentMethodsCashier->addPaymentMethods($pay_methods);

        $this->returnJsonEncode($bill_id);
    }

    public function ajaxPayAddPoint() {
        if (!$this->request->is('post')) {
            return false;
        }

        $this->autoRender = false;

        $customer_id = $this->request->data('customer_id');
        $plus_point = $this->request->data('plus_point');

        $this->returnJsonEncode(
            $this->tCustomerCashier->addPoint($customer_id, $plus_point)
        );
    }

    public function ajaxPayMinusPoint() {
        if (!$this->request->is('post')) {
            return false;
        }

        $this->autoRender = false;

        $customer_id = $this->request->data('customer_id');
        $minus_point = $this->request->data('minus_point');

        $this->returnJsonEncode(
            $this->tCustomerCashier->minusPoint($customer_id, $minus_point)
        );
    }

    public function ajaxPayAddProductSold() {
        if (!$this->request->is('post')) {
            return false;
        }

        $this->autoRender = false;

        $product = $this->tProductCashier->find('first', array(
            'conditions' => array(
                'code' => $this->request->data('code'),
            ),
        ));

        $category = $product['tCategoriesTypeCashier']['category'] . ">>" . $product['tCategoriesTypeCashier']['type'];
        $price = $product['tProductCashier']['price'];
        $product_code = $product['tProductCashier']['code'];
        $image = $product['tProductCashier']['image'];

        if (is_bool($this->tProductSoldCashier->checkProduct($product_code))) {
            $product = array(
                'product_code' => $product_code,
                'name' => $this->request->data('name'),
                'price' => $this->request->data('price'),
                'category' => $category,
                'image' => $image,
            );

            $product_sold_id = $this->tProductSoldCashier->insertProduct($product);
        } else {
            $product_sold_id = $this->tProductSoldCashier->checkProduct($product_code);
        }

        $bill_detail = array(
            'product_sold_id' => $product_sold_id,
            'bill_id' => $this->request->data('bill_id'),
            'quantity' => $this->request->data('quantity'),
            'price' => $this->request->data('price'),
            'discount_price' => $this->request->data('finish_price'),
        );
        $this->tBillDetailCashier->addBillDetail($bill_detail);

        $product_id = $this->request->data('product_id');
        $quantity = $this->request->data('quantity');

        $this->returnJsonEncode(
            $this->tProductCashier->increaseQuantityProductSold($product_id, $quantity)
        );
    }

    public function ajaxInsertNotification() {
        if (!$this->request->is('post')) {
            return false;
        }

        $this->autoRender = false;

        $notification = array(
            'name' => $this->request->data('name'),
            'status' => $this->request->data('status'),
            'price' => $this->request->data('price'),
            'time' => $this->request->data('time'),
        );

        $this->returnJsonEncode(
            $this->tNotificationCashier->insert($notification)
        );
    }
}
