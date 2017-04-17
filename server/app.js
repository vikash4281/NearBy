/**
 * Created by vyshaalnarayanam on 4/13/17.
 */

module.exports = function(app) {

    var model = require("./models/models.server")(app);
    require("./services/user.service.server")(app,model);
    require("./services/review.service.server")(app,model);
};