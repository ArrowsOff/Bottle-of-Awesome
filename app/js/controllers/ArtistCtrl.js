app.controller('ArtistCtrl', function($scope, $rootScope, $stateParams, $log, $sce, ArtistService, SpotifyService, $ionicHistory, TrackingService) {
	$scope.spotify = false;

	// Configure Spotify url
	this.config = {
		sources: [{src: $sce.trustAsResourceUrl($scope.url), type: "audio/mpeg"}]
	};

	angular.forEach($rootScope.artists.artist, function(data) {
		if($stateParams.id == data._id) {
			$scope.artist = data;
			TrackingService.trackView(data.name.__cdata);

			// Get Spotify information
			SpotifyService.get(data.name.__cdata).then(function(res) {
				$scope.spotify = true;
				$scope.url = res.preview_url;
				$scope.track = res.name;
				$scope.artistUrl = res.artists[0].external_urls.spotify;
			});
		}
	});

	$scope.trackPlay = function() {
		TrackingService.trackEvent($scope.artist.name.__cdata, 'played');
	};

	//Go back to previous view
	$scope.goBack = function() {
		$ionicHistory.goBack();
	};
});
