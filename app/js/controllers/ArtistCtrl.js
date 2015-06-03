app.controller('ArtistCtrl', function ($scope, $stateParams, $log, ArtistService) {

	ArtistService.getArtist($stateParams.id).then(function(data){
		$scope.artist = data;
	});
});