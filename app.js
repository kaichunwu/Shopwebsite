var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var aclauth = require('./conf/acl_auth');
var indexRouter = require('./routes/index');
var signupRouter = require('./routes/signup').router;
var usersRouter = require('./routes/users');
var sellerRouter = require('./routes/seller');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized:false,
    cookie:{
        maxAge: 1000*60*10
    }
}));

app.use('/', indexRouter);
app.use('/signup', signupRouter);
app.use('/users',aclauth.authuser, usersRouter);
app.use('/seller',aclauth.authuser, sellerRouter);

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
