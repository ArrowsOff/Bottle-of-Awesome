app.controller('ScheduleCtrl', function($scope, $log, $ionicScrollDelegate) {

	// AreaService.getAreas().then(function(data){
 //        $log.debug(data.area);

 //        $scope.areas = data.area;

 //    }).catch(function(err){
 //        $log.error("Error getting Areas:", err);
 //    });

    // $scope.toArea = function(id) {
    // 	angular.forEach($scope.areas, function(area){
    // 		if(area._id === id) {
    // 			$log.log(area.title.toString());
    // 			return area.title.toString();
    // 		}
    // 	})
    // }
    // $log.log($rootScope.artists)
    // angular.forEach($rootScope.artists.artist, function(artist) {
    // 	// $log.log(artist.stage_name)

    // 	if(artist.stage_name === undefined) {
    // 		$log.error(artist.stage_id)
    // 	}
    // })


    var delegate;
    var secondDelegate;
    
    $scope.scrolling = function() {
      delegate = $ionicScrollDelegate.$getByHandle('bottom');
      secondDelegate = $ionicScrollDelegate.$getByHandle('top');
      secondDelegate.scrollTo(delegate.getScrollPosition().left);
    }    

});