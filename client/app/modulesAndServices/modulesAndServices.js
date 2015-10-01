angular.module('formationAngularJsApp')
  .constant('defaultGreetingUser', 'John Doe')
  .provider('greeting', function() {
    var defaultGreetingUser = '';

    this.setDefaultGreetingUser = function(userName) {
      defaultGreetingUser = userName;
    };

    this.$get = function greetingFactory() {
      return {
        greet: function(userName) {
          userName = userName || defaultGreetingUser;
          return 'Hi ' + userName +  ' !';
        }
      }
    };
  })
  .controller('ModuleAndServiceCtl', ['$scope', 'greeting', function($scope, greeting) {
    $scope.greet = function(userName) {
      $scope.message = greeting.greet(userName);
    };
    $scope.$watch('myName', function(userName) {
      $scope.greet(userName);
    });
  }])
  .config(['$routeProvider', 'greetingProvider', 'defaultGreetingUser', function($routeProvider, greetingProvider, defaultGreetingUser) {
    greetingProvider.setDefaultGreetingUser(defaultGreetingUser);

    $routeProvider.when('/modules-and-services', {
      templateUrl: 'app/modulesAndServices/modulesAndServices.html'
    })

  }]);
