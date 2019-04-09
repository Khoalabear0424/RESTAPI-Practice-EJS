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

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

con.connect();

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page 

app.get('/', function (req, res) {
    if (error) res.send(error)
    else res.send('/index.html')
})

app.get('/home', function (req, res) {
    con.query('SELECT * FROM mmstats_2017', function (error, results, fields) {
        if (error) res.send(error)
        else res.send('/home.html')
    });
})

// app.get('/login', function (req, res) {
//     con.query('SELECT * FROM mmstats_2017', function (error, results, fields) {
//         if (error) res.send(error)
//         else res.send('/home.html')
//     });
// })

app.get('/game-stats', function (req, res) {
    con.query('SELECT * FROM mmstats_2017', function (error, results, fields) {
        if (error) res.send(error)
        else res.render('pages/stats', {
            data: results,
        })
    });
})


app.listen(3000, function () {
    console.log('listening on 3000')
});