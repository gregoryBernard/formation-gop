'use strict';

angular.module('formationAngularJsApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap'
  // 'contact'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    //$locationProvider.html5Mode(true);
  });

//angular.element(document).ready(function() {
//  angular.bootstrap(document.getElementById('app2'), ['formationAngularJsApp']);
//  angular.bootstrap(document.getElementById('app3'), ['formationAngularJsApp']);
//});
