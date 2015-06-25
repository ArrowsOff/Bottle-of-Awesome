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
    $scope.calcWidthSC = screen.width;
    $log.log($scope.calcWidthSC);
    $scope.calcHeightSC = screen.height;
    $log.log($scope.calcHeightSC);

    $scope.calculateHeight = function(artist) {
        // $log.log($scope.toTime(artist.end_time), $scope.toTime(artist.start_time))
        // $log.log(parseInt($scope.toTime(artist.end_time), 10 ));

        var date1 = new Date(artist.start_time);
        var date2 = new Date(artist.end_time);
        var diffMs = (date2 - date1); // milliseconds between now & Christmas
        var diffHrs = Math.round((diffMs % 86400000) / 3600000); // hours
        var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
        var result;


        if(diffHrs == 2) {
            result = diffHrs*60 - diffMins;
        } else {
            result = diffHrs*60 + diffMins;
        }

        $log.log(artist.name.__cdata, result)

        return result;
    }

    var delegate;
    var secondDelegate;

    $scope.scrolling = function() {
      delegate = $ionicScrollDelegate.$getByHandle('bottom');
      secondDelegate = $ionicScrollDelegate.$getByHandle('top');
      secondDelegate.scrollTo(delegate.getScrollPosition().left);
    }

});
