var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/daniweb', function() {console.log('connected to mongodb')})
module.exports = mongoose;
