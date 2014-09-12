'use strict';

function Contact(o){
  this.fname    = o.fname;
  this.lname    = o.lname;
  this.phone    = o.phone;
  this.email    = o.email;
  this.street   = o.street;
  this.city     = o.city;
  this.zip      = o.zip;
  this.bday     = o.bday;
  this.photo    = o.photo;
}

Object.defineProperty(Contact, 'collection',{
  get: function(){return global.mongodb.collection('contacts');}
});

Contact.create = function(o,cb){
  var c = new Contact(o);
  Contact.collection.save(c,cb);
};

Contact.all = function(cb){
  Contact.collection.find().toArray(cb);
};

module.exports = Contact;
