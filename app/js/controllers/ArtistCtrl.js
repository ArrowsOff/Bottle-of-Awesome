app.controller('ArtistCtrl', function($scope, $rootScope, $stateParams, $log, $sce, ArtistService, SpotifyService) {
	$scope.spotify = false;

	// Configure Spotify url
	this.config = {
		sources: [
      		{src: $sce.trustAsResourceUrl($scope.url), type: "audio/mpeg"}
      	]
	};

	angular.forEach($rootScope.artists.artist, function(data) {	
		if($stateParams.id == data._id) {
			$scope.artist = data;

			// Get Spotify track
			SpotifyService.get(data.name.__cdata).then(function(res) {
				$scope.spotify = true;
				$scope.url = res.preview_url;
				$scope.track = res.name;
			});
		}
	});
});