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
    "restangular"
  ]).config(function($routeProvider, RestangularProvider) {
    RestangularProvider.setBaseUrl("http://" + window.location.hostname + ":3000");
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
      .when('/schedule', {
        templateUrl: 'views/scheduleroute.html',
        controller: 'SchedulerouteCtrl',
        controllerAs: 'scheduleroute'
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl',
        controllerAs: 'admin'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile'
      })
      .when('/stats', {
        templateUrl: 'views/stats.html',
        controller: 'StatsCtrl',
        controllerAs: 'stats'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).factory("UsersRestangular", function(Restangular) {
    return Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setRestangularFields({
        id: "_id"
      });
    });
  })
  .factory("Users", function(UsersRestangular) {
    return UsersRestangular.service("registeredUsers");
  })
  .run(function($rootScope, $location, authentication) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) { // jshint ignore:line
      var path = $location.path();
      var autheRequiredPath = path === '/profile';
      if (autheRequiredPath && !authentication.isLoggedIn()) {
        $location.path('/'); // jshint ignore:line
      }
    });
  });
