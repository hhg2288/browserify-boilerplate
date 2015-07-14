require('angular');
require('angular-material');

require('../common/api');

(function(){
	'use strict';

	angular
		.module('ta.tweets', [
		require('angular-ui-router'),
		'ngAnimate',
		'ngMaterial',
		'common.api'
		])

		.config(TweetsConfig)
		.controller('TweetsCtrl', TweetsCtrl);


	//////////////////////////////////////


	function TweetsConfig($stateProvider) {
		console.log("Tweets Config === ", arguments);

		// Now set up the states
		$stateProvider
		.state('tweets', {
			url: "/tweets",
			templateUrl: "modules/tweets/tweets.tpl.html",
			controller: "TweetsCtrl",
			controllerAs: 'tweets'
		});
	}

	function TweetsCtrl(Api) {
		
		var self = this;
		self.data = [];

		Api.getTweets().then(function(resp){
			console.log(resp.models.length);
			resp.models.forEach(function(el){
				self.data.push(el.attributes);
			});

		});
	}

})()

;