app.controller('ArtistsCtrl', function($scope, $rootScope, $log, ArtistService, DatabaseService, AreaService) {

	getArtists();

	$scope.stage;

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

	AreaService.getAreas().then(function(data){
        $log.debug(data);

        $scope.areas = data.area;
    }).catch(function(err){
        $log.error("TEST ERR:", err)
    })


});
