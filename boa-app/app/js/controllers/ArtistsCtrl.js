app.controller('ArtistsCtrl', function ($scope, $log, ArtistService, DatabaseService) {

	ArtistService.getArtists().then(function(data) {
		$log.info(data);
		$scope.artists = data.artist;

		angular.forEach($scope.artists, function(value,index){
	       	// $log.debug(value._id);
	       	ArtistService.isFavorite(value._id).then(function(data){
	       		// data.favorited = true;
	       		$log.debug(data._id);
	       	}).catch(function(err){
	       		// data.favorited = false;
	       		// $log.debug(value);
	       	})
	    })

		// ArtistService.isFavorite($scope.artist._id).then(function(data){
		// 	$log.debug(data);
		// 	$scope.artist.favorited = data.favorited;
		// }).catch(function(err){
		// 	$scope.artist.favorited = false;	
		// });
	});

	$scope.clear = function() {
		DatabaseService.destroy();
	}

	$scope.status = function(id) {
		ArtistService.isFavorite(id);
	}


});
