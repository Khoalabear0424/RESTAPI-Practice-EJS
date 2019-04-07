// load the things we need
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "march_madness_db"
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

con.connect();

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page 
app.get('/', function (req, res) {
    res.render('pages/index');
});

app.get('/about', function (req, res) {
    res.render('pages/about');
});

app.get('/class', function (req, res) {
    res.render('pages/class', {
        data: [
            { id: 1, name: 'rob' },
            { id: 2, name: 'joe' },
            { id: 3, name: 'nick' },
            { id: 4, name: 'haven' },
            { id: 5, name: 'sandy' }
        ],

        classroom: 507
    });
})

app.get('/animals', function (req, res) {
    con.query('SELECT * FROM mmstats_2017', function (error, results, fields) {
        if (error) res.send(error)
        else res.render('pages/animals', {
            data: results,
        })
    });
})


app.listen(3000, function () {
    console.log('listening on 3000')
});