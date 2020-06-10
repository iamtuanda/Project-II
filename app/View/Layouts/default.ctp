<!DOCTYPE html>
<html>
<head>
    <?php echo $this->Html->charset(); ?>
    <link rel="icon" href="http://192.168.33.10/mishon/img/logo_mishon.png">

    <?php 
        echo $this->Html->css(
            array(
                'bootstrap/bootstrap.min',
                'font-awsome/all',
                'jquery-ui/jquery-ui.min',
                'jquery-ui/jquery-ui.theme'
            )
        );
        echo $this->Html->script(
            array(
                'jquery/jquery.min',
                'lib/popper.min',
                'angular/angular.min',
                'bootstrap/bootstrap.min',
                'font-awsome/all'
            )
        );
        echo $this->fetch('meta');
        echo $this->fetch('css');
        echo $this->fetch('script');
    ?>
    <title><?php echo $title; ?></title>
</head>
<body>
    <?php echo $this->fetch('content'); ?>
</body>
</html>
