// var http = require('http');
var request = require('request');

var api = 'http://codefight.davidbanham.com/';
var socials = ['twitter', 'facebook', 'instagram'];
var object = {};

socials.forEach(function(social) {
	request(api + social, function (error, response, body) {
  	if (!error && response.statusCode == 200) {
    	object[social] = JSON.parse(body);
    	console.log(object);
  	}
	})
});

// server.listen(3000);