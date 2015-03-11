var http = require('http');
var fs = require('fs');
var request = require('request');

http.createServer(function(req, res) {

  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Access-Control-Allow-Origin' : '*'
  });

  socialArray = ["twitter", "facebook", "instagram"]

  for(var i = 0; i <= 2; i++) {
    var company = socialArray[i];
    var jsonArray = []

  request('http://codefight.davidbanham.com/' + company, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        jsonArray.push(info);
        console.log(jsonArray);
      }
    });
  }
}).listen(3000);

console.log('Sorry about the delay - we are working with a shithouse API - Please Standby');