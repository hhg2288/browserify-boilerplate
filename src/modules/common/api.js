angular.module('common.api', [])


.factory('Api', function($q){

	var Question = Parse.Object.extend("Questions"),
	Tweet = Parse.Object.extend("Tweets"),

	Questions = Parse.Collection.extend({
		model: Question,
		className: "Question"
	}),

	Tweets = Parse.Collection.extend({
		model: Tweet,
		className: "Tweet"
	}),

	_getAll = function() {
		var q = $q.defer(),
		qs = new Questions;

		qs.query = new Parse.Query(Question);

		qs.fetch().then(function(response){
			q.resolve(response);
		}, function(error){
			q.reject(error);
		});
		return q.promise;
	},
	_getTweets = function() {
		var q = $q.defer(),
		tw = new Tweets;

		tw.query = new Parse.Query(Tweet);
		tw.fetch().then(function(response){
			q.resolve(response);
		}, function(error){
			//console.error('getAllError, ' + error);
			q.reject(error);
		});
		return q.promise;

	}
	;

	return {
		getAll: _getAll,
		getTweets: _getTweets
	};



});

