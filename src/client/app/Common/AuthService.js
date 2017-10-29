"use strict";
/* jshint ignore:start */
(function() {

  angular
    .module('msoeWrestlingApp')
    .service('authentication', authentication);

  authentication.$inject = ['$http', '$window'];

  function authentication($http, $window) { // jshint ignore:line

    var saveToken = function(token) {
      $window.localStorage['mean-token'] = token;
    };

    var getToken = function() {
      return $window.localStorage['mean-token'];
    };

    var isLoggedIn = function() {
      var token = getToken();
      var payload;

      if (token !== null && token !== undefined) {
        payload = token.split('.')[1];
        payload = $window.atob(payload); //atob
        payload = JSON.parse(payload);

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    var currentUser = function() {
      if (isLoggedIn()) {
        var token = getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload); //atob
        payload = JSON.parse(payload);
        return {
          _id: payload._id,
          name: payload.name
        };
      }
    };

    var login = function(user) {
      return $http.post('http://' + window.location.hostname + ':3000/login', user);
    };

    var logout = function() {
      $window.localStorage.removeItem('mean-token');
    };

    var deleteAccount = function(userData) {
      return $http.delete('http://' + window.location.hostname + ':3000/profile',{params: {_id:userData}});
    };

    var changePassword = function(passwords){
      return $http.put('http://' + window.location.hostname + ':3000/profile',passwords);
    };

    return {
      currentUser: currentUser,
      saveToken: saveToken,
      getToken: getToken,
      isLoggedIn: isLoggedIn,
      login: login,
      logout: logout,
      deleteAccount: deleteAccount,
      changePassword: changePassword
    };
  };
})();
/* jshint ignore:end*/
