var express = require('express');
var app = express();
var bodyParser    = require('body-parser');
var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var mongoose      = require('mongoose');

var connectionString = 'mongodb://127.0.0.1:27017/NearBy';

var db = mongoose.connect(connectionString);

app.use(bodyParser.json());// for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));// for parsing application/x-www-form-urlencoded
app.use(
    session({ secret: "don't forget to configure the secret", //process.env.PASSPORT_SECRET
        resave: true,
        saveUninitialized: true}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 3000;
console.log(port);

var UserSchema = require("./server/models/user.schema.server.js")(mongoose);
var User = mongoose.model("User", UserSchema);
var UserModel = require('./server/models/user.model.server')(db, mongoose, User);

require("./security/security")(app, UserModel, passport);

require("./server/app.js")(app, db, mongoose, passport, UserModel);

app.listen(port);