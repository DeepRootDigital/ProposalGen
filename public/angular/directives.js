'use strict';

var app = angular.module('app');

/* Directives */


app.directive('dropzone', function () {
  return function (scope, element, attrs) {
    var config, dropzone;

    config = scope[attrs.dropzone];

    // create a Dropzone for the element with the given options
    dropzone = new Dropzone(element[0], config.options);
  };
});

app.directive('pageElement', ['$document', function($document) {
  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {
      /* var section = elm.attr("page-element");
      var startX = 0, startY = 0, x=0, y=0, index=0;
      elm.on('mousedown', function(event) {
        // Prevent default dragging of selected content
        event.preventDefault();
        if (isNaN(scope.$eval(attrs.index))) {
          var xstring = "x = scope.pagePreview.pagesetup."+section+".settings.xpos";
          var ystring = "y = scope.pagePreview.pagesetup."+section+".settings.ypos"; 
        } else {
          index = scope.$eval(attrs.index);
          var xstring = "x = scope.pagePreview.pagesetup."+section+"["+index+"]"+".settings.xpos";
          var ystring = "y = scope.pagePreview.pagesetup."+section+"["+index+"]"+".settings.ypos"; 
        }
        eval(xstring);
        eval(ystring);
        x = (x/100) * scope.previewPageWidth;
        y = (y/100) * scope.previewPageHeight;
        startX = event.pageX - x;
        startY = event.pageY - y;
        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);
      }); */
      var section = elm.attr("page-element");
      
      elm.resizable({
        autoHide: true, 
        handles: "e,s,se"
      });
      elm.on('resizestop',function(event, ui){
        if (scope.callback) { scope.callback(); }
      });

      elm.draggable({
        containment: elm.parent().parent()
      });
      elm.on('dragstop', function(event, ui){
        var newtop = (ui.position.top / scope.previewPageHeight) * 100;
        var newleft = (ui.position.left / scope.previewPageWidth) * 100;
        if (isNaN(scope.$eval(attrs.index))) {
          var yfix = "scope.pagePreview.pagesetup." + section + ".settings.ypos = " + newtop;
          var xfix = "scope.pagePreview.pagesetup." + section + ".settings.xpos = " + newleft;
        } else {
          var index = scope.$eval(attrs.index);
          var yfix = "scope.pagePreview.pagesetup." + section + "[" + index + "]" + ".settings.ypos = " + newtop;
          var xfix = "scope.pagePreview.pagesetup." + section + "[" + index + "]" + ".settings.xpos = " + newleft;
        }
        eval(yfix);
        eval(xfix);
      });
      /*
      function mousemove(event) {
        y = event.pageY - startY;
        x = event.pageX - startX;
        elm.css({
          top: y + 'px',
          left:  x + 'px'
        });
        var ypos = (y / scope.previewPageHeight) * 100;
        var xpos = (x / scope.previewPageWidth) * 100;
        if (isNaN(scope.$eval(attrs.index))) {
          var yposstring = "scope.pagePreview.pagesetup."+section+".settings.ypos = ypos";
          var xposstring = "scope.pagePreview.pagesetup."+section+".settings.xpos = xpos"; 
        } else {
          var yposstring = "scope.pagePreview.pagesetup."+section+"["+index+"]"+".settings.ypos = ypos";
          var xposstring = "scope.pagePreview.pagesetup."+section+"["+index+"]"+".settings.xpos = xpos";
        }
        eval(yposstring);
        eval(xposstring);
      }

      function mouseup() {
        $document.off('mousemove', mousemove);
        $document.off('mouseup', mouseup);
      } */
    }
  }
}]);

app.directive('listSortable', function(){
  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {
      var options = scope.$eval(attrs.listSortable);
      elm.sortable(options);
    }
  }
});

app.directive('uiColorpicker', function() {
  return {
    restrict: 'E',
    require: 'ngModel',
    scope: false,
    replace: true,
    template: "<span><input class='input-small' /></span>",
    link: function(scope, element, attrs, ngModel) {
      var input = element.find('input');
      var options = angular.extend({
        color: ngModel.$viewValue,
        change: function(color) {
          scope.$apply(function() {
            ngModel.$setViewValue(color.toHexString());
          });
        }
      }, scope.$eval(attrs.options));
      
      ngModel.$render = function() {
        input.spectrum('set', ngModel.$viewValue || '');
      };
      
      input.spectrum(options);
    }
  };
});