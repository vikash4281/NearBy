/**
 * Created by vyshaalnarayanam on 4/13/17.
 */
module.exports = function(mongoose) {

    var mongoose = require('mongoose');
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        likes : [{id: String, name: String, category: String}],
        google: {
            id: String
        },
        facebook: {
            id: String
        },
        dateCreated: {type: Date, default: Date.now},
        role: {type: String, enum: ['admin', 'user'], default: 'user'}
    }, {collection: 'User'});
    return UserSchema;
};
