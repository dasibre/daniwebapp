var db = require('../db')
var Resource = db.model('Resource', {
  type: String,
  available: Boolean,
});
module.exports = Resource;
