<?php
echo $this->Html->css(
    array(
        'admin/admin',
        'admin/home',
        'admin/check-delete')
    ,
    array('inline' => false));
echo $this->Html->script(
    array(
        'admin/admin',
        'admin/home',
        'lib/highcharts.src'
    ),
    array('inline' => false));
?>
<div id="wrapper">
    <div id="content-wrapper" class='d-flex flex-column'>
        <?php echo $this->element('admin/header'); ?>
        <div class="container" id='content'>
            <div class="row">
                <div class="col-sm-8">
                    <div class="title">
                        Results Today
                    </div>
                    <div class="results">
                        <div class="row text-center">
                            <div class="col-sm-4 bill d-flex flex-row">
                                <i class="fas fa-file-invoice icon-result"></i>
                                <div class="figure d-flex flex-column">
                                    <span class="bill-quantity"><?php echo $today_result['transactions_total']; ?> Transactions</span>
                                    <span class="total"><span class="price"><?php echo $today_result['price_total']; ?></span> $</span>
                                </div>
                            </div>
                            <div class="col-sm-4 sale d-flex flex-row">
                                <i class="fas fa-cart-plus icon-result"></i>
                                <div class="figure d-flex flex-column">
                                    <span>Sales</span>
                                    <span class="total"><?php echo $today_result['products_quantity']; ?> products</span>
                                </div>
                            </div>
                            <div class="col-sm-4 evaluation d-flex flex-row">
                                <?php if($comparison_results['status'] == 'deincrease') {?>
                                    <i class="fas fa-arrow-alt-circle-up icon-result up hide"></i>
                                    <i class="fas fa-arrow-alt-circle-down icon-result down"></i>
                                <?php } else { ?>
                                    <i class="fas fa-arrow-alt-circle-up icon-result up"></i>
                                    <i class="fas fa-arrow-alt-circle-down icon-result down hide"></i>
                                <?php } ?>
                                <div class="figure ratio">
                                    <span class="value" style="<?php if($comparison_results['status'] == 'deincrease') { ?> color: red; <?php } ?>"><?php echo $comparison_results['ratio']; ?>%</span>
                                    <span>yesterday</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="title">
                        Sell-out Products
                    </div>
                    <div id="sell-out-products">
                        <div class="row text-center">
                            <?php if(sizeof($products) > 0) {?>
                                <?php foreach($products as $key => $product) :?>
                                    <div class="col-sm-4 product">
                                        <div class="product-info">
                                            <img class="product-img" src="../img/products/<?php echo $product['tProductManagement']['image'] != '' ? $product['tProductManagement']['image'] : 'default-product-img.jpg'; ?>">
                                            <div class="product-info-body">
                                                <h4 class="product-name"><?php echo $product['tProductManagement']['name']; ?></h4>
                                                <p class="category"><?php echo $product['CategoryManagement']['category']; ?>>><?php echo $product['CategoryManagement']['type']; ?></p>
                                                <p class="product-quantity">Sold:<?php echo $product['tProductManagement']['sold']; ?></p>
                                            </div>
                                        </div>
                                    </div>
                                <?php endforeach; ?>
                            <?php } else { ?>
                                <h3 class="empty-product">Currently has not yet sold any product!</h3>
                            <?php } ?>
                        </div>
                    </div>
                    <div class="title">
                        Sales Figure
                    </div>
                    <div class="chart">
                        <div class="row">
                            <div class="col-sm-12 figure">
                                <div class="list-categories" hidden>
                                    <?php for($i = 0; $i < sizeof($figureCategories); $i++) {?>
                                        <span><?php echo $figureCategories[$i]['category'] ?>:category:<?php echo $figureCategories[$i]['ratio'] ?></span>
                                    <?php } ?>
                                </div>
                                <div id='categories'></div>
                            </div>
                            <div class="col-sm-12 figure">
                                <div class="list-days" hidden>
                                    <?php for($i = 0; $i < 7; $i++ ) {?>
                                        <span><?php echo $days_list[$i]; ?>,7day,<?php echo $figure7DaysAgo[$i]; ?></span>
                                    <?php } ?>
                                </div>
                                <div id='daily'></div>
                            </div>
                            <div class="col-sm-12 figure">
                                <div class="list-months" hidden>
                                    <?php for($i = 0; $i < 12; $i++ ) {?>
                                        <span><?php echo $figure12Months[$i]; ?></span>
                                    <?php } ?>
                                </div>
                                <div id="monthly"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-4 notification">
                    <div id='notification'>
                        <div class="title">
                            Recent Updates
                            <i class="fas fa-redo-alt reload"></i>
                        </div>
                        <ul id="timeline-stream" class="d-flex flex-column">
                            <?php foreach($dataForNotifications['0'] as $notification) :?>
                                <li class="timeline-stream-item">
                                    <div class="timeline-stream-detail d-flex flex-row">
                                        <span class="icon"><i class="fas fa-file-invoice-dollar icon-bill"></i></span>
                                        <span class="timeline-stream-detail-content d-flex flex-column">
                                            <span class="activities">
                                                <span class="us"><?php echo $notification['tNotification']['name']; ?></span>
                                                <span class="action"><?php echo $notification['tNotification']['status']; ?></span>
                                                <span>with value</span>
                                                <span class="price"><?php echo $notification['tNotification']['price']; ?></span>$
                                            </span>
                                            <span class="datetime"><i><?php echo $notification['tNotification']['time']; ?></i></span>
                                        </span>
                                    </div>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                        <div class="see-more <?php if($dataForNotifications['1'] == 'true') { echo 'hide';} ?>">
                            <i class="fas fa-arrow-circle-down arrow-down"></i>
                            <span>see more notification...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php echo $this->element('admin/information-personal'); ?>
        <div class="frame-check-delete"></div>
    </div>
</div>
</body>
<script type="text/javascript">
$(function() {
    var categories = $('.list-categories span');
    var figureCategories = [];
    for (var i = 0; i < categories.length; i++) {
        var figureCategory = new Object();
        var text = $(categories)[i].innerText;
        figureCategory.name = text.split(':category:')[0];
        figureCategory.y = Number(text.split(':category:')[1]);
        if (i == 0) {
            figureCategory.sliced = true;
            figureCategory.selected = true;
        }
        figureCategories.push(figureCategory);
    }

    Highcharts.chart('categories', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Categories market shares'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: figureCategories
        }]
    });

    var days_list = [];
    var figure7Days = [];
    for (var i = 6; i >= 0; i--) {
        var text = $('.list-days span')[i].innerText;
        days_list.push(text.split(',')[0]);
        figure7Days.push(Number(text.split(',7day,')[1]));
    }

    Highcharts.chart('daily', {
        title: {
            text: 'Last 7 days revenue'
        },

        subtitle: {
            // text: 'Plain'
        },
        yAxis: {
            title: {
                text: 'USD'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        xAxis: {
            categories: days_list
        },

        series: [{
            type: 'column',
            colorByPoint: true,
            name: 'Total',
            data: figure7Days,
            showInLegend: false
        }]
    });

    var figure12Months = [];
    for (var i = 0; i < 12; i++) {
        var text = $('.list-months span')[i].innerText;
        figure12Months.push(Number($('.list-months span')[i].innerText));
    }

    Highcharts.chart('monthly', {

        title: {
            text: 'Revenue 2019'
        },

        subtitle: {
            text: 'the whole system'
        },

        yAxis: {
            title: {
                text: 'USD'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },

        series: [{
            name: 'Revenue',
            data: figure12Months
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    });

    $(document).ready(function() {
        $('#main-menu').find('li').removeClass('active');
        $($('#main-menu').find('li')[0]).addClass('active');
    });
});
</script>