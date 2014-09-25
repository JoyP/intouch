'use strict';

var Contact = require('../models/contact'),
    mp      = require('multiparty'),
    Mongo   = require('mongodb');

exports.create = function(req, res){
  var form = new mp.Form();
  form.parse(req, function(err, fields, file){
    var contactInfo2 = fields.contact[0],
        contactInfo = JSON.parse(contactInfo2);

    Contact.create(req.user._id, contactInfo, file, function(err, success, contact){
      Contact.findById(contact.upserted[0]._id, function(err, contact){
        res.send({contact:contact});
      });
    });
  });
};

exports.index = function(req, res){
  Contact.findContacts(req.user._id, function(err, contacts){
    res.send({contacts:contacts});
  });
};

exports.update = function(req, res){
  var form = new mp.Form();
  form.parse(req, function(err, fields, file){
    console.log('fields in exports.update>>>>>>>>>', fields);
    console.log('file in exports.update>>>>>>>>>>>', file);
    var contactInfo2 = fields.contact[0],
        contactInfo = JSON.parse(contactInfo2);

    console.log('contactInfo2 in exports.update>>>>>>>>', contactInfo2);
    console.log('contactInfo in exports.update>>>>>>>>', contactInfo);
    console.log('req.params in exports.update>>>>>>>>', req.params);
    Contact.findById(contactInfo._id, function(err, contact){
      console.log('CONTACT in exports.update>>>>>>>', contact);
      contact.save(contactInfo, file, function(err, contact){
        console.log('CONTACT in exports.update>>>>>>>', contact);
        res.send({contact:contact});
      });
    });
  });
};

exports.show = function(req, res){
  Contact.findById(req.params.id, function(err, contact){
    res.send({contact:contact});
  });
};

exports.deleteContact = function(req, res){
  var _id = Mongo.ObjectID(req.params.id);
  Contact.collection.remove({_id:_id}, true, function(err, result){
    res.send({result:result});
  });
};

