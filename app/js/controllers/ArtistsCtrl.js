app.controller('ArtistsCtrl', function($scope, $rootScope, $log, ArtistService, DatabaseService, AreaService) {

	// getArtists();

	// $scope.stage;

	// $rootScope.$on('favourited', function(event, args) {
 //    	getArtists();
	// });

	// function getArtists() {
	// 	ArtistService.getArtists().then(function(data){
	// 		$scope.artists = data.artist;
	// 	});
	// }
	
	// if (!$rootScope.artists) {
	// 	$log.debug("test")
	// } else {
	// 	// $scope.artists = $rootScope.artists;
	// }
	
	// Preselect radio button - Area menu
	$scope.stage = 'all';

	$scope.clear = function() {
		DatabaseService.remove();
	};

	AreaService.getAreas().then(function(data){
        $log.debug(data);

        $scope.areas = data.area;
    }).catch(function(err){
        $log.error("Error getting Areas:", err);
    });
});
