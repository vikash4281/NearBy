/**
 * Created by vyshaalnarayanam on 4/11/17.
 */

(function () {

    angular
        .module("MovieTimeApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($state, UserService) {
        var vm = this;

        vm.toggleMenu = toggleMenu;
        vm.logout = logout;

        function init() {

        }

        init();

        function toggleMenu() {
            $("#wrapper").toggleClass("toggled");
        }

        function logout() {
            UserService
                .logout()
                .then(function () {
                    UserService.setCurrentUser(null);
                    $state.go("home");
                });
        }
    }

})();