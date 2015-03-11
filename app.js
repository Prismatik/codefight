var http = require('http');
var server = http.createServer();

server.on('request', function(req, res) {
	var messages = {};
	var services = ['twitter', 'facebook', 'instagram'];

	return services.forEach(function(service) {
		return http.get({
			hostname: 'codefight.davidbanham.com',
			path: '/' + service
		}, function(data) {
				return data.on('data', function(chunk) {
					messages[service] = JSON.parse(chunk.toString());
					if (Object.keys(messages).length === services.length) {
						return res.end(JSON.stringify(messages));
					}
				});
		});
	});
});

server.listen(3000);