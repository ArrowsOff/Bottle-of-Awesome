app.controller('ArtistCtrl', function ($scope, $stateParams, $log, ArtistService) {
	ArtistService.getArtist($stateParams.id).then(function(data){

		$scope.artist = data;

		ArtistService.isFavorite($scope.artist._id).then(function(data){
			$log.debug(data);
			$scope.artist.favorited = data.favorited;
		}).catch(function(err){
			$scope.artist.favorited = false;	
		});
	});

	// Chech if favorite state changes
	$scope.$on('favorited', function(event, args) {
	   ArtistService.isFavorite($scope.artist._id).then(function(data){
			$log.debug(data);
			$scope.artist.favorited = data.favorited;			
		}).catch(function(err){
			$scope.artist.favorited = false;	
		});
	});

});