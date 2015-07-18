require('angular');
require('angular-material');
require('../bower_components/angular-youtube-mb/src/angular-youtube-embed');

require('./modules/common/api');
require('./modules/home/home');
require('./modules/tweets/tweets');
require('./modules/login/login');

(function(){
'use strict';

angular.module('ag', [
  require('angular-ui-router'),
	'ngMaterial',
	'youtube-embed',
	'ta.home',
	'ta.tweets',
	'ta.login',
	'common.api'
])
.config(function($stateProvider, $urlRouterProvider, $mdThemingProvider) {

	Parse.initialize("hAgbhHCW5YKXe4OXvaAWnbU0m8Q0ckaNKOcE0FIN", "vrVvrTu0IB5Obj7DXzuffmxwojsD1Grr0vb5Wxbg");


	// For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");

	$mdThemingProvider.theme('default')
		.primaryPalette('deep-orange');

});


})()

;
