app.controller('ArtistCtrl', function($scope, $stateParams, $log,$cordovaFile, $cordovaFileTransfer, $cordovaMedia, $ionicLoading, $sce, ArtistService, SpotifyService) {

	$scope.spotify = false;

	// Configure Spotify url
	this.config = {
		sources: [
      		{src: $sce.trustAsResourceUrl($scope.url), type: "audio/mpeg"}
      	]
	};

	// Get artist from database 
	ArtistService.getArtist($stateParams.id).then(function(data) {
		$scope.artist = data;

		// Get Spotify track
		SpotifyService.get(data.name.__cdata).then(function(data) {
			$scope.spotify = true;
			$scope.url = data.preview_url;
			$scope.track = data.name;
		});
	});
});