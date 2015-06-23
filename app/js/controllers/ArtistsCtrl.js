app.controller('ArtistsCtrl', function($scope, $rootScope, $log, ArtistService, DatabaseService, AreaService) {
	
	// Preselect radio button - Area menu
	$scope.stage = '';

	$scope.clear = function() {
		DatabaseService.remove();
	};

	AreaService.getAreas().then(function(data) {
        $scope.stages = data.stage;
    }).catch(function(err){
        $log.error("Error getting Areas:", err);
    });
});
