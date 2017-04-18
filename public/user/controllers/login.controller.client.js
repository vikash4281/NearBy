/**
 * Created by vyshaalnarayanam on 4/13/17.
 */

(function () {
    angular
        .module("NearBy")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.message = null;
        vm.login = login;

        function login(user) {
            vm.message = null;
            if (user == null) {
                vm.message = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                vm.message = "Please provide a username";
                return;
            }
            if (!user.password) {
                vm.message = "Please provide a password";
                return;
            }
            var username = user.username;
            var password = user.password;
            UserService
                .login(user)
                .then(
                    function(response)
                    {
                        UserService.setCurrentUser(response.data);
                        $location.url("/bizsearch");
                    },
                    function(err) {
                        vm.error = err;
                        vm.message = "Invalid credentials";
                    }
                );
        }
    }
})();