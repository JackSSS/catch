/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var angular = window.angular;

	var catchApp = angular.module('catch', ['ionic']);

	__webpack_require__(1)(catchApp);
	__webpack_require__(3)(catchApp);

	catchApp.run(function($ionicPlatform) {
	  $ionicPlatform.ready(function() {
	    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
	    // for form inputs)
	    if (window.cordova && window.cordova.plugins.Keyboard) {
	      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
	      cordova.plugins.Keyboard.disableScroll(true);

	    }
	    if (window.StatusBar) {
	      // org.apache.cordova.statusbar required
	      StatusBar.styleDefault();
	    }
	  });
	});

	catchApp.config(function($stateProvider, $urlRouterProvider) {

	  // routing for login and signup
	  $stateProvider
	    .state('app', {
	      url: '/app',
	      abstract: true,
	      templateUrl: 'templates/menu.html',
	      controller: 'AuthCtrl'
	    })

	    .state('app.login', {
	      url: '/login',
	      views: {
	        'menuContent': {
	          templateUrl: 'templates/login.html'
	        }
	      }
	    })

	    .state('app.signup', {
	      url: '/signup',
	      views: {
	        'menuContent': {
	          templateUrl: 'templates/signup.html'
	        }
	      }
	    });

	  // routing for home
	  $stateProvider
	    .state('home', {
	      url: '/home',
	      abstract: true,
	      templateUrl: 'templates/home-menu.html',
	      // controller: 'AppCtrl'
	    })

	    .state('home.contacts', {
	      url: '/contacts',
	      views: {
	        'homeMenuContent': {
	          templateUrl: 'templates/contacts.html'
	        }
	      }
	    })

	    .state('home.search', {
	      url: '/search',
	      views: {
	        'homeMenuContent': {
	          templateUrl: 'templates/search.html'
	        }
	      }
	    })

	    .state('home.panic', {
	      url: '/panic',
	      views: {
	        'homeMenuContent': {
	          templateUrl: 'templates/panic.html'
	        }
	      }
	    })

	    .state('home.map', {
	      url: '/map',
	      views: {
	        'homeMenuContent': {
	          templateUrl: 'templates/map.html'
	        }
	      }
	    })

	    .state('home.checkin', {
	      url: '/checkin',
	      views: {
	        'homeMenuContent': {
	          templateUrl: 'templates/checkin.html'
	        }
	      }
	    });
	  // if none of the above states are matched, use this as the fallback
	  $urlRouterProvider.otherwise('/app/login');
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(app) {
	  __webpack_require__(2)(app);
	};


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = function(app) {

	  app.controller('AuthCtrl', function($scope, $timeout, $location, $ionicLoading) {

	    // With the new view caching in Ionic, Controllers are only called
	    // when they are recreated or on app start, instead of every page change.
	    // To listen for when this page is active (for example, to refresh data),
	    // listen for the $ionicView.enter event:
	    //$scope.$on('$ionicView.enter', function(e) {
	    //});

	    // Form data for the login modal
	    $scope.loginData = {};
	    $scope.signupData = {};
	    $scope.errors = [];

	    // Perform the login action when the user submits the login form
	    $scope.doLogin = function() {
	      $scope.errors = [];

	      if (!($scope.loginData.username && $scope.loginData.password))
	        return $scope.errors.push('Please enter username and password');

	      console.log('Doing login', $scope.loginData);
	      $ionicLoading.show({
	        template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Logging in...'
	      });
	      // Simulate a login delay. Remove this and replace with your login
	      // code if using a login system

	      $location.path('/home/panic');
	      $ionicLoading.hide();
	    };

	    $scope.doSignup = function() {
	      $scope.errors = [];

	      if (!($scope.signupData.username && $scope.signupData.password))
	        return $scope.errors.push('Please enter username and passwords.');

	      if ($scope.signupData.password !== $scope.signupData.confirmPassword)
	        return $scope.errors.push('Passwords do not match.');

	      console.log('Doing signup', $scope.loginData);
	      $ionicLoading.show({
	        template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Signing up...'
	      });
	      // Simulate a login delay. Remove this and replace with your login
	      // code if using a login system
	      $location.path('/home/panic');
	      $ionicLoading.hide();
	    };
	  });
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = function(app) {

	  app.directive('errorList', function() {
	    return {
	      restrict: 'AC',
	      replace: true,
	      templateUrl: 'templates/error_list.html',
	      scope: {
	        errors: '='
	      }
	    };
	  });
	};


/***/ }
/******/ ]);