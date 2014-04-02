<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>BMS Proposal Gen - </title>
	<link rel="stylesheet" type="text/css" href="normalize.css">
	<link rel="stylesheet" type="text/css" href="style.css">
	<script type="text/javascript" src="http://fast.fonts.net/jsapi/8732fb8c-7669-455f-a795-b783768d6394.js"></script>
	<link type="text/css" rel="stylesheet" href="http://fast.fonts.net/cssapi/8732fb8c-7669-455f-a795-b783768d6394.css">
</head>
<body>	
	<section id="cover" class="screen">
		<?php include 'header.php'; ?>
		<div class="container">
			<img src="images/cover-img.png">
		</div>
	</section>
	<section id="section-two-cover" class="screen">
		<?php include 'header.php'; ?>
		<div class="container">
			<img style="position:relative; z-index:1000;" src="images/section-two-moniker-dark.png">
			<div class="header-editor">
				<h1 class="dark-treatment paragraph-edit">Astute <span>Inc.</span></h1>
				<div class="paragraph-edit-con"></div>
			</div>
			<img class="instanced" src="images/instanciation/q2f-image.png">
		</div>
	</section>

	<?php include 'content-template.php'; ?>

	<section id="section-three-cover" class="screen">
		<?php include 'header.php'; ?>
		<div class="container">
			<div>
			<img style="position:relative; z-index:1000;" src="images/section-three-moniker-dark.png">
				<h1 class="dark-treatment paragraph-edit"><span>Product</span> & Service<br/> Offerings</h1>
				<div class="paragraph-edit-con"></div>
			</div>
			<img class="instanced" src="images/big-bms-logo.png">
		</div>
	</section>

	<?php include 'subway-map.php'; ?>
	<?php include 'table-template.php'; ?>
	<?php include 'alt-content-template.php'; ?>
	<?php include 'discipline-section.php'; ?>
	<?php include 'work-samples.php'; ?>
	<?php include 'team-section.php'; ?>
	<!-- BACK COVER -->
	<section class="screen">
		<?php include 'header.php'; ?>
		<div class="container" style="text-align: center;">
			<img src="images/BMS_contact.png">
		</div>
	</section>
	<div class="right-click-menu">
		<ul>
			<li>Content Before</li>
			<li>Content After</li>
			<li>Alt Content Before</li>
			<li>Alt Content After</li>
		</ul>
	</div>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
	<script type="text/javascript" src="function.js"></script>
	<?php include 'editor.php'; ?>
</body>
</html>