'use strict';

var Contact = require('../models/contact');

exports.create = function(req, res){
  console.log('REQ.BODY in .create>>>>>>>>>', req.body);
  Contact.create(req.body, function(err, contact){
    res.send({contact:contact});
  });
};

exports.index = function(req, res){
  Contact.all(function(err, contacts){
    res.send({contacts:contacts});
  });
};

