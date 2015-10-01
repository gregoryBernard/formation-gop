

angular.module('formationAngularJsApp')
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/rest', {
      templateUrl: 'app/rest/rest.html'
    })
  }])
  .service('fruits', ['$http', function($http) {
      this.getAll = function() {
        var promise = $http.get('/api/fruits')
          .success(function(data) {
            return data;
          })
          .error(function() {
            throw new Exception('Error while retrieving fruits');
          });
        return promise;
      };
    this.find = function(fruitId) {
      var promise = $http.get('/api/fruits/' + fruitId)
        .success(function(data) {
          return data;
        })
        .error(function() {
          throw new Exception('Error while retrieving fruits');
        });
      return promise;
    };
  }])
  .factory('contact', ['$resource', function($resource) {

    return $resource('api/contacts', {},{
      get: {
        url: 'api/contacts/:id'
      },
      export: {
        url: 'api/contacts/:id/export',
        method: 'GET',
        params: {format: 'PDF'}
      }
    });
  }])
  .controller('restHttpCtl', ['$scope', 'fruits', function($scope, fruits) {

    $scope.fruits = null;
    $scope.fruitDetails = null;

    fruits.getAll().then(function(response) {
      $scope.fruits = response.data;
    });

    $scope.showMoreDetails = function(fruitId) {
      $scope.fruitDetails = null;
      fruits.find(fruitId).then(function(response) {
        $scope.fruitDetails = response.data;
      });
    };
  }])
  .controller('resourceCtl', ['$scope', 'contact', function($scope, contactService) {

    $scope.contactTypes = ['Professional', 'Private'];
    $scope.contacts = contactService.query();

    var resetUI = function() {
      $scope.contactDetail = null
      $scope.contact = null;
      $scope.exportMessage = null;
      $scope.showForm = false;
      if ($scope.contactForm) {
        $scope.contactForm.$submitted = false;
      }
    };
    resetUI();

    $scope.remove = function(contact) {
      contactService.remove(contact, function() {
        $scope.contacts = contactService.query();
      });
    };

    $scope.edit = function(contact) {
      resetUI();
      $scope.contact = contact;
      $scope.showForm = true;
    };

    $scope.more = function(contact) {
      resetUI();
      contactService.get({id: contact.id}, function(data) {
        $scope.contactDetail = data;
      })
    };

    $scope.export = function(contact) {
      resetUI();
      contactService.export({id: contact.id}, function(data) {
        $scope.exportMessage = data.filePath;
      });
    }

    $scope.addContact = function() {
      resetUI();
      $scope.showForm = true;
    };

    $scope.saveContact = function() {
      if ($scope.contactForm.$valid) {
        contactService.save($scope.contact, function() {
          resetUI();
          $scope.contacts = contactService.query();
        });
      }
    };
  }])
;