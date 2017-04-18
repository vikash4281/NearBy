/**
 * Created by vyshaalnarayanam on 4/14/17.
 */

(function () {
    angular
        .module("NearBy")
        .controller("AdminController", AdminController);

    function AdminController(UserService,$location) {
        var vm = this;
        vm.removeUser = removeUser;
        vm.findUserById = findUserById;
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

        function findUserById(id) {
            $location.url('/profile/'+id);
        }
    }
})();