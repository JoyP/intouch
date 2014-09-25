'use strict';

var Contact = require('../models/contact'),
    mp      = require('multiparty'),
    Mongo   = require('mongodb');

exports.create = function(req, res){
  var form = new mp.Form();
  form.parse(req, function(err, fields, files){

    var contactInfo2 = fields.contact[0],
        contactInfo = JSON.parse(contactInfo2);

    Contact.create(req.user._id, contactInfo, files, function(err, contact){
      res.send({err:err, contact:contact});
    });
  });
};

exports.index = function(req, res){
  Contact.findContacts(req.user._id, function(err, contacts){
    res.send({contacts:contacts});
  });
};

exports.update = function(req, res){
  var o = parseMpForm(req);

  Contact.findById(req.params.contactId, function(err, contact){
    contact.save(o.fields, o.files, function(err, contact){
      res.send({contact:contact});
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

//  HELPER FUNCTION
// this should go away after update is revised to not need it
// may refactor with exports.create
function parseMpForm(req){
  var form = new mp.Form();
  form.parse(req, function(err, fields, files){
    return {err:err, fields:fields, files:files};
  });
}
