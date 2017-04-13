/**
 * Created by vyshaalnarayanam on 4/9/17.
 */

(function () {
    angular.module("NearBy")
        .controller("BizSearchController",BizSearchController);

    function BizSearchController($location,BizService) {
        var vm = this;
        vm.search = search;
        vm.findBizById = findBizById;
        vm.geoLocate = false;
        init();

        function init() {
            vm.place = "";
            detectLocation();
        }

        function search() {
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
                            console.log(vm.bizs)
                        }, function (err) {
                            console.log(err);
                        });
                    BizService.findBizsToExplore(vm.lat,vm.lng)
                        .then(function (response) {
                            vm.trendingbizs = response.data.response.groups[0].items;
                            console.log(vm.trendingbizs);
                        })
                });

            }
        }

        function findBizById(id) {
            $location.url('/biz/'+id);
        }

        // function getPhotoById(id){
        //     BizService.findPhotoById(id)
        //         .then(function (response) {
        //             console.log(response);
        //             return;
        //         })
        // }

    }
})();