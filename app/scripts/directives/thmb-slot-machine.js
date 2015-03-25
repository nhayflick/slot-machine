'use strict';

/**
 * @ngdoc directive
 * @name slotMachineApp.directive:thmbSlotMachine
 * @description
 * # thmbSlotMachine
 */
angular.module('slotMachineApp')
  .directive('thmbSlotMachine', function () {
    return {
      templateUrl: 'views/directives/thmb-slot-machine.html',
      restrict: 'EA',
      // require: '^ngModel',
      scope: {
        thmbSlots: '='
      }
    };
  });
