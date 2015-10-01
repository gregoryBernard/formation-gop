angular.module('formationAngularJsApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/controllers-scopes', {
        templateUrl: 'app/controllersScope/controllersScope.html'
      });
  })

  // Controllers and scope simple example
  .controller('ControllersScopeSimpleCtrl', ['$scope', function($scope) {
    $scope.simpleProperty = 'Yo!';
  }])

  .controller('ControllersScopeSimpleChildCtrl', ['$scope', function($scope) {
  }])

  .controller('ControllersScopeMutationCtrl', ['$scope', function($scope) {
    $scope.display = false;
  }])

  // Controllers $parent example
  .controller('ControllersScopeCtrl', ['$scope', function($scope) {

    $scope.someProperty = 'someValue';

    $scope.changeSomeProperty = function() {
      $scope.someProperty = 'newValue';
    };

    $scope.reinitSomeProperty = function() {
      $scope.someProperty = 'someValue';
    };

  }])

  .controller('ControllersScopeChildCtrl', ['$scope', function($scope) {

    $scope.someChildProperty = 'someChildValue';

    $scope.changeSomeProperty = function() {
      $scope.$parent.someProperty = 'newValueFromChildScope';
    };

  }])


  // Controller As example
  .controller('ControllersScopeCtrlAs', [function() {

    this.someProperty = 'someValue';

    this.changeSomeProperty = function() {
      this.someProperty = 'newValue';
    };

    this.reinitSomeProperty = function() {
      this.someProperty = 'someValue';
    };

  }])
  .controller('ControllersScopeChildCtrlAs', ['$scope', function($scope) {

    this.someChildProperty = $scope.main.someProperty;

  }])

  // $wath example
  .controller('ControllersScopeWatcherCtrl', ['$scope', function($scope) {
    $scope.someValue = 'test';

    function listenerFunction() {
      console.log('Listener!');
    }

    $scope.$watch('someValue', listenerFunction);

    $scope.$watch(function() {
      return someValue;
    }, listenerFunction);

    $scope.someObject = {
      name: 'John',
      age: 25
    };

    $scope.$watch('someObject', listenerFunction, false);
    $scope.$watch('someObject', listenerFunction, true);

  }])

  // Apply example
  .directive('clickEventElement', function() {
    return {
      restrict: 'EA',
      scope: {},
      template: '<div class="click-event-element" ng-bind="someProperty"></div>',
      link: function($scope, $element) {
        $scope.someProperty = 'Not clicked yet.';
        $element.on('click', function() {
          $scope.$apply(function() {
            $scope.someProperty = 'clicked!';
          });
        });
      }
    };
  })

  // Events example
  .controller('ControllersScopeEventSenderCtrl', ['$scope', function($scope) {
    var self = this;
    self.message = 'no event yet';
    self.broadcastMessage = function() {
      $scope.$broadcast('scope.event.broadcast', 'Event broadcasted from the parent scope');
    };
    self.reset = function() {
      self.message = 'no event yet';
      $scope.$broadcast('scope.event.reset');
    };
    $scope.$on('scope.event.emit', function(event, message) {
      self.message = message;
    });
  }])

  .controller('ControllersScopeEventReceiverCtrl', ['$scope', function($scope) {
    var self = this;
    self.message = 'no event yet';
    self.emitMessage = function() {
      $scope.$emit('scope.event.emit', 'Event emitted from the child scope');
    };
    $scope.$on('scope.event.broadcast', function(event, message) {
      self.message = message;
    });
    $scope.$on('scope.event.reset', function() {
      self.message = 'no event yet';
    });
  }])

  // TD
  .controller('ControllersScopeTdCtlDistant1', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.name = '';
    $scope.$watch('name', function() {
      $rootScope.$broadcast('user.changeName', $scope.name);
    });
  }])

  .controller('ControllersScopeTdCtlDistant2', ['$scope', '$timeout', function($scope, $timeout) {
    $scope.greetingName = null;
    var hideGreetAction = null;
    $scope.$on('user.changeName', function(event, name) {
      if (hideGreetAction !== null) {
        $timeout.cancel(hideGreetAction);
      }
      $scope.greetingName = name;
      hideGreetAction = $timeout(function() {
        $scope.greetingName = null;
      }, 3000);
    });
  }])

;
