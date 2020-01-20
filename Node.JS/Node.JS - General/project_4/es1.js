var fs = require('fs');
var readFile = fs.createReadStream('./demofile.txt');
readFile.on('open', function () {
	console.log('You have open the file');
});