const path = require('path');
const express = require('express');
var flash = require('express-flash');
var ejsLayouts = require('express-ejs-layouts');
var app = express()
var bodyParser = require('body-parser');

const admin = require("firebase-admin");
const serviceAccount = require("./app_server/configure/TALİHLİSİADMINSDK.json");
admin.initializeApp({
  //
  //
});

var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var User = require('./app_server/models/Users')();//Login işlemi için
var LocalStrategy = require('passport-local').Strategy;

app
  .use(express.static(path.join(__dirname, 'public')))
  .set('view engine', 'ejs')
  .set('views', path.join(__dirname, './app_server/views'))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(cookieParser())
  .use(ejsLayouts)
  .use(session({secret: 'secret', saveUninitialized: true, resave: true}))
  .use(passport.initialize())
  .use(passport.session())
  .use(flash())
  .use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
          , root      = namespace.shift()
          , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
  }}))
  .use(flash())
  .use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null; //kullanıcın bilgilerini gönderiyor
    next();
  })
  passport.use(new LocalStrategy(
    function (username, password, done) {
      User.getUserByUsername(username, function (err, user) {
        if (err) throw err;
        if (!user) {
          return done(null, false, { message: 'Tanımsız Kullanıcı' });
        }
  
        User.comparePassword(password, user.password, function (err, isMatch) {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Yanlış Parola.'});
          }
        });
      });
  }))
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  })
  passport.deserializeUser(function (id, done) {
    User.getUserById(id, function (err, user) {
      done(err, user);
    });
  })

require(path.join(__dirname, './app_server/routers/ManagerRouter.js'))(app);

const PORT = process.env.PORT || 8080
const HOST = "0.0.0.0";
app.listen(PORT, HOST, function(){
  console.log(PORT + '. porttan server baslatildi')
});