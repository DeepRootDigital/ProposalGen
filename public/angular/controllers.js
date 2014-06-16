'use strict';

/* Controllers */

var appCtrl = angular.module('app');

// Home Controller
appCtrl.controller('homeCtrl', ['$scope', '$rootScope', '$http',
  function($scope, $rootScope, $http) {
    $scope.messages = {};

    function loadMessages() {
      $http.get('/api/secured/message').success(function(data) {
        $scope.messages.secured = data.message || data.error;
      });

      $http.get('/api/message').success(function(data) {
        $scope.messages.unsecured = data.message || data.error;
      });
    }

    var deregistration = $rootScope.$on('session-changed', loadMessages);
    $scope.$on('$destroy', deregistration);

    loadMessages();

  }]);

// LOGIN CONTROLLER

appCtrl.controller('loginCtrl', ['$scope','$http',function($scope,$http) {
  $scope.userInfo = {};
}]);

// REGISTRATION CONTROLLER
appCtrl.controller('registrationCtrl', ['$scope','$http', function($scope,$http) {
  $scope.userInfo = {};
}]);

// BUILDER CONTROLLER
appCtrl.controller('builderCtrl', ['$scope','$rootScope','$http','$window','$location', function($scope,$rootScope,$http,$window,$location) {

  // Setting up Variables
  // Array of pages
  $scope.pageTypes = [];
  // Set the user
  $scope.username = $rootScope.email;
  // Set the default preview on load
  $scope.pagePreview = {
    typename: "New Page Type",
    typeowner: $scope.username,
    background: {
      image: false,
      color: "#ffffff",
      source: ""
    },
    pagesetup: {
      header: {
        exists: false,
        settings: {
          image: false,
          color: "String",
          source: "",
          height: 10
        }
      },
      footer: {
        exists: false,
        settings: {
          image: false,
          color: "String",
          source: "",
          height: 10
        }
      },
      heading: [],
      textbody: [],
      imagearea: [],
      etc: []
    }
  };

  $scope.loadPageTypes = function() {
    $http.get('/proposalpage').success(function(res){
      $scope.pageTypes = res;
    }).error(function(){
      console.log("There was an error.");
    });
  };

  $scope.addNewPageType = function() {
    var confirm = $window.confirm("Page not yet saved. Please press CANCEL and save so changes will not be lost.");
    if (confirm == false) {
      return;
    }
    $scope.pagePreview = {
      typename: "New Page Type",
      typeowner: $scope.username,
      background: {
        image: false,
        color: "#ffffff",
        source: ""
      },
      pagesetup: {
        header: {
          exists: false,
          settings: {
            image: false,
            color: "String",
            source: "",
            height: 10
          }
        },
        footer: {
          exists: false,
          settings: {
            image: false,
            color: "String",
            source: "",
            height: 10
          }
        },
        heading: [],
        textbody: [],
        imagearea: [],
        etc: []
      }
    };
  };

  $scope.generatePreview = function(index) {
    var confirm = $window.confirm("Page not yet saved. Please press CANCEL and save so changes will not be lost.");
    if (confirm == false) {
      return;
    }
    var pagetypeinfo = $scope.pageTypes[index];
    $scope.pagePreview = $scope.pageTypes[index];
    $scope.currentPreview = index;
  };

  
  $scope.toggleHeader = function() {
    $scope.pagePreview.pagesetup.header.exists = !$scope.pagePreview.pagesetup.header.exists;
  };
  $scope.toggleFooter = function() {
    $scope.pagePreview.pagesetup.footer.exists = !$scope.pagePreview.pagesetup.footer.exists;
  };
  $scope.addHeading = function() {
    $scope.pagePreview.pagesetup.heading.push({
      exists: true,
      content: "",
      settings: {
        xpos: 10,
        ypos: 30,
        width: 80,
        height: 10,
        size: 40,
        font: "Helvetica"
      }
    });
  };
  $scope.addText = function() {
    $scope.pagePreview.pagesetup.textbody.push({
      exists: true,
      content: "",
      settings: {
        xpos: 10,
        ypos: 30,
        width: 80,
        height: 10,
        size: 14,
        font: "Helvetica"
      }
    });
  };
  $scope.addImage = function() {
    $scope.pagePreview.pagesetup.imagearea.push({
      exists: true,
      settings: {
        xpos: 10,
        ypos: 30,
        width: 40,
        height: 10,
        defaultimage: ""
      }
    });
  };
  $scope.addBox = function() {
    $scope.pagePreview.pagesetup.etc.push({
      exists: true,
      assettype: "box",
      settings: {
        xpos: 10,
        ypos: 15,
        width: 10,
        height: 10,
        opacity: 1,
        background: {
          image: false,
          color: "#343533",
          source: "String"
        }
      }
    });
  };
  $scope.addTable = function() {
    $scope.pagePreview.pagesetup.etc.push({
      exists: true,
      assettype: "table",
      content: "",
      settings: {
        xpos: 20,
        ypos: 20,
        width: 60,
        height: 10,
        columns: 3,
        background: {
          image: false,
          color: "#343533",
          source: "String"
        }
      }
    });
  };
  $scope.currentPreview = null;
  $scope.windowResize = function(){
    var width = $window.innerWidth;
    $scope.previewPageWidth = width * .6;
    $scope.previewPageHeight = width * 0.46329113923;
    $scope.previewPageMT = ($window.innerHeight - (width * 0.46329113923))/2;
    $scope.previewPageML = 0.075 * width;
    $scope.containerHeight = $window.innerHeight - 120;
  };
  
  $scope.savePage = function() {
    var confirm = $window.confirm("Are you sure you want to save? Make sure your name is unique or it will overwrite similarly named pages.");
    if (confirm == false) {
      return;
    }
    $http.post('/proposalpage',$scope.pagePreview).success(function(res){
      $scope.loadPageTypes();
      $scope.$apply();
    }).error(function() {
      alert('Error!');
    });
  };

  if (!$rootScope.email) {
    // $location.url('/')
  } else {
    $scope.loadPageTypes();
    $scope.windowResize();
    angular.element($window).bind('resize',function(){
      $scope.windowResize();
      $scope.$apply();
    });
  }
}]);

// CREATE CONTROLLER
appCtrl.controller('createController', ['$scope','$rootScope','$http','$document','$window','$location',function($scope,$rootScope,$http,$document,$window,$location) {

  $scope.sortableConfig = {containment: "parent"};
  $scope.proposalList = [];
  $scope.pageTypes = [];
  $scope.showFind = false;
  $scope.wordFind = "";
  $scope.wordReplace = "";
  $scope.changeShowFind = function(){
    $scope.showFind = !$scope.showFind;
  };
  $scope.propInfo = {
    clientname: "clientname",
    pages: []
  };
  $scope.containerHeight = $window.innerHeight-230;
  $scope.previewHeight = $window.innerHeight-30;
  $scope.username = $rootScope.user;
  $scope.useremail = $rootScope.email;
  $scope.selectedPage = 0;
  $scope.selectedPageType = 0;

  $scope.loadPageTypes = function() {
    $http.get('/proposalpage').success(function(res){
      $scope.pageTypes = res;
    }).error(function(){
      console.log("There was an error.");
    });
  };
  $scope.selectPage = function(index) {
    $scope.selectedPage = index;
  };
  $scope.addPage = function() {
    var selectedPage = angular.copy($scope.pageTypes[$scope.selectedPageType]);
    $scope.propInfo.pages.splice($scope.selectedPage+1,0,selectedPage);
  };
  $scope.deletePage = function(index) {
    $scope.propInfo.pages.splice(parseInt(index),1);
  };
  $scope.deleteRow = function(parentindex,index) { 
  };
  $scope.addRow = function(index) {
    console.log("meow");
  };

  $scope.genProposal = function() {
    var clientname = $scope.propInfo.clientname;
    $http.post('/genPDF',$scope.propInfo).success(function(res){
      $document.find("iframe").attr("src","pdf/" + clientname +".pdf");
    }).error(function() {
      alert('Error!');
    });
  };

  $scope.saveProposal = function() {
    var newProp = true;
    $scope.proposalList.forEach(function(element,index,array) {
      if (element.proposalname == $scope.propSaveName) {
        newProp = false;
      }
    });
    if (newProp == false) {
      var confirm = $window.confirm("This proposal name is already taken, would you like to overwrite it?");
      if (confirm == false) {
        return;
      }
    }
    var propInfo = {
      owner: $scope.useremail,
      proposalname: $scope.propSaveName,
      propinfo: $scope.propInfo
    };
    $http.post('/saveProposal',propInfo).success(function(res){
      $scope.saveConfirm = "Proposal Saved.";
      $scope.loadProposal();
      setTimeout(function(){
        $scope.saveConfirm = "";
      }, 2000);
    }).error(function() {
      $scope.saveConfirm = "There was a problem. Please try again.";
      setTimeout(function(){
        $scope.saveConfirm = "";
      }, 2000);
    });
  };

  $scope.loadProposal = function(){
    $http.get('/proposalList').success(function(res){
      $scope.proposalList = res;
    }).error(function(){
      console.log("There was an error.");
    });
  };

  $scope.loadinProposal = function(){
    var confirm = $window.confirm("Loading this proposal will overwrite any changes you might have made. Please press Cancel and save your changes or press OK to continue.");
    if (confirm == false) {
      return;
    }
    $http.post('/proposalLoad',{chosen: $scope.chosenProposal}).success(function(res){
      $scope.propInfo = res[0].propinfo;
    }).error(function(){
      console.log("There was an error.");
    });
  };

  $scope.replaceAll = function() {
    var found = $scope.wordFind;
    var replace = $scope.wordReplace;
    var stringified = JSON.stringify($scope.propInfo);
    stringified = stringified.replace(found,replace);
    $scope.propInfo = JSON.parse(stringified);
  };

  $scope.dropzoneConfig = {
    'options': { // passed into the Dropzone constructor
      url: '/uploadImage',
      init: function() {
        this.on("success", function(file) { 
          var bucket = new AWS.S3({params: {Bucket: 'proposalgen'}});
          if (file) {
            var params = {Key: file.name, ContentType: file.type, Body: file};
            bucket.putObject(params, function(err,data){
              if (err) {
                console.log(err);
              } else {
                console.log(data);
              }
            });
          }
          $scope.propInfo.pages[1].pageimage = file.name;
          var leftspot = 400 - (parseInt(file.width) / 2);
          if (leftspot < 192) {
            leftspot = 192;
          }
          $scope.propInfo.pages[1].pagetext = String(leftspot);
        });
      }
    }
  };

  if (!$rootScope.email) {
    // $location.url('/');
  } else {
    $scope.loadPageTypes();
  }
}]);

// Menu Controller
appCtrl.controller('hubController', function($scope) {
  $scope.pages = [
  {
    name: "Create Proposal",
    url: "/#/create"
  },{
    name: "Edit Page Templates",
    url: "/#/pagebuilder"
  }
  ];
});