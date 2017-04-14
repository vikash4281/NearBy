/**
 * Created by vyshaalnarayanam on 4/14/17.
 */

/**
 * Created by vyshaalnarayanam on 4/9/17.
 */

(function () {
    angular.module("NearBy")
        .factory("SearchService",SearchService);

    var place = "";
    var location = "";

    function SearchService() {
        var api = {
            getPlace: getPlace,
            getLocation: getLocation,
            setPlace: setPlace,
            setLocation: setLocation,
        };
        return api;


        function getPlace() {
            return place;
        }

        function getLocation() {
            return location;
        }

        function setLocation(l) {
            location = l;
            return;
        }

        function setPlace(p) {
            place = p;
            return;
        }

    }
})();
