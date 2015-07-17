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

	_getQuestions = function(p,pp) {
		var q = $q.defer(),
		qs = new Questions;

		qs.query = new Parse.Query(Question);

		qs.query.limit(pp).skip(p*pp);

		qs.query.find().then(function(response){
			q.resolve(response);
		}, function(error){
			q.reject(error);
		});
		return q.promise;
	},

	_getTweets = function(p, pp) {
		var q = $q.defer(),
		tw = new Tweets;

		tw.query = new Parse.Query(Tweet);
		tw.query.descending("id_str");
		tw.query.limit(pp).skip(p*pp);


		tw.query.find().then(function(response){
			q.resolve(response);
		}, function(error){

			q.reject(error);
		});
		return q.promise;
	},

	_fetchQuestionsCount = function() {
		var qs = new Questions;
		qs.query = new Parse.Query(Question);
		return qs.query.count();
	},

	_fetchTweetsCount = function() {
		var tw = new Tweets;
		tw.query = new Parse.Query(Tweet);
		return tw.query.count();
	},

	_saveTweet = function(parseObj, data){
		var q = $q.defer();

		parseObj.save(data).then(function(res){
			q.resolve(res);
		}, function(error){
			//console.error(error);
			q.reject(error);
		});

		////

		return q.promise;
	},

	_searchTweetBySubstring = function(substr) {
		var q = $q.defer(),
		tw = new Tweets;
		console.log(substr);
		tw.query = new Parse.Query(Tweet);
		tw.query.contains('question', substr);

		tw.query.find().then(function(response){
			q.resolve(response);
		}, function(error){

			q.reject(error);
		});
		return q.promise;

	}
	;

	return {
		getQuestions: _getQuestions,
		getTweets: _getTweets,
		fetchQuestionsCount: _fetchQuestionsCount,
		fetchTweetsCount: _fetchTweetsCount,
		saveTweet: _saveTweet,
		searchTweetBySubstring: _searchTweetBySubstring
	};



});

