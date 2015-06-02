app.controller('NewsCtrl', function ($scope, $log) {
	// Initialize counter
	countdown();

	// Function for Countdown
	function countdown() {
		$scope.counter = moment().countdown("2015-7-18");
	}

	// Update countdown every second.
	setInterval(function(){
        $scope.$apply(countdown());
    },1000);

});