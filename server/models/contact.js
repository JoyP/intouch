'use strict';

function Contact(ownerId, o){
  this._id      = Mongo.ObjectID();

}

Object.defineProperty(Contact, 'collection',{
  get: function(){return global.mongodb.collection('contacts');}
});

Contact.create = function(o, cb){
  // var c = new Contact(
  Contact.collection.save(o,cb);
};

Contact.all = function(cb){
  Contact.collection.find().toArray(cb);
};

module.exports = Contact;
