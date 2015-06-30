app.controller('MapCtrl', function ($scope, $ionicScrollDelegate, $log) {
    var delegate;

    $scope.mapscroll = function() {
        delegate = $ionicScrollDelegate.$getByHandle('mapImage');
        //$log.log(delegate);
        $log.log(delegate.getScrollPosition());
        delegate.scrollTo(350,350);
    }
});
