var request = require('supertest')
var expect = require('chai').expect
var app = require('../daniweb.js')

describe('Index view', function(){
  it('should display users', function(done){
    request(app).get('/')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err,res){
        if(err) done(err);
        expect(res.body).to.include('John')
        done()
      })
  })
})

describe('GET Resources', function(){
  it('shows all available rooms', function(done){
    request(app).get('/resources')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err,res){
        if(err) done(err);
        expect(res.body).to.be.an('Array')
        done()
      })
  })
})
