require('angular');
require('angular-material');
require('../bower_components/angular-youtube-mb/src/angular-youtube-embed');

require('./modules/home/home');

(function(){
'use strict';

angular.module('ag', [
  require('angular-ui-router'),
	'ngMaterial',
	'youtube-embed',
	'ta.home'
])
.config(function($stateProvider, $urlRouterProvider, $mdThemingProvider) {
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");

	$mdThemingProvider.theme('default')
		.primaryPalette('blue-grey');

});


})()

;
