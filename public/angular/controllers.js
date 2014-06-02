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
appCtrl.controller('builderCtrl', ['$scope','$rootScope','$http','$window', function($scope,$rootScope,$http,$window) {
  $scope.pageTypes = [{
    typename: "Default",
    typeowner: "",
    background: {
      image: false,
      color: "#ffffff",
      source: ""
    },
    pagesetup: {
      header: {
        exists: true,
        settings: {
          image: false,
          color: "#888888",
          source: "",
          height: 8
        }
      },
      footer: {
        exists: true,
        settings: {
          image:false,
          color: "#888888",
          source: "",
          height: 8
        }
      },
      heading: [{
        exists: true,
        settings: {
          xpos: 10,
          ypos: 10,
          width: 80,
          size: 40,
          font: "Helvetica"
        }
      }],
      textbody: [{
        exists: true,
        settings: {
          xpos: 10,
          ypos: 15,
          width: 40,
          size: 14,
          font: "Helvetica"
        }
      }],
      imagearea: [{
        exists: false,
        settings: {}
      }],
      etc: []
    }
  }];
  $scope.addNewPageType = function() {
    $scope.pageTypes.push({
      typename: "New Page Type",
      typeowner: "",
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
    });
  };
  $scope.generatePreview = function(index) {
    if ($scope.currentPreview != null) {
      
    } else {
      var confirm = $window.confirm("Page not yet saved. Please press CANCEL and save so changes will not be lost.");
      if (confirm == false) {
        return;
      }
    }
    var pagetypeinfo = $scope.pageTypes[index];
    $scope.pagePreview = $scope.pageTypes[index];
    $scope.currentPreview = index;
  };
  $scope.pagePreview = {
    typename: "New Page Type",
    typeowner: "",
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
  $scope.toggleHeader = function() {
    $scope.pagePreview.pagesetup.header.exists = !$scope.pagePreview.pagesetup.header.exists;
  };
  $scope.toggleFooter = function() {
    $scope.pagePreview.pagesetup.footer.exists = !$scope.pagePreview.pagesetup.footer.exists;
  };
  $scope.addHeading = function() {
    $scope.pagePreview.pagesetup.heading.push({
      exists: true,
      settings: {
        xpos: 10,
        ypos: 30,
        width: 80,
        size: 40,
        font: "Helvetica"
      }
    });
  };
  $scope.addText = function() {
    $scope.pagePreview.pagesetup.textbody.push({
      exists: true,
      settings: {
        xpos: 10,
        ypos: 30,
        width: 80,
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
      settings: {
        xpos: 20,
        ypos: 20,
        width: 60,
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
  $scope.windowResize();
  angular.element($window).bind('resize',function(){
    $scope.windowResize();
    $scope.$apply();
  });
}]);

// CREATE CONTROLLER
appCtrl.controller('createController', ['$scope','$rootScope','$http','$document','$window',function($scope,$rootScope,$http,$document,$window) {
  $scope.containerHeight = $window.innerHeight-230;
  $scope.previewHeight = $window.innerHeight-30;
  $scope.username = $rootScope.user;
  $scope.selectedPage = 0;
  $scope.selectPage = function(index) {
    $scope.selectedPage = index;
  };
  $scope.addPage = function(index) {
    $scope.propInfo.pages.splice(index+1,0,"hello");
  };
  $scope.deletePage = function(index) {
    $scope.propInfo.pages.splice(parseInt(index),1);
  };
  $scope.deletePackage = function(parentindex,index) {
    $scope.propInfo.pages[parentindex].pagetext.splice(index,1);
  };
  $scope.addPackage = function(index) {
    $scope.propInfo.pages[index].pagetext.push({
      pname: "Branding Package",
      pservice: [{text:"Logo"},{text:"Branding Guide"},{text:"Letterhead"},{text:"Business Card Templates"}],
      psub: "$5,000.00",
      ptime: "1 Month"
    });
  };
  $scope.addSubservice = function(parentindex,index) {
    $scope.propInfo.pages[parentindex].pagetext[index].pservice.push({text:""});
  };
  $scope.deleteSubservice = function(parentparentindex,parentindex,index) {
    $scope.propInfo.pages[parentparentindex].pagetext[parentindex].pservice.splice(index,1);
  };
  $scope.addTitleText = function() {
    $scope.propInfo.pages.splice($scope.selectedPage+1,0,{
      pageicons: false,
      pageimage: false,
      pagelist: false,
      pagesub: false,
      pagetext: "",
      pagetitle: "Page Title",
      pagetype: "titletext"
    });
    $scope.selectedPage += 1;
  };
  $scope.addTitleSubText = function() {
    $scope.propInfo.pages.splice($scope.selectedPage+1,0,{
      pageicons: false,pageimage: false,pagelist: false,pagesub: "Page Subtitle",pagetext: "",pagetitle: "Page Title",pagetype: "titlesubtext"
    });
  };
  $scope.addTitleTextSubList = function() {
    $scope.propInfo.pages.splice($scope.selectedPage+1,0,{
      pageicons: false,pageimage: false,pagelist: [{text:""},{text:""},{text:""}],pagesub: "Page Subtitle",pagetext: "",pagetitle: "Page Title",pagetype: "titletextsublist"
    });
  };
  $scope.addIconsTitleSubText = function() {
    $scope.propInfo.pages.splice($scope.selectedPage+1,0,{
      pageicons: ["servicepage-bd.png","servicepage-branding.png","servicepage-planning.png","servicepage-marketing.png","servicepage-webdev.png"],pageimage: false,pagelist: false,pagesub: "Page Subtitle",pagetext: "",pagetitle: "Page Title",pagetype: "iconstitlesubtext"
    });
  };
  $scope.addIconsTitleSubText = function() {
    $scope.propInfo.pages.splice($scope.selectedPage+1,0,{
      pageicons: ["servicepage-bd.png","servicepage-branding.png","servicepage-planning.png","servicepage-marketing.png","servicepage-webdev.png"],pageimage: false,pagelist: false,pagesub: "Page Subtitle",pagetext: "",pagetitle: "Page Title",pagetype: "iconstitlesubtext"
    });
  };
  $scope.addIconsTitleSubText = function() {
    $scope.propInfo.pages.splice($scope.selectedPage+1,0,{
      pageicons: ["servicepage-bd.png","servicepage-webdev.png"],pageimage: false,pagelist: [{text:""},{text:""},{text:""}],pagesub: "Page Subtitle",pagetext: "",pagetitle: "Page Title",pagetype: "iconstitlesubtextlist"
    });
  };
  $scope.addTablepage = function() {
    $scope.propInfo.pages.splice($scope.selectedPage+1,0,{
      pageicons: false,pageimage: false,pagelist: false,pagesub: "0",pagetext: [{pname: "Branding Package",pservice: [{text:"Logo"},{text:"Branding Guide"},{text:"Letterhead"},{text:"Business Card Templates"}],psub: "$5,000.00",ptime: "1 Month"}],pagetitle: false,pagetype: "tablepage"
    });
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
      owner: $rootScope.user,
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

  $scope.sortableConfig = {containment: "parent"};

  $scope.proposalList = [];
  $scope.loadProposal();
  $scope.showFind = false;
  $scope.wordFind = "";
  $scope.wordReplace = "";
  $scope.changeShowFind = function(){
    $scope.showFind = !$scope.showFind;
  };

  $scope.propInfo = {
    clientname: "clientname",
    pages: [
    {
      pageicons: false,
      pageimage: false,
      pagelist: false,
      pagesub: false,
      pagetext: false,
      pagetitle: false,
      pagetype: "coverpage"
    },{
      pageicons: false,
      pageimage: "",
      pagelist: false,
      pagesub: false,
      pagetext: "200",
      pagetitle: "#ffffff",
      pagetype: "sectiontwocover"
    },{
      pageicons: false,
      pageimage: false,
      pagelist: false,
      pagesub: false,
      pagetext: "",
      pagetitle: "A. Company Overview",
      pagetype: "titletext"
    },{
      pageicons: false,
      pageimage: false,
      pagelist: [{text:"1"},{text:"2"},{text:"3"}],
      pagesub: "BMS Proposes to supply the following:",
      pagetext: "",
      pagetitle: "B. Our offer to Company Name Here",
      pagetype: "titletextsublist"
    },{
      pageicons: false,
      pageimage: false,
      pagelist: [{text:"1"},{text:"2"},{text:"3"}],
      pagesub: "BMS anticipates the following:",
      pagetext: "",
      pagetitle: "B. Desired Outcome",
      pagetype: "titletextsublist"
    },{
      pageicons: false,
      pageimage: false,
      pagelist: false,
      pagesub: false,
      pagetext: false,
      pagetitle: false,
      pagetype: "sectionthreecover"
    },{
      pageicons: false,
      pageimage: false,
      pagelist: false,
      pagesub: "Our Multidisciplinary Approach",
      pagetext: "",
      pagetitle: "Unique Value Proposition",
      pagetype: "titlesubtext"
    },{
      pageicons: ["servicepage-bd.png","servicepage-branding.png","servicepage-planning.png","servicepage-marketing.png","servicepage-webdev.png"],
      pageimage: false,
      pagelist: false,
      pagesub: "Our Multidisciplinary Approach",
      pagetext: "",
      pagetitle: "Scope of Work",
      pagetype: "iconstitlesubtext"
    },{
      pageicons: ["servicepage-planning.png","servicepage-marketing.png"],
      pageimage: false,
      pagelist: [{text:"1"},{text:"2"},{text:"3"}],
      pagesub: "I. Discovery & Strategic Direction",
      pagetext: "",
      pagetitle: "Scope of Work",
      pagetype: "iconstitlesubtextlist"
    },{
      pageicons: ["servicepage-planning.png","servicepage-marketing.png","servicepage-webdev.png"],
      pageimage: false,
      pagelist: [{text:"1"},{text:"2"},{text:"3"}],
      pagesub: "II. Website Strategy",
      pagetext: "",
      pagetitle: "Scope of Work",
      pagetype: "iconstitlesubtextlist"
    },{
      pageicons: ["servicepage-branding.png","servicepage-webdev.png"],
      pageimage: false,
      pagelist: [{text:"1"},{text:"2"},{text:"3"}],
      pagesub: "III. Design & Creative",
      pagetext: "",
      pagetitle: "Scope of Work",
      pagetype: "iconstitlesubtextlist"
    },{
      pageicons: ["servicepage-bd.png","servicepage-marketing.png","servicepage-webdev.png"],
      pageimage: false,
      pagelist: false,
      pagesub: "IV. Website Copywriting & Search Engine Optimization",
      pagetext: "",
      pagetitle: "Scope of Work",
      pagetype: "iconstitlesubtext"
    },{
      pageicons: ["servicepage-webdev.png"],
      pageimage: false,
      pagelist: [{text:"1"},{text:"2"},{text:"3"}],
      pagesub: "V. Website Development",
      pagetext: "",
      pagetitle: "Scope of Work",
      pagetype: "iconstitlesubtextlist"
    },{
      pageicons: ["servicepage-marketing.png","servicepage-webdev.png"],
      pageimage: false,
      pagelist: [{text:"1"},{text:"2"},{text:"3"}],
      pagesub: "VI. Analytics",
      pagetext: "",
      pagetitle: "Scope of Work",
      pagetype: "iconstitlesubtextlist"
    },{
      pageicons: ["servicepage-planning.png","servicepage-webdev.png"],
      pageimage: false,
      pagelist: [{text:"1"},{text:"2"},{text:"3"}],
      pagesub: "VII. Testing, Quality Control, and delivery",
      pagetext: "",
      pagetitle: "Scope of Work",
      pagetype: "iconstitlesubtextlist"
    },{
      pageicons: ["servicepage-planning.png"],
      pageimage: false,
      pagelist: [{text:"1"},{text:"2"},{text:"3"}],
      pagesub: "VIII. Project Management",
      pagetext: "",
      pagetitle: "Scope of Work",
      pagetype: "iconstitlesubtextlist"
    },{
      pageicons: ["servicepage-bd.png","servicepage-webdev.png"],
      pageimage: false,
      pagelist: [{text:"1"},{text:"2"},{text:"3"}],
      pagesub: "IX. Training",
      pagetext: "",
      pagetitle: "Scope of Work",
      pagetype: "iconstitlesubtextlist"
    },{
      pageicons: ["servicepage-bd.png"],
      pageimage: false,
      pagelist: [{text:"1"},{text:"2"},{text:"3"}],
      pagesub: "",
      pagetext: "",
      pagetitle: "Roles and Responsibility",
      pagetype: "iconstitlesubtextlist"
    },{
      pageicons: false,
      pageimage: "",
      pagelist: false,
      pagesub: false,
      pagetext: false,
      pagetitle: false,
      pagetype: "subwaypage"
    },{
      pageicons: false,
      pageimage: false,
      pagelist: false,
      pagesub: "0",
      pagetext: [{
        pname: "Branding Package",
        pservice: [{text:"Logo"},{text:"Branding Guide"},{text:"Letterhead"},{text:"Business Card Templates"}],
        psub: "$5,000.00",
        ptime: "1 Month"
      }],
      pagetitle: false,
      pagetype: "tablepage"
    },{
      pageicons: ["servicepage-bd.png","servicepage-branding.png","servicepage-planning.png","servicepage-marketing.png","servicepage-webdev.png"],
      pageimage: false,
      pagelist: false,
      pagesub: "Our Multidisciplinary Approach",
      pagetext: "",
      pagetitle: "Additional Services",
      pagetype: "iconstitlesubtext"
    },{
      pageicons: false,
      pageimage: false,
      pagelist: false,
      pagesub: false,
      pagetext: false,
      pagetitle: false,
      pagetype: "thedisciplines"
    },{
      pageicons: false,
      pageimage: false,
      pagelist: false,
      pagesub: false,
      pagetext: false,
      pagetitle: false,
      pagetype: "worksamples"
    },{
      pageicons: false,
      pageimage: false,
      pagelist: false,
      pagesub: false,
      pagetext: false,
      pagetitle: false,
      pagetype: "theteam"
    },{
      pageicons: false,
      pageimage: false,
      pagelist: false,
      pagesub: false,
      pagetext: false,
      pagetitle: false,
      pagetype: "backcoverpage"
    }
    ]
  };

  $scope.genProposal();
}]);

// Menu Controller
appCtrl.controller('menuController', function($scope) {
  $scope.menu = [
  {
    menuname: "Home",
    menulocation: "/"
  },
  {
    menuname: "Login",
    menulocation: "/#/login"
  }
  ];
});