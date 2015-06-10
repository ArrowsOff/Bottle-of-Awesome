app.controller('ArtistCtrl', function($scope, $stateParams, $log,$cordovaFile, $cordovaFileTransfer, $cordovaMedia, $ionicLoading, $sce, ArtistService, SpotifyService) {

	var media;
	$scope.playing = false;
	$scope.loading = false;
	$scope.spotify = false;

	this.config = {
		sources: [
      		{src: $sce.trustAsResourceUrl($scope.url), type: "audio/mpeg"}
      	]
	};

	// Get artist from database 
	ArtistService.getArtist($stateParams.id).then(function(data) {
		$scope.artist = data;

		SpotifyService.get(data.name.__cdata).then(function(data) {
			$scope.spotify = true;
			$log.log(data);
			$scope.url = data.preview_url;
			$scope.track = data.name;
						
			// mediaPrepare(url);
		});
	});

	// Prepare Media object, if available;
	// function mediaPrepare(src) {
	// 	media = new Media(src, function() {/* Success callback */}, null, function(status) {
	// 		if(status == 1) {
	// 			$scope.loading = true;
	// 		} else {
	// 			$scope.loading = false;
	// 		}
	// 	});
	// }

	// $scope.play = function() {
	// 	$log.debug($scope.playing);

	// 	if(!$scope.playing) {
	// 		$scope.playing = true;
	// 		media.play();
	// 	} else {
	// 		$scope.playing = false;
	// 		media.pause();
	// 	}
	// }
	
	// $scope.$on('$ionicView.beforeLeave', function() {
	// 	if($scope.playing) {
	// 		media.pause();
	// 	}
	// });

	

});