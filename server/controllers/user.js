'use strict';

var User = require('../models/user');

exports.loginUser = function(req, res){
  User.loginUser(req.body, function(err, user){
    if(user){
      req.session.regenerate(function(){
        req.session.userId = user._id;
        req.session.save(function(){
          res.setHeader('X-Authenticated-User', user.email);
          res.status(200).end();
        });
      });
    }else{
      res.status(401).end();
    }
  });
};

exports.registerUser = function(req, res){
  console.log('YOYOYOYOYOYOYOYOY-------', req.body);
  User.registerUser(req.body, function(err, user){
    if(user){
      res.status(200).end();
    }else{
      res.status(400).end();
    }
  });
};

exports.logout = function(req, res){
  req.session.destroy(function(){
    res.setHeader('X-Authenticatd-User', 'anonymous');
    res.status(200).end();
  });
};
