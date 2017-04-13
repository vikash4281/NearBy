/**
 * Created by vyshaalnarayanam on 4/13/17.
 */
module.exports = function(mongoose) {


    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        roles: [String]
    }, {collection: 'User'});
    return UserSchema;
};
