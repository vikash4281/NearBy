/**
 * Created by vyshaalnarayanam on 4/9/17.
 */

(function () {
    angular.module("NearBy")
        .controller("BizController",BizController);

    function BizController($location,$routeParams,BizService,SearchService,UserService) {
        var vm = this;
        vm.bizid = $routeParams.bizid;
        vm.findBizById = findBizById;
        vm.getHalfStarVisible = getHalfStarVisible;
        vm.goback = goback;
        vm.likePlace = likePlace;
        vm.dislikePlace = dislikePlace;
        init();

        function init() {
            vm.isLiked = false;
            $('[data-toggle="tooltip"]').tooltip();
            BizService.findBizById(vm.bizid)
                .then(function (response) {
                    vm.biz = response.data.response.venue;
                    console.log(vm.biz);
                    vm.lat = vm.biz.location.lat;
                    vm.lng = vm.biz.location.lng;
                });
            BizService.findSimilarById(vm.bizid)
                .then(function (response) {
                    vm.bizs = response.data.response.similarVenues.items;
                });
            UserService
                .getCurrentUser()
                .then(function (response) {
                    if (response.data) {
                        vm.user = response.data;
                        console.log(vm.user);
                        for(i in vm.user.likes){
                            if(vm.user.likes[i]==vm.bizid){
                                vm.isLiked = true;
                                break
                            }
                        }
                    }
                });

        }

        function findBizById(id) {
            $location.url('/biz/'+id);
        }

        function getHalfStarVisible(rating) {
            var absDiff = Math.abs(rating % 1);

            if(absDiff == 0.1) {
                return false;
            }

            return absDiff > 0;
        }
        
        function goback() {
            vm.location = SearchService.getLocation();
            vm.place =  SearchService.getPlace();
            console.log(vm.place,vm.location);
            $location.url('/bizlist/'+vm.location+'/'+vm.place);
        }

        function likePlace() {
            vm.user.likes.push(vm.biz.id);
            UserService.updateUser(vm.user._id,vm.user)
                .then(function (response) {
                    init();
                });
        }

        function dislikePlace() {
            vm.user.likes.splice(vm.biz.id,1)
            UserService.updateUser(vm.user._id,vm.user)
                .then(function (response) {
                    init();
                });
        }


    }
})();