var express = require('express')
var app = express();

var Person = require('./models').Person
var Story = require('./models').Story

var handlebars = require('express-handlebars');
var fs = require('fs') //nodejs file system module

var _ = require('lodash') //javascript utility library
var users = [] //users var

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

fs.readFile('users.json', {encoding: 'utf8'}, function (err, data) {
	if(err) throw err;

	JSON.parse(data).forEach(function(user) {
		user.name.full = _.startCase(user.name.first + ' ' + user.name.last)
		users.push(user)
	})
});

function testDb(cb) {
	var id = Math.floor(Math.random() * (100));
	var name = 'Aarron ' + id;
	var aaron = new Person({ _id: id, name: name, age: 100 });
	aaron.save(function(err) {
		if(err) return console.log(err);
		var story1 = new Story({
			title: "Once upon a time in mexico.",
			_creator: aaron._id
		})
		story1.save(function(err) {
			if(err) return console.log(err)
			console.log(story1.title + ' Successfully saved to database')
		})
		cb(aaron)
	})
}

app.get('/testdb', function(req,res) {
	testDb(function(person) {
		res.send(person.name)
	})
})

app.get('/stories', function(req,res) {
	Story
.find({ _creator: 8 })
.exec(function (err, stories) {
  if (err) return console.log(err);
  res.send('Aarons stories array' + stories);
  // prints "The creator is Aaron"
});
})

app.get('/story', function(req,res) {
	Story
.findOne({ title: 'Once upon a time in mexico.' })
.populate('_creator')
.exec(function (err, story) {
  if (err) return console.log(err);
  res.send('The creator is %s ' + story._creator.name);
  // prints "The creator is Aaron"
});
})

var testUsers = ['John', 'Jane', 'James']
app.get('/',function(req,res){
	res.status(200).json(users)
})

app.get('/about',function(req,res){
  res.render('about');
})

app.get('/users/:id', function(req,res){
	res.send()
})
//custom 404 page
app.use(function(req,res){
  res.status(404);
  res.send('404');
})
//custom 500 page
app.use(function(req,res){
  console.error(err.stack);
  res.status(500);
  res.send('500');
})

app.listen(app.get('port'), function(){
  console.log('App is running on http://localhost:' + app.get('port'));
});

module.exports = app;
