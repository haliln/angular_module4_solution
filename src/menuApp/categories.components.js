(function () {
'use strict';

angular.module('data')
.component('menuApp', {
  templateUrl: 'src/menuApp/templates/categories.template.html',
  bindings: {
    items: '<'
  }
});

})();
