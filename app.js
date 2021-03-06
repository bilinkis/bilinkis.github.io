var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer  = require('multer');
var fs = require('fs');
let indexRouter = require('./routes/index');
let loginRouter = require('./routes/login');
let productsRouter = require('./routes/products');
let profileRouter = require('./routes/profile');
let registerRouter = require('./routes/register');
let searchRouter = require('./routes/search');
let rankingRouter = require('./routes/ranking');

let commentsRouter = require('./routes/comments');
let session = require('express-session');
const db = require('./database/models');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: "Mercado Fun la mejor pagina",
  resave: false,
  saveUninitialized:true,
  rolling:true,
  maxAge:1*60*60*1000,
  cookie:{
    httpOnly:true,
    maxAge: 1*60*60*1000
  }
  
}))
app.use(function(req,res,next){
  if(req.session.loggedIn != null){
    res.cookie('loggedIn', req.session.loggedIn, {maxAge: 1000 * 60 * 50})
    res.locals = {
      user : req.session.user,
      loggedIn : req.session.loggedIn,
    }
  } else{
    req.session.loggedIn = null;
  }
  return next();
})

app.use(function(req, res, next){
if(req.cookies.userId != undefined && req.session.loggedIn == undefined){
  let cookieId = req.cookies.userId;

  db.Users.findByPk(cookieId)
  .then(function(user){
    req.session.loggedIn = true;
    req.session.user = user;

    return next();
  })
  .catch(function(e){
    console.log(e);
  })
}
else {
  return next();
}
})
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/product', productsRouter);
app.use('/profile', profileRouter);
app.use('/register', registerRouter);
app.use('/search', searchRouter);
app.use('/comment', commentsRouter);
app.use('/ranking', rankingRouter);



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
