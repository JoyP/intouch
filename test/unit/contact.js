'use strict';

var expect    = require('chai').expect,
    Contact   = require('../../server/models/contact'),
    dbConnect = require('../../server/lib/mongodb'),
    cp        = require('child_process'),
    Mongo     = require('mongodb'),
    db        = 'intouch-test';

describe('Contact', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(don){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
   it('should create a new Contact object', function(){
    var c = new Contact({'fname':'Bob', 'lname':'Felix', 'email':'bob@aol.com', 'street':'101 Main St.', 'city':'Nashville, TN', 'zip':'37212', 'bday':'12/25/1945'});
    expect(c).to.be.instanceof(Contact);
   });
  });


});
