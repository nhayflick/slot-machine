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
      },
      // TODO: check this
      controller: function ($scope, $animate) {
        // TODO: ensure persistence of results from spin to spin
        var results;
        var animations = [];

        function play () {
          results = [];
          for (var i = 2; i < $scope.thmbSlots.length; i++) {
            var result = Math.floor(Math.random() * 3) + 1
            results.push(result);
            spinSlot(i + 1, result);
          }
        }

        function spinSlot (slot, result) {
          // TODO: Attempt to shorten this
          var base = 30 + result;
          (function rotateOnce() {
            console.log('rotate');
            var promise = performAnimation(slot, base % 3 + 1);
            promise.then( function() {
              clearAnimation(slot, base % 3 + 1);
              if (!base--) {return false};
              rotateOnce();
            });
          })();
        }

        function performAnimation (slot, row) {
          console.log('perform');
          var querySelector = document.querySelector( 'thmb-slot-container:nth-child(' + slot + ') > thmb-slot-row:nth-child(' + row  + ')' );
          var $el = angular.element(querySelector);
          // $el.removeClass('slide-by');
          // console.log($animate.addClass($el, 'slide-by'));
          // Returns a promise that is resolved once the animation is finished
          return $animate.addClass($el, 'slide-by');
        }

        function clearAnimation (slot, row) {
          var querySelector = document.querySelector( 'thmb-slot-container:nth-child(' + slot + ') > thmb-slot-row:nth-child(' + row  + ')' );
          var $el = angular.element(querySelector);
          $el.removeClass('slide-by');
        }

        $scope.play = play;
      }
    };
  });
