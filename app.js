const express = require('express');
const bodyparser = require('body-parser');

const app = express();

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/live-event',  { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connecté");
});

// Middleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.text());

app.get('/', function (req, res) {
    res.send('<h1>Hello World!</h1>');
});

app.get('/photos', function (req, res) {
    res.send('<h1>Hello World!</h1>');
});

app.post('/photo', function (req, res) {
    res.send('<h1>Hello World!</h1>');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

