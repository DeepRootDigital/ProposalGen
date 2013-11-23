<?php

include 'widgets/cover-widget.php'; 
include 'widgets/content-widget.php'; 
include 'widgets/freeform-content.php';
include 'widgets/two-col-widget.php';
register_sidebar(array(
    'name' => __('Slides'),
    'id' => 'slides',
    'description' => __('Widgets in this area will appear as slides in the proposal.'),
    'before_title' => '',
    'after_title' => ''
));
?>