'use strict';

/**
 * @ngdoc overview
 * @name msoeWrestlingApp
 * @description
 * # msoeWrestlingApp
 *
 * Main module of the application.
 */
angular
  .module('msoeWrestlingApp', [
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
