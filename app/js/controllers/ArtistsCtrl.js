app.controller('ArtistsCtrl', function($ionicScrollDelegate, $scope, $log) {
	// Preselect radio button - Area menu
	$scope.stage = '';

	function scrollToStage(x) {
		$ionicScrollDelegate.$getByHandle('stages').scrollTo(x, 0, true);
	}

	// Swiping through stages
	$scope.swipe = function(direction) {
		switch ($scope.stage) {
		    case "":
				if(direction == 'left') {
					$scope.stage = "aab3238922bcc25a6f606eb525ffdc56";
					scrollToStage(62);
				}
		        break;
		    case "aab3238922bcc25a6f606eb525ffdc56":
				if(direction == 'left') {
					$scope.stage = "9bf31c7ff062936a96d3c8bd1f8f2ff3";
					scrollToStage(163);
				} else {
					$scope.stage = "";
					scrollToStage(0);
				}
		        break;
		    case "9bf31c7ff062936a96d3c8bd1f8f2ff3":
				if(direction == 'left') {
					$scope.stage = "8e296a067a37563370ded05f5a3bf3ec";
					scrollToStage(253);
				} else {
					$scope.stage = "aab3238922bcc25a6f606eb525ffdc56";
					scrollToStage(62);
				}
		        break;
		    case "8e296a067a37563370ded05f5a3bf3ec":
				if(direction == 'left') {
					$scope.stage = "70efdf2ec9b086079795c442636b55fb";
					scrollToStage(322);
				} else {
					$scope.stage = "9bf31c7ff062936a96d3c8bd1f8f2ff3";
					scrollToStage(163);
				}
		        break;
		    case "70efdf2ec9b086079795c442636b55fb":
				if(direction == 'left') {
					$scope.stage = "c74d97b01eae257e44aa9d5bade97baf";
					scrollToStage(398);
				} else {
					$scope.stage = "8e296a067a37563370ded05f5a3bf3ec";
					scrollToStage(253);
				}
		        break;
		    case "c74d97b01eae257e44aa9d5bade97baf":
				if(direction == 'left') {
					$scope.stage = "1f0e3dad99908345f7439f8ffabdffc4";
					scrollToStage(398);
				} else {
					$scope.stage = "70efdf2ec9b086079795c442636b55fb";
					scrollToStage(322);
				}
		        break;
		    case "1f0e3dad99908345f7439f8ffabdffc4":
				if(direction == 'left') {
					$scope.stage = "33e75ff09dd601bbe69f351039152189";
					scrollToStage(398);
				} else {
					$scope.stage = "c74d97b01eae257e44aa9d5bade97baf";
					scrollToStage(398);
				}
		        break;
			case "33e75ff09dd601bbe69f351039152189":
				if(direction == 'right') {
					$scope.stage = "1f0e3dad99908345f7439f8ffabdffc4";
					scrollToStage(398);
				}
		        break;
		}
	};
});
