/**
 * Created by vyshaalnarayanam on 4/13/17.
 */
module.exports = function(mongoose) {

    var mongoose = require('mongoose');
    var ReviewSchema = mongoose.Schema({
        bizId: String,
        bizname: String,
        userId: String,
        username: String,
        description: String,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: 'Review'});
    return ReviewSchema;
};
