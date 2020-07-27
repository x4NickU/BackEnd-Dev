const express = require('express');
const bodyParser = require('body-parser');

// Setting up express
let app = express();
app.use('/public', express.static(__dirname+'/public'));

// Body parser config (allows reading body in requests)
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Setting up node js server
let server = app.listen(3000, () => {
	console.log('Server running on port 3000...');
});

// Basic Routing
app.get('/', (req, res) => res.sendFile('index.html', {root: __dirname+'/public'}));
app.get('/login', (req, res) => res.sendFile('login.html', {root: __dirname+'/public'}));
app.get('/robots.txt', (req, res) => res.sendFile('robots.txt', {root: __dirname}));