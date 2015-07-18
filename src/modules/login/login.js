require('angular');
require('angular-material');

require('../common/api');

(function(){
	'use strict';

	angular
	.module('ta.login', [
		require('angular-ui-router'),
		'ngAnimate',
		'ngMaterial',
		'common.api'
	])

	.config(LoginConfig)
	.controller('LoginCtrl', LoginCtrl);


	//////////////////////////////////////


	function LoginConfig($stateProvider) {
		console.log("Login Config === ", arguments);

		// Now set up the states
		$stateProvider
		.state('login', {
			url: "/login",
			templateUrl: "modules/login/login.tpl.html",
			controller: "LoginCtrl",
			controllerAs: 'login'
		});
	}

	function LoginCtrl(Api, $state) {

		var self = this;
		self.$state = $state;

		self.login = function() {

			Parse.User.logIn(self.username, self.password, {
				success: function(user) {
					self.$state.go('tweets');
				},
				error: function(user, error) {
				}
			});

		};
	}

})()

;