app.controller('AppCtrl', function($scope, $rootScope, $log, $ionicNavBarDelegate, $timeout, ArtistService, TrackingService, lodash) {

	$scope.addToFavorites = function(id) {
		ArtistService.favorite(id);
	};

	// Update the $rootScope when an artist is favourited
	$rootScope.$on('favourited', function(event, args) {
		ArtistService.getFavourites().then(function(data) {
			$rootScope.favourites = data;

			angular.forEach(data.artists, function(obj) {
				angular.forEach($rootScope.artists.artist, function(res) {
					if(obj == res._id) {
						res.favourited = true;
					}
				})
			})
		})
	});

	// This can convert times from XML to readable Times
	$scope.toTime = function(time) {
		// Might need to add 12 to this number 
		return moment(time).format("HH:mm");
	};

	// Google Analytics Track every view when state changes
	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
	    $timeout(function(){
	    	TrackingService.trackView($ionicNavBarDelegate.title());
	    },500);
  	});

  	// Calculating height sidemenu buttons             
  	// Device hoogte - menubalk (nu 44px, 33px + (2x 5px padding) + 1px under-border  + een random pixel die ervoor zorgt dat je niet meer kan scrollen)
  	var calcHeight = (document.getElementById('sideMenu').offsetHeight);
  	
  	// Calculation height for buttons in sidemenu 
  	$scope.calcHeightMB = (calcHeight - 102) / 4;

  	// Calculation height for buttons on app.info
  	$scope.calcInfoHeight = (calcHeight - 121) / 3;
});

// Is er n artiest die op twee stages optreedt?
