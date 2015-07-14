require('angular');
require('angular-material');

require('../common/api');
require('../../../bower_components/angular-youtube-mb/src/angular-youtube-embed');

(function(){
	'use strict';

	angular
		.module('ta.home', [
		require('angular-ui-router'),
		'ngAnimate',
		'ngMaterial',
		'youtube-embed',
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
		self.showList = false;
		self.questions = [];
		self.videoUrl = "http://www.youtube.com/watch?v=DKXoyMTTu3I";

		Api.getAll().then(function(resp){
			self.showList = true;
			resp.models.forEach(function(el){
				self.questions.push(el.attributes);
			});

		});

		self.changeVideo = function(q) {
			self.videoPlayer.loadVideoById(q.videoId, q.timestamp, "hires");
		};

		this.playerVars = {
			controls: 1,
			autoplay: 1,
			playsinline: 1
		};

	}

})()

;