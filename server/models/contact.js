'use strict';

var Mongo  = require('mongodb'),
    fs     = require('fs'),
    path   = require('path'),
    _      = require('underscore');

function Contact(ownerId, contactInfo, files){
  console.log('constructor>>>>>>>>>>>>> contactInfo', contactInfo);
  console.log('constructor>>>>>>>>>>>>> files', files);
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
  console.log('constructor>>>>>>>>>>>>> new contact photo', this.photo[0]);
}

Object.defineProperty(Contact, 'collection',{
  get: function(){return global.mongodb.collection('contacts');}
});

Contact.create = function(user, contactInfo, files, cb){
  var c = new Contact(user, contactInfo, files);
  console.log('Contact.create>>>>>>>>>>>>>>>> c', c);
  console.log('Contact.create>>>>>>>>>>>>>>>> c.photo[1]', c.photo[1]);
  console.log('Contact.create>>>>>>>>>>>>>>>> c.photo[2]', c.photo[2]);
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

function stashPhoto(file, contactId){

  // console.log('stashPhoto>>>>>>>>>>>>>>>>> file', file);
  console.log('');
  var tempPath = file.file[0].path;
  tempPath = tempPath.toString();
  // console.log('stashPhoto>>>>>>>>>>>>>>>>> tempPath', tempPath);

  // if(!file.size){return;}

  console.log('');
  var relDir  = '/public/img/',
      absDir  = __dirname + '/../..' + relDir;
  console.log('relDir>>>>>>>>>>>>>>>>> relDir', relDir);
  console.log('absDir>>>>>>>>>>>>>>>>> absDir', absDir);

  console.log('');
  var ext       = path.extname(tempPath);

  console.log('');
  var name      = contactId + ext,
      absPath = absDir + name,
      relPath = relDir + name;
  console.log('stashPhoto>>>>>>>>>>>>>>>>> name', name);
  console.log('stashPhoto>>>>>>>>>>>>>>>>> absPath', absPath);
  console.log('stashPhoto>>>>>>>>>>>>>>>>> relPath', relPath);

  fs.renameSync(tempPath, absPath);
  return relPath;
}

