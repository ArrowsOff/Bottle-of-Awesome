app.controller('ArtistsCtrl', function($scope, $rootScope, $log, ArtistService, DatabaseService) {

	getArtists();

	$rootScope.$on('favourited', function(event, args) {
    	getArtists();
	});

	function getArtists() {
		ArtistService.getArtists().then(function(data){
			$scope.artists = data.artist;
		});
	}

	$scope.clear = function() {
		DatabaseService.remove();
	};
	
});
