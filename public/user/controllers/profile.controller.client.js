/**
 * Created by vyshaalnarayanam on 4/13/17.
 */

(function () {

    angular
        .module("NearBy")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $routeParams, $location) {
        var vm = this;
        vm.update = update;
        vm.unfollow = unfollow;
        init();

        function init() {
            UserService
                .getCurrentUser()
                .then(function (response) {
                        if(response.data) {
                            UserService
                                .getProfile()
                                .then(function (response) {
                                    vm.currentUser = response.data;
                                });
                        }
                    }
                );
        }

        function update (user) {
            vm.error = null;
            vm.message = null;

            if (user === null) {
                vm.error = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                vm.error = "Please provide a username";
                return;
            }
            if (!user.email) {
                vm.error = "Please provide a valid email";
                return;
            }
            UserService
                .updateUser(user._id, user)
                .then(function (response) {
                    if(response.data) {
                        vm.message = "User updated successfully";
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                    }
                    else
                        vm.error = "Unable to update the user";
                });
        }

        function unfollow(otherUser){
            UserService.getCurrentUser().then(function (response) {
                vm.currentUser = response.data;
                UserService.findUserById(otherUser.id).then(function (response) {
                    vm.otherUser = response.data;
                    for(var i in vm.otherUser.followers){
                        if(vm.otherUser.followers[i].id==vm.currentUser._id){
                            vm.otherUser.followers.splice(i,1);
                            break;
                        }
                    }
                    UserService.updateUser(vm.otherUser._id,vm.otherUser).then();
                    for(var i in vm.currentUser.following){
                        if(vm.currentUser.following[i].id == vm.otherUser._id){
                            vm.currentUser.following.splice(i,1);
                            break;
                        }
                    }
                    UserService.updateUser(vm.currentUser._id,vm.currentUser).then();
                    init();
                });
            });
        }

    }
})();