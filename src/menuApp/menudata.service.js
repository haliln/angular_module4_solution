(function () {
    'use strict';

    angular.module('data')
    .service('MenuDataService', MenuDataService);

    // Get the resturant data from herokuapp service
    MenuDataService.$inject = ['$http','$q', '$timeout']
    function MenuDataService($http,$q, $timeout) {
        var service = this;
        var items = [];

        // Get the items per category
        service.getItemsForCategory = function (categoryByShortName) {

            var deferred = $q.defer();
            $http.get('https://davids-restaurant.herokuapp.com/menu_items.json',
                {
                    params:{category: categoryByShortName}
                }
            )
            .success(function(data) {
                service.items = data;
                // Wait 2 seconds before returning
                $timeout(function () {
                    deferred.resolve(data);
                    }, 400);
            })
            .error(function() {
                deferred.reject("Failed to get category's detail");
            });
            //console.log(deferred.promise);
            return deferred.promise;
        };

        // Get all categories
        service.getAllCategories = function () {

            var deferred = $q.defer();
            $http.get( "https://davids-restaurant.herokuapp.com/categories.json")
            .success(function(data) {
                service.items = data;
                // Wait 2 seconds before returning
                $timeout(function () {
                    deferred.resolve(data);
                    }, 400);
            })
            .error(function() {
                deferred.reject("Failed to get categories");
            });

            return deferred.promise;
        };

    }

})();
