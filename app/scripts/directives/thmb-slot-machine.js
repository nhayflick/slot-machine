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
      scope: {
        thmbSlots: '=',
        animating: '=',
        winner: '=',
        prizeStash: '='
      },
      controller: function ($scope, $rootScope, $animate, $timeout, $q) {
        // TODO: ensure persistence of results from spin to spin
        var results = [];

        function play () {
          var animationPromises = [];

          $rootScope.animating = true;
          $rootScope.winner = true;
          $scope.message = '';

          // Iterate through all slots, kicking off as needed
          for (var i = 0; i < $scope.thmbSlots.length; i++) {
            clearAnimation(i + 1, results[i] || 1, true);
            // Randomly pick a row in the current slot
            results[i] = Math.floor(Math.random() * $scope.thmbSlots[i].length) + 1;
            if (results[i] !== results[0]) {
              $rootScope.winner = false;
            }
            animationPromises.push(spinSlot(i + 1, results[i]));
          }

          // Callback is invoked after all promises in
          // the promises array resolve
          $q.all(animationPromises).then(animationsFinished);
        }

        // Function that performs a series of spins on a single slot
        // Returns a promise that is resolved when the last animation is complete
        function spinSlot (slot, result) {
          var rowsLength = $scope.thmbSlots[slot - 1].length, 
            base = (rowsLength * slot) + result,
            spins = 0,
            deferred = $q.defer();

          (function rotateOnce() {
            var promise = performAnimation(slot, spins % rowsLength + 1, spins >= base - 1);
            promise.then( function() {
              // Return slot 
              clearAnimation(slot, spins % rowsLength + 1, false);
              // Check if last animation has been performed
              if (spins++ >= base - 1) {
                // Break and resolve promise
                return deferred.resolve();
              }
              // Angular digest cycle needs to finish before further
              // $animate promises can be set
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
          var querySelector = document.querySelector( '.thmb-slot-container:nth-child(' + slot + ') > .thmb-slot-row:nth-child(' + row  + ')' );
          var $el = angular.element(querySelector);
          var cssName = final ? 'slide-in' : 'slide-by';
          // Returns a promise that is resolved once the animation is finished
          return $animate.addClass($el, cssName);
        }

        function clearAnimation (slot, row, final) {
          // TODO: extract this selector for efficiency
          var querySelector = document.querySelector( '.thmb-slot-container:nth-child(' + slot + ') > .thmb-slot-row:nth-child(' + row  + ')' );
          var $el = angular.element(querySelector);
          var cssName = final ? 'slide-in' : 'slide-by';
          $el.removeClass(cssName);
        }

        // Update animation state and provide feedback to user on win/loss
        function animationsFinished () {
          $rootScope.animating = false;
          if ($rootScope.winner) {
            var prizeName = $scope.thmbSlots[0][results[0] - 1].name;
            $scope.message = 'You win one ' + prizeName + '!';
            // Store prize in global prize stash
            if ($scope.prizeStash[prizeName]) {
              $scope.prizeStash[prizeName].quantity += 1;
            } else {
              $scope.prizeStash[prizeName] = {
                quantity: 1
              };
            }
          } else {
            $scope.message = 'No caffeine for you =(... Try Again!';
          }
        }

        $scope.play = play;
        $rootScope.winner = false;
        $rootScope.animating = false;
      }
    };
  });
