app.controller('ArtistCtrl', function ($scope, $stateParams, $ionicNavBarDelegate, ArtistService, $http, x2js) {

	// Add to favorites
	// $scope.addToFavorites = ArtistService.addToFavorites($stateParams.id);

	ArtistService.getArtist($stateParams.id).then(function(data){

		console.log(data);
		$scope.artist = data;
	});
});