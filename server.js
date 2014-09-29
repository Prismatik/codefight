var http = require('http'),
	request = require('request'),
	async = require('async');

var server = 'http://codefight.davidbanham.com/',
	services = ['twitter', 'facebook', 'instagram'],
	ipAddress = process.env.IP || '127.0.0.1',
	port = process.env.PORT || 3000;

http.createServer(function(req, res) {
	var data = {};
	async.each(services, function(svc, done) {
		request(server + '/' + svc, function(err, response, body) {
			if (err) {
				data[svc] = 'ERROR: ' + JSON.stringify(err);
			} else if (response.statusCode !== 200) {
				data[svc] = 'BAD RESPONSE: CODE ' + response.statusCode;
			} else {
				try { data[svc] = JSON.parse(body); }
				catch(e) { data[svc] = 'INVALID DATA: ' + body; }
			}
			done();
		});
	}, function() {
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify(data));
	});
}).listen(port, ipAddress);

console.log('Codefight on http://' + ipAddress + ':' + port);