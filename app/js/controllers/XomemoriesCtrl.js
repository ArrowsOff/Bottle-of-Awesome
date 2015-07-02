app.controller('XOmemoriesCtrl', function($scope, $log){
    var calcHeight = (document.getElementById('memories').offsetHeight) -100;
    $scope.memoryHeight = calcHeight;
    $scope.uploadCheck = true;

    if ($scope.uploadCheck === true) {
        $scope.itemHeight = ((calcHeight / 2) -50);
    } else {
        $scope.itemHeight = ((calcHeight / 2) -20);
    }

});
