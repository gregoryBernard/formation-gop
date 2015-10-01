angular.module('formationAngularJsApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/tp-directive-ancre', {
        templateUrl: 'app/tp/directive/ancre/ancre.html'
      });
  })
  .controller('anchorsController', [
    function() {
      this.mainTitle = 'Main title';
      this.secondTitle = 'Second title';
    }
  ])
  .directive('anchors', function() {
    return {
      transclude: true,
      restrict: 'E',
      templateUrl: 'app/tp/directive/ancre/anchorDirective.html',
      controller: [
        '$scope',
        '$window',
        function($scope, $window) {

          var menuAnchorId = 0;
          $scope.menuItems = [];

          this.addMenuItem = function(item) {
            item.id = menuAnchorId++;
            $scope.menuItems.push(item)
          };

          $scope.scrollTo = function(item) {
            $($window).scrollTop(item.element.offset().top);
          };
        }
      ]
    }
  })
  .directive('anchor', [
    '$parse',
    '$interpolate',
    function($parse, $interpolate) {
    return {
      restrict: 'A',
      require: '^anchors',
      link: function($scope, $element, $attrs, anchorController) {

        function parseTitle(title) {
          var parsedTitle = $interpolate(title)($scope);
          // Search ng-bind if interpolate is empty
          if (parsedTitle === '' && $attrs.ngBind) {
            parsedTitle = $parse($attrs.ngBind)($scope);
          }
          return parsedTitle;
        }

        var anchor = {
          title: parseTitle($element.html()),
          element: $element
        };

        anchorController.addMenuItem(anchor);
      }
    }
  }])
;
