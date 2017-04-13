/**
 * Created by vyshaalnarayanam on 4/13/17.
 */
var q = require("q");
module.exports = function(db, mongoose, UserModel) {

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findUsersByIds: findUsersByIds
    };
    return api;

    function createUser(user) {
        var deferred = q.defer();
        UserModel.create(user, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();
        UserModel.find(function (err, users) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();
        UserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateUser(userId, user) {
        var deferred = q.defer();
        // create new user without an _id field
        var newUser = {
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            roles: user.roles,
            rates: user.rates,
            ratedMovies: user.ratedMovies,
            reviews: user.reviews,
            reviewedMovies: user.reviewedMovies,
            follows: user.follows
        };
        UserModel.update (
            {_id: userId},
            {$set: newUser},
            function (err, doc) {
                if(err) {
                    deferred.reject(err);
                }
                else {
                    UserModel.findById(userId,
                        function (err, user) {
                            if(err) {
                                deferred.reject(err);
                            }
                            else {
                                deferred.resolve(user);
                            }
                        });
                }
            });
        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();
        UserModel.remove({_id: userId}, function(err, users){
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        UserModel.findOne({ username: username }, function(err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        var deferred = q.defer();
        UserModel.findOne(
            { username: credentials.username,
                password: credentials.password },
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function findUsersByIds (userIds) {
        var deferred = q.defer();
        UserModel.find({ '_id': { $in: userIds} }, function(err, users){
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });
    }


};