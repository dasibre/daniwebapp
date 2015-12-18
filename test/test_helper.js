(function(){
	var config = require('config');
	var dbConfig = config.get('Tender.dbConfig');
	var mongoose = require('mongoose');

	beforeEach(function(done) {
		function clearDB() {
			for (var i in mongoose.connection.collections) {
				mongoose.connection.collections[i].remove(function() {});
			}
			return done();
		}
		if (mongoose.connection.readyState === 0) {
			mongoose.connect(dbConfig.url, function (err) {
				if (err) {
					throw err;
				}
				return done();
			});
		} else {
			return clearDB();
		}
	});

	afterEach(function (done) {
		function clearDB() {
			for (var i in mongoose.connection.collections) {
				mongoose.connection.collections[i].remove(function() {});
			}
			return done();
		}
		clearDB();
		mongoose.disconnect();
		return done();
	});
}());
