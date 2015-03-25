'use strict';

/**
 * @ngdoc function
 * @name slotMachineApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the slotMachineApp
 */
angular.module('slotMachineApp')
  .controller('MainCtrl', function ($scope) {
    $scope.slots = [
      [{
        name:'Coffee',
        type: 1
      }, {
        name:'Tea',
        type: 2
      }, {
        name:'Espresso',
        type: 3
      }],
      [{
        name:'Coffee',
        type: 1
      }, {
        name:'Tea',
        type: 2
      }, {
        name:'Espresso',
        type: 3
      }],
      [{
        name:'Coffee',
        type: 1
      }, {
        name:'Tea',
        type: 2
      }, {
        name:'Espresso',
        type: 3
      }]
    ];
  });
