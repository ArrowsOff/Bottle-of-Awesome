app.controller('MapCtrl', function ($scope, $ionicScrollDelegate, $log) {

    $scope.mapWidth = (document.getElementById('map').offsetWidth);
    var calcHeight = (document.getElementById('map').offsetHeight);
    $scope.mapHeight = calcHeight -100;

    var delegate;
    $scope.mapscroll = function() {
        delegate = $ionicScrollDelegate.$getByHandle('mapImage');
        //$log.log(delegate);
        $log.log(delegate.getScrollPosition());
        delegate.scrollTo(300,270);
        delegate.zoomTo(0.7);
    };
});
