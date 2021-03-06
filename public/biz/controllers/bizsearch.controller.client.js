/**
 * Created by vyshaalnarayanam on 4/9/17.
 */

(function () {
    angular.module("NearBy")
        .controller("BizSearchController",BizSearchController);

    function BizSearchController($location,BizService,UserService,SearchService) {
        var vm = this;
        vm.search = search;
        vm.findBizById = findBizById;
        vm.geoLocate = false;
        init();

        function getCurrentUser() {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    vm.currentUser = response.data;
                })
        }

        function init() {
            getCurrentUser();
            detectLocation();
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

        function detectLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position){
                    vm.lat = position.coords.latitude;
                    vm.lng = position.coords.longitude;
                    vm.geoLocate = true;
                    BizService
                        .findBizsByLL(vm.lat,vm.lng)
                        .then(function (response) {
                            vm.bizs = response.data.response.venues;
                        });
                    BizService.findBizsToExploreByLL(vm.lat,vm.lng)
                        .then(function (response) {
                            vm.trendingbizs = response.data.response.groups[0].items;
                        });
                });

            }
        }

        function findBizById(id) {
            $location.url('/biz/'+id);
        }

    }
})();