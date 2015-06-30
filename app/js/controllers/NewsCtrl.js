app.controller('NewsCtrl', function ($scope, $log, $http) {
	// Initialize counter
	countdown();

	// Function for Countdown
	function countdown() {
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
	}

    $scope.check = function() {
        if ($scope.counter.value < 0 && $scope.festival.value >= 0) {
            return true;
        } else {
            return false;
        }
    };

	// Update countdown every second.
	setInterval(function(){
        $scope.$apply(countdown());
    },1000);


    // twitterfeed
    $http.get("http://app.xofestival.nl/api/rss.php").success(function(data) {
        //var x2js = new X2JS();
        //var json = x2js.xml_str2json(data);
        $log.log(data);

        $scope.rss = json.rss.channel.item;
    });


  	// Calculation height for images news
  	// $scope.calcNewsWidth = (document.getElementById('news-image').offsetHeight);


});
