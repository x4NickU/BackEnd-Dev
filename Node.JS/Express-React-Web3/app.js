const express = require('express');
const bodyParser = require('body-parser');
const  createError = require('http-errors');
var cookieParser = require('cookie-parser');
const session = require('express-session');

// Setting up express
let app = express();
app.use('/public', express.static(__dirname+'/public'));

// Body parser config (allows reading body in requests)
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// Basic Routing
app.get('/', (req, res) => res.sendFile('index.html', {root: __dirname+'/public'}));
app.get('/login', (req, res) => res.sendFile('login.html', {root: __dirname+'/public'}));
app.get('/robots.txt', (req, res) => res.sendFile('robots.txt', {root: __dirname}));


app.use(cookieParser());
app.use(session({
	secret: 'session secret',
	resave: false,
	saveUninitialized: false,
}));


app.use(function(req, res, next) {
	next(createError(404));
});


// Setting up node js server
let server = app.listen(3000, () => {
	console.log('Server running on port 3000...');
});