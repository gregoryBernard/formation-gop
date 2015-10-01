angular.module('formationAngularJsApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/directives', {
        templateUrl: 'app/directives/directives.html'
      });
  })
  .controller('directivesController', [
    function() {
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
  .directive('verySimpleDirective', [
    function() {
      return {
        restrict: 'EA',
        template: '<div class="very-simple-directive"><p>This is a very simple directive.</p></div>'
      };
    }
  ])

  .directive('simpleDirective', [
    function() {
      return {
        restrict: 'EA',
        scope: {
          items: '='
        },
        template: '<div class="simple-directive"><div ng-repeat="item in items" ng-bind="item.name"></div></div>'
      };
    }
  ])

  .directive('bindingDirective', [
    function() {
      return {
        restrict: 'EA',
        template: '<div ng-bind="title"></div>',
        scope: {},
        link: function($scope, $element, $attrs) {
          $scope.title = 'Binding directive';
          $element.append(angular.element('<p>Ploum!</p>'));
          $attrs.$addClass('binding-directive');
        }
      };
    }
  ])

  .directive('transclusionDirective', [
    function() {
      return {
        restrict: 'EA',
        template: '<div class="transclusion-directive" ng-transclude></div>',
        transclude: true
      };
    }
  ])

  .directive('transclusionFunctionDirective', [
    function() {
      return {
        restrict: 'EA',
        template: '<div class="transclusion-function-directive"></div>',
        transclude: true,
        scope: {
          title: '@'
        },
        link: function($scope, $element, $attrs, controllers, $transclude) {
          $transclude($scope, function(clone) {
            $element.append(clone);
          });
        }
      };
    }
  ])

  .directive('textDisplayer', [
    function() {
      return {
        restrict: 'EA',
        template: '<div class="parent-directive"><span ng-bind="texts"></span></div>',
        require: 'textDisplayer',
        priority: 1000,
        controller: function() {
          this.texts = [];
        },
        link: function($scope, $element, $attrs, controller) {
          $scope.texts = controller.texts.join(' ');
        }
      };
    }
  ])

  .directive('textAdd', [
    function() {
      return {
        restrict: 'A',
        require: 'textDisplayer',
        link: function($scope, $element, $attrs, controller) {
          controller.texts.push($attrs.textAdd);
        }
      };
    }
  ])

  .directive('compileDirective', [
    function() {
      return {
        restrict: 'EA',
        compile: function($element, $attrs) {
          // Return the link functions
          return {
            pre: function() {
            },
            post: function($scope, $element, $attrs) {
            }
          };
        }
      };
    }
  ])

;
