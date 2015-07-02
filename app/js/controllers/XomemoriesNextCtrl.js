app.controller('xomemoriesNextCtrl', function($scope){
    var calcHeight = (document.getElementById('memoriesNext').offsetHeight) -100;
    $scope.memoryHeight = calcHeight;
    $scope.uploadCheck = true;

    if ($scope.uploadCheck === true) {
        $scope.itemHeight = ((calcHeight / 2) -50);
    } else {
        $scope.itemHeight = ((calcHeight / 2) -20);
    }

    $scope.clearQuote = function(num) {
        document.getElementById('quote'+num).value = '';
    }

    $scope.clearPhotoText = function(num) {
        document.getElementById('phototext'+num).value = '';
    }

});
