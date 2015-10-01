// Methods available on an angular module that allow to register service and configure the App
angular.module('formationAngularJsApp')
  .controller('MainCtrl', function() { })
  .directive('MainDirective', function() { })
  .factory('MainFactory', function() { })
  .service('MainService', function() { })
  .config(function() { })
  .run(function() {
  });

// Register and use a value
angular.module('formationAngularJsApp')
  .value('securityToken', '57xfd57sxd45d5v5aefjh');

angular.module('formationAngularJsApp')
  .controller('exempleCtl', ['securityToken', function(securityToken) {
    console.log(securityToken); // will display 57xfd57sxd45d5v5aefjh
  }]);

// Register a service with factory
angular.module('formationAngularJsApp')
  .factory('appSecret', ['securityToken', function(securityToken) {

    var encrypt = function(data1, data2) {
      // NSA-proof encryption algorithm:
      return (data1 + ':' + data2).toUpperCase();
    };
    var secret = window.localStorage.getItem('myApp.secret');
    return encrypt(securityToken, secret);
  }]);

angular.module('formationAngularJsApp')
  .controller('exempleCtl', ['appSecret', function(appSecret) {
    console.log(appSecret); // will display generated app secret
  }]);

// Register a service with service method
angular.module('formationAngularJsApp')
  .service('user', ['appSecret', function(appSecret) {
    this.connected = false;
    this.login = function() {
      // Some login logic here
    }
    this.logout = function() {
      // Some loout logic here
    }
  }]);

angular.module('formationAngularJsApp')
  .controller('exempleCtl', ['user', function(user) {
    console.log(user.connected); // check if user is connected
  }]);

// Register a service with the provider recipe
angular.module('formationAngularJsApp')
  .provider('user', function() {

    var serviceUseAppSecret = true;
    this.$get = ['appSecret', function userFactoty(appSecret) {
      new user(serviceUseAppSecret, appSecret);
    }];
  });

angular.module('formationAngularJsApp')
  .config(['userProvider', function(userProvider) {
    // Use the module configuration to disable app secret usage on user service
    userProvider.serviceUseAppSecret = false;
  }]);

// Register a constant
angular.module('formationAngularJsApp')
  .constant('appName', 'My app name')
  // .config(['appServiceProvider', 'appName', function(appServiceProvider, appName) {
  //   appServiceProvider.setName(appName);
  // }]);
