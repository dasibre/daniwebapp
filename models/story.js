var db = require('../db')
var Story = db.model('Story', {
  _creator : { type: Number, ref: 'Person' },
 title    : String,
 fans     : [{ type: Number, ref: 'Person' }]
});
module.exports = Story
