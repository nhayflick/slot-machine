'use strict';

/**
 * @ngdoc overview
 * @name slotMachineApp
 * @description
 * # slotMachineApp
 *
 * Main module of the application.
 */
angular
  .module('slotMachineApp', [
    'ngAnimate',
    'ngRoute',
    'ngTouch',
    'LocalStorageModule'
  ])
  .config(['$routeProvider', 'localStorageServiceProvider', function ($routeProvider, localStorageServiceProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    // Set local storage App key
    localStorageServiceProvider.setPrefix('thmb');
  }]);