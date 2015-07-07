app.controller('XOmemoriesCtrl', function($scope, $http, $log, $ionicModal, $ionicSlideBoxDelegate, $ionicScrollDelegate){
    $http.get("http://app.xofestival.nl/api/getImages.php").success(function(result){
        $scope.imageFeed = result;
    });

    $scope.screenHeight = (document.getElementById('memories').offsetHeight);

    $scope.zoomMin = 1;

    $scope.showImages = function(index) {
        $scope.activeSlide = index;
        $scope.showModal('templates/xomemories-zoomview.html');
    };
    $scope.showModal = function(templateUrl) {
        $ionicModal.fromTemplateUrl(templateUrl, {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
            $scope.modal.show();
        });
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
        $scope.modal.remove();
    };
    $scope.updateSlideStatus = function(slide) {
        var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle' + slide).getScrollPosition().zoom;

        if (zoomFactor == $scope.zoomMin) {
            $ionicSlideBoxDelegate.enableSlide(true);
        } else {
            $ionicSlideBoxDelegate.enableSlide(false);
        }
    };

});
