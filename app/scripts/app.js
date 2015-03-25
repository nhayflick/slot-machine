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
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
