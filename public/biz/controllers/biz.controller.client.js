/**
 * Created by vyshaalnarayanam on 4/9/17.
 */

(function () {
    angular.module("NearBy")
        .controller("BizController",BizController);

    function BizController($location,$routeParams,BizService,SearchService,UserService,ReviewService) {
        var vm = this;
        vm.bizid = $routeParams.bizid;
        vm.findBizById = findBizById;
        vm.getHalfStarVisible = getHalfStarVisible;
        vm.goback = goback;
        vm.likePlace = likePlace;
        vm.dislikePlace = dislikePlace;
        vm.addReview = addReview;
        vm.findUserById = findUserById;
        vm.deleteReview = deleteReview;
        init();

        function init() {
            vm.review = {};
            vm.newsfeed = [];
            vm.isLiked = false;
            $('[data-toggle="tooltip"]').tooltip();
            BizService.findBizById(vm.bizid)
                .then(function (response) {
                    vm.biz = response.data.response.venue;
                    vm.lat = vm.biz.location.lat;
                    vm.lng = vm.biz.location.lng;
                });
            BizService.findSimilarById(vm.bizid)
                .then(function (response) {
                    vm.bizs = response.data.response.similarVenues.items;
                });
            UserService
                .getCurrentUser()
                .then(function (response) {
                    if (response.data) {
                        vm.user = response.data;
                        for(i in vm.user.likes){
                            if(vm.user.likes[i].id==vm.bizid){
                                vm.isLiked = true;
                                break
                            }
                        }
                        var ids = [];
                        for(var i in vm.user.following){
                            ids.push(vm.user.following[i].id);
                        }
                        ReviewService.findAllReviewsByUserIds(ids)
                            .then(function (response) {
                                vm.newsfeed = response.data;
                            });
                    }
                });
            ReviewService.findAllReviewsByBizId(vm.bizid)
                .then(function (response) {
                    vm.reviews = response.data;
                })

        }

        function findBizById(id) {
            $location.url('/biz/'+id);
        }

        function getHalfStarVisible(rating) {
            var absDiff = Math.abs(rating % 1);

            if(absDiff == 0.1) {
                return false;
            }

            return absDiff > 0;
        }
        
        function goback() {
            vm.location = SearchService.getLocation();
            vm.place =  SearchService.getPlace();
            $location.url('/bizlist/'+vm.location+'/'+vm.place);
        }

        function likePlace() {
            var like = {
                id: vm.biz.id,
                name: vm.biz.name,
                category: vm.biz.categories[0].name
            };
            vm.user.likes.push(like);
            UserService.updateUser(vm.user._id,vm.user)
                .then(function (response) {
                    init();
                });
        }

        function dislikePlace() {
            for(var i in vm.user.likes){
                if(vm.user.likes[i].id == vm.biz.id){
                    vm.user.likes.splice(i,1);
                    break;
                }
            }
            UserService.updateUser(vm.user._id,vm.user)
                .then(function (response) {
                    init();
                });
        }

        function addReview(review) {
            if(review.description == null){
                vm.error = "You can't submit an empty review";
                init();
                return;
            }
            review.userId = vm.user._id;
            review.username = vm.user.username;
            review.bizId = vm.biz.id;
            review.bizname = vm.biz.name;
            ReviewService.addReview(review)
                .then(function () {
                    vm.message = "Review added"
                });
            init();
        }

        function findUserById(id) {
            $location.url('profile/'+id);
        }

        function deleteReview(reviewId) {
            ReviewService.deleteReview(reviewId)
                .then(function () {
                });
            init();
        }

    }
})();