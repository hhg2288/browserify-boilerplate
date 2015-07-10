var oauth = require("cloud/libs/oauth.js");

Parse.Cloud.job("twitterFeed", function(request, status) {
	Parse.Cloud.useMasterKey();
	var urlLink = "https://api.twitter.com/1.1/search/tweets.json?q=%23AskGaryVee&src=tyah";
	var consumerSecret = "Ei2C3mCkWGccG9i4aPxsoNFwVtXHD78mOD0SkwMSfzUWQjyknf";
	var tokenSecret = "5OY4RXy2rLpWA5WNm2gwk4bh0Ezkf9N2pDueaOtZtzSQj";
	var oauth_consumer_key = "rjgtePJyf2axZ8CAz1JyuCZ3I";
	var oauth_token = "24702345-jxHSkbtX0Y9lEWW8JRDI5H0Fzbm1e2CkuOTHDSORg";
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
			Authorization: 'OAuth oauth_consumer_key="'+oauth_consumer_key+'", oauth_nonce=' + nonce + ', oauth_signature=' + encodedSig + ', oauth_signature_method="HMAC-SHA1", oauth_timestamp=' + timestamp + ',oauth_token="'+oauth_token+'", oauth_version="1.0"'
		},
		success: function(httpResponse) {

			var resp = JSON.parse(httpResponse.text);
			var data = resp.statuses;

			var tweets = new Array();
			for (var i = 0; i < data.length; i++) {
				var Tweets = Parse.Object.extend("Tweets"),
				tweet = new Tweets();

				var content = data[i];
				tweet.set("text", content.text);
				tweet.set("source", content.source);
				tweet.set("retweet_count", content.retweet_count);
				tweet.set("created_at", content.created_at );
				tweet.set("favorite_count", content.favorite_count);
				tweet.set("retweeted", content.retweeted);
				tweet.set("id_str", content.id_str);

				tweets.push(tweet);
			}

			Parse.Object.saveAll(tweets, {
				success: function(objs) {
					status.success("Tweets updated");

				},
				error: function(error) {
					status.error(error);
				}
			});


		},
		error: function(httpResponse) {
			status.error("error");
		}
	});
});