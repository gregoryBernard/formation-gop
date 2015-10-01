// Declare a promise like ES6 way
angular.module('formationAngularJsApp')
  .factory('promiseFactory', ['$q', '$timeout', function($q, $timeout) {

    var isActionSuccess = function() {
      return Math.random() > 0.5 ? true : false;
    };

    return {
      asyncAction: function() {
        return $q(function(resolve, reject) {
          $timeout(function() {
            if (isActionSuccess()) {
              resolve("It's a success");
            }
            else {
              reject("My bad :(");
            }
          }, 1000);
        });
      }
    };
  }])
  .controller('exampleCtl', ['promiseFactory', function(promiseFactory) {
    var promise = promiseFactory.asyncAction();
    promise.then(function(message){
      console.log('Succeed with message ' + message);
    }, function(message){
      console.log('Failure with message ' + message);
    });
  }]);

// Declare a promise using deferred API
angular.module('formationAngularJsApp')
  .factory('promiseFactory', ['$q', '$timeout', function($q, $timeout) {

    var isActionSuccess = function() {
      return Math.random() > 0.5 ? true : false;
    };

    return {
      asyncAction: function() {
        var deferred = $q.defer();

        $timeout(function() {
          if (isActionSuccess()) {
            deferred.resolve("It's a success");
          }
          else {
            deferred.reject("My bad :(");
          }
        }, 1000);

        return deferred.promise;
      }
    };
  }])
  .controller('exampleCtl', ['promiseFactory', function(promiseFactory) {
    var promise = promiseFactory.asyncAction();
    promise.then(function(message){
      console.log('Succeed with message ' + message);
    }, function(message){
      console.log('Failure with message ' + message);
    });
  }]);

// Declare resource
angular.module('formationAngularJsApp')
  .factory('contact', ['$resource', function($resource) {
    return $resource('api/contacts');
  }]);

// Declare resource with binding in url
angular.module('formationAngularJsApp')
  .factory('contact', ['$resource', function($resource) {
    return $resource('api/contacts/:type/:id', {
      id: '@id',
      type: 'Private'
    });
  }]);

// Declare custom methods on resource
angular.module('formationAngularJsApp')
  .factory('contact', ['$resource', function($resource) {

    return $resource('api/contacts', {}, {
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

