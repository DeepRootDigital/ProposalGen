$(document).ready(function(){
    
    var PreviousFrameBuffer;
    
    //PreProcess Slides Order
    
    //Next Button Navigation Function
    $('.next').click(function() {
        PreviousFrameBuffer = $(this).parents('.viewport');
        $(this).parents('.viewport').fadeOut();
        $(this).parents('.viewport').next().fadeIn();
    });
    
    $('.previous').click(function() {
        $(this).parents('.viewport').fadeOut();
        PreviousFrameBuffer.fadeIn();
    });
    
}); 