'use strict';

var bcrypt = require('bcrypt'),
    Mongo  = require('mongodb');
    //_      = require('underscore-contrib');

function User(){
}

Object.defineProperty(User, 'collection',{
  get: function(){return global.mongodb.collection('users');}
});

User.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  User.collection.findOne({_id:_id}, cb);
};

User.loginUser = function(o, cb){
  User.collection.findOne({email:o.email}, function(err, user){
    if(!user){return cb();}
    var isOk = bcrypt.compareSync(o.password, user.password);
    if(!isOk){return cb();}
    cb(null, user);
  });
};

module.exports = User;
