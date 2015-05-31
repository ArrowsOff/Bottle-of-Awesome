app.controller('PublicCtrl', function ($scope, $ionicNavBarDelegate, $log, ArtistService, TrackingService) {

	ArtistService.getArtists().then(function(data){
		$scope.artists = data.artist;
	});

});
