var request = require('supertest')
var expect = require('chai').expect
var app = require('../daniweb.js')

describe('GET /user', function(){
  it('respond with json', function(done){
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err,res){
        if(err) done(err);
        var expectedUsers = ['John', 'Jane', 'James']
        expect(res.body).to.include('Jane')
        done()
      })
  })
})
