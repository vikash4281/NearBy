/**
 * Created by vyshaalnarayanam on 4/9/17.
 */

(function () {
    angular
        .module("NearBy")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/bizsearch",{
                templateUrl: "biz/views/bizsearch.view.client.html",
                controller: "BizSearchController",
                controllerAs: "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/bizlist/:location/:place",{
                templateUrl: "biz/views/bizlist.view.client.html",
                controller: "BizListController",
                controllerAs: "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/biz/:bizid",{
                templateUrl: "biz/views/biz.view.client.html",
                controller: "BizController",
                controllerAs: "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/register",{
                templateUrl: "user/views/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/login",{
                templateUrl: "user/views/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/profile",{
                templateUrl: "user/views/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/admin", {
                templateUrl: "user/views/admin.view.client.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn,
                    checkIfAdmin: checkIfAdmin
                }
            })
            .when("/activity", {
                templateUrl: "user/views/activity.view.client.html",
                controller: "ActivityController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .otherwise({
                templateUrl: "biz/views/bizsearch.view.client.html",
                controller: "BizSearchController",
                controllerAs: "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            });
    }

    function getLoggedIn(UserService, $q) {
        var deferred = $q.defer();
        UserService
            .getCurrentUser()
            .then(function(response){
                var currentUser = response.data;
                UserService.setCurrentUser(currentUser);
                deferred.resolve();
            });
        return deferred.promise;
    }

    function checkLoggedIn(UserService, $q, $location) {
        var deferred = $q.defer();
        UserService
            .getCurrentUser()
            .then(function(response) {
                var currentUser = response.data;
                if(currentUser) {
                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();
                } else {
                    UserService.setCurrentUser(null);
                    deferred.reject();
                    $location.url("/bizsearch");
                }
            });
        return deferred.promise;
    }

    function checkIfAdmin(UserService, $q, $location) {
        var deferred = $q.defer();
        UserService
            .getCurrentUser()
            .then(function(response) {
                var currentUser = response.data;
                if(currentUser.roles.indexOf("admin")> -1) {
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url("/bizsearch");
                }
            });
        return deferred.promise;
    }
})();