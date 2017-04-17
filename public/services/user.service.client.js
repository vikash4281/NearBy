/**
 * Created by vyshaalnarayanam on 4/13/17.
 */
(function () {
    angular.module("NearBy")
        .factory("UserService",UserService);

    function UserService($http,$rootScope) {

        var api = {
            setCurrentUser: setCurrentUser,
            login: login,
            updateUser: updateUser,
            getCurrentUser: getCurrentUser,
            register: register,
            getProfile: getProfile,
            logout: logout,
            findAllUsers: findAllUsers,
            deleteUserById: deleteUserById,
            likePlace: likePlace,
            dislikePlace: dislikePlace
        };
        return api;

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $http.get("/api/loggedin");
        }

        function login(user) {
            return $http.post("/api/login", user);
        }

        function logout() {
            return $http.post("/api/logout");
        }

        function updateUser(userId, user) {
            return $http.put("/api/user/" + userId, user);
        }

        function register(user) {
            return $http.post("/api/register", user);
        }

        function getProfile() {
            return $http.get("/api/user/"+$rootScope.currentUser._id);
        }

        function findAllUsers() {
            return $http.get("/api/findAllUsers");
        }

        function deleteUserById(userId) {
            return $http.delete ("/api/user/" + userId);
        }

        function likePlace(userId, placeId) {
            return $http.put("/api/likePlace/" + userId + "/" + placeId);
        }

        function dislikePlace(userId, placeId) {
            return $http.put("/api/dislikePlace/" + userId + "/" + placeId);
        }
    }
})();