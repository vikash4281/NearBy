/**
 * Created by vyshaalnarayanam on 4/16/17.
 */

/**
 * Created by vyshaalnarayanam on 4/13/17.
 */

(function () {

    angular
        .module("NearBy")
        .controller("ProfileGlanceController", ProfileGlanceController);

    function ProfileGlanceController(UserService, $routeParams, $location, ReviewService) {
        var vm = this;
        vm.friendId = $routeParams.userId;
        vm.findBizById = findBizById;
        vm.findUserById = findUserById;
        vm.follow = follow;
        vm.unfollow = unfollow;
        init();

        function init() {
            vm.isFollowing = false;
            UserService
                .getProfile()
                .then(function (response) {
                    vm.currentUser = response.data;
                });
            UserService
                .findUserById(vm.friendId)
                .then(function (response) {
                        if(response.data) {
                            vm.friend = response.data;
                            for(var i in vm.friend.followers){
                                if(vm.friend.followers[i].id == vm.currentUser._id){
                                    vm.isFollowing = true;
                                    break;
                                }
                            }
                        }
                    });
            ReviewService
                .findAllReviewsByUserId(vm.friendId)
                .then(function (response) {
                    vm.reviews = response.data;
                });
        }

        function findBizById(id) {
            $location.url("/biz/"+id);
        }

        function findUserById(id) {
            $location.url("/profile/"+id);
        }

        function follow() {
            var following = {
                id: vm.friend._id,
                username: vm.friend.username
            };
            vm.currentUser.following.push(following);
            UserService.updateUser(vm.currentUser._id,vm.currentUser)
                .then(function () {
                });
            var follower = {
                id: vm.currentUser._id,
                username: vm.currentUser.username
            };
            vm.friend.followers.push(follower);
            UserService.updateUser(vm.friend._id,vm.friend)
                .then(function () {
                });
            init()
        }

        function unfollow(){
            for(var i in vm.friend.followers){
                if(vm.friend.followers[i].id == vm.currentUser._id){
                    vm.friend.followers.splice(i,1);
                    break;
                }
            }
            UserService.updateUser(vm.friend._id,vm.friend)
                .then(function () {
                });
            for(var i in vm.currentUser.following){
                if(vm.currentUser.following[i].id == vm.friend._id){
                    vm.currentUser.following.splice(i,1);
                    break;
                }
            }
            UserService.updateUser(vm.currentUser._id,vm.currentUser)
                .then(function () {
                });
            init()
        }

    }
})();