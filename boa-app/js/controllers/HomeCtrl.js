angular.module('starter.controllers.HomeCtrl', [])
.controller('HomeCtrl', function ($scope, LocationService) {

	$scope.getLocation = function() {
		LocationService.getPosition().then(function(data){
			$scope.location = data;
		});
	}

});