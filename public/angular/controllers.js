'use strict';

/* Controllers */

var appCtrl = angular.module('app');

// Home Controller
appCtrl.controller('homeCtrl', ['$scope', '$rootScope', '$http',
  function($scope, $rootScope, $http) {
    $http.get('/proposal/list').success(function(res){
      $scope.proposals = res;
    }).error(function(){
      console.log("There was an error.");
    });
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
appCtrl.controller('newController', ['$scope','$rootScope','$http','$document','$window','$location',function($scope,$rootScope,$http,$document,$window,$location) {
  $scope.proposal = {
    owner: "BMS",
    proposalname: "",
    propinfo: []
  };

  /*$scope.genProposal = function() {
    var clientname = $scope.propInfo.clientname;
    $http.post('/genPDF',$scope.propInfo).success(function(res){
      $document.find("iframe").attr("src","pdf/" + clientname +".pdf");
    }).error(function() {
      alert('Error!');
    });
  };*/

  $scope.saveProposal = function() {
    /*var newProp = true;
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
    }*/
    $http.post('/proposal/save',$scope.proposal).success(function(res){
      $scope.saveConfirm = "Proposal Saved.";
      //$scope.loadProposal();
      setTimeout(function(){
        $scope.saveConfirm = "";
      }, 2000);
      console.log("success");
    }).error(function() {
      $scope.saveConfirm = "There was a problem. Please try again.";
      setTimeout(function(){
        $scope.saveConfirm = "";
      }, 2000);
      console.log("error");
    });
  };

  /*$scope.loadProposal = function(){
    $http.get('/proposalList').success(function(res){
      $scope.proposalList = res;
    }).error(function(){
      console.log("There was an error.");
    });
  };*/
}]);

// Proposal Controller
appCtrl.controller('proposalController', function($scope,$routeParams,$http) {
  
  $scope.phases = [];
  $scope.phase = {};
  $scope.gantt = [
    {
      name: 'row1', tasks: [
        {name: 'task1', from: '2013-10-07T09:00:00', to: '2013-10-07T10:00:00'},
        {name: 'task2', from: new Date(2013, 9, 18, 18, 0, 0), to: new Date(2013, 9, 18, 18, 0, 0)}
      ]
    },
    {
      name: 'row2', tasks: [
        {name: 'task3', from: '2013-10-07T09:00:00', to: '2013-10-07T10:00:00'},
        {name: 'task4', from: new Date(2013, 9, 18, 18, 0, 0), to: new Date(2013, 9, 18, 18, 0, 0)}
      ]
    }
  ];

  // Get the single proposal
  $http.post('/proposal/get',{"pid": $routeParams.pid}).success(function(res){
    $scope.proposal = res[0];
  }).error(function() {
    $scope.proposal = "There was a problem. Please try again.";
  });

  // Get List of Phases
  $scope.getPhases = function() {
    $http.get('/phase/list').success(function(res){
      $scope.phases = res;
    }).error(function(err){
      console.log(err);
    });
  }

  // Save New Phase
  $scope.savePhase = function() {
    console.log($scope.phase);
    $http.post('/phase/save',$scope.phase).success(function(res){
      $scope.phaseMessage = "Success!";
      $scope.getPhases();
    }).error(function(err){
      console.log(err);
    });
  }

  $scope.addPhase = function() {
    for (var i = 0; i < $scope.phases.length; i++) {
      if ($scope.chosenPhase == $scope.phases[i]._id) {
        var phase = $scope.phases[i];
      }
    }
    if (phase) {
      console.log($scope.proposal);
      phase.gantt = [{show: false},{show: false},{show: false},{show: false},{show: false},{show: false},{show: false},{show: false},{show: false},{show: false},{show: false},{show: false}];
      $scope.proposal.propinfo.push(phase);
      console.log(phase);
    }
  }

  $scope.generatePDF = function() {
    console.log($scope.proposal);
    $http.post('/proposal/generate',$scope.proposal).success(function(res){
      $scope.proposalMessage = "Success!";
    }).error(function(err){
      console.log(err);
    });
  }

  $scope.getPhases();

});