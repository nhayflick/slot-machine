'use strict';

/**
 * @ngdoc function
 * @name slotMachineApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the slotMachineApp
 */
angular.module('slotMachineApp')
  .controller('MainCtrl', function ($scope, $rootScope, localStorageService) {

    function clearPrizeStash() {
      $scope.prizeStash = {};
    }
    
    $scope.clearPrizeStash = clearPrizeStash;
    $scope.prizeStash = localStorageService.get('prizes') || {};
    $scope.$watch('prizeStash', function () {
      localStorageService.set('prizes', $scope.prizeStash);
    }, true);
    // A data object representing slots and rows
    // for the thmb-slot-machine directive.

    // The slot machine is agnostic to the # of rows
    // and # of columns that are fed in.

    $scope.slots = [
      [{
        name:'Coffee',
        imageUrl: '/images/coffee-maker.jpg',
        type: 'coffee'
      }, {
        name:'Tea',
        imageUrl: '/images/tea-pot.jpg',
        type: 'tea'
      }, {
        name:'Espresso',
        imageUrl: '/images/espresso-machine.jpg',
        type: 'espresso'
      }],
      [{
        name:'Coffee',
        imageUrl: '/images/coffee-filter.jpg',
        type: 'coffee'
      }, {
        name:'Tea',
        imageUrl: '/images/tea-strainer.jpg',
        type: 'tea'
      }, {
        name:'Espresso',
        imageUrl: '/images/espresso-tamper.jpg',
        type: 'espresso'
      }],
      [{
        name:'Coffee',
        imageUrl: '/images/coffee-grounds.jpg',
        type: 'coffee'
      }, {
        name:'Tea',
        imageUrl: '/images/tea-leaf.jpg',
        type: 'tea'
      }, {
        name:'Espresso',
        imageUrl: '/images/espresso-grounds.jpg',
        type: 'espresso'
      }]
    ];


    // Define these props on $rootscope so other views
    // can access them
    $rootScope.animating = false;
    $rootScope.winner = false;
  });
