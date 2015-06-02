app.controller('ArtistsCtrl', function ($scope, $log, ArtistService) {

	ArtistService.getArtists().then(function(data){
		$scope.artists = data.artist;
	})

	$scope.clear = function() {
		DatabaseService.destroy();
	}



});
