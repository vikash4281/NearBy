/**
 * Created by vyshaalnarayanam on 4/13/17.
 */

module.exports = function(app, db, mongoose, passport, UserModel) {

    var userService  = require("./services/user.service.server.js") (app, UserModel, passport);
};