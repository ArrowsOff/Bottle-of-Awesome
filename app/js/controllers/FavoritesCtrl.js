app.controller('FavoritesCtrl', function($scope, $log, ArtistService){
	getArtists(); 

	$scope.favourites = [];

	function getArtists() {
		ArtistService.getArtists().then(function(data){
			$scope.artists = data.artist;

			$log.debug(data.artist[0])



			angular.forEach(data.artist, function(obj){
				if(obj.favourited) {
					$scope.favourites.push(obj);
				}
			});

			$log.debug($scope.favourites);

			// angular.forEach($scope.favourites, function(obj){
			// 	$log.debug(moment(obj.start_time).format("HH:mm"));
			// });
		});
	}



});