app.controller('ArtistCtrl', function ($scope, $stateParams, ArtistService) {

	// ArtistService.getArtist('1').then(function(data){
	// 	$scope.artist = data;
	// });

	// $scope.artist = ArtistService.get().get(1);

	$scope.artist = ArtistService.get().get({user: $stateParams.id});


	// Add to favorites
	// $scope.addToFavorites = ArtistService.addToFavorites($stateParams.id);
});