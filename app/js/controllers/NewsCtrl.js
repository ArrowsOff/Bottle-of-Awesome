app.controller('NewsCtrl', function ($scope, $log) {
	// Initialize counter
	countdown();

	// Function for Countdown
	function countdown() {
		$scope.counter = moment().countdown("2015/7/11");
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
	}

	// Update countdown every second.
	setInterval(function(){
        $scope.$apply(countdown());
    },1000);


    
  	// Calculation height for images news
  	// $scope.calcNewsWidth = (document.getElementById('news-image').offsetHeight);


});