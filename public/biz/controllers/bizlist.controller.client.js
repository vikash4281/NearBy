/**
 * Created by vyshaalnarayanam on 4/9/17.
 */

(function () {
    angular.module("NearBy")
        .controller("BizListController",BizListController);

    function BizListController($location,$routeParams,BizService) {
        var vm = this;
        vm.location = $routeParams.location;
        vm.place = $routeParams.place;
        vm.search = search;
        vm.findBizById = findBizById;
        init();

        function init() {
            BizService.findBizs(vm.location,vm.place)
                .then(function (response) {
                    vm.bizs = response.data.response.venues;
                    console.log(vm.bizs);
                });
            BizService.findBizsToExploreByLocation(vm.location)
                .then(function (response) {
                    vm.trendingbizs = response.data.response.groups[0].items;
                    console.log(vm.trendingbizs);
                });
        }

        function search() {
            $location.url('/bizlist/'+ vm.location + '/' + vm.place);
        }

        function findBizById(id) {
            $location.url('/biz/'+id);
        }

    }
})();