/**
 * Created by vyshaalnarayanam on 4/11/17.
 */

(function () {

    angular
        .module("NearBy")
        .controller("HeaderController", HeaderController);

    function HeaderController($location,UserService){
        var vm = this;
        vm.query = '';
        vm.submit = submit;
        vm.logout = logout;

        function logout() {
            UserService
                .logout()
                .then(function(){
                    UserService.setCurrentUser(null);
                    console.log("camehere")
                    $location.url("/bizsearch");
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