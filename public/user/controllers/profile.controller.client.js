/**
 * Created by vyshaalnarayanam on 4/13/17.
 */

(function () {

    angular
        .module("NearBy")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $routeParams) {
        var vm = this;
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
            if (!user.password) {
                vm.error = "Please provide a password";
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

    }
})();