angular.module('formationAngularJsApp')
  .controller('testExamplesController', [
    'itemsService',
    function(Item) {
      this.test = 'ploum!';
      // -- Items management --
      this.items = null;
      this.currentItem = null;
      // Get all the items
      this.itemList = function() {
        this.items = Item.query();
      };
      // Create a new item
      this.createNewItem = function() {
        var item = new Item();
        item.$save();
      };
      // Get a specific item
      this.getItem = function(id) {
        this.currentItem = Item.get({itemId: id});
      };
      // Get a specific item
      this.getSpecificItem = function(id) {
        this.currentItem = Item.specific({itemId: id});
      }
    }
  ])
  .factory('itemsService', ['$resource', function($resource) {
    return $resource('/item/:itemId', {itemId: '@itemId'}, {
      specific: {method: 'GET', params: {specific: true}}
    });
  }])
  .factory('testExampleService', function() {
    return {
      items: function() {
        return [{name: 'baouh'}, {name: 'test'}];
      }
    };
  })
  .directive('exampleList', function() {
    return {
      restrict: 'A',
      template: '<ul><li ng-repeat="item in data">{{item.name}}</li></ul>',
      scope: {
        data: '='
      },
      link: function($scope, $element, $attrs) {
        $attrs.$set('test', 'ok');
      }
    };
  })
;