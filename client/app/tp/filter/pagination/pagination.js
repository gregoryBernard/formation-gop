angular.module('formationAngularJsApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/tp-directive-pagination', {
        templateUrl: 'app/tp/filter/pagination/pagination.html'
      });
  })
  .controller('paginationController', function() {
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
    this.currentPage = 1;
    this.fruitsByPage = 2;
    this.numberOfPages = Math.ceil(this.fruits.length / this.fruitsByPage);
  })
  .filter('pagination', function() {
    return function(items, itemsByPage, currentPage) {

    }
  })
;
