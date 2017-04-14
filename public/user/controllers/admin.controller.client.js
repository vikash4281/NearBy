/**
 * Created by vyshaalnarayanam on 4/14/17.
 */

(function () {
    angular
        .module("NearBy")
        .controller("AdminController", AdminController);

    function AdminController(UserService) {
        var vm = this;
        vm.removeUser = removeUser;
        init();

        function init() {
            UserService.findAllUsers()
                .then(function (response) {
                    vm.users = response.data;
                });
        }

        function removeUser(id){
            UserService.deleteUserById(id)
                .then(function (response) {
                    vm.success = "User deleted successfully";
                });
            init();
        }
    }
})();