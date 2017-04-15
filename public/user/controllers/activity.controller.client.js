/**
 * Created by vyshaalnarayanam on 4/14/17.
 */

(function () {
    angular
        .module("NearBy")
        .controller("ActivityController", ActivityController);

    function ActivityController(UserService,$location) {
        var vm = this;
        vm.findBizById = findBizById;
        init();

        function init() {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    if (response.data) {
                        vm.user = response.data;
                        console.log(vm.user.likes);
                    }
                });
        }

        function findBizById(id) {
            $location.url('/biz/'+id);
        }
    }
})();