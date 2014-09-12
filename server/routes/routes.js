'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    session        = require('express-session'),
    RedisStore     = require('connect-redis')(session),
    passport       = require('passport'),
    debug          = require('../lib/debug'),
    passportConfig = require('../lib/passport/config'),
    home           = require('../controllers/home'),
    user           = require('../controllers/user'),
    contacts       = require('../controllers/contacts');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(express.static(__dirname + '/../../public'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(session({store:new RedisStore(), secret:'my super secret key', resave:true, saveUninitialized:true, cookie:{maxAge:null}}));
  passportConfig(passport, app);

  app.use(debug.info);

  app.get('/home', home.index);
  app.post('/contacts', contacts.create);
  app.get('/contacts', contacts.index);
  app.post('/contacts/:id', contacts.update);
  app.get('/contacts/:id', contacts.show);
  app.post('/login', passport.authenticate('local', {successRedirect:'/', failureRedirect:'/login'}));
  app.get('/login', user.login);

  console.log('Express: Routes Loaded');
};

