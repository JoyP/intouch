'use strict';

var Contact = require('../models/contact'),
    User    = require('../models/user'),
    mp      = require('multiparty');

exports.create = function(req, res){
//  var form = new mp.Form();
 // form.parse(req, function(err, fields, files){
 //   Contact.create(fields, files, function(err, contact){
  Contact.create(req.body, function(err, contact){
    res.send({contact:contact});
  });
};

exports.index = function(req, res){
  Contact.all(function(err, contacts){
    res.send({contacts:contacts});
  });
};

exports.update = function(req, res){
  var form = new mp.form();
  form.parse(req, function(err, fields){
    res.locals.contact.save(fields, function(){
      res.send({fields:fields});
    });
  });
};

exports.show = function(req, res){
  Contact.findById(req.params.id, function(err, contact){
    User.findById(contact.ownerId, function(err, owner){
      res.send({contact:contact, owner:owner});
    });
  });
};
