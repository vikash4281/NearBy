/**
 * Created by vyshaalnarayanam on 4/9/17.
 */

(function () {
    angular.module("NearBy")
        .factory("BizService",BizService);

    // var client_id = "YLV2O0LVCQ3XP21HZEKLH0NA4FLU4NREFDMVQOML1EKHQBBG";
    // var client_secret = "LBHBTNU3PUVQLDZ0F2OX52TLBI4RYRSSF3QLTR33ZUSPLSJX";
    // var v = "20170101";
    // var m = "foursquare";
    // var init_url = "https://api.foursquare.com/v2/";
    // var param_url = "client_id="+client_id+"&client_secret="+client_secret+"&v="+v+"&m="+m;

    function BizService($http,$sce) {
        var api = {
            findBizs: findBizs,
            findBizById: findBizById,
            findSimilarById: findSimilarById,
            findBizsByLLandKeyword: findBizsByLLandKeyword,
            findLLByLocation: findLLByLocation
        };
        return api;

        function findLLByLocation() {

        }

        function findBizs() {

        }
        
        function findSimilarById() {
            
        }

        function findBizById() {

        }

        function test123(response) {
            console.log(response);
        }

        function findBizsByLLandKeyword(ltd,lng,place) {
            var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?callback=test123&location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise&key=AIzaSyDbednY80ODKBngq9ku8uWWZ8Q--Rfveu8";
            var trust_url = $sce.trustAsResourceUrl(url);
            // return $http.jsonp(url, {jsonpCallbackParam: 'callback'});
            $.ajax({
                type: 'GET',
                url: url,
                contentType: "text/plain",
                crossDomain: true,
                dataType: 'jsonp',
                success: function (json) {
                    console.log(json);
                },
                error: function (e) {
                    console.log(e.message);

                }
            });
                // $http
            //     .get(url)
            //     .success(function (response) {
            //         console.log(response);
            //     })
            //     .error(function (err) {
            //         console.log(err);
            //     })
        }
        // function findBizs(location,place) {
        //     // var url = init_url + "venues/search?near="+location+"&query="+place+"&"+param_url;
        //     // return $http.get(url);
        // }
        //
        // function findBizById(id) {
        //     var url = init_url + "venues/"+id+"?"+param_url;
        //     return $http.get(url);
        // }
        //
        // function findSimilarById(id) {
        //     var url = init_url + "venues/"+id+"/similar"+"?"+param_url;
        //     return $http.get(url);
        // }
        //
        // function findBizsByLL(latitude,longitude){
        //     var url = init_url + "venues/search?ll="+latitude+","+longitude+"&"+param_url;
        //     return $http.get(url);
        // }

    }

})();
