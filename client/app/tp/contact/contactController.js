angular.module('contact')
  .controller('contactController', ['$scope', 'contactRepository', function($scope, contactService) {

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
      $scope.contact = angular.copy(contact);
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
  }]);