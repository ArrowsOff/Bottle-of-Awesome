app.controller('ArtistCtrl', function ($scope, $stateParams, ArtistService) {
	ArtistService.getArtist($stateParams.id).then(function(data){

		$scope.artist = data;
	});
});