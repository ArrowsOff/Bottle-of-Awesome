app.controller('ArtistsCtrl', function($scope, $rootScope, $log, ArtistService, DatabaseService, AreaService) {
	
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
