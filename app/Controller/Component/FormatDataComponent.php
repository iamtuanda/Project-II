<?php

class FormatDataComponent extends Component {
    public function initialize(Controller $controller) {
        $this->controller = $controller;
    }

    public function formatBills($bills) {
        foreach ($bills as $key => $bill) {
            $payment_method_type = '';
            $payment_method = $this->controller->tPaymentMethodManagement->getPaymentMethodForBill($bill['tBillManagement']['id']);
            if ($payment_method['tPaymentMethodManagement']['point'] != '0') {
                $payment_method_type .= 'point-';
            }
            if ($payment_method['tPaymentMethodManagement']['card'] != '0') {
                $payment_method_type .= 'card-';
            }
            if ($payment_method['tPaymentMethodManagement']['cash'] != '0') {
                $payment_method_type .= 'cash';
            }
            if ($payment_method_type[sizeof($payment_method_type) - 1] == '-') {
                $payment_method_type = substr($payment_method_type, 0, -1);
            }
            $bills[$key]['PaymentMethod']['type'] = $payment_method_type;
            $bills[$key]['PaymentMethod']['point'] = $payment_method['tPaymentMethodManagement']['point'];
            $bills[$key]['PaymentMethod']['card'] = $payment_method['tPaymentMethodManagement']['card'];
            $bills[$key]['PaymentMethod']['cash'] = $payment_method['tPaymentMethodManagement']['cash'];
            $bills[$key]['PaymentMethod']['change'] = (int) (str_replace(',', '', $payment_method['tPaymentMethodManagement']['point'])) + (int) (str_replace(',', '', $payment_method['tPaymentMethodManagement']['card'])) + (int) (str_replace(',', '', $payment_method['tPaymentMethodManagement']['cash'])) - (int) ($bill['tBillManagement']['total_price']);
            $products = $this->controller->tBillDetailManagement->getBillDetail($bill['tBillManagement']['id']);

            foreach ($products as $key1 => $product) {
                $bills[$key]['Products'][$key1]['name'] = $product['ProductSoldManagement']['name'];
                $bills[$key]['Products'][$key1]['price'] = $product['tBillDetailManagement']['discount_price'];
                $bills[$key]['Products'][$key1]['category'] = $product['ProductSoldManagement']['category'];
                $bills[$key]['Products'][$key1]['product_code'] = $product['ProductSoldManagement']['product_code'];
                $bills[$key]['Products'][$key1]['quantity'] = $product['tBillDetailManagement']['quantity'];
            }
        }
        return $bills;
    }

    public function formatCashiers($cashiers) {
        foreach ($cashiers as $key => $cashier) {
            $cashiers[$key]['total_pay'] = 0;
            if (sizeof($cashier['BillManagement']) > 0) {
                foreach ($cashier['BillManagement'] as $bill) {
                    $cashiers[$key]['total_pay'] += (int) ($bill['total_price']);
                }
            }

            if (sizeof($cashier['OrderManagement']) > 0) {
                foreach ($cashier['OrderManagement'] as $order) {
                    if ($order['statement'] == 'Delivered') {
                        $cashiers[$key]['total_pay'] += (int) ($order['total_price']);
                    }
                }
            }
        }
        return $cashiers;
    }

    public function formatOrders($orders) {
        foreach ($orders as $key => $order) {
            $provisional_total = 0;
            $payment_method_type = 'Cash';
            $payment_method = $this->controller->tPaymentMethodManagement->getPaymentMethodForOrder($order['tOrderManagement']['id']);
            $order_track = $this->controller->tOrderTrackManagement->getOrderTrack($order['tOrderManagement']['id']);

            $orders[$key]['tOrderManagement']['delivering_date'] = $order_track['tOrderTrackManagement']['delivery_time'];
            $orders[$key]['tOrderManagement']['delivered_date'] = $order_track['tOrderTrackManagement']['receive_time'];

            if (array_key_exists('tPaymentMethodManagement', $payment_method)) {
                if ($payment_method['tPaymentMethodManagement']['point'] != '0') {
                    $payment_method_type .= '-point';
                }
                $orders[$key]['PaymentMethod']['point'] = $payment_method['tPaymentMethodManagement']['point'];
            } else {
                $orders[$key]['PaymentMethod']['point'] = 0;
            }
            $orders[$key]['PaymentMethod']['type'] = $payment_method_type;

            $products = $this->controller->tOrderDetailManagement->getOrderDetail($order['tOrderManagement']['id']);

            foreach ($products as $key1 => $product) {
                $orders[$key]['Products'][$key1]['name'] = $product['ProductSoldManagement']['name'];
                $orders[$key]['Products'][$key1]['price'] = $product['tOrderDetailManagement']['discount_price'];
                $orders[$key]['Products'][$key1]['category'] = $product['ProductSoldManagement']['category'];
                $orders[$key]['Products'][$key1]['product_code'] = $product['ProductSoldManagement']['product_code'];
                $orders[$key]['Products'][$key1]['quantity'] = $product['tOrderDetailManagement']['quantity'];
                $provisional_total = $provisional_total + (int) ($product['tOrderDetailManagement']['discount_price']) * (int) ($product['tOrderDetailManagement']['quantity']);
            }
            $orders[$key]['tOrderManagement']['provisional'] = $provisional_total;
        }

        return $orders;
    }

    public function formatEvents($events) {
        foreach ($events as $key => $event) {
            $idProductCategories = $this->controller->tEventDetailManagement->getIdProductCategory($event['tEventManagement']['id']);

            foreach ($idProductCategories as $key1 => $idProductCategory) {
                $category = $this->controller->tCategoryManagement->getCategoryById($idProductCategory['ProductManagement']['categories_types_id']);
                $products = $this->controller->tEventDetailManagement->getEventsByIdC($event['tEventManagement']['id'], $idProductCategory['ProductManagement']['categories_types_id']);
                $events[$key]['Category'][$key1]['name'] = $category['tCategoryManagement']['category'] . '>>' . $category['tCategoryManagement']['type'];
                foreach ($products as $key2 => $product) {
                    $events[$key]['Category'][$key1]['Products'][$key2]['name'] = $product['ProductManagement']['name'];
                    $events[$key]['Category'][$key1]['Products'][$key2]['code'] = $product['ProductManagement']['code'];
                    $list_img = explode(',', $product['ProductManagement']['image']);
                    $main_img = $list_img[0];
                    $events[$key]['Category'][$key1]['Products'][$key2]['image'] = $main_img;
                }
            }
        }
        return $events;
    }
}