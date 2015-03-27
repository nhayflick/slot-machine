'use strict';

/**
 * @ngdoc function
 * @name slotMachineApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the slotMachineApp
 */
angular.module('slotMachineApp')
  .controller('MainCtrl', function ($scope, $rootScope) {
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
    $rootScope.animating;
    $rootScope.winner;
  });
