'use strict';

describe('testExample controller tests', function() {

  var scope, controller, $httpBackend;

  beforeEach(module('formationAngularJsApp'));

  beforeEach(inject(['$rootScope', '$controller', '$httpBackend', function($rootScope, $controller, _$httpBackend_) {

    scope = $rootScope.$new();

    controller = $controller('testExamplesController', {
      $scope: scope
    });

    $httpBackend = _$httpBackend_;

    $httpBackend.when('GET', '/item').respond([{id: 1, name: 'newItem'}, {id: 2, name: 'anotherItem'}]);
    $httpBackend.when('POST', '/item').respond({id: 3, name: 'newItem'});
    $httpBackend.when('GET', '/item/3').respond({id: 3, name: 'Item 3'});
    $httpBackend.when('GET', '/item/3?specific=true').respond({id: 3, name: 'Specific Item 3'});

  }]));

  it('Should start the test', function() {
    expect(controller.test).toEqual('ploum!');
  });

  it('Should get the item list', function() {
    $httpBackend.expectGET('/item');
    controller.itemList();
    $httpBackend.flush();
    expect(controller.items.length).toEqual(2);
  });

  it('Should create a new item', function() {
    $httpBackend.expectPOST('/item');
    controller.createNewItem();
    $httpBackend.flush();
  });

  it('Should get a new specific item', function() {
    $httpBackend.expectGET('/item/3?specific=true');
    controller.getSpecificItem(3);
    $httpBackend.flush();
    expect(controller.currentItem.name).toEqual('Specific Item 3');
  });

  it('Should get a specific item', function() {
    $httpBackend.expectGET('/item/3');
    controller.getItem(3);
    $httpBackend.flush();
    expect(controller.currentItem.name).toEqual('Item 3');
  });
});

describe('testExample directive tests', function() {

  var $compile, scope;

  beforeEach(module('formationAngularJsApp'));

  function getItems() {
    return [{name: 'baouh'}, {name: 'test'}];
  }

  beforeEach(inject(['$rootScope', '$compile', function($rootScope, __$compile__) {
    $compile = __$compile__;
    scope = $rootScope.$new();
    scope.items = getItems();
  }]));

  function getTemplateHtml() {
    return '<div example-list data="items"></div>';
  }

  it('Should add a new attribute: test', function() {
    var template = $compile(getTemplateHtml())(scope);

    scope.$digest();

    var element = angular.element(template);

    expect(element.attr('test')).toEqual('ok');
    expect(element.children().eq(0).children().length).toEqual(2);
  });

});

describe('testExample service tests', function() {
  var service;

  beforeEach(module('formationAngularJsApp'));

  beforeEach(inject(['testExampleService', function(__service__) {
    service = __service__;
  }]));

  it('Should return items', function() {
    expect(service.items().length).toEqual(2);
  });
});