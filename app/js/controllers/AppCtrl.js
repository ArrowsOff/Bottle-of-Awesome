app.controller('AppCtrl', function($scope, $rootScope, $log, $ionicNavBarDelegate, $timeout, ArtistService, TrackingService, lodash) {

	$scope.isIOS = function() {
		if(ionic.Platform.isIPad() || ionic.Platform.isIOS()) {
			return true;
		}
	};

	$scope.addToFavorites = function(id) {
		event.preventDefault();
		ArtistService.favorite(id);
		TrackingService.trackEvent(id, 'favourite');
	};

	// Update the $rootScope when an artist is favourited
	$rootScope.$on('favourited', function(event, args) {
		ArtistService.getFavourites().then(function(data) {
			$rootScope.favourites = data;

			// This will set an favourited value of true if the artist is favorited
			angular.forEach(data.artists, function(obj) {
				angular.forEach($rootScope.artists.artist, function(res) {
					if(obj == res._id) {
						res.favourited = true;
					}
				});
			});
		});
	});

	// This can convert times from XML to readable Times
	$scope.toTime = function(time) {
		// Might need to add 12 to this number
		return moment(time).format("HH:mm");
	};

	// This can convert times from XML to readable Times
	$scope.toDate = function(date) {
		// Might need to add 12 to this number
		return moment(date).format("DD MMM");
	};

	// Google Analytics Track every view when state changes
	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		$timeout(function() {
	    	TrackingService.trackView(toState.name);
	    },500);
	});

  	// Calculating height sidemenu buttons
  	// Device hoogte - menubalk (nu 44px, 33px + (2x 5px padding) + 1px under-border  + een random pixel die ervoor zorgt dat je niet meer kan scrollen)
  	var calcHeight = (document.getElementById('sideMenu').offsetHeight);

  	// Calculation height for buttons in sidemenu
  	$scope.calcHeightMB = (calcHeight - 102) / 4;

  	// Calculation height for buttons on app.info
 //  	$scope.calcInfoHeight = (calcHeight - 121) / 3;
	if($scope.isIOS()) {
		$scope.calcInfoHeight = (calcHeight - 141) / 3;
	} else {
		$scope.calcInfoHeight = (calcHeight - 121) / 3;
	}

  	$scope.InAppBrowser = function(e) {
		e = e ||  window.event;
        var element = e.target || e.srcElement;

        if (element.tagName == 'A') {
            window.open(element.href, "_system", "location=yes");
            return false; // prevent default action and stop event propagation
        }
    };

  });
