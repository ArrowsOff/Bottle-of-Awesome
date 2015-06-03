app.controller('ScheduleCtrl', function ($scope, ArtistService) {

	getArtists();

	function getArtists() {
		ArtistService.getArtists().then(function(data){
			$scope.artists = data.artist;
		});
	}

});