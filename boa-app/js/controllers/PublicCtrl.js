app.controller('PublicCtrl', function ($scope, $http, ArtistService) {

	// ArtistService.getAllArtists().then(function(data){
	// 	$scope.artists = data;
	// });

	ArtistService.getArtist('555a5f4e0039d2f388a86c70').then(function(data){
		$scope.artist = data;
	});

});