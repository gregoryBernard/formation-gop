angular.module('formationAngularJsApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/forms', {
        templateUrl: 'app/forms/forms.html'
      });
  })
  .controller('formsController', [
    function() {
      this.user = {};
    }
  ])
;