var express = require('express');
var request = require('request');
var app = express();

var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false });

var service = ['twitter'];

request('http://codefight.davidbanham.com/twitter', function(error, res, body) {
	if (!error && res.statusCode == 200) {
		console.log(body);
	}
});

request('http://codefight.davidbanham.com/facebook', function(error, res, body) {
	if (!error && res.statusCode == 200) {
		console.log(body);
	}
});

request('http://codefight.davidbanham.com/instagram', function(error, res, body) {
	if (!error && res.statusCode == 200) {
		console.log(body);
	}
});

app.listen(3000);