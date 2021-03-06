module.exports = function(app) {

  app.controller('CheckinCtrl', ['$scope', '$http', '$ionicLoading', '$ionicPopup', '$cookies',
  function($scope, $http, $ionicLoading, $ionicPopup, $cookies) {
  	var cookieToken = $cookies.get('token');
  	$scope.currentUser = {};

	 	$scope.updateUser = function() {
	 		cookieToken = $cookies.get('token');
	 		$http({
		    url: SERVER_ADDRESS + '/api/user',
		    method: "GET",
		    headers: {
		    	token: cookieToken
		    }
		 	}).then(function(res) {
		 		$scope.currentUser = res.data;
		 		$scope.currentUser.lat = $scope.lat;
		 		$scope.currentUser.lng = $scope.lng;
		 		$scope.currentUser.lastCheckin = Date.now();

				$http({
					url: SERVER_ADDRESS + '/api/user',
					method: 'POST',
					data: $scope.currentUser,
					headers: {
						token: cookieToken
					}
				}).then(function(res) {
					$ionicPopup.alert({
						title: 'Check In',
						template: 'Checked in at ' + new Date().toLocaleTimeString(),
						okType: 'button-dark'
					});
				}, function(err) {
					console.log('Error sending user location data: ' + err);
					$ionicPopup.alert({
						title: 'Check In Error!',
						template: 'Error during Check In!\nPlease try again.',
						okType: 'button-dark'
					})
				});
		 	}, function(err) {
		 		console.log(err);
		 	});
	 	}

		$scope.checkIn = function() {
			$scope.updateUser();
		};
	}]);
};
