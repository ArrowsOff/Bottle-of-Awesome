app.controller('FavoritesCtrl', function($scope, $rootScope, $log, ArtistService) {
	// Create playlist from favourites -- Commented because we dont use it right now
	// SpotifyService.createPlaylist().then(function(data) {
	// 	$scope.playlist = data;
	// });

	ArtistService.getFavourites().then(function(data) {
		if(data.artists.length > 0) {
			$scope.favourited = true;
		} else {
			$scope.favourited = false;
		}
	});

	$rootScope.$on('favourited', function() {
		ArtistService.getFavourites().then(function(data) {
			if(data.artists.length > 0) {
				$scope.favourited = true;
			} else {
				$scope.favourited = false;
			}
		});
	});
});
