app.controller('ArtistCtrl', function($scope, $stateParams, $log,$cordovaFile, $cordovaFileTransfer, $cordovaMedia, $ionicLoading, ArtistService, SpotifyService) {

	ArtistService.getArtist($stateParams.id).then(function(data){
		$scope.artist = data;

		SpotifyService.get(data.name.__cdata).then(function(url) {
			$log.debug(url);
			mediaPrepare(url);

			$scope.track = {
				url: url,
				artist: 'test',
				title: 'Song name'
			}
		});
	});

	var media;
	$scope.playing = false;
	$scope.loading = false;

	function mediaPrepare(src) {
		media = new Media(src, function() {
		}, null, function(status) {
			if(status == 1) {
				$scope.loading = true;
			} else {
				$scope.loading = false;
			}
		});
	}

	$scope.play = function() {
		$log.debug($scope.playing);
		if(!$scope.playing) {
			$scope.playing = true;
			media.play();
		} else {
			$scope.playing = false;
			media.pause();
		}
	}
	
	$scope.$on('$ionicView.beforeLeave', function(){
		media.pause();
	});

});