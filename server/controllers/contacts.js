'use strict';

var Contact = require('../models/contact'),
    mp      = require('multiparty');

exports.create = function(req, res){
  var o = parseMpForm(req);

  Contact.create(req.user._id, o.fields, o.files, function(err, contact){
    res.send({contact:contact});
  });
};

exports.index = function(req, res){
  Contact.all(function(err, contacts){
    res.send({contacts:contacts});
  });
};

exports.update = function(req, res){
  var o = parseMpForm(req);

  Contact.findById(req.params.contactId, function(err, contact){
    contact.save(o.fields, o.files, function(){
      res.send({contact:contact});
    });
  });
};

exports.show = function(req, res){
  Contact.findById(req.params.id, function(err, contact){
    res.send({contact:contact});
  });
};

//  HELPER FUNCTION

function parseMpForm(req){
  var form = new mp.Form();
  form.parse(req, function(err, fields, files){
    return {err:err, fields:fields, files:files};
  });
}

