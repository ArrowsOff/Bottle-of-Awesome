app.controller('PublicCtrl', function ($scope, $http, ArtistService) {

	// ArtistService.getAllArtists().then(function(data){
	// 	$scope.artists = data;
	// });

	// ArtistService.getArtist('1').then(function(data){
	// 	$scope.artist = data;
	// });


	$scope.artists = ArtistService.get().query();
});