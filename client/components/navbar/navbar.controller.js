'use strict';

angular.module('formationAngularJsApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [
      {
        'title': 'Home',
        'link': '/'
      },{
        'title': 'Premiers pas',
        'link': '/first-steps'
      },
      {
        'title': 'Contrôleurs',
        'link': '/controllers-scopes'
      },
      {
        'title': 'Routeur',
        'link': '/router/Test/42'
      },{
        'title': 'Services',
        'link': '/modules-and-services'
      },{
        'title': 'Formulaires',
        'link': '/forms'
      },{
        'title': 'REST',
        'link': '/rest'
      },{
        'title': 'I18N',
        'link': '/i18n'
      },{
        'title': 'Filtres',
        'link': '/filters'
      },{
        'title': 'TP directive ancre',
        'link': '/tp-directive-ancre'
      },{
        'title': 'TP directive pinterest',
        'link': '/tp-directive-pinterest'
      }
    ];

    $scope.isCollapsed = false;

    Array.prototype.oneOnTwo = function(item) {
      console.log('test', item);
    };

    var tmp =
    {
      tmp: ['totot', 'tat']
    };
    console.log('test', tmp)


    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
