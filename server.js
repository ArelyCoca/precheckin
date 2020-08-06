// server.js
// load the things we need
var express = require('express');
var app = express();
var path = require('path');

// set the view engine to ejs
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

// index page 
app.get('/', function(req, res) {
    res.render('home.html');
});
app.get('/enter-data', function(req, res) {
    res.render('enterData-1.html');
});
app.get('/enter-data-2', function(req, res) {
    res.render('enterData-2.html');
});
app.get('/guest-load-img', function(req, res) {
    res.render('guest-img.html');
});
app.get('/guest-fill-data', function(req, res) {
    res.render('guest-data.html');
});
app.get('/enter-data-success', function(req, res) {
    res.render('enterData-success.html');
});
app.get('/homefull', function(req, res) {
    res.render('homefull.ejs');
});
// about page 
// app.get('/about', function(req, res) {
//     res.render('pages/about');
// });

app.listen(3000, function(err){
	
	if(err) return console.log('Error'), process.exit(1);

	console.log('Pre Check-in Funcionando');
});;