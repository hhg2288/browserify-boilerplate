require('angular');
require('angular-material');

(function(){
	'use strict';

	angular
		.module('ta.home', [
		require('angular-ui-router'),
		'ngAnimate',
		'ngMaterial'
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

	function HomeCtrl() {

		var vm = this;
		vm.videoUrl = "https://www.youtube.com/watch?v=DKXoyMTTu3I";

		vm.questions = [
			{
				"question": "Which industries will see the most disruption 10 years from now?",
				"url": "https://www.youtube.com/watch?v=M8Cmgs5kPpA&t=1m33s"
			},
			{
				"question": "How does you stay in the moment, actively listen, and focus, when there are so many different things on his mind all the time?",
				"url": "https://www.youtube.com/watch?v=M8Cmgs5kPpA&t=4m29s"
			},
			{
				"question": "Do you think recent changes in Fantasy Sports will further change how people consume sports and how sports are marketed to consumers? Will the future hold less loyalty to specific teams, and more loyalty to individual players? ",
				"url": "https://www.youtube.com/watch?v=M8Cmgs5kPpA&t=8m22s"
			},
			{
				"question": "Do you have any suggestions for moving fast when an external partner doesn't share your same bias for action? ",
				"url": "https://www.youtube.com/watch?v=M8Cmgs5kPpA&t=12m08s"
			},
			{
				"question": "What do you think about the phrase, 'Any press is good press'?",
				"url": "https://www.youtube.com/watch?v=M8Cmgs5kPpA&t=15m08s"
			},
			{
				"question": "What was your first screen name?",
				"url": "https://www.youtube.com/watch?v=M8Cmgs5kPpA&t=17m01s"
			},
			{
				"question": "Which industries will see the most disruption 10 years from now?",
				"url": "https://www.youtube.com/watch?v=M8Cmgs5kPpA&t=1m33s"
			},
			{
				"question": "How does you stay in the moment, actively listen, and focus, when there are so many different things on his mind all the time?",
				"url": "https://www.youtube.com/watch?v=M8Cmgs5kPpA&t=4m29s"
			},
			{
				"question": "Do you think recent changes in Fantasy Sports will further change how people consume sports and how sports are marketed to consumers? Will the future hold less loyalty to specific teams, and more loyalty to individual players? ",
				"url": "https://www.youtube.com/watch?v=M8Cmgs5kPpA&t=8m22s"
			},
			{
				"question": "Do you have any suggestions for moving fast when an external partner doesn't share your same bias for action? ",
				"url": "https://www.youtube.com/watch?v=M8Cmgs5kPpA&t=12m08s"
			},
			{
				"question": "What do you think about the phrase, 'Any press is good press'?",
				"url": "https://www.youtube.com/watch?v=M8Cmgs5kPpA&t=15m08s"
			},
			{
				"question": "What was your first screen name?",
				"url": "https://www.youtube.com/watch?v=M8Cmgs5kPpA&t=17m01s"
			},
			{
				"question": "Which industries will see the most disruption 10 years from now?",
				"url": "https://www.youtube.com/watch?v=M8Cmgs5kPpA&t=1m33s"
			},
			{
				"question": "How does you stay in the moment, actively listen, and focus, when there are so many different things on his mind all the time?",
				"url": "https://www.youtube.com/watch?v=M8Cmgs5kPpA&t=4m29s"
			},
			{
				"question": "Do you think recent changes in Fantasy Sports will further change how people consume sports and how sports are marketed to consumers? Will the future hold less loyalty to specific teams, and more loyalty to individual players? ",
				"url": "https://www.youtube.com/watch?v=M8Cmgs5kPpA&t=8m22s"
			},
			{
				"question": "Do you have any suggestions for moving fast when an external partner doesn't share your same bias for action? ",
				"url": "https://www.youtube.com/watch?v=M8Cmgs5kPpA&t=12m08s"
			},
			{
				"question": "What do you think about the phrase, 'Any press is good press'?",
				"url": "https://www.youtube.com/watch?v=M8Cmgs5kPpA&t=15m08s"
			},
			{
				"question": "What was your first screen name?",
				"url": "https://www.youtube.com/watch?v=M8Cmgs5kPpA&t=17m01s"
			},
			{
				"question": "Which industries will see the most disruption 10 years from now?",
				"url": "https://www.youtube.com/watch?v=M8Cmgs5kPpA&t=1m33s"
			},
			{
				"question": "How does you stay in the moment, actively listen, and focus, when there are so many different things on his mind all the time?",
				"url": "https://www.youtube.com/watch?v=M8Cmgs5kPpA&t=4m29s"
			},
			{
				"question": "Do you think recent changes in Fantasy Sports will further change how people consume sports and how sports are marketed to consumers? Will the future hold less loyalty to specific teams, and more loyalty to individual players? ",
				"url": "https://www.youtube.com/watch?v=M8Cmgs5kPpA&t=8m22s"
			},
			{
				"question": "Do you have any suggestions for moving fast when an external partner doesn't share your same bias for action? ",
				"url": "https://www.youtube.com/watch?v=M8Cmgs5kPpA&t=12m08s"
			},
			{
				"question": "What do you think about the phrase, 'Any press is good press'?",
				"url": "https://www.youtube.com/watch?v=M8Cmgs5kPpA&t=15m08s"
			},
			{
				"question": "What was your first screen name?",
				"url": "https://www.youtube.com/watch?v=M8Cmgs5kPpA&t=17m01s"
			},
			{
				"question": "Which industries will see the most disruption 10 years from now?",
				"url": "https://www.youtube.com/watch?v=M8Cmgs5kPpA&t=1m33s"
			},
			{
				"question": "How does you stay in the moment, actively listen, and focus, when there are so many different things on his mind all the time?",
				"url": "https://www.youtube.com/watch?v=M8Cmgs5kPpA&t=4m29s"
			},
			{
				"question": "Do you think recent changes in Fantasy Sports will further change how people consume sports and how sports are marketed to consumers? Will the future hold less loyalty to specific teams, and more loyalty to individual players? ",
				"url": "https://www.youtube.com/watch?v=M8Cmgs5kPpA&t=8m22s"
			},
			{
				"question": "Do you have any suggestions for moving fast when an external partner doesn't share your same bias for action? ",
				"url": "https://www.youtube.com/watch?v=M8Cmgs5kPpA&t=12m08s"
			},
			{
				"question": "What do you think about the phrase, 'Any press is good press'?",
				"url": "https://www.youtube.com/watch?v=M8Cmgs5kPpA&t=15m08s"
			},
			{
				"question": "What was your first screen name?",
				"url": "https://www.youtube.com/watch?v=M8Cmgs5kPpA&t=17m01s"
			}
		];

		vm.changeVideo = function(url) {
			vm.videoUrl = url;
		};

		this.playerVars = {
			controls: 0,
			autoplay: 0
		};

	}

})()

;