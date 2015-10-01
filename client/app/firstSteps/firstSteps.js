angular.module('formationAngularJsApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/first-steps', {
        templateUrl: 'app/firstSteps/firstSteps.html'
      });
  })
  .controller('BindingCtrl', ['$scope', function($scope) {

    $scope.myName = 'John Doe';
    $scope.herName = 'Jane Doe';

  }])
  .controller('OtherBindingCtrl', ['$scope', function($scope) {

    $scope.myName = 'John Doe';
    $scope.herName = 'Jane Doe';
    $scope.myHtmlText = '<strong>Hello !</strong>, I love <i>AngularJS</i>';

  }])
  .controller('ModelsCtrl', ['$scope', function($scope) {

    $scope.myName = 'John Doe';

  }])
  .controller('ListsCtrl', ['$scope', '$http', function($scope, $http) {

    $scope.controller = this;
    this.data = 'test';

    $scope.user = {
      name: 'John Doe'
    };

    $scope.awesomeThings = [];
    $scope.names = ['Bob james', 'Fred Tedy', 'Paul Thomas'];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

  }])
  .controller('FiltersCtrl', ['$scope', '$http', function($scope) {

    $scope.names = ['Bob james', 'Fred Tedy', 'Paul Thomas', 'Marie Jane', 'Alexia Johnson'];

  }])
;


