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
      console.log('err before it is sent back to Angular>>>>', err);
      console.log('success before it is sent back to Angular>>>>', success);
      console.log('contact after creation in exports.create>>>>', contact);
      Contact.findById(contact.upserted[0]._id, function(err, contact){
        console.log('CONTACT in exports.create before it is sent back to Angular>>>>', contact);
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
  form.parse(req, function(err, fields, file){
    return {err:err, fields:fields, file:file};
  });
}
