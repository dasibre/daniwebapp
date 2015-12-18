var Resource = require('../../models/resource')
var expect = require('chai').expect

describe('Resource', function(){
  it('has a type property', function(done){
    var resource = new Resource({type: "Conference Room"});
    expect(resource.type).to.equal("Conference Room");
    done();
  });

  it('has an availability property', function(done){
    var resource = new Resource({type: "Projector", available: true});
    expect(resource.available).to.be.true;
    done();
  })
});
