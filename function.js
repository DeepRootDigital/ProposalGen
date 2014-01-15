$(document).ready(function(){
    
    var PreviousFrameBuffer;
    
    //PreProcess Slides Order
    
    //Next Button Navigation Function
    $('.next').click(function() {
        $(this).parents('.viewport').fadeOut();
        $(this).parents('.viewport').next().fadeIn();
    });
    
    $('.previous').click(function() {
        $(this).parents('.viewport').fadeOut();
        $(this).parents('.viewport').prev('.viewport').fadeIn();
    });
    
    $('.sect1selector').click(function() {
    	$('.viewport').fadeOut();
    	$('#section1').fadeIn();
    });
    
    $('.sect2selector').click(function() {
    	$('.viewport').fadeOut();
    	$('#section2').fadeIn();
    });
    
    $('.sect3selector').click(function() {
    	$('.viewport').fadeOut();
    	$('#section3').fadeIn();
    });
    
    $('.sect4selector').click(function() {
    	$('.viewport').fadeOut();
    	$('#section4').fadeIn();
    });
    
    $('.sect5selector').click(function() {
    	$('.viewport').fadeOut();
    	$('#section5').fadeIn();
    });
}); 