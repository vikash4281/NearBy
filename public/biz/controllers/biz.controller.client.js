/**
 * Created by vyshaalnarayanam on 4/9/17.
 */

(function () {
    angular.module("NearBy")
        .controller("BizController",BizController);

    function BizController($location,$routeParams,BizService) {
        var vm = this;
        vm.bizid = $routeParams.bizid;
        vm.findBizById = findBizById;
        init();

        function init() {
            BizService.findBizById(vm.bizid)
                .then(function (response) {
                    vm.biz = response.data.response.venue;
                    vm.lat = vm.biz.location.lat;
                    vm.lng = vm.biz.location.lng;
                });
            BizService.findSimilarById(vm.bizid)
                .then(function (response) {
                    vm.bizs = response.data.response.similarVenues.items;
                });
        }

        function findBizById(id) {
            $location.url('/biz/'+id);
        }

    }
})();