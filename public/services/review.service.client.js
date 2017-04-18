/**
 * Created by vyshaalnarayanam on 4/16/17.
 */

(function(){
    angular
        .module("NearBy")
        .factory("ReviewService",ReviewService);

    function ReviewService($http) {
        var api = {
            addReview:addReview,
            editReview:editReview,
            deleteReview:deleteReview,
            findAllReviews:findAllReviews,
            findAllReviewsByBizId:findAllReviewsByBizId,
            findAllReviewsByUserId:findAllReviewsByUserId
        };
        return api;

        function addReview(review) {
            return $http.post("/api/review", review);
        }

        function editReview(review) {
            return $http.put("/api/review", review);
        }

        function deleteReview(reviewId) {
            return $http.delete("/api/review/"+reviewId);
        }

        function findAllReviewsByBizId(bizId) {
            return $http.get("/api/biz/reviews/"+bizId);
        }

        function findAllReviewsByUserId(userId) {
            return $http.get("/api/user/reviews/"+userId);
        }

        function findAllReviews() {
            return $http.get("/api/reviews");
        }
    }
})();
