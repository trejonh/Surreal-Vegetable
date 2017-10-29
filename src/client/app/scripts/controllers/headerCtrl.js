"use strict";

function bind() {
  $("#profileLink").bind('click', function(e) { //jshint ignore:line
    e.preventDefault();
  });
}

function unbind() {
  $("#profileLink").unbind('click'); //jshint ignore:line
}

angular.module('msoeWrestlingApp')
  .controller('HeaderCtrl', function($scope, $location, $interval, authentication) {
    var header = this; // jshint ignore:line
    $scope.loggedIn = !authentication.isLoggedIn(); //true == hidden, false==visible
    if (authentication.isLoggedIn) {
      unbind();
    } else {
      bind();
    }
    $interval(function() {
      $scope.loggedIn = !authentication.isLoggedIn();
      if (authentication.isLoggedIn) {
        unbind();
      } else {
        bind();
      }
    }, 5000);
    $scope.logout = function() {
      $scope.loggedIn = true; //true == hidden, false==visible
      authentication.logout();
      bind();
      $location.path("/");
    };
  });
