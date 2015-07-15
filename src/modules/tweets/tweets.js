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

	function TweetsCtrl(Api, $filter) {

		var self = this;
		self.data = [];

		self.showLoadMore = true;
		self.label = "LOAD MORE";

		self.page = 0;
		self.pagesCount = 0;
		self.perpage = 50;

		self.loadMore = function() {
			self.label = "loading...";
			self.page++;
			fetch();
		};

		self.delete = function(obj) {
			var idx = self.data.indexOf(obj);
			self.data.splice(idx, 1);
			console.log(self.data.length);

			obj.destroy({
				success: function(dobj) {
					// The object was deleted from the Parse Cloud.
					console.log('delete success');
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

		self.save = function(p){
			Api.saveTweet(self.selectedItem, p).then(function(res){

				res.save().then(function(){
					console.log('SAVED!!!');
				});
			}, function(error){
				//console.error(error);
			});
		};

		Api.fetchTweetsCount().then(function(count){
			self.count = count;
			console.log(count);
			self.pagesCount = Math.ceil(count / self.perpage);
			if (self.perpage > count) {
				self.showLoadMore = false;
			}
			fetch();
		});

		function fetch() {
			if (self.page > self.pagesCount) {
				self.showLoadMore = false;
			} else {
				return Api.getTweets(self.page, self.perpage).then(function(resp) {
					self.label = "LOAD MORE";

					resp.forEach(function(el){
						self.data.push(el);
					});
					console.log(self.data.length);
				});
			}
		}




	}

})()

;