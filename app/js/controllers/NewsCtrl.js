app.controller('NewsCtrl', function ($scope, $log, $http) {
	// Function for Countdown
	$scope.countdown = function() {
		$scope.counter = moment().countdown("2015/7/11 11:00:00");
        if($scope.counter.days < 10){
        	$scope.counter.days= "0" + $scope.counter.days;
        }
        if($scope.counter.hours < 10){
        	$scope.counter.hours= "0" + $scope.counter.hours;
        }
        if($scope.counter.minutes < 10){
        	$scope.counter.minutes= "0" + $scope.counter.minutes;
        }
        if($scope.counter.seconds < 10){
        	$scope.counter.seconds= "0" + $scope.counter.seconds;
        }

        $scope.festival = moment().countdown("2015/7/11 23:15:00");
	};

	// Update countdown every second.
	setInterval(function(){
        $scope.$apply($scope.countdown());
    },1000);

	$scope.check = function() {
        if ($scope.counter.value < 0 && $scope.festival.value >= 0) {
            return true;
        } else {
            return false;
        }
    };

    // Twitterfeed
    $http.get("http://app.xofestival.nl/api/rss.php").success(function(data) {
		$scope.rss = data;
    });
});
