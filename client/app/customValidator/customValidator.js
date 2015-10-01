function CustomValidator() {
  this.restrict = 'A';
  this.require = 'ngModel';
}

CustomValidator.prototype.link = function($scope, $element, $attrs, ngModelController) {
  $scope.$watch(function() {
    return ngModelController.$invalid;
  }, function(isInvalid) {
    if (isInvalid) {
      $attrs.$removeClass('custom-valid');
      $attrs.$addClass('custom-invalid');
    }
    else {
      $attrs.$removeClass('custom-invalid');
      $attrs.$addClass('custom-valid');
    }
  });
};

angular.module('formationAngularJsApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/custom-validator', {
        templateUrl: 'app/customValidator/customValidator.html'
      });
  })

  .controller('customValidatorCtrl', ['$scope', function($scope) {
    $scope.simpleProperty = 'Yo!';
    $scope.simpleStringProperty = 'Baouh!';

    $scope.$watch('simpleProperty', function(newValue, oldValue) {
      angular.forEach($scope.test, function(property, propertyName) {
        console.log(propertyName);
      })
    });
  }])

  .directive('customValidator', [
    function() {
      return new CustomValidator();
    }
  ])

  .directive('customStringValidator', [
    function() {

      function CustomStringValidator() {
        CustomValidator.call(this);
      }

      CustomStringValidator.prototype = Object.create(CustomValidator.prototype);

      CustomStringValidator.prototype.link = function($scope, $element, $attrs, ngModelController) {

        // Some logic is contained in the parent object
        CustomValidator.prototype.link.apply(this, arguments);

        ngModelController.$validators.isStringEqual = function(modelValue, viewValue) {
          return viewValue === $attrs.customStringValidator;
        };
      };

      return new CustomStringValidator();
    }
  ])
;