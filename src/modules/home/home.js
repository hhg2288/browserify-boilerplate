require('angular');
require('angular-material');

require('../common/api');

(function(){
	'use strict';

	angular
		.module('ta.home', [
		require('angular-ui-router'),
		'ngAnimate',
		'ngMaterial',
		'common.api'
		])

		.config(HomeConfig)
		.controller('HomeCtrl', HomeCtrl);


	//////////////////////////////////////


	function HomeConfig($stateProvider) {
		console.log("Home Config === ", arguments);

		// Now set up the states
		$stateProvider
		.state('home', {
			url: "/",
			templateUrl: "modules/home/home.tpl.html",
			controller: "HomeCtrl",
			controllerAs: 'home'
		});
	}

	function HomeCtrl(Api) {
		
		var self = this;
		self.questions = [];
		self.videoUrl = "https://www.youtube.com/watch?v=DKXoyMTTu3I";

		Api.getAll().then(function(resp){

			resp.models.forEach(function(el){
				self.questions.push(el.attributes);
			});

		});

		self.changeVideo = function(url) {
			console.log(url);
			self.videoUrl = url;
		};

		this.playerVars = {
			controls: 1,
			autoplay: 1
		};

	}

})()

;