/**
 * Created by vyshaalnarayanam on 4/16/17.
 */

module.exports = function (app, model) {
    var ReviewModel = model.ReviewModel;
    app.post("/api/review",addReview);
    app.put("/api/review",editReview);
    app.delete("/api/review/:reviewId",deleteReview);
    app.get("/api/biz/reviews/:bizId",findAllReviewsByBizId);
    app.get("/api/user/reviews/:userId",findAllReviewsByUserId);
    app.get("/api/reviews",findAllReviews);
    app.get("/api/multipleuserreviews/:ids",findAllReviewsByUserIds);

    function addReview(req, res) {
        var review = req.body;
        ReviewModel
            .addReview(review)
            .then(
                function (review) {
                    res.json(review);
                },
                function (err) {
                    res.status(500).send(err);
                }
            );
    }

    function editReview(req,res) {
        var review = req.body;
        var reviewId = review._id;
        ReviewModel.editReview(reviewId,review)
            .then(function (review) {
                res.json(review);
            },function (err) {
                res.status(500).send(err);
            });
    }

    function deleteReview(req,res) {
        var reviewId = req.params.reviewId;
        ReviewModel.deleteReview(reviewId)
            .then(function (response) {
                res.json(response);

            },function (err) {
                res.status(400).send(err);
            })
    }

    function findAllReviewsByBizId(req,res) {
        var bizId = req.params.bizId;
        ReviewModel.findAllReviewsByBizId(bizId)
            .then(function (reviews) {
                res.json(reviews);
            },function (err) {
                res.status(500).send(err);

            });

    }

    function findAllReviewsByUserId(req,res) {
        var userId = req.params.userId;
        ReviewModel.findAllReviewsByUserId(userId)
            .then(function (reviews) {
                res.json(reviews);
            },function (err) {
                res.status(500).send(err);

            });

    }

    function findAllReviews(req, res) {
        ReviewModel.findReviews()
            .then(function (reviews) {
                res.json(reviews);
            },function (err) {
                res.status(500).send(err);
            });
    }

    function findAllReviewsByUserIds(req,res) {
        var userIds = req.params.ids.split(',');
        ReviewModel.findAllReviewsByUserIds(userIds)
            .then(function (reviews) {
                res.json(reviews);
            });
    }

};
