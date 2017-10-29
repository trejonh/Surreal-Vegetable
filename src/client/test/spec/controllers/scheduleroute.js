'use strict';

describe('Controller: SchedulerouteCtrl', function () {

  // load the controller's module
  beforeEach(module('msoeWrestlingApp'));

  var SchedulerouteCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SchedulerouteCtrl = $controller('SchedulerouteCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SchedulerouteCtrl.awesomeThings.length).toBe(3);
  });
});
