'use strict';

var bcrypt = require('bcrypt');
    //Mongo  = require('mongodb'),
    //_      = require('underscore-contrib');

function User(){
}

Object.defineProperty(User, 'collection',{
  get: function(){return global.mongodb.collection('users');}
});

User.localAuthenticate = function(email, password, cb){
  User.collection.findOne({email:email}, function(err, user){
    if(!user){return cb();}
    var isOk = bcrypt.compareSync(password, user.password);
    if(!isOk){return cb();}
    cb(null, user);
  });
};

module.exports = User;
