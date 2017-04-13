/**
 * Created by vyshaalnarayanam on 4/9/17.
 */

(function () {
    angular.module("NearBy")
        .factory("BizService",BizService);

    var client_id = "YLV2O0LVCQ3XP21HZEKLH0NA4FLU4NREFDMVQOML1EKHQBBG";
    var client_secret = "LBHBTNU3PUVQLDZ0F2OX52TLBI4RYRSSF3QLTR33ZUSPLSJX";
    var v = "20170101";
    var m = "foursquare";
    var init_url = "https://api.foursquare.com/v2/";
    var param_url = "client_id="+client_id+"&client_secret="+client_secret+"&v="+v+"&m="+m;

    function BizService($http,$sce) {
        var api = {
            findBizs: findBizs,
            findBizById: findBizById,
            findSimilarById: findSimilarById,
            findBizsByLL: findBizsByLL
        };
        return api;


        function findBizs(location,place) {
            var url = init_url + "venues/search?near="+location+"&query="+place+"&"+param_url;
            return $http.get(url);
        }

        function findBizById(id) {
            var url = init_url + "venues/"+id+"?"+param_url;
            return $http.get(url);
        }

        function findSimilarById(id) {
            var url = init_url + "venues/"+id+"/similar"+"?"+param_url;
            return $http.get(url);
        }

        function findBizsByLL(latitude,longitude){
            var url = init_url + "venues/search?ll="+latitude+","+longitude+"&"+param_url;
            return $http.get(url);
        }

    }

})();
