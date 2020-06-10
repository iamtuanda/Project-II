<?php
    echo $this->Html->css(
        array(
            'customer/icon',
            'customer/header',
            'customer/home',
            'customer/sign',
            'customer/cart',
            'jquery-ui/jquery-ui.min',
            'jquery-ui/jquery-ui.theme'
        ),
        array(
            'inline' => false
        )
    );
    echo $this->Html->script(
        array(
            'jquery-ui/jquery-ui',
            'customer/home',
            'customer/cart',
            'customer/header',
            'customer/function',
            'lib/sweetalert.min'
        ),
        array(
            'inline' => false
        )
    );
    if ($this->Session->read('user')) {
        $user = $this->Session->read('user');
    } else {
        echo $this->element('home/sign');
    }
    
    echo $this->element('home/header');
?>
<div id="cart">
    <div class="container">
        <div class="row">
            <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                <span class="title">SHOPPING CART</span><span class="quantity-total">( 0 )</span>
            </div>
        </div>
        <div class="row cart">
        </div>
    </div>
</div>
<?php echo $this->element('home/footer'); ?>
