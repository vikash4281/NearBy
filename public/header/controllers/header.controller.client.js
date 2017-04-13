/**
 * Created by vyshaalnarayanam on 4/11/17.
 */

(function () {

    angular
        .module("MovieTimeApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location,UserService){
        var vm = this;
        vm.query = '';
        vm.submit = submit;
        vm.logout = logout;

        function logout() {
            UserService
                .logout()
                .then(function(){
                    UserService.setCurrentUser(null);
                    $location.url("/home");
                });
        }

        function submit(){
            if(vm.query) {
                $location.url("/search/"+vm.query);
                vm.query = '';
            }
        }
    }

})();