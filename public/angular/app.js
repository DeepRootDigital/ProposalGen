'use strict';


// Declare app level module which depends on filters, and services
angular.module('app', [
  'ngRoute',
  'ngAnimate',
  'ui.sortable']).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
  	templateUrl: 'partials/frontpage.html', 
  	controller: 'homeCtrl'
  });
  $routeProvider.when('/proposals/new', {
  	templateUrl: 'partials/new_proposal.html', 
  	controller: 'newController'
  });
  $routeProvider.when('/proposals/:pid', {
    templateUrl: 'partials/single_proposal.html',
    controller: 'proposalController'
  });
  $routeProvider.when('/pagebuilder',{
    templateUrl: 'partials/pagemaker.html',
    controller: 'builderCtrl'
  });
  $routeProvider.otherwise({redirectTo: '/'});
}]).run([
function () {
}]);