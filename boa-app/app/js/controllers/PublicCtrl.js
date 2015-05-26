app.controller('PublicCtrl', function ($scope, $http, ArtistService) {

	ArtistService.getArtists().then(function(data){
		$scope.artists = data.artist;
		console.log($scope.artists);
	});
	
});
