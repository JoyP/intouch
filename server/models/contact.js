'use strict';

var Mongo  = require('mongodb'),
    _      = require('underscore'),
    fs     = require('fs'),
    path   = require('path');

function Contact(ownerId, fields){
  this.ownerId  = Mongo.ObjectID(ownerId);
  this.fname    = fields.fname[0];
  this.lname    = fields.lname[0];
  this.phone    = fields.phone[0];
  this.email    = fields.email[0];
  this.street   = fields.street[0];
  this.city     = fields.city[0];
  this.zip      = fields.zip[0];
  this.bday     = (fields.bday[0]) ? (new Date(fields.bday[0])) : '';
}

Object.defineProperty(Contact, 'collection',{
  get: function(){return global.mongodb.collection('contacts');}
});

Contact.create = function(user, fields, files, cb){ // we'll need to pass files in here to send to save
  var c = new Contact(user, fields);
  Contact.collection.save(c, files, cb); // seems awkward to include files here - why can't we pass photo into constructor?
};

Contact.all = function(cb){
  Contact.collection.find().toArray(cb);
};

Contact.findContacts = function(userId, cb){
  Contact.collection.find({ownerId:userId}).toArray(cb);
};

Contact.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Contact.collection.findOne({_id:_id}, function(err, obj){
    var contact = Object.create(Contact.prototype);
    contact = _.extend(contact, obj);
    cb(err, contact);
  });
};

Contact.prototype.save = function(fields, files, cb){
  var properties = Object.keys(fields),
    self       = this;

  properties.forEach(function(property){
    switch(property){
      case 'bday':
        self.bday = new Date(fields[property]);
        break;
      default:
        self[property] = fields[property];
    }
  });

  this.photo    = stashPhoto(files[0], this._id);
  this._id      = Mongo.ObjectID(this._id);
  this.ownerId  = Mongo.ObjectID(this.ownerId);

  Contact.collection.save(this, cb);
};

module.exports = Contact;

// HELPER FUNCTIONS

function stashPhoto(file, contactId){

  if(!file.size){return;}

  var stashDir  = __dirname + '/../public/assets/img/',
      ext       = path.extname(file.path),
      name      = contactId + ext,
      stashPath = stashDir + name;

  fs.renameSync(file.path, stashPath);
  return stashPath;
}
