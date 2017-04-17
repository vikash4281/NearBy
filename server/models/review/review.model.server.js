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
        findReviews:findReviews
    };

    var mongoose = require('mongoose');

    var ReviewSchema = require('./review.schema.server')();
    var ReviewModel = mongoose.model('ReviewModel', ReviewSchema);

    return api;

    function addReview(review) {
        return ReviewModel.create(review);
    }

    function findAllReviewsByBizId(bizId) {
        return ReviewModel.find({bizId: bizId});
    }

    function findAllReviewsByUserId(userId) {
        return ReviewModel.find({userId: userId});
    }

    function editReview(reviewId,reviewObj) {
        return ReviewModel.update({_id: reviewId}, {$set: reviewObj});
    }

    function deleteReview(reviewId) {
        return ReviewModel.remove({_id:reviewId});
    }

    function findReviews() {
        return ReviewModel.find();
    }

};