var http = require('http');
var fs = require('fs');

http.createServer(function (req,res) {

	//Fs readFile() es: 
	fs.readFile('demo.html', function(err, data) {
		res.writeHead(200,{'Content-Type' : 'text/html'});
		res.write(data);
		res.end();
	});

	//Fs open() es:
	fs.open('myfile.txt', 'w', function(err,file) {
		if (err) throw err;
		console.log('Open File!');
	});

	//Fs writeFile() es : -> Sostituisce completamente
	fs.writeFile('myfile1.txt', 'Hello content!', function(err) {
		if (err) throw err;
		console.log('Write File!');
	});
	
	//Fs appendFile() -> es: -> Aggiunge del testo alla fine 
	fs.appendFile('myfile.txt', 'Hello content!', function(err) {
		if(err) throw err;
		console.log('Append File!');
	});

	//Fs rename() -> Rinomina i file
	fs.rename('myfile.txt','myRenamedFile.txt', function(err) {
		if (err) throw err;
		console.log('File Renamed!');
	});

	//Fs unlink() -> Cancella i file
	fs.unlink('myfile1.txt', function(err) {
		if (err) throw err;
		console.log('File deleted!');
	});

}).listen(8080);