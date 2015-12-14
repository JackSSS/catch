angular.module('catch.controllers', [])

.controller('AppCtrl', function($scope, $timeout, $location, $ionicLoading) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
  $scope.signupData = {};
  $scope.errors = ['username not found', 'password incorrect'];

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    $ionicLoading.show({
      template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Logging in...'
    });
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $ionicLoading.hide();
      $location.path('/home/panic');
    }, 1000);
  };

  $scope.doSignup = function() {
    console.log('Doing signup', $scope.loginData);
    $ionicLoading.show({
      template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Signing up...'
    });
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $ionicLoading.hide();
      $location.path('/home/panic');
    }, 1000);
  };
})
