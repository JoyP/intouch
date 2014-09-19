'use strict';

var Contact = require('../models/contact'),
    mp      = require('multiparty');

exports.create = function(req, res){
  var o = parseMpForm(req);

  Contact.create(o.fields, o.files, function(err, contact){
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

  res.locals.contact.save(o.fields, o.files, contact, function(){
    res.send({contact:contact});
  });
};

exports.show = function(req, res){
  Contact.findById(req.params.id, function(err, contact){
    res.send({contact:contact});
  });
};

//  HELPER FUNCTION

parseMpForm = function(req){
  var form = new mp.Form();
  form.parse(req, function(err, fields, files){
    return {err:err, fields:fields, files:files};
  });
};

