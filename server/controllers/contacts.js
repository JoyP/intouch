'use strict';

var Contact = require('../models/contact');
 //   mp      = require('multiparty');

exports.create = function(req, res){
//  var form = new mp.Form();
 // form.parse(req, function(err, fields, files){
 //   Contact.create(fields, files, function(err, contact){
  Contact.create(req.user._id, req.body, function(err, contact){
    res.send({contact:contact});
  });
};

exports.index = function(req, res){
  Contact.findContacts(req.user._id, function(err, contacts){
    res.send({contacts:contacts});
  });
};

exports.update = function(req, res){
  //var form = new mp.form();
  //form.parse(req, function(err, fields){
  Contact.findById(req.params.contactId, function(err, contact){
    contact.save(req.body, function(err, contact){
      res.send({contact:contact});
    });
  });
//  });
};

exports.show = function(req, res){
  Contact.findById(req.params.id, function(err, contact){
    res.send({contact:contact});
  });
};

exports.deleteContact = function(req, res){
  console.log('req.params.id in server controller>>>>>', req.params.id);
  Contact.collection.remove({_id:req.params.id}, true, function(err, contact){
    console.log('err in server controller>>>>>>>', err);
    console.log('contact in server controller>>>>>>>', contact);
    res.send({contact:contact});
  });
};
