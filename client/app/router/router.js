angular.module('formationAngularJsApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/router/:param1/:param2', {
        templateUrl: 'app/router/router.html'
      })
    ;
  })
  .controller('RouterCtrl', ['$scope', '$routeParams', '$route', function($scope, $routeParams, $route) {
    $scope.params = $routeParams;
    $scope.currentRoute = $route.current;
  }])
;
