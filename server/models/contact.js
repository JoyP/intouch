'use strict';

function Contact(){
}

Object.defineProperty(Contact, 'collection',{
  get: function(){return global.mongodb.collection('contacts');}
});

Contact.create = function(o,cb){
  Contact.collection.save(o,cb);
};

Contact.all = function(cb){
  Contact.collection.find().toArray(cb);
};

module.exports = Contact;
