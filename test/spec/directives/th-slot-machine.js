'use strict';

describe('Directive: thmbSlotMachine', function () {

  // load the directive's module
  beforeEach(module('slotMachineApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<th-slot-machine></th-slot-machine>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the thmbSlotMachine directive');
  }));
});
