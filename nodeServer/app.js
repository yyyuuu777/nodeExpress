var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var users = require('./routes/users');
var mongoose = require('mongoose');
var engines = require('consolidate');
var _= require('underscore');
//get connection object
//var sql = require('./public/javascripts/sqlconnect.js')
var app = express();
var dbUrl ='mongodb://127.0.0.1/study'
var db = mongoose.connect(dbUrl);
var movie= require('./models/movie');
 db.connection.on("error", function (error) {  console.log("数据库连接失败：" + error);  });
 db.connection.on("open", function () {  console.log("------数据库连接成功！------");  });
app.engine('jade', engines.jade);
app.engine('html', engines.ejs);
var Filter = require('./routes/interruptfilter/filter.js');
//new Filter()
var index = require('./routes/index');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.useres.redirect('/home')(favicon(path.join(__dirname, 'public', 'favicon.ico')));
var cookieparser = require('cookie-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
app.use(cookieparser());
app.use(session({
    secret:'video',
    store:new mongoStore({
        url:dbUrl,
        connection:'sessions'
    })
}))
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
