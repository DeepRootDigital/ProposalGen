var hovered = '';
var containercount = 1;

$(document).ready(function(){

  addBindings();

  document.addEventListener('contextmenu',function(e) {
    e.preventDefault();
    var clickx = e.clientX;
    var clicky = e.clientY;
    $('.right-click-menu').css('top',clicky);
    $('.right-click-menu').css('left',clickx);
    $('.right-click-menu').css('display','block');
  }, false);

  $.each($('body > section'), function(){
    $(this).addClass('c'+containercount);
    containercount += 1;
  });

  $('body > section').hover(function(){
    var containerclass = $(this).attr('class').split(' ').slice(-1);
    hovered = containerclass;
    console.log(hovered);
  });

  $('.right-click-menu').hover(function(){
  },function(){
    $('.right-click-menu').css('display','none');
  });

  $('.right-click-menu li').click(function(){
    var choice = $(this).text();
    var beforeafter = '';
    var type = '';
    if (choice == "Content Before") {
      beforeafter = "before";
      type = "content";
    } else if (choice == "Content After") {
      beforeafter = "after";
      type = "content";
    } else if (choice == "Alt Content After") {
      beforeafter = "after";
      type = "altcontent";
    } else if (choice == "Alt Content Before") {
      beforeafter = "before";
      type = "altcontent";
    }
    if (beforeafter == "before") {
      $('.'+hovered).before('<section id="c' + containercount + '" class="screen c'+containercount+'"></section>');
    } else if (beforeafter == "after") {
      $('.'+hovered).after('<section id="c' + containercount + '" class="screen"></section>');
    }
    if (type == "content") {
      $('#c'+containercount).load('content-template-i.php');
    } else if (type == "altcontent") {
      $('#c'+containercount).load('alt-content-template-i.php');
    }
    containercount += 1;
    addBindings();
  });
});

function addBindings() {
  $('.paragraph-edit').click(function(){
    var previoustext = $(this).html();
    $(this).parent().find('.paragraph-edit-con').html('<textarea class="paragraph-editor">' + previoustext + '</textarea>');
    $('.paragraph-editor').focus();
    $('.paragraph-editor').on("focusout",function(){
      var newtext = $(this).val();
      $(this).parent().parent().find('.paragraph-edit').html(newtext);
      $(this).remove();
    });
  });
}