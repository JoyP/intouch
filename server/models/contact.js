'use strict';

var Mongo  = require('mongodb'),
    _      = require('underscore');
    fs     = require('fs'),
             path  = require('path'),

function Contact(fields, files){
  this._id      = Mongo.ObjectID();
  this.ownerId  = req.userId;
  this.fname    = fields.fname[0];
  this.lname    = fields.lname[0];
  this.phone    = fields.phone[0];
  this.email    = fields.email[0];
  this.street   = fields.street[0];
  this.city     = fields.city[0];
  this.zip      = fields.zip[0];
  this.bday     = fields.bday[0];
  this.photo    = stashPhoto(files[0], this._id);
}

Object.defineProperty(Contact, 'collection',{
  get: function(){return global.mongodb.collection('contacts');}
});

Contact.create = function(fields, files, cb){
  var c = new Contact(fields, files);
  Contact.collection.save(c,cb);
};

Contact.all = function(cb){
  Contact.collection.find().toArray(cb);
};

Contact.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Contact.collection.findOne({_id:_id}, function(err, obj){
    var contact = Object.create(Contact.prototype);
    contact = _.extend(contact, obj);
    cb(err, contact);
  });
};

Contact.prototype.save = function(fields, cb){
  var properties = Object.keys(fields),
      self       = this;

  properties.forEach(function(property){
    self[property] = fields[property][0];
  });


  Contact.collection.save(this, cb);
};

module.exports = Contact;

// HELPER FUNCTIONS

Contact.prototype.stashPhoto = function(file){

  if(!photo.size){return;}

  var stashDir  = __dirname + '/../public/assets/img/',
      ext       = path.extname(photo.path),
      name      = this._id + ext,
      stashPath = stashDir + name;

  fs.renameSync(photo.path, stashPath);
    return stashPath;
};





