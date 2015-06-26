app.controller('ScheduleCtrl', function($scope, $log, $ionicScrollDelegate) {
    $scope.calcWidthSC = screen.width;
    $log.log($scope.calcWidthSC);
    $scope.calcHeightSC = screen.height;
    $log.log($scope.calcHeightSC);

    $scope.calculateHeight = function(artist) {
        var date1 = new Date(artist.start_time);
        var date2 = new Date(artist.end_time);
        var diffMs = (date2 - date1); // milliseconds between now & Christmas
        var diffHrs = Math.round((diffMs % 86400000) / 3600000); // hours
        var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
        var result;

        if(diffHrs == 2) {
            result = diffHrs*60 - diffMins;
        } else if (diffHrs == 1) {
            result = diffHrs*60 + diffMins;
            if(result == 105) {
                result = 45;
            }
        } else {
            result = diffMins;
        }

        return result*1.5;
    };

    var delegate;
    var secondDelegate;

    $scope.scrolling = function() {
        delegate = $ionicScrollDelegate.$getByHandle('bottom');
        secondDelegate = $ionicScrollDelegate.$getByHandle('top');
        $log.log('scrolling', delegate.getScrollPosition().left, secondDelegate.getScrollPosition().left);
        secondDelegate.scrollTo(delegate.getScrollPosition().left);
    };
    
    $log.log(moment().format('hh:mm'));
    
    $scope.linePosition = function() {
	    var timeLineH = moment().format('H');
	    var timeLineM = moment().format('mm');
	    
	    var timeLineH = (timeLineH * 90)-990;
	    var timeLineM = timeLineM *1.5;
//	    $log.log(timelineH);
//	    $log.log(timelineM);	    
	    var timeLine = timeLineH + timeLineM;
//	    $log.log(timeLine);	 
	    
	    return timeLine;   
	    
	    
    }
});
