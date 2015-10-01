angular.module('formationAngularJsApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/filters', {
        templateUrl: 'app/filters/filters.html'
      });
  })
  .controller('filtersController', [
    'doublerFilter',
    function(doubler) {

      // Fruits Fruits
      this.doubleTitle = doubler('Fruits');

      this.limit = 2;
      this.fruits = [
        {
          name: 'Banana',
          price: '0.25',
          yums: 3
        },
        {
          name: 'Pineapple',
          price: '3.5',
          yums: 2
        },
        {
          name: 'Strawberry',
          price: '0.5',
          yums: 4
        },
        {
          name: 'Melon',
          price: '3',
          yums: 4
        },
        {
          name: 'Pomegranate',
          price: '0.75',
          yums: 1
        }
      ];
    }
  ])
  .filter('doubler', [
    function() {
      return function(input, number) {
        var times = number ? number : 2;
        var array = [];
        for (var i = 0; i < times; i++) {
          array.push(input);
        }
        return array.join(' ');
      }
    }
  ])
  .controller('PaginationFilterCtl', ['$scope', function($scope) {

    this.itemList = [];
    this.currentPage = 1;
    this.numberPerPage = 10;

    for (var i = 1; i <= 30; i++) {
      this.itemList.push({
        name: 'Item ' + i,
        summary: 'Item ' + i + 'summary',
        price: (Math.random() * 100) + 10
      });
    }

    this.pages = [];
    var pageCount = Math.floor(this.itemList.length / this.numberPerPage);
    for (var i = 1; i <= pageCount; i++) {
      this.pages.push(i);
    }
  }])
  .filter('paginate', [
    function() {
      return function(input, currentPage, numberPerPage) {
        var totalCount = input.length;
        var startOffset = (currentPage - 1) * numberPerPage
        var endOffset = startOffset + numberPerPage;
        endOffset = endOffset > totalCount ? totalCount : endOffset;

        return input.slice(startOffset, endOffset);
      }
    }
  ])
;
