var http = require('http'),
    bl = require('bl'),
    request = require('request'),
    url = 'http://codefight.davidbanham.com/',
    storage = {},
    socialArray = ['twitter', 'facebook', 'instagram'];

http.createServer(function(req, res) {

  socialArray.forEach(function(company) {
    http.get(url + company, function callback(response) {
      console.log(company);
      response.pipe(bl(function (err, data) {
        if (err) {
          return console.error(err)
        }
          storage[company] = data.toString();
          console.log(storage);
      }))
    });
  });

}).listen(3000);

console.log('Sorry about the delay - Please Standby for info to come through');

