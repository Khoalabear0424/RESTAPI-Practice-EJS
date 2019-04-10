// load the things we need
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "march_madness_db"
});
app.use(methodOverride('_method'))
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

con.connect();

app.set('view engine', 'ejs');

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

//WORK ON LOGIN
app.get('/login/:email/:password', function (req, res) {
    console.log(req.params.email + req.params.password);
    con.query('SELECT user_password FROM userLogin WHERE user_email = (?)', [req.params.email], function (error, results, fields) {
        if (error) res.send(error)
        else {
            res.json({ redirect: "/home.html" })
            // res.redirect('/home.html')
        }
    });
})

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