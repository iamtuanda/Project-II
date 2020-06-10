<div class="container-fluid" id="header">
	<nav class="container navbar navbar-expand navbar-light bg-white topbar static-top">
		<a class="navbar-brand logo mr-auto" href="#">
			<img src="../img/logo_mishon.png" alt="" class="logo-img">
		</a>
		<div class="header-right">
			<div class="dropdown user-profile">
				<button class="dropdown-toggle" data-toggle="dropdown">
					<img src="../img/cashiers/<?php echo $manager["avatar"] == '' ? 'nami.jpg' : $manager['avatar']?>" alt="" class="user-img">
				</button>
				<div class="dropdown-menu dropdown-menu-right">
					<a class="dropdown-item disabled user-name" href="#">Hello, <?php echo $manager['fullname']; ?></a>
					<a class="dropdown-item information-personal" href="#"><i class="fas fa-info-circle user-icon"></i>Profile</a>
					<a class="dropdown-item" href="logout"><i class="fas fa-sign-out-alt user-icon"></i>Logout</a>
				</div>
			</div>
		</div>
	</nav>
</div>
<div class="container-fluid" id="main-menu">
	<div class="container main-menu">
		<ul class="nav flex-row">
			<li class="nav-item">
				<a class="nav-link" href="./home"><i class="fas fa-synagogue icon-menu"></i>Home</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="./product"><i class="fas fa-coins icon-menu"></i>Product</a>
			</li>
			<li class="nav-item <?php if($manager['role'] == 'cashier') echo 'disabled';?>">
				<a class="nav-link <?php if($manager['role'] == 'cashier') echo 'disabled';?>" href="./cashier"><i class="fas fa-user-nurse icon-menu"></i>Cashier</a>
			</li>
			<li class="nav-item <?php if($manager['role'] == 'cashier') echo 'disabled';?>">
				<a class="nav-link <?php if($manager['role'] == 'cashier') echo 'disabled';?>" href="./customer"><i class="fas fa-user icon-menu"></i>Customer</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="./transaction"><i class="fas fa-exchange-alt icon-menu"></i>Transaction</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="./event"><i class="fas fa-concierge-bell icon-menu"></i>Event</a>
			</li>
			<li class="nav-item sell">
				<a class="nav-link" href="../cashier"><i class="fas fa-shopping-basket icon-menu"></i>Sell</a>
			</li>
		</ul>
	</div>
</div>