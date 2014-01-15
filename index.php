<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title></title>
	<script type="text/javascript" src="http://fast.fonts.net/jsapi/8732fb8c-7669-455f-a795-b783768d6394.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/function.js"></script>
	<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/normalize.css" type="text/css" />
	<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/style.css" type="text/css" />
</head>
<body>
	<?php get_header(); ?>
	<div class="view-wrap">
		<?php include 'cover-1.php'; ?>
		<?php dynamic_sidebar( 'section1slides' ); ?>
		<?php include 'sect3cover.php'; ?> 
		<?php dynamic_sidebar( 'definitionslides' ); ?>    
		<?php include 'services-rendered.php'; ?>  
		<?php include 'research.php'; ?>
		<?php include 'branding.php'; ?>
		<?php include 'business-development.php'; ?>
		<?php include 'webdevelopment.php'; ?>
		<?php include 'marketing.php'; ?>
		<?php include 'marketing-cont.php'; ?>
		<?php include 'sect4cover.php'; ?>
		<?php include 'sample-page.php'; ?>
		<?php include 'sample-page2.php'; ?>
		<?php include 'sample-page3.php'; ?>
		<?php include 'sect5cover.php'; ?>
		<?php include 'team-page-one.php'; ?>
		<?php include 'team-page-two.php'; ?>
		<?php include 'team-page-three.php'; ?>
		<?php include 'team-page-four.php'; ?>
		<?php include 'team-page-five.php'; ?>
	</div>
</body>
</html>
