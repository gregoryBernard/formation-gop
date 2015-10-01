angular.module('formationAngularJsApp')
.config([
	'myConfigurationProvider',
	function(provider) {
		provider.configure(true);
	}
  ])
.service('myService', [
  function() {
    this.getThings = function() {
      return ['thing1', 'thing2'];
    };
  }
  ])
.factory('myFactory', [
  function() {
    function Thing() {
      this.getThings = function() {
        return ['thing1', 'thing2'];
      };
    }
    return new Thing();
  }
  ])
.provider('myConfiguration', [
  function() {
    var emptyFlag = false;
    this.configure = function(flag) {
      emptyFlag = flag;
    }
    this.$get = function() {
      return {
        getThings: function() {
          return emptyFlag ? [] : ['thing1', 'thing2'];
        }
      }
    }
  }
  ])
;