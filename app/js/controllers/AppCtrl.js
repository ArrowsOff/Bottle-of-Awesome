app.controller('AppCtrl', function($scope, $rootScope, $log, $ionicNavBarDelegate, $timeout, ArtistService, TrackingService) {

	$scope.addToFavorites = function(id) {
		ArtistService.favorite(id);
	};

	// This function will update the favourite scope
	function updateFavorites(data) {
		// Reset favourites array
		$scope.favourites = [];

		// Loop through all artists to find the favourited
		angular.forEach(data.artist, function(obj) {
			if(obj.favourited) {
				$scope.favourites.push(obj);
			}
		});
	}

	// This will set artist variable global
	ArtistService.getArtists().then(function(data) {
		$rootScope.artists = data;
		updateFavorites(data);
	});

	// Update the $rootScope when an artist is favourited
	$rootScope.$on('favourited', function(event, args) {
    	ArtistService.getArtists().then(function(data) {
			$rootScope.artists = data;
			updateFavorites(data);
		});
    	
	});

	// This can convert times from XML to readable Times
	$scope.toTime = function(time) {
		// Might need to add 12 to this number 
		return moment(time).format("HH:mm");
	}

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
