/**
 * Created by vyshaalnarayanam on 4/16/17.
 */

module.exports = function (app) {
    var UserModel = require('./user/user.model.server')();

    var model = {
        UserModel: UserModel,
    };
    return model;
};
