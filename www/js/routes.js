module.exports = function(app) {

  app.config(function($stateProvider, $urlRouterProvider) {

    // routing for login and signup
    $stateProvider
      .state('auth', {
        url: '/auth',
        templateUrl: 'templates/auth_form.html',
      });

    // routing for home
    $stateProvider
      .state('home', {
        url: '/home',
        abstract: true,
        templateUrl: 'templates/home-menu.html',
      })

      .state('home.contacts', {
        url: '/contacts',
        views: {
          'homeMenuContent': {
            templateUrl: 'templates/contacts.html',
            controller: 'ContactsController'
          }
        }
      })

      .state('home.panic', {
        url: '/panic',
        views: {
          'homeMenuContent': {
            templateUrl: 'templates/panic.html',
            controller: 'PanicCtrl'
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

      .state('home.map-alert', {
        url: '/map/:lat/:lng',
        views: {
          'homeMenuContent': {
            templateUrl: 'templates/map.html',
            controller: function($stateParams, $scope) {
              $scope.lat = $stateParams.lat;
              $scope.lng = $stateParams.lng;
            }
          }
        }
      })

      .state('home.checkin', {
        url: '/checkin',
        views: {
          'homeMenuContent': {
            templateUrl: 'templates/checkin.html',
            controller: 'CheckinCtrl'
          }
        }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/auth');
  });
};
