app.controller('FavoritesCtrl', function($scope, $rootScope, $log, SpotifyService, ArtistService) {
	// Create playlist from favourites
	SpotifyService.createPlaylist().then(function(data) {
		$scope.playlist = data;
	});

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
