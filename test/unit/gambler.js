/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Gambler    = require('../../app/models/gambler'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'derby';

describe('Gambler', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

/*  describe('constructor', function(){
    it('should create a new Gambler object', function(){
      var g = new Gambler({name: 'Bob', spouse: {name:'Janet', photo:'http://www.google.com'}, photo: 'http://www.google.com', cash: 1000, assets: [], results:{wins: 5, loses: 3}});
      expect(g).to.be.instanceof(Gambler);
      expect(g.name).to.equal('Bob');
    });
  }); */

  describe('.all', function(){
    it('should get all gamblers', function(done){
      Gambler.all(function(err, gamblers){
        expect(gamblers).to.have.length(3);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find a gambler by its id', function(done){
      Gambler.findById('000000000000000000000001', function(gambler){
        console.log('GAMBLER', gambler);
        expect(gambler).to.be.instanceof(Gambler);
        expect(gambler.name).to.equal('Bob');
        done();
      });
    });
  });

  describe('#save', function(){
    it('should save a gambler to the database', function(done){
      Gambler.findById('000000000000000000000001', function(gambler){
        gambler.cash = 2000;
        gambler.assets = [];
        gambler.save(function(){
          expect(gambler.cash).to.equal(2000);
          expect(gambler.assets).to.have.length(0);
          done();
        });
      });
    });
  });

  describe('#removeAsset', function(){
    it('should remove an asset from the gambler object', function(done){
      Gambler.findById('000000000000000000000001', function(gambler){
        gambler.removeAsset('ring');
        expect(gambler.cash).to.equal(6000);
        expect(gambler.assets).to.have.length(2);
        done();
      });
    });
  });

}); //last bracket

