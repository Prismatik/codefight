var http = require('http');
var request = require('request');

http.createServer(function(req, res) {

  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Access-Control-Allow-Origin' : '*'
  });

  socialArray = ["twitter", "facebook", "instagram"]

  for(var i = 0; i <= 2; i++) {
    var company = socialArray[i];
    var jsonObject = {}

  request('http://codefight.davidbanham.com/' + company, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        jsonObject[company] = info;
        console.log(jsonObject);
      }
    });
  }

    
}).listen(3000);

console.log('Sorry about the delay - Please Standby for info to come through');