'use strict';

var Mongo  = require('mongodb'),
 //  fs     = require('fs'),
 //   path   = require('path');
    _      = require('underscore');

function Contact(ownerId, contactInfo, files){
  console.log('constructor>>>>>>>>>>>>> contactInfo', contactInfo);
  this.ownerId  = Mongo.ObjectID(ownerId);
  this.fname    = contactInfo.fname;
  this.lname    = contactInfo.lname;
  this.phone    = contactInfo.phone;
  this.email    = contactInfo.email;
  this.street   = contactInfo.street;
  this.city     = contactInfo.city;
  this.zip      = contactInfo.zip;
  this.bday     = (contactInfo.bday) ? (new Date(contactInfo.bday)) : '';
  // this.photo    = stashPhoto(files[0], this._id);
  console.log('constructor>>>>>>>>>>>>> new contact', this);
}

Object.defineProperty(Contact, 'collection',{
  get: function(){return global.mongodb.collection('contacts');}
});

Contact.create = function(user, fields, files, cb){
  var c = new Contact(user, fields, files);
  console.log('Contact.create>>>>>>>>>>>>>>>> c', c);
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
      case 'bday':
        self.bday = new Date(fields[property]);
        break;
      default:
        self[property] = fields[property];
    }
  });
/*
<<<<<<< HEAD
  this.photo    = stashPhoto(files[0], this._id);
  this._id      = Mongo.ObjectID(this._id);
  this.ownerId  = Mongo.ObjectID(this.ownerId);

=======
  this._id = Mongo.ObjectID(this._id);
>>>>>>> 66e84fe43a8f22723c530dcf39dd18a70a3f8f54
*/

  Contact.collection.save(this, cb);
};

module.exports = Contact;

// HELPER FUNCTIONS
/*
function stashPhoto(file, contactId){

  if(!file.size){return;}

  var stashDir  = __dirname + '/../public/assets/img/',
      ext       = path.extname(file.path),
      name      = contactId + ext,
      stashPath = stashDir + name;

  fs.renameSync(file.path, stashPath);
  return stashPath;
}
*/
