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
  this.facebook = contactInfo.facebook;
  this.twitter  = contactInfo.twitter;
  this.photo    = stashPhoto(files, this._id);
}

Object.defineProperty(Contact, 'collection',{
  get: function(){return global.mongodb.collection('contacts');}
});

Contact.create = function(user, contactInfo, file, cb){
  var c = new Contact(user, contactInfo, file);
  Contact.collection.save(c, cb);
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

Contact.prototype.save = function(fields, file, cb){
  var properties  = Object.keys(fields),
    self          = this;

  properties.forEach(function(property){
    switch(property){
      case 'photo':
        var newPhoto = stashPhoto(file, self._id);
        self.photo = newPhoto ? newPhoto : self.photo;
        break;
      default:
        self[property] = fields[property];
    }
  });

  this._id      = Mongo.ObjectID(this._id);
  this.ownerId  = Mongo.ObjectID(this.ownerId);
  this.bday     = (this.bday) ? (new Date(this.bday)) : null;

  Contact.collection.save(this, cb);
};

module.exports = Contact;

// HELPER FUNCTION

function stashPhoto(files, contactId){

  // this returns a generic photo if no file is in the files object
  if(files.file){
    var tempPath  = files.file[0].path,
        relDir    = '/assets/img/',
        absDir    = __dirname + '/../../public' + relDir,
        ext       = path.extname(tempPath),
        name      = contactId + ext,
        absPath   = absDir + name,
        relPath   = relDir + name;

    fs.renameSync(tempPath, absPath);
    return relPath;
  }else{
    return ('/assets/img/generic-profile.png');
  }
}

