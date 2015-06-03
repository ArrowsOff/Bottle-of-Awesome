app.controller('AppCtrl', function($scope, $rootScope, $log, $ionicNavBarDelegate, $timeout, ArtistService, TrackingService) {

	$scope.addToFavorites = function(id) {
		ArtistService.favorite(id);
	};

	// This can convert times from XML to readable Times
	$scope.toTime = function(time) {
		// Might need to add 12 to this number 
		return moment(time).format("HH:mm");
	}

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