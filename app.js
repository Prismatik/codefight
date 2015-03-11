var http = require('http');
var request = require('request');

var api = 'http://codefight.davidbanham.com/';
var socials = ['twitter', 'facebook', 'instagram'];

http.createServer(function(req, res) {
	var object = {};	
	socials.forEach(function(social) {
		request(api + social, function (error, response, body) {
	  	if (!error && response.statusCode == 200) {
	    	object[social] = JSON.parse(body);
	    	console.log(object);
	  	}
		})
	}, function(data) {
			return data.on('data', function(chunk) {
				res.writeHead(200, { 'Content-Type': 'application/json' });
				return res.end(JSON.stringify(object));
			});
		}
	);
})
	.listen(3000);