'use strict';

var Mongo  = require('mongodb'),
    fs     = require('fs'),
    path   = require('path'),
    _      = require('underscore');

function Contact(ownerId, contactInfo, files){
  this._id      = new Mongo.ObjectID();
  this.ownerId  = Mongo.ObjectID(ownerId);
  this.fname    = contactInfo.fname;
  this.lname    = contactInfo.lname;
  this.phone    = contactInfo.phone;
  this.email    = contactInfo.email;
  this.street   = contactInfo.street;
  this.city     = contactInfo.city;
  this.zip      = contactInfo.zip;
  this.bday     = (contactInfo.bday) ? (new Date(contactInfo.bday)) : '';
  this.photo    = stashPhoto(files, this._id);
}

Object.defineProperty(Contact, 'collection',{
  get: function(){return global.mongodb.collection('contacts');}
});

Contact.create = function(user, contactInfo, files, cb){
  var c = new Contact(user, contactInfo, files);
  Contact.collection.save(c,cb);
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
      case 'photo':
        self.photo = stashPhoto(files[0], self._id);
        break;
      case 'bday':
        self.bday = new Date(fields[property]);
        break;
      default:
        self[property] = fields[property];
    }
  });

  this._id      = Mongo.ObjectID(this._id);
  this.ownerId  = Mongo.ObjectID(this.ownerId);

  Contact.collection.save(this, cb);
};

module.exports = Contact;

// HELPER FUNCTIONS

function stashPhoto(file, contactId){

  console.log('');
  var tempPath = file.file[0].path;
  tempPath = tempPath.toString();

  if(!file.size){return;}

  console.log('');
  var relDir  = '/img/',
      absDir  = __dirname + '/../../public' + relDir;

  console.log('');
  var ext       = path.extname(tempPath);

  console.log('');
  var name      = contactId + ext,
      absPath = absDir + name,
      relPath = relDir + name;

  fs.renameSync(tempPath, absPath);
  return relPath;
}

