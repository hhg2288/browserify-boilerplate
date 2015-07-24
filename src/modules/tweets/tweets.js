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
			controllerAs: 'tweets',
			resolve: {
				Current: function() {
					return Parse.User.current();
				}
			}
		});
	}

	function TweetsCtrl(Api, Current, $state) {

		var self = this;
		self.data = [];

		self.showLoadMore = true;
		self.label = "LOAD MORE";
		self.selectedItem = null;
		self.showList = false;

		self.page = 0;
		self.pagesCount = 0;
		self.perpage = 50;

		self.loadMore = function() {
			self.label = "loading...";
			self.page++;
			fetch();
		};


		self.init = function() {

			Api.fetchTweetsCount().then(function (count) {
				self.count = count;
				//console.log(count);
				self.pagesCount = Math.ceil(count / self.perpage);
				if (self.perpage > count) {
					self.showLoadMore = false;
				}
				fetch();
			});

		};

		if (Current) {
			self.init();
		} else {
			$state.go('home');
		}



		self.search = function() {
			if (!self.qFragment) {

			} else {
				Api.searchTweetBySubstring(self.qFragment).then(function (resp) {
					self.data = resp;
				}, function (error) {
					console.error(error);
				});
			}
		};

		self.delete = function(obj) {
			var idx = self.data.indexOf(obj);
			self.data.splice(idx, 1);
			//console.log(self.data.length);

			obj.destroy({
				success: function(dobj) {
					// The object was deleted from the Parse Cloud.
					//console.log('delete success');
				},
				error: function(myObject, error) {
					// The delete failed.
					// error is a Parse.Error with an error code and message.
				}
			});
		};

		self.select = function(item) {
			self.selectedItem = item;
		};

		self.save = function(obj){
			var idx = self.data.indexOf(obj);
			self.data.splice(idx, 1);

			var Tweet = Parse.Object.extend("Tweets");
			var tw = new Tweet();
			tw.id = obj.id;

			tw.set('episode', obj.get('episode'));
			tw.set('platform', 'twitter');
			tw.set('timestamp', obj.get('timestamp'));
			tw.set('videoId', obj.get('videoId'));
			tw.set('id_str', obj.get('id_str'));
			tw.set('author', obj.get('author'));
			tw.set('question', obj.get('question'));

// Save
			tw.save(null, {
				success: function(obj) {
					// Saved successfully.
					console.log(obj);

					var Question = Parse.Object.extend('Questions');
					var qw = new Question();

					qw.set('episode', obj.get('episode'));
					qw.set('platform', 'twitter');
					qw.set('timestamp', obj.get('timestamp'));
					qw.set('videoId', obj.get('videoId'));
					qw.set('id_str', obj.get('id_str'));
					qw.set('author', obj.get('author'));
					qw.set('question', obj.get('question'));

					qw.save(null, {
						success: function(){
							console.log('QUESTION SAVED!!!');
							//tw.destroy();
						},
						error: function(err){
							console.error(error);
						}
					})
				},
				error: function(res, error) {
					// The save failed.
					// error is a Parse.Error with an error code and description.
					console.error("error", error);
				}
			});
		};

		self.addToQuestions = function(item) {

		};

		function fetch() {
			if (self.page > self.pagesCount) {
				self.showLoadMore = false;
			} else {
				return Api.getTweets(self.page, self.perpage).then(function(resp) {
					self.label = "LOAD MORE";
					self.showList = true;
					resp.forEach(function(el){
						self.data.push(el);
					});
					//console.log(self.data.length);
				});
			}
		}




	}

})()

;