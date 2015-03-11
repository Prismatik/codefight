var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false });

app.get('/', function(req, res) {
	res.sendStatus(200);
});

app.listen(3000);