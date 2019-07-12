(function () {
'use strict';

angular.module('data')
.component('items', {
  templateUrl: 'src/menuApp/templates/item-detail.template.html',
  bindings: {
    items: '<'
  }
});

})();
