'use strict';

var bcrypt = require('bcrypt'),
    Mongo  = require('mongodb');

function User(o){
  this.email    = o.rEmail;
  this.password = o.rPassword;
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

User.registerUser = function(o, cb){
  User.collection.findOne({email:o.rEmail}, function(err, user){
    if(user || o.rPassword.length < 3){return cb();}
    o.rPassword = bcrypt.hashSync(o.rPassword, 10);
    o = new User(o);
    User.collection.save(o, cb);
  });
};

module.exports = User;
