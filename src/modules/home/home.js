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
			controllerAs: 'home',
			bindToController: true
		});
	}

	function HomeCtrl(Api) {
		
		var self = this;
		self.questions = [];
		self.videoUrl = "http://www.youtube.com/watch?v=DKXoyMTTu3I";

		self.showList = false;
		self.idSelectedItem = null;

		self.showLoadMore = true;
		self.label = "LOAD MORE";

		self.page = 0;
		self.pagesCount = 0;
		self.perpage = 50;

		self.playerVars = {
			controls: 1,
			autoplay: 1,
			playsinline: 1
		};

		self.loadMore = function() {
			self.label = "loading...";
			self.page++;
			fetch();
		};

		self.changeVideo = function(q) {
			self.idSelectedItem = q.id;
			self.videoPlayer.loadVideoById(q.attributes.videoId, q.attributes.timestamp, "hires");
		};

		Api.fetchQuestionsCount().then(function(count){
			self.count = count;
			self.pagesCount = Math.ceil(count / self.perpage);
			if (self.perpage >= count) {
				self.showLoadMore = false;
			}
			fetch();
		});

		function fetch() {
			if (self.page >= self.pagesCount) {
				self.showLoadMore = false;
			} else {
				return Api.getQuestions(self.page, self.perpage).then(function(resp) {
					self.label = "LOAD MORE";
					self.showList = true;

					resp.forEach(function(el){
						self.questions.push(el);
					});
				});
			}
		}
	}

})()

;