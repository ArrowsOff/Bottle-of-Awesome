app.controller('ArtistCtrl', function($scope, $stateParams, $log,$cordovaFile, $cordovaFileTransfer, $cordovaMedia, $ionicLoading, ArtistService, SpotifyService) {

	ArtistService.getArtist($stateParams.id).then(function(data){
		$scope.artist = data;

		SpotifyService.get(data.name.__cdata).then(function(url) {
			$log.debug(url);
			media(url);
		});
	});

	var media;
	var playing = false;
	$scope.loading = false;

	function media(src) {
		media = new Media(src, function() {
		}, null, function(status) {
			if(status == 1) {
				$scope.loading = true;
				$ionicLoading.show({template: 'Loading...'});
			} else {
				$scope.loading = false;
				$ionicLoading.hide();
			}
		});
	}

	$scope.play = function() {
		if(!playing) {
			playing = true;
			media.play();
		} else {
			playing = false;
			media.pause();
		}
	}

	$scope.pause = function() {
		media.pause();
	}

	var mediaStatusCallback = function(status) {
		if(status == 1) {
			$ionicLoading.show({template: 'Loading...'});
		} else {
			$ionicLoading.hide();
		}
	}	
	$scope.$on('$ionicView.beforeLeave', function(){
		media.pause();
	});

});