require('angular');
require('angular-bootstrap');

(function(){
'use strict';

angular.module('ta.sessions.detail', [
  'ui.bootstrap',
  require('angular-ui-router')
])
.config(function($stateProvider) {
  console.log(arguments);


  // Now set up the states
  $stateProvider
    .state('sessionDetail', {
      url: "/session",
      templateUrl: "modules/sessions/detail/detail.tpl.html"
    });

});


})()

;
