app.controller('XOmemoriesUitlegCtrl', function($scope, $log, $ionicSlideBoxDelegate){
    var calcHeight = (document.getElementById('memoriesUitleg').offsetHeight) -100;
    $scope.boxHeight = calcHeight - 170;

    $scope.nextSlide = function() {
        $ionicSlideBoxDelegate.next();
    }

    $scope.previousSlide = function() {
        $ionicSlideBoxDelegate.previous();
    }

});
