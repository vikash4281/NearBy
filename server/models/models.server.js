/**
 * Created by vyshaalnarayanam on 4/16/17.
 */

module.exports = function (app) {
    var UserModel = require('./user/user.model.server')();
    var ReviewModel = require('./review/review.model.server')();

    var model = {
        UserModel: UserModel,
        ReviewModel: ReviewModel
    };
    return model;
};
