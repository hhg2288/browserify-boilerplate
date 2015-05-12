require('angular');
require('angular-bootstrap');
require('./modules/sessions/detail');

(function(){
'use strict';

angular.module('ta', [
  'ui.bootstrap',
  require('angular-ui-router'),
  'ta.sessions.detail'
])
.config(function($stateProvider, $urlRouterProvider) {
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/session");
  
  // Now set up the states
  // $stateProvider
  //   .state('state1', {
  //     url: "/",
  //     templateUrl: "partials/beep.html"
  //   })
  //   .state('state1.list', {
  //     url: "/list",
  //     templateUrl: "partials/state1.list.html",
  //     controller: function($scope) {
  //       $scope.items = ["A", "List", "Of", "Items"];
  //     }
  //   });

});


})()

;
