(function() {
  'use strict';
  angular
    .module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective);

  // implementation of the directive : it uses the found array of items
  // specified on it as an attribute (one way binding using the '<')
  // It also uses function reference binding ('&') to imoplement onRemove functionality
  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        found: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true
    };
    return ddo;
  }

  function FoundItemsDirectiveController() {
    var list = this;

    list.isEmpty = function() {
      return list.found != undefined && list.found.length === 0;
    }
  }

// Here is the implementation of the controller. It is the NarrowItDownController
// The 'MenuSearchService' is injected into it.
// he controller calls the getMatchedMenuItems method when appropriate and store
//the result in a property called found attached to the controller instance.
  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var controller = this;

    controller.searchTerm = "";

    controller.narrowIt = function() {
      if (controller.searchTerm === "") {
        controller.items = [];
        return;
      }
      var promise = MenuSearchService.getMatchedMenuItems(controller.searchTerm);
      promise.then(function(response) {
        controller.items = response;
      })
      .catch(function(error) {
        console.log("Something went wrong", error);
      });
    };

    controller.removeItem = function(index) {
      controller.items.splice(index, 1);
    };
  }

// Here is the implementation of the MenuSearchService. The '$http' is injected
// into this service.
// implements the getMatchedMenuItems which return the foundItems
// The list of found items is wrapped in a promise.

  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http) {
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {
        return $http({
          method: 'GET',
          url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
        }).then(function (result) {
        // process result and only keep items that match
        var items = result.data.menu_items;

        var foundItems = [];

        for (var i = 0; i < items.length; i++) {
          if (items[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0) {
            foundItems.push(items[i]);
          }
        }
        // return processed items
        return foundItems;
      });
    };
  }

}
)();
