
angular.module('formationAngularJsApp')
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/i18n', {
        templateUrl: 'app/i18n/i18n.html'
      });
  }])
  .controller('i18nCtl', ['$scope', '$locale', function($scope, $locale) {
    $scope.currentLocale = $locale.id;
    $scope.myDate = Date.now();
    $scope.myNumber = 92484248.68712;
    $scope.appelCount = 1;
    $scope.appelPrice = 0.30;
  }]);