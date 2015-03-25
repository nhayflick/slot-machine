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
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the thmbSlotMachine directive');
      }
    };
  });
