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
        thmbSlots: '=',
        animating: '=',
        winner: '='
      },
      // TODO: check this
      controller: function ($scope, $rootScope, $animate, $timeout, $q) {
        // TODO: ensure persistence of results from spin to spin
        var results = [1,1,1];

        function play () {
          var callbackHandler = $q;
          var animationPromises = [];
          $rootScope.animating = true;
          $rootScope.winner = true;
          $scope.message = '';
          for (var i = 0; i < $scope.thmbSlots.length; i++) {
            clearAnimation(i + 1, results[i], true);
            var result = Math.floor(Math.random() * 3) + 1;
            results[i] = result;
            if ($rootScope.winner && results[i] != results[0]) {
              $rootScope.winner = false;
            }
            animationPromises.push(spinSlot(i + 1, result));
          }
          // Callback is invoked after all promises in
          // the promises array resolve
          $q.all(animationPromises).then(function () {
            $rootScope.animating = false;
            if ($rootScope.winner) {
              $scope.message = 'You win one ' + $scope.thmbSlots[0][results[0] - 1].name + '!';
            } else {
              $scope.message = 'No caffeine for you =(... Try Again!';
            }
          })
        }

        // Function that performs a series of spins on a single slot
        // Returns a promise that is resolved when the last animation is complete
        function spinSlot (slot, result) {
          // TODO: Attempt to shorten this
          // TODO: Why does only 1/4/7/10 work here?
          var base =  3 + result;
          var spins = 0;
          var deferred = $q.defer();
          (function rotateOnce() {
            console.log('rotate: ' + slot + ' base: '  + spins);
            var promise = performAnimation(slot, spins % 3 + 1, spins >= base - 1);
            promise.then( function() {
              clearAnimation(slot, spins % 3 + 1, false);
              // Allow digest cycle needs to finish before further
              // $animate calls
              if (spins++ == base - 1) {
                // Break and call promise
                return deferred.resolve();
              };
              $timeout(function(){
                rotateOnce();
              });
            });
          })();
          return deferred.promise;
        }

        // Function that performs one single spin on a single slot
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
        $rootScope.winner = false;
        $rootScope.animating = false;
      }
    };
  });
