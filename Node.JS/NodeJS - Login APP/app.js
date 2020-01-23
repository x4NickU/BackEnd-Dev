var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mySQL = require('mysql')
const MongoClient = require('mongodb').MongoClient;
const passport = require('passport');
const LocalStrategy   = require('passport-local').Strategy;
const session = require('express-session');
const flash = require('connect-flash');
const authUtils = require('./utils/auth');
const hbs = require('hbs');


const sqlConnection = mySQL.createConnection({host: "localhost",user: "root",password: "",database: "db_1"});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

var app = express();

sqlConnection.connect(function (err) {
  if (err) throw err;
  app.locals.users = sqlConnection;
});



passport.use('Login', new LocalStrategy(
  (username,password,done) => {
    app.locals.users.query('SELECT * FROM users WHERE username='+username+'', function (err, result) {
        if (err) return done(null,false);
        const checkPassword = authUtils.checkPassword(password,result.password);
        if(!checkPassword) {
          return done(null,false);
        }
      return done(null,result);
    });
  }
));

passport.use('Registration', new LocalStrategy(
  (username, password,done) => {
    app.locals.users.query('SELECT * FROM users WHERE username="'+username+'"', function (err, check) {
        if (err) return done(null,false);
        if (check) return done(null,false);
        const hashpassword = authUtils.hashPassword(password);
        var sql = 'INSERT INTO users(username,password) VALUES ("'+username+'", "'+hashpassword+'")';
        app.locals.users.query(sql, function (err, result) {
          if (err) console.log(err);
          console.log("object: " + result);
          return done(null, result);
        });
    });
  }
));

passport.serializeUser(function(user, done) {
		done(null, user._id);
});
passport.deserializeUser(function(id, done) {
  app.locals.users.query("select * from users where id = "+id,function(err,result){	
    done(err, result);
  });
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'views/partials'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'session secret',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req,res,next) => {
  res.locals.loggedIn = req.isAuthenticated();
  next();
})
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
