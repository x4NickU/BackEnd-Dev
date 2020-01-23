var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mySQL = require('mysql')
const passport = require('passport');
const LocalStrategy   = require('passport-local').Strategy;
const session = require('express-session');
const flash = require('connect-flash');
const authUtils = require('./utils/auth');
const hbs = require('hbs');
const dateObj = new Date();
const month = dateObj.getUTCMonth() + 1; //months from 1-12
const day = dateObj.getUTCDate();
const year = dateObj.getUTCFullYear();

const sqlConnection = mySQL.createConnection({host: "localhost",user: "root",password: "",database: "db_1"});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const appRouter = require('./routes/app');
var app = express();

sqlConnection.connect(function (err) {
  if (err) throw err;
  app.locals.users = sqlConnection;
});
app.locals.today = year + "/" + month + "/" + day;


passport.use('Login', new LocalStrategy(
  (username,password,done) => {
    app.locals.users.query('SELECT * FROM users WHERE username="'+username+'"', function (err, result) {
        if (err) return done(null,false);
        if (!result.length) return done(null,false);
        const checkPassword = authUtils.checkPassword(password,result[0].password);
        if(!checkPassword) {
          return done(null,false);
        }
        var todayFormatted = app.locals.today.replace(/\//g, '');
        var createFormatted = result[0].created_at.replace(/\//g, '');
        console.log("Today: " + todayFormatted);
        console.log("Created: " + createFormatted);
        console.log("Check giorno: " + todayFormatted - createFormatted)
        const dayCheck = ((todayFormatted - createFormatted)  > 14);
        console.log("DayCkec: " + dayCheck);
        if ((dayCheck) && result[0].payed == 1) app.locals.setUser = 'payed';
        if ((dayCheck) && result[0].payed == 0) app.locals.setUser = 'need';
        if ((!dayCheck) && result[0].payed == 0) app.locals.setUser = 'free';

        console.log(result);
      return done(null,result[0]);
    });
  }
));

passport.use('Registration', new LocalStrategy({
  passReqToCallback: true
  },
  (req, username, password, done) => { 
    app.locals.users.query('SELECT * FROM users WHERE username="'+username+'"', function (err, check) {
        if (err) return done(null,false);
        if (check.length) return done(null,false);
        const hashpassword = authUtils.hashPassword(password);
        var users = [
          username,
          hashpassword,
          req.body.name,
          req.body.subname,
          req.body.email,
          app.locals.today
        ];

        var sql = ('INSERT INTO users(username,password,name,subname,email,created_at) VALUES (?)');
        app.locals.users.query(sql,[users], function (err, result, fields) {
          if(err) console.log(err); 
          return done(null, result);
        });
    });
  }
));

passport.serializeUser(function(user, done) {
  console.log("Serialize: " + user.ID);
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
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
app.use('/app', appRouter);

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
