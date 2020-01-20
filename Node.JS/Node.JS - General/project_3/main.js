
var http = require('http');
var upperCase = require('upper-case');

http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type' : 'text/html'});
	res.write(upperCase("Hello World!")); //Err upperCase is not a function
	res.end();
}).listen(8080);