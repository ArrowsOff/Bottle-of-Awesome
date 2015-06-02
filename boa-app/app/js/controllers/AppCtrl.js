app.controller('AppCtrl', function($scope, $rootScope, $log, $ionicNavBarDelegate, $timeout, ArtistService, TrackingService) {

	$scope.addToFavorites = function(id) {
		ArtistService.favorite(id);
	};

	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
	    $timeout(function(){
	    	TrackingService.trackView($ionicNavBarDelegate.title());
	    },500);
  	});

  	// Calculating height menu buttons             
  	// Device hoogte - menubalk (nu 44px, 33px + (2x 5px padding) + 1px under-border  + een random pixel die ervoor zorgt dat je niet meer kan scrollen)
  	var calcHeight = (document.getElementById('sideMenu').offsetHeight);
  	$scope.calcHeightMB = (calcHeight -45)/4;

  	$scope.calcInfoHeight = ((document.getElementById('sideMenu').offsetHeight)-121)/3;
});