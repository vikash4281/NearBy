/**
 * Created by vyshaalnarayanam on 4/13/17.
 */

module.exports = function(db, mongoose, UserModel) {

    var mongoose = require('mongoose');
    var UserSchema = require('./user.schema.server')();
    var UserModel = mongoose.model('UserModel', UserSchema);


    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByGoogleId: findUserByGoogleId,
        findUserByFacebookId: findUserByFacebookId,
        findAllUsers: findAllUsers
    };
    return api;

    function createUser(user) {
        return UserModel.create(user);
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function findUserByUsername(username) {
        return UserModel.findOne({"username":username});
    }

    function findUserByCredentials(username, password) {
        return UserModel.findOne({username:username, password: password});
    }

    function updateUser(userId, updatedUser) {
        return UserModel.update({_id:userId},{$set:updatedUser});
    }

    function deleteUser(userId) {
        return UserModel.remove({_id: userId});
    }

    function findUserByGoogleId(googleId) {
        return UserModel
            .findOne({'google.id': googleId});
    }

    function findUserByFacebookId(facebookId) {
        return UserModel
            .findOne({'facebook.id': facebookId});
    }

    function findAllUsers() {
        return UserModel.find();
    }



};