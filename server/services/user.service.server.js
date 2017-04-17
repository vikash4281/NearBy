/**
 * Created by vyshaalnarayanam on 4/13/17.
 */

module.exports = function (app, model) {
    var passport = require('passport');
    var bcrypt = require("bcrypt-nodejs");

    var LocalStrategy = require('passport-local').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID, // "672100439761-hbmorpc8vrh6qd189q81kgkooqag8d7k.apps.googleusercontent.com",
        clientSecret : process.env.GOOGLE_CLIENT_SECRET, // "tzx95TsPREe_7HAl-DvhM-bA",
        callbackURL  : process.env.GOOGLE_CALLBACK // "http://localhost:3000/google/callback"
    };

    var FacebookStrategy = require('passport-facebook').Strategy;
    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID, // "1845497609050511",
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET, // "5d539caa45a29a7c1a7cb47430d4a1d3",
        callbackURL  : process.env.FACEBOOK_CALLBACK // "http://localhost:3000/auth/facebook/callback"
    };
    passport.use(new LocalStrategy(localStrategy));
    passport.use(new GoogleStrategy(googleConfig, googleStrategy));
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var UserModel = model.UserModel;
    var auth = authorized;

    app.post('/api/login',passport.authenticate('local'),login);
    app.post('/api/checkLogin', checkLogin);
    app.post('/api/checkAdmin', checkAdmin);
    app.post('/api/logout', logout);
    app.get ('/api/loggedin', loggedin);
    app.post ('/api/register', register);

    app.get("/api/user", findUserByCredentials);
    app.get("/api/user/:userId", findUserById);
    app.get("/api/user", findUser);
    app.post("/api/user", createUser);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    app.get("/api/user",findUserByUsername);
    app.get('/api/findAllUsers/',findAllUsers);

    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/#/bizsearch',
            failureRedirect: '/#/bizsearch'
        }));


    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/google/callback',
            passport.authenticate('google', {
                successRedirect: '/#/bizsearch',
                failureRedirect: '/#/bizsearch'
        }));


    function register(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        UserModel.createUser(user)
            .then(function (user){
                if(user){
                    req.login(user, function (err) {
                        if(err){
                            res.status(500).send(err);
                        }
                        else{
                            res.json(user);
                        }
                    });
                }
            });
    }

    function findUserByCredentials(req, res){
        var username = req.query.username;
        var password = req.query.password;
        UserModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findUserById(req, res) {
        var userId = req.params['userId'];
        UserModel.findUserById(userId)
            .then(
                function (user) {
                    res.send(user);
                },
                function (err) {
                    res.sendStatus(500).send(err);
                }
            );
    }

    function findUser(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if (username && password) {
            findUserByCredentials(req, res);
        } else if (username) {
            findUserByUsername(req, res);
        }
    }

    function createUser(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        UserModel.createUser(user)
            .then(function (user) {
                    res.send(user);
                },
                function (error) {
                    res.sendStatus(500).send(error);
                }
            );

    }

    function updateUser(req, res) {
        var userId = req.params['userId'];
        var newUser = req.body;

        UserModel
            .updateUser(userId, newUser)
            .then(function (response) {
                UserModel
                        .findUserById(userId)
                        .then(function (response) {
                            res.json(response);
                        }, function () {
                            res.sendStatus(404);
                        })
                },
                function () {
                    res.sendStatus(404);
                });
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        UserModel
            .deleteUser(userId)
            .then(function() {
                res.sendStatus(200);
            },function(err) {
                res.sendStatus(500).send(err);
            });
    }

    function findUserByUsername(req, res) {
        var username = req.query['username'];
        UserModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user) {
                        res.json(user);
                    } else {
                        res.sendStatus(400).send(error);
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findAllUsers(req,res) {
        UserModel.findAllUsers()
            .then(function (users) {
                res.send(users);
            })
    }

    function login(req, res) {
        var user  = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    function loggedin(req, res) {
        res.json(req.isAuthenticated() ? req.user : '0');
    }

    function checkLogin(req, res) {
        res.json(req.isAuthenticated() ? req.user :  '0');
    }

    function checkAdmin(req, res) {
        var loggedIn = req.isAuthenticated();
        var isAdmin = req.user.role == 'ADMIN';

        if(loggedIn&& isAdmin)
            res.json(req.user);
        else
            res.send('0');
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        UserModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    console.log(err);
                    done(err, null);
                }
            );
    }

    function localStrategy(username, password, done) {
        UserModel
            .findUserByUsername(username)
            .then(function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    function googleStrategy(token, refreshToken, profile, done) {
        UserModel
            .findUserByGoogleId(profile.id)
            .then(function (user) {
                console.log(user);
                if(user) {
                    done(null, user);
                } else {
                    var user = {
                        username: profile.name.givenName,
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     profile.emails[0].value,
                        google: {
                            id:    profile.id
                        }
                    };
                    return UserModel.createUser(user);
                }
            }, function (err) {
                done(err, null);
            })
            .then(function (user) {
                done(null, user);
            }, function (err) {
                done(err, null);
            });
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        UserModel
            .findUserByFacebookId(profile.id)
            .then(function (user) {
                console.log(user);
                if(user) {
                    done(null, user);
                } else {
                    var newFacebookUser = {
                        username:  profile.displayName.replace(/\s+/g, ''),
                        firstName: profile.displayName.split(" ")[0],
                        lastName:  profile.displayName.split(" ")[1],
                        facebook: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return UserModel.createUser(newFacebookUser);
                }
            }, function (err) {
                done(err, null);
            })
            .then(function (user) {
                done(null, user);
            }, function (err) {
                done(err, null);
            });
    }

};