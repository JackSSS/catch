module.exports = function(app) {

  app.controller('AuthCtrl',
    function($rootScope, $scope, $timeout, $location, $ionicLoading, $http, $cookies, $base64) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});


    function isLoggedIn() {
      if ($cookies.get('token'))
        return true;
      else
        return false;
    }

    function checkAuth() {
      if (!(isLoggedIn()))
        $location.path('/auth');
    }

    $scope.$on('$ionicView.enter', function(e) {
      checkAuth();
    });

    // Form data for the login modal
    $scope.authErrors = [];
    $scope.user = {};
    $scope.signup = false;
    $scope.token = '';
    $scope.currentUser = null;

    // Switch between signup and login
    $scope.toggleSignup = function() {
      if ($scope.signup)
        $scope.signup = false;
      else
        $scope.signup = true;
      $scope.authErrors = [];
      $scope.user = {};
    };

    $scope.getUser = function() {
      $scope.token = $cookies.get('token');
      $http.defaults.headers.common.token = $scope.token;
      $http.get(SERVER_ADDRESS + '/api/user')
        .then(function(res) {
          $scope.currentUser = res.data;
        }, function(err) {
          console.log(err);
        });
    };

    $scope.authenticate = function(user) {
      // user.deviceId = $rootScope.deviceId;
      user.lat = $rootScope.lat;
      user.lng = $rootScope.lng;

      $scope.authErrors = [];

      if (!(user.auth.username && user.auth.password))
        return $scope.authErrors.push('Please enter username and password.');

      $ionicLoading.show({
        template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Authenticating...'
      });

      if($scope.signup) {
        $http.post(SERVER_ADDRESS + '/api/signup', user)
          .then(function(res) {
            $cookies.put('token', res.data.token);
            $scope.getUser();
            $scope.user = {};
            $scope.signup = false;
            $location.path('/home/panic');
            $ionicLoading.hide();
          }, function(err) {
            $scope.authErrors.push(err.data.msg);
            console.log(err.data);
            $scope.user = {};
            $ionicLoading.hide();
          });
      } else {
        $http({
          method: 'POST',
          url: SERVER_ADDRESS + '/api/signin',
          data: {
            lat: $rootScope.lat,
            lng: $rootScope.lng,
            deviceId: $rootScope.deviceId
          },
          headers: {
            'Authorization': 'Basic ' + $base64.encode(user.auth.username + ':' + user.auth.password)
          }
        }).then(function(res) {
          $cookies.put('token', res.data.token);
          $scope.getUser();
          $scope.user = {};
          $location.path('/home/panic');
          $ionicLoading.hide();
        }, function(err) {
          $scope.authErrors.push(err.data.msg);
          console.log(err.data);
          $scope.user = {};
          $ionicLoading.hide();
        });

      }


      // $location.path('/home/panic');
      // $ionicLoading.hide();
    };

    $scope.logout = function() {
      $scope.currentUser = null;
      $scope.user = {};
      $scope.user.auth = null;
      $scope.signup = false;
      $location.path('/auth');
      $cookies.remove('token');
    };

  });
};
