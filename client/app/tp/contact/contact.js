angular.module('contact', [])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/contact', {
      templateUrl: 'app/tp/contact/contact.html'
    })
  }]);