/**
 * Created by vyshaalnarayanam on 4/9/17.
 */

(function () {
    angular.module("NearBy")
        .controller("BizListController",BizListController);

    function BizListController($location,$routeParams,BizService,SearchService) {
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
                },function (error) {
                    vm.bizs = [];
                });
            BizService.findBizsToExploreByLocation(vm.location)
                .then(function (response) {
                    vm.trendingbizs = response.data.response.groups[0].items;
                });
        }

        function search() {
            vm.errorplace = "";
            vm.errorlocation = "";
            if(vm.place == null || vm.place == ""){
                vm.errorplace = "Please enter what you are looking for";
                return;
            }
            if(vm.location == null || vm.location == ""){
                vm.errorlocation = "Please specify a location";
                return;
            }
            SearchService.setPlace(vm.place);
            SearchService.setLocation(vm.location);
            $location.url('/bizlist/'+ vm.location + '/' + vm.place);
        }

        function findBizById(id) {
            $location.url('/biz/'+id);
        }

    }
})();