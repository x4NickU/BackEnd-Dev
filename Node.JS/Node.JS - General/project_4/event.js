var events = require('events');
var eventEmitter = new events.EventEmitter();

//Event Handler setup
var myEventHandler = function () {
	console.log('Scream!');
}

//Event that run the Event Handler
eventEmitter.on('scream', myEventHandler);

//Run the 'scream' event
eventEmitter.emit('scream');