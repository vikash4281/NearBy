/**
 * Created by vyshaalnarayanam on 4/13/17.
 */
(function () {
    angular.module("NearBy")
        .factory("UserService",UserService);

    function UserService($http,$rootScope) {

        var api = {
            setCurrentUser: setCurrentUser,
            login: login

        };
        return api;

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function login(user) {
            return $http.post("/api/project/login", user);
        }


    }
})();