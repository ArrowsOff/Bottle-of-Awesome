app.controller('XOmemoriesCtrl', function($scope, $rootScope, $log, $cordovaImagePicker){
    var calcHeight = (document.getElementById('memories').offsetHeight) -100;
    $scope.memoryHeight = calcHeight;
    $scope.uploadCheck = true;

    if ($scope.uploadCheck === true) {
        $scope.itemHeight = ((calcHeight / 2) -50);
    } else {
        $scope.itemHeight = ((calcHeight / 2) -20);
    }

    $scope.openImagePicker = function() {
        var options = {
            maximumImagesCount: 10,
            width: 800,
            height: 800,
            quality: 80
        };

        $cordovaImagePicker.getPictures(options).then(function (results) {
            $rootScope.memories = {
                pictures: results
            };

        }, function(error) {
            // error getting photos
        });
    };

});
