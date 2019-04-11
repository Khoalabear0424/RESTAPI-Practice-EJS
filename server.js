// load the things we need
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var bcrypt = require('bcrypt');

var cookieParser = require('cookie-parser');
var session = require('express-session');
var con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "march_madness_db"
});
app.use(methodOverride('_method'))
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(session({ secret: 'app', cookie: { maxAge: 1 * 1000 * 60 * 60 * 24 * 365 } }));
app.use(cookieParser());

con.connect();

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    if (err) res.send(err)
    else res.send('/index.html')
})

app.get('/home', function (req, res) {
    con.query('SELECT * FROM mmstats_2017', function (err, results, fields) {
        if (err) res.send(err)
        else res.send('/home.html')
    });
})

app.post('/signup', (req, res) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, p_hash) => {
            con.query('INSERT INTO userLogin (user_email, user_password) VALUES (?,?)', [req.body.email, p_hash], (err, results, fields) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send('Success!')
                }
            })
        })
    })
})

app.post('/login', function (req, res) {
    con.query('SELECT id, user_password FROM userLogin WHERE user_email = (?)', [req.body.email], (err, results, fields) => {
        if (err) throw error;

        if (results.length == 0) {
            res.send('Try Again');
        } else {
            bcrypt.compare(req.body.password, results[0].user_password, (err, result) => {
                if (result == true) {
                    req.session.user_id = results[0].id;
                    req.session.email = results[0].email;
                    var userData = [req.session.user_id, req.session.email];
                    res.render('pages/home', {
                        data: results,
                    });
                } else {
                    res.send('Wrong Password');
                }
            })
        }
    });
})

app.get('/game-stats', function (req, res) {
    con.query('SELECT * FROM mmstats_2017', function (err, results, fields) {
        if (err) res.send(err)
        else res.render('pages/stats', {
            data: results,
        })
    });
})


app.listen(3000, function () {
    console.log('listening on 3000')
});