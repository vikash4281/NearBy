/**
 * Created by vyshaalnarayanam on 4/14/17.
 */

(function () {
    angular
        .module("NearBy")
        .controller("ActivityController", ActivityController);

    function ActivityController(UserService,$location,ReviewService) {
        var vm = this;
        vm.findBizById = findBizById;
        vm.dislikePlace = dislikePlace;
        vm.deleteReview = deleteReview;
        init();

        function init() {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    if (response.data) {
                        vm.user = response.data;
                        ReviewService.findAllReviewsByUserId(vm.user._id)
                            .then(function (response) {
                                vm.reviews = response.data;
                            })
                    }
                });
        }

        function findBizById(id) {
            $location.url('/biz/'+id);
        }

        function dislikePlace(id) {
            for(var i in vm.user.likes){
                if(vm.user.likes[i].id == id){
                    vm.user.likes.splice(i,1);
                    break;
                }
            }
            UserService.updateUser(vm.user._id,vm.user)
                .then(function (response) {
                    init();
                });
        }

        function deleteReview(reviewId) {
            ReviewService.deleteReview(reviewId)
                .then(function () {
                });
            init();
        }

    }
})();