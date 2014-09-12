'use strict';

var Contact = require('../models/contact'),
    mp      = require('multiparty');

exports.create = function(req, res){
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
    res.locals.user.save(fields, function(){
      res.send({fields:fields});
    });
  });
};
