angular.module('contact')
  .factory('contactRepository', ['$resource', function($resource) {

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
  }]);