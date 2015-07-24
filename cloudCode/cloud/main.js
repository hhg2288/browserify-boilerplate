var oauth = require("cloud/libs/oauth.js");

Parse.Cloud.job("tweet2Question", function(request, status) {
	Parse.Cloud.useMasterKey();

	var Questions = Parse.Object.extend("Questions");
	var Tweet = Parse.Object.extend("Tweets");
	var query = new Parse.Query(Tweet);

	query.exists("episode");
	query.exists("timestamp");
	query.exists("videoId");
	query.exists("author");

	query.find().then(function(results){
		if (results.length > 0) {
			var questions = new Array();
			for (var i = 0; i < results.length; i++) {
				var question = new Questions();

				var content = results[i];
				question.set('question', content.get('question'));
				question.set('episode', content.get('episode'));
				question.set('platform', content.get('platform'));
				question.set('timestamp', content.get('timestamp'));
				question.set('videoId', content.get('videoId'));
				question.set('id_str', content.get('id_str'));
				question.set('author', content.get('author'));

				questions.push(question);
			}

			Parse.Object.saveAll(questions, {
				success: function (objs) {
					console.log('QUESTIONS SAVED!!!');
				},
				error: function (error) {
					console.log(error);
				}
			});
		}
	}, function(error){
		console.error(error);
	});
});





function getTweets() {
	var promise = new Parse.Promise();
	var Tweets = Parse.Object.extend("Tweets");
	var query = new Parse.Query(Tweets);
	var urlLink = "https://api.twitter.com/1.1/search/tweets.json?q=%23askgaryvee%20%3F&src=typd";

	query.descending("id_str");
	//query.ascending("id_str");
	query.limit(1);

	query.find().then(function(results) {
		console.log("RESULTS!!!!");
		console.log(results);
		if (results.length > 0) {
			var lastTweet = results[0].get("id_str");
			console.log(lastTweet);
			urlLink = urlLink + "&since_id=" + lastTweet;
			//urlLink = urlLink + "&max_id=" + lastTweet;
		} else {
			console.log("NO RESULTS :(");
		}

		var consumerSecret = "Ei2C3mCkWGccG9i4aPxsoNFwVtXHD78mOD0SkwMSfzUWQjyknf";
		var tokenSecret = "5OY4RXy2rLpWA5WNm2gwk4bh0Ezkf9N2pDueaOtZtzSQj";
		var oauth_consumer_key = "rjgtePJyf2axZ8CAz1JyuCZ3I";
		var oauth_token = "24702345-jxHSkbtX0Y9lEWW8JRDI5H0Fzbm1e2CkuOTHDSORg";

		var nonce = oauth.nonce(32);
		var ts = Math.floor(new Date().getTime() / 1000);
		var timestamp = ts.toString();

		var nonce = oauth.nonce(32);
		var ts = Math.floor(new Date().getTime() / 1000);
		var timestamp = ts.toString();
		var accessor = {
			consumerSecret: consumerSecret,
			tokenSecret: tokenSecret
		};
		var params = {
			oauth_version: "1.0",
			oauth_consumer_key: oauth_consumer_key,
			oauth_token: oauth_token,
			oauth_timestamp: timestamp,
			oauth_nonce: nonce,
			oauth_signature_method: "HMAC-SHA1"
		};
		var message = {
			method: "GET",
			action: urlLink,
			parameters: params
		};

		oauth.SignatureMethod.sign(message, accessor);
		var normPar = oauth.SignatureMethod.normalizeParameters(message.parameters);
		var baseString = oauth.SignatureMethod.getBaseString(message);
		var sig = oauth.getParameter(message.parameters, "oauth_signature") + "=";
		var encodedSig = oauth.percentEncode(sig);

		Parse.Cloud.httpRequest({
			method: "GET",
			url: urlLink,
			headers: {
				Authorization: 'OAuth oauth_consumer_key="' + oauth_consumer_key + '", oauth_nonce=' + nonce + ', oauth_signature=' + encodedSig + ', oauth_signature_method="HMAC-SHA1", oauth_timestamp=' + timestamp + ',oauth_token="' + oauth_token + '", oauth_version="1.0"'
			},
			success: function (httpResponse) {

				var resp = JSON.parse(httpResponse.text);
				var data = resp.statuses;

				var tweets = new Array();

				for (var i = 0; i < data.length; i++) {
					var Tweets = Parse.Object.extend("Tweets"),
					tweet = new Tweets();

					var content = data[i];
					tweet.set("question", content.text);
					tweet.set("source", content.source);
					tweet.set("created_at", content.created_at );
					tweet.set("id_str", content.id_str);
					tweet.set("platform", "twitter");
					tweet.set("author", content.user.screen_name);
					tweet.set("author_name", content.user.name);

					tweets.push(tweet);

				}
				;

				Parse.Object.saveAll(tweets, {
					success: function (objs) {

						promise.resolve();

					},
					error: function (error) {
						console.log(error);
						promise.reject(error.message);
					}
				});

			},
			error: function (error) {
				console.log(error);
				promise.reject(error.message);
			}
		});

	});

	return promise;

}


Parse.Cloud.job("twitterFeed", function(request, status) {
	Parse.Cloud.useMasterKey();


	var promise = Parse.Promise.as();

	promise = promise.then(function() {
		return getTweets();
	});

	Parse.Promise.when(promise).then(function() {
		status.success("tweets Saved!");
	}, function(error) {
		status.error("Tweets failed to update", error);
	});

});



Parse.Cloud.job("removeDuplicateItems", function(request, status) {
	Parse.Cloud.useMasterKey();
	var _ = require("underscore");

	var hashTable = {};

	function hashKeyForTestItem(item) {
		var fields = ["question", "id_str"];
		var hashKey = "";
		_.each(fields, function (field) {
			hashKey += item.get(field) + "/" ;
		});
		return hashKey;
	}

	var testItemsQuery = new Parse.Query("Tweets");
	testItemsQuery.each(function (item) {
		var key = hashKeyForTestItem(item);

		if (key in hashTable) { // this item was seen before, so destroy this
			return item.destroy();
		} else { // it is not in the hashTable, so keep it
			hashTable[key] = 1;
		}

	}).then(function() {
		status.success("Migration completed successfully.");
	}, function(error) {
		status.error("Uh oh, something went wrong.", error);
	});
});