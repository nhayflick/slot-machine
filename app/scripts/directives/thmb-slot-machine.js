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
      controller: function ($scope, $animate, $timeout) {
        // TODO: ensure persistence of results from spin to spin
        var results = [0,0,0];
        var animations = [];

        function play () {
          for (var i = 0; i < $scope.thmbSlots.length; i++) {
            if (results[i]) {
              console.log(results[i]);
              clearAnimation(i + 1, results[i], true);
            }
            var result = Math.floor(Math.random() * 3) + 1
            results[i] = result;
            spinSlot(i + 1, result);
          }
        }

        function spinSlot (slot, result) {
          // TODO: Attempt to shorten this
          var base = 7 + result;
          var spins = 0;
          (function rotateOnce() {
            console.log('rotate: ' + slot + ' base: '  + spins);
            var promise = performAnimation(slot, spins % 3 + 1, spins > base);
            promise.then( function() {
              clearAnimation(slot, spins % 3 + 1, false);
              // Allow digest cycle needs to finish before further
              // $animate calls
              if (spins++ > base) {
                return false;
              };
              $timeout(function(){
                rotateOnce();
              });
            });
          })();
        }

        function performAnimation (slot, row, final) {
          // TODO: extract this selector for efficiency
          var querySelector = document.querySelector( 'thmb-slot-container:nth-child(' + slot + ') > thmb-slot-row:nth-child(' + row  + ')' );
          var $el = angular.element(querySelector);
          var cssName = final ? 'slide-in' : 'slide-by';
          if (final) {
            console.log(results[slot-1]);
            console.log($scope.thmbSlots[slot-1][row-1].name);
          }
          // Returns a promise that is resolved once the animation is finished
          return $animate.addClass($el, cssName);
        }

        function clearAnimation (slot, row, final) {
          // TODO: extract this selector for efficiency
          var querySelector = document.querySelector( 'thmb-slot-container:nth-child(' + slot + ') > thmb-slot-row:nth-child(' + row  + ')' );
          var $el = angular.element(querySelector);
          console.log($el);
          var cssName = final ? 'slide-in' : 'slide-by';
          $el.removeClass(cssName);
        }

        $scope.play = play;
      }
    };
  });
