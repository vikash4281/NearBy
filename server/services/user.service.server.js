/**
 * Created by vyshaalnarayanam on 4/13/17.
 */
var bcrypt = require("bcrypt-nodejs");
module.exports = function(app, userModel, passport) {

    var auth = authorized;
    app.post('/api/login', passport.authenticate('local'), login);
    app.post("/api/register", register);
    app.get("/api/user", auth, getUser);
    app.get("/api/user/:id", auth, getUserById);
    app.put("/api/userrole/:userId",auth,addRole);
    app.put("/api/user/:id", auth, updateUser);
    app.delete("/api/user/:id", auth, deleteUser);
    app.get("/api/loggedin", loggedin);
    app.post("/api/logout", logout);

    function register(req, res) {
        var newUser = req.body;
        newUser.roles = ["user"];
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return userModel.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function getUser (req, res) {
        if (Object.keys(req.query).length === 0) {
            userModel.findAllUsers() // /api/project/user
                .then(
                    function (users) {
                        res.json(users);
                    },
                    function ( err ) {
                        res.status(400).send(err);
                    });
        }
        else if (req.query.username) {
            if (req.query.password) {
                var credentials = {
                    username: req.query.username,
                    password: req.query.password
                };
                userModel.findUserByCredentials(credentials)
                    .then(
                        function (doc) {
                            req.session.currentUser = doc;
                            res.json(doc);
                        },
                        function ( err ) {
                            res.status(400).send(err);
                        })
            }
            else {
                userModel.findUserByUsername(req.query.username)
                    .then(
                        function (doc) {
                            res.json(doc);
                        },
                        function ( err ) {
                            res.status(400).send(err);
                        })
            }
        }
        else
            res.json(null);
    }

    function getUserById (req, res) {
        var userId = req.params.id;
        userModel.findUserById(userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateUser(req,res) {
        var userId = req.params.id;
        var userToUpdate = req.body;
        userModel
            .findUserById(userId)
            .then(
                function (user) {
                    if (user.password !== userToUpdate.password) {
                        userToUpdate.password = bcrypt.hashSync(userToUpdate.password);
                    }
                    userModel
                        .updateUser(userId, userToUpdate)
                        .then(
                            function (doc) {
                                res.json(doc);
                            },
                            function (err) {
                                res.status(400).send(err);
                            }
                        );
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUser (req, res) {
        if(isAdmin(req.user)) {
            var userId = req.params.id;
            userModel.deleteUser(userId)
                .then(
                    function (doc) {
                        res.json(doc);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.send(403);
        }
    }

    function loggedin(req, res) {
        console.log(req.user)
        res.json(req.isAuthenticated() ? req.user : null);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function addRole(req, res) {
            var userId = req.params.userId;
            var role = req.body.role;
            userModel.findUserById(userId)
                .then(
                    function (user) {
                        if(user.roles.indexOf(role)<0) {
                            user.roles.push(role);
                        }
                        return userModel.updateUser(userId, user)
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                )
                .then(
                    function (doc) {
                        res.json(doc);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function isAdmin(user) {
        if(user.roles.indexOf("admin") > -1) {
            return true;
        }
        return false;
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }
};