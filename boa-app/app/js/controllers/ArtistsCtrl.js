app.controller('ArtistsCtrl', function ($scope, $log, ArtistService, DatabaseService) {

	ArtistService.getArtists().then(function(data){
		$log.debug(data)
		$scope.artists = data.artist;
	});

	$scope.clear = function() {
		DatabaseService.destroy();
	}

});
