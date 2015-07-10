angular.module('common.api', [])


.factory('Api', function($q){

	var Question = Parse.Object.extend("Tweets"),

	Questions = Parse.Collection.extend({
		model: Question,
		className: "Question"
	}),

	_getAll = function() {
		var q = $q.defer(),
		qs = new Questions;

		qs.query = new Parse.Query(Question);

		qs.fetch().then(function(response){
			q.resolve(response);
		}, function(error){
			//console.error('getAllError, ' + error);
			q.reject(error);
		});
		return q.promise;
	};

	return {
		getAll: _getAll
	};



});

