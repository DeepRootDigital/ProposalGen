$(document).ready(function(){
  windowResize();
  window.onresize = function() {
    windowResize();
  }

  genproposal();
  deleteSubService();
  removePackage();

  $('.page input').change(genproposal);
  $('.page textarea').change(genproposal);

  $('#addTitleText').on('click',addTitleText);
  $('#addTitleTextSubList').on('click',addTitleTextSubList);
  $('#addTitleSubText').on('click',addTitleSubText);
  $('#addIconsTitleSubTextList').on('click',addIconsTitleSubTextList);
  $('#addIconsTitleSubText').on('click',addIconsTitleSubText);
  $('#generate').on('click',genproposal);
  $('.page').on('click',genPagePreview);
  $('.page').on('click',addSelection);
  $('.delete').on('click',deletePage);
  $('.add-subservice').on('click',addSubService);
  $('.add-service-package').on('click',addServicePackage);

  $('#sortable').sortable({containment: "parent"});

  $('#dropzone').dropzone({ 
    url: '/dropzoneupload',
    init: function() {
      this.on("success", function(file) { 
        $('.section-two-selection p').text(file.name); 
        var leftspot = 400 - (parseInt(file.width) / 2);
        if (leftspot < 192) {
          leftspot = 192;
        }
        $('.section-two-image-width p').text(leftspot);
        genproposal();
      });
    },
    previewsContainer: "#previewCon",
    clickable: true
  });

  $('#dropzone-subway').dropzone({ 
    url: '/dropzoneupload',
    init: function() {
      this.on("success", function(file) { $('.subway-selection p').text(file.name); genproposal(); });
    },
    previewsContainer: "#previewCon",
    clickable: true
  });
});

function deletePage() {
  $(this).parent().remove();
}

function addSelection(){
  if ($('.page.selected')) {
    $('.page.selected').removeClass("selected");
  }
  $(this).addClass("selected");
}

function addTitleText(){
  if ($('.page.selected')) {
    $('.page.selected').after('<section class="page titletext"><button class="delete">X</button><p>Title Text Page</p><input type="text" class="page-title" placeholder="page title"><textarea class="page-text" placeholder="page text"></textarea></section>');  
  } else {
    $('.pages-container').append('<section class="page titletext"><button class="delete">X</button><p>Title Text Page</p><input type="text" class="page-title" placeholder="page title"><textarea class="page-text" placeholder="page text"></textarea></section>');  
  }
  addClick();
}

function addTitleTextSubList(){
  if ($('.page.selected')) {
    $('.page.selected').after('<section class="page titletextsublist"><button class="delete">X</button><p>Title Text Sub List Page</p><input type="text" class="page-title" placeholder="page title"><textarea class="page-text" placeholder="page text"></textarea><input type="text" class="page-sub" placeholder="page subtitle"><input type="text" class="page-list" placeholder="page listelement"><input type="text" class="page-list" placeholder="page listelement"><input type="text" class="page-list" placeholder="page listelement"></section>');  
  } else {
    $('.pages-container').append('<section class="page titletextsublist"><button class="delete">X</button><p>Title Text Sub List Page</p><input type="text" class="page-title" placeholder="page title"><textarea class="page-text" placeholder="page text"></textarea><input type="text" class="page-sub" placeholder="page subtitle"><input type="text" class="page-list" placeholder="page listelement"><input type="text" class="page-list" placeholder="page listelement"><input type="text" class="page-list" placeholder="page listelement"></section>');  
  }
  addClick();
}

function addTitleSubText(){
  if ($('.page.selected')) {
    $('.page.selected').after('<section class="page titlesubtext"><button class="delete">X</button><p>Title Sub Text Page</p><input type="text" class="page-title" placeholder="page title"><input type="text" class="page-sub" placeholder="page subtitle"><textarea class="page-text" placeholder="page text"></textarea></section>');  
  } else {

    $('.pages-container').append('<section class="page titlesubtext"><button class="delete">X</button><p>Title Sub Text Page</p><input type="text" class="page-title" placeholder="page title"><input type="text" class="page-sub" placeholder="page subtitle"><textarea class="page-text" placeholder="page text"></textarea></section>');  
  }
  addClick();
}

function addIconsTitleSubText(){
  if ($('.page.selected')) {
    $('.page.selected').after('<section class="page iconstitlesubtext"><button class="delete">X</button><p>Icons Title Sub Text Page</p><span>Business Development</span><input type="checkbox" class="page-icons"><span>Branding</span><input type="checkbox" class="page-icons"><span>Research & Planning</span><input type="checkbox" class="page-icons"><span>Marketing</span><input type="checkbox" class="page-icons"><span>Web Development</span><input type="checkbox" class="page-icons"><input type="text" class="page-title" placeholder="page title"><input type="text" class="page-sub" placeholder="page subtitle"><textarea class="page-text" placeholder="page text"></textarea></section>');  
  } else {
    $('.pages-container').append('<section class="page iconstitlesubtext"><button class="delete">X</button><p>Icons Title Sub Text Page</p><span>Business Development</span><input type="checkbox" class="page-icons"><span>Branding</span><input type="checkbox" class="page-icons"><span>Research & Planning</span><input type="checkbox" class="page-icons"><span>Marketing</span><input type="checkbox" class="page-icons"><span>Web Development</span><input type="checkbox" class="page-icons"><input type="text" class="page-title" placeholder="page title"><input type="text" class="page-sub" placeholder="page subtitle"><textarea class="page-text" placeholder="page text"></textarea></section>');  
  }
  addClick();
}

function addIconsTitleSubTextList(){
  if ($('.page.selected')) {
    $('.page.selected').after('<section class="page iconstitlesubtextlist"><button class="delete">X</button><p>Icons Title Sub Text Page</p><span>Business Development</span><input type="checkbox" class="page-icons"><span>Branding</span><input type="checkbox" class="page-icons"><span>Research & Planning</span><input type="checkbox" class="page-icons"><span>Marketing</span><input type="checkbox" class="page-icons"><span>Web Development</span><input type="checkbox" class="page-icons"><input type="text" class="page-title" placeholder="page title"><textarea class="page-text" placeholder="page text"></textarea><input type="text" class="page-sub" placeholder="page subtitle"><input type="text" class="page-list" placeholder="page listelement"><input type="text" class="page-list" placeholder="page listelement"><input type="text" class="page-list" placeholder="page listelement"></section>');  
  } else {
    $('.pages-container').append('<section class="page iconstitlesubtextlist"><button class="delete">X</button><p>Icons Title Sub Text Page</p><span>Business Development</span><input type="checkbox" class="page-icons"><span>Branding</span><input type="checkbox" class="page-icons"><span>Research & Planning</span><input type="checkbox" class="page-icons"><span>Marketing</span><input type="checkbox" class="page-icons"><span>Web Development</span><input type="checkbox" class="page-icons"><input type="text" class="page-title" placeholder="page title"><textarea class="page-text" placeholder="page text"></textarea><input type="text" class="page-sub" placeholder="page subtitle"><input type="text" class="page-list" placeholder="page listelement"><input type="text" class="page-list" placeholder="page listelement"><input type="text" class="page-list" placeholder="page listelement"></section>');  
  }
  addClick();
}

function addClick(){
  $('.page').each(function(){
    if (jQuery.data($(this),'events')) {
      console.log("okay");
    } else {
      $(this).on('click',addSelection);
      $(this).find('.delete').on('click',deletePage);
    }
  });
  $('#sortable').sortable("destroy");
  $('#sortable').sortable({containment: "parent"});
}

function genproposal(){
  if ($('.page.selected')) {
    $('.page.selected').removeClass("selected");
  }
  var dataBlock = {
    'clientname':$('#clientname').val(),
    'pages':[]
  };
  $('.page').each(function(){
    var pagetype = $(this).attr("class").split(" ").slice(-1);
    if (pagetype == "sectiontwocover") {
      dataBlock.pages.push({
        'pagetitle':"#"+$('.section-two-color').val(),
        'pagetext':$('.section-two-image-width p').text(),
        'pagesub':false,
        'pagelist':false,
        'pageicons':false,
        'pageimage':$('.section-two-selection p').text(),
        'pagetype':"sectiontwocover"
      });
    } else if (pagetype == "subwaypage") {
      dataBlock.pages.push({
        'pagetitle':false,
        'pagetext':false,
        'pagesub':false,
        'pagelist':false,
        'pageicons':false,
        'pageimage':$('.subway-selection p').text(),
        'pagetype':"subwaypage"
      });
    } else if (pagetype == "tablepage") {
      var tableinfo = [];
      $(this).find('.service-package').each(function(){
        var serviceinfo = {
          'pname':$(this).find('.table-title').val(),
          'ptime':$(this).find('.table-timeframe').val(),
          'psub':$(this).find('.table-subtotal').val(),
          'pservice':[]
        };
        $(this).find('.subservice input').each(function(){
          serviceinfo.pservice.push($(this).val());
        });
        tableinfo.push(serviceinfo);
      });
      dataBlock.pages.push({
        'pagetitle':false,
        'pagetext':tableinfo,
        'pagesub':$('.offering-discount').val(),
        'pagelist':false,
        'pageicons':false,
        'pageimage':false,
        'pagetype':"tablepage"
      });
    } else if (pagetype == "titletext"){ 
      dataBlock.pages.push({
        'pagetitle': $(this).find(".page-title").val(),
        'pagetext': $(this).find(".page-text").val(),
        'pagesub':false,
        'pagelist':false,
        'pageicons':false,
        'pageimage':false,
        'pagetype':"titletext"
      });
    } else if (pagetype == "titletextsublist") {
      var pagelist = [];
      $(this).find('.page-list').each(function(){
        pagelist.push($(this).val());
      });
      dataBlock.pages.push({
        'pagetitle': $(this).find(".page-title").val(),
        'pagetext': $(this).find(".page-text").val(),
        'pagesub': $(this).find(".page-sub").val(),
        'pagelist':pagelist,
        'pageicons':false,
        'pageimage':false,
        'pagetype':"titletextsublist"
      });
    } else if (pagetype == "titlesubtext") {
      dataBlock.pages.push({
        'pagetitle': $(this).find(".page-title").val(),
        'pagetext': $(this).find(".page-text").val(),
        'pagesub': $(this).find(".page-sub").val(),
        'pagelist':false,
        'pageicons':false,
        'pageimage':false,
        'pagetype':"titlesubtext"
      });
    } else if (pagetype == "iconstitlesubtext") {
      var pageicons = [];
      var iconcounter = 0;
      $(this).find('.page-icons').each(function(){
        if ($(this).is(":checked") == true && iconcounter == 0) {
          pageicons.push("servicepage-bd.png");
        } else if ($(this).is(":checked") == true && iconcounter == 1) {
          pageicons.push("servicepage-branding.png");
        } else if ($(this).is(":checked") == true && iconcounter == 2) {
          pageicons.push("servicepage-planning.png");
        } else if ($(this).is(":checked") == true && iconcounter == 3) {
          pageicons.push("servicepage-marketing.png");
        } else if ($(this).is(":checked") == true && iconcounter == 4) {
          pageicons.push("servicepage-webdev.png");
        }
        iconcounter += 1;
      });
      dataBlock.pages.push({
        'pagetitle': $(this).find(".page-title").val(),
        'pagetext': $(this).find(".page-text").val(),
        'pagesub': $(this).find(".page-sub").val(),
        'pagelist':false,
        'pageicons':pageicons,
        'pageimage':false,
        'pagetype':"iconstitlesubtext"
      });
    } else if (pagetype == "iconstitlesubtextlist") {
      var pageicons = [];
      var pagelist = [];
      var iconcounter = 0;
      $(this).find('.page-icons').each(function(){
        if ($(this).is(":checked") == true && iconcounter == 0) {
          pageicons.push("servicepage-bd.png");
        } else if ($(this).is(":checked") == true && iconcounter == 1) {
          pageicons.push("servicepage-branding.png");
        } else if ($(this).is(":checked") == true && iconcounter == 2) {
          pageicons.push("servicepage-planning.png");
        } else if ($(this).is(":checked") == true && iconcounter == 3) {
          pageicons.push("servicepage-marketing.png");
        } else if ($(this).is(":checked") == true && iconcounter == 4) {
          pageicons.push("servicepage-webdev.png");
        }
        iconcounter += 1;
      });
      $(this).find('.page-list').each(function(){
        pagelist.push($(this).val());
      });
      dataBlock.pages.push({
        'pagetitle': $(this).find(".page-title").val(),
        'pagetext': $(this).find(".page-text").val(),
        'pagesub': $(this).find(".page-sub").val(),
        'pagelist':pagelist,
        'pageicons':pageicons,
        'pageimage':false,
        'pagetype':"iconstitlesubtextlist"
      });
    } else {
      dataBlock.pages.push({
        'pagetitle':false,
        'pagetext':false,
        'pagesub':false,
        'pagelist':false,
        'pageicons':false,
        'pageimage':false,
        'pagetype':pagetype.join()
      });
    }
  });
console.log(dataBlock);
$.ajax({
  type:'POST',
  data: dataBlock,
  url: '/genproposal'
})
.done(function(){
  document.getElementById('preview').src = 'pdf/' + dataBlock.clientname + '.pdf';
});
}

function addSubService() {
  $(this).before('<div class="subservice"><input type="text" class="subservice-name" placeholder="Subservice Name"><div class="delete-subservice">X</div></div>');
  deleteSubService();
  $(this).prev().find('input').change(genproposal);
}

function deleteSubService() {
  $('.delete-subservice').on('click',function(){
    $(this).parent().remove();
  });
}

function addServicePackage() {
  $(this).before('<div class="service-package"><div class="delete-package">X</div><p>Package Name</p><p>Package Timeframe</p><p>Package Subtotal</p><input type="text" class="table-title" value="Branding Package"><input type="text" class="table-timeframe" value="1 Month"><input type="text" class="table-subtotal" value="$5,000.00"><div class="subservice"><input type="text" class="subservice-name" placeholder="Subservice Name"><div class="delete-subservice">X</div></div><button class="add-subservice">Add Subservice</button></div>');
  $(this).prev().find('.add-subservice').on('click',addSubService);
  $(this).prev().find('input').change(genproposal);
  deleteSubService();
  removePackage();
}

function removePackage() {
  $('.delete-package').on('click',function(){
    $(this).parent().remove();
  });
}

function windowResize(){
  var windowheight = window.innerHeight;
  var pagecontainer = windowheight - 215;
  $('.pages-container').css('height',pagecontainer+'px');
  $('.right-container iframe').css('height',windowheight*0.5-2+'px');
  $('.page-preview').css('height',windowheight*0.5-2+'px');
  $('.page-preview-page').css('height', (windowheight*0.5-2)*0.9+'px');
  $('.page-preview').css('padding-top', 0.5 *((windowheight*0.5-2)*0.1)+'px');
  $('.page-preview-page').css('width', (790/610)*((windowheight*0.5-2)*0.9)+'px');
  var margins = ($('.page-preview').width() - $('.page-preview-page').width()) * 0.5;
  $('.page-preview').css('padding-left', margins+'px');
}

function genPagePreview() {
  var pagetype = $(this).attr("class").split(" ").slice(-1);
    $('.page-preview-page').html("");
  if (pagetype == "sectiontwocover") {
    $('.page-preview-page').html("<div class='menu-placeholder draggable-preview'>Menu</div><div class='section-num-placeholder draggable-preview'>Section Num</div><div class='title-placeholder draggable-preview'>Title</div><div class='icon-placeholder draggable-preview'>Icon</div>");
    giveDrag();
  } else if (pagetype == "subwaypage") {
    $('.page-preview-page').html("<h2>No Preview</h2>");
  } else if (pagetype == "tablepage") {
    $('.page-preview-page').html("<h2>No Preview</h2>");
  } else if (pagetype == "titletext"){ 
    $('.page-preview-page').html("<div class='menu-placeholder draggable-preview'>Menu</div><div class='titletext-title-placeholder draggable-preview'>Title</div><div class='titletext-text-placeholder draggable-preview'>Text</div>");
    giveDrag();
  } else if (pagetype == "titletextsublist") {
    $('.page-preview-page').html("<div class='menu-placeholder draggable-preview'>Menu</div><div class='titletext-title-placeholder draggable-preview'>Title</div><div class='titletext-text-placeholder draggable-preview'>Text</div><div class='titletext-sub-placeholder draggable-preview'>Sub</div><div class='titletext-list-placeholder draggable-preview'>List</div>");
    giveDrag();
  } else if (pagetype == "titlesubtext") {
    $('.page-preview-page').html("<div class='menu-placeholder draggable-preview'>Menu</div><div class='titletext-title-placeholder draggable-preview'>Title</div><div class='titlesubtext-sub-placeholder draggable-preview'>Sub</div><div class='titlesubtext-text-placeholder draggable-preview'>Text</div>");
    giveDrag();
  } else if (pagetype == "iconstitlesubtext") {
    $('.page-preview-page').html("<div class='menu-placeholder draggable-preview'>Menu</div><div class='iconstitlesubtext-icons-placeholder draggable-preview'>Icons</div><div class='iconstitlesubtext-title-placeholder draggable-preview'>Title</div><div class='iconstitlesubtext-sub-placeholder draggable-preview'>Sub</div><div class='iconstitlesubtext-text-placeholder draggable-preview'>Text</div>");
    giveDrag();
  } else if (pagetype == "iconstitlesubtextlist") {
    $('.page-preview-page').html("<div class='menu-placeholder draggable-preview'>Menu</div><div class='iconstitlesubtext-icons-placeholder draggable-preview'>Icons</div><div class='iconstitlesubtext-title-placeholder draggable-preview'>Title</div><div class='iconstitlesubtext-sub-placeholder draggable-preview'>Sub</div><div class='iconstitlesubtext-text-placeholder draggable-preview'>Text</div><div class='iconstitlesubtext-list-placeholder draggable-preview'>List</div>");
    giveDrag();
  } else if (pagetype == "coverpage") {
    $('.page-preview-page').html("<h2>No Preview</h2>");
  } else {
    $('.page-preview-page').html("<h2>No Preview</h2>");
  }
}

function giveDrag() {
  $('.draggable-preview').draggable({ containment: "parent" });
}