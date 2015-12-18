var db = require('../db')
var Person = db.model('Person', {
  _id     : Number,
  name    : String,
  age     : Number,
  stories : [{ type: db.Schema.Types.ObjectId, ref: 'Story' }]
})
module.exports = Person
