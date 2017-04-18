/**
 * Created by vyshaalnarayanam on 4/16/17.
 */

module.exports = function () {

    var api = {
        addReview:addReview,
        findAllReviewsByBizId:findAllReviewsByBizId,
        findAllReviewsByUserId:findAllReviewsByUserId,
        editReview:editReview,
        deleteReview:deleteReview,
        findReviews:findReviews,
        findAllReviewsByUserIds: findAllReviewsByUserIds
    };

    var mongoose = require('mongoose');

    var ReviewSchema = require('./review.schema.server')();
    var ReviewModel = mongoose.model('ReviewModel', ReviewSchema);

    return api;

    function addReview(review) {
        return ReviewModel.create(review);
    }

    function findAllReviewsByBizId(bizId) {
        return ReviewModel.find({bizId: bizId}).sort({"dateCreated": -1});
    }

    function findAllReviewsByUserId(userId) {
        return ReviewModel.find({userId: userId}).sort({"dateCreated": -1});
    }

    function editReview(reviewId,reviewObj) {
        return ReviewModel.update({_id: reviewId}, {$set: reviewObj});
    }

    function deleteReview(reviewId) {
        return ReviewModel.remove({_id: reviewId});
    }

    function findReviews() {
        return ReviewModel.find();
    }

    function findAllReviewsByUserIds(userIds) {
        return ReviewModel.find({userId: {$in: userIds}}).sort({"dateCreated": -1});
    }
};