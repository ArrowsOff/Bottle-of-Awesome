app.controller('xomemoriesNextCtrl', function($scope, $rootScope, $log, $http, $timeout, $location){
    var calcHeight = (document.getElementById('memoriesNext').offsetHeight) -100;
    $scope.memoryHeight = calcHeight;
    $scope.uploadCheck = true;

    $rootScope.memories.description = [];
    $rootScope.memories.quotes = [];

    if ($scope.uploadCheck === true) {
        $scope.itemHeight = ((calcHeight / 2) -50);
    } else {
        $scope.itemHeight = ((calcHeight / 2) -20);
    }

    $scope.clearQuote = function(num) {
        document.getElementById('quote'+num).value = '';
    };

    $scope.clearPhotoText = function(num) {
        document.getElementById('phototext'+num).value = '';
    };

    $scope.upload = function() {
        $log.log("Starting to upload");
        $log.log($rootScope.memories);

        var options;
        var description;
        angular.forEach($rootScope.memories.quotes, function(qu){
            $log.log(qu);
            $http.post('http://app.xofestival.nl/api/quotes.php', {quote: qu}).success(function(data){
                $log.log("quote:", data);
            });
        });

        angular.forEach($rootScope.memories.pictures, function(image, key) {
            $log.log(key, image);
            $log.log($rootScope.memories.description[key]);
            options = {
                fileKey: "file",
                fileName: "image"+key+".jpg",
                mimeType: "image/jpeg"
            };
            if($rootScope.memories.description[key] !== '') {
                description = {
                    desc: $rootScope.memories.description[key],
                    imageId: key
                };

                $http.post('http://app.xofestival.nl/api/description.php', description).success(function(data){
                    $log.log("description:", data);
                });
            }


            $cordovaFileTransfer.upload("http://app.xofestival.nl/api/upload.php", image, options).then(function(result) {
                $log.log("SUCCESS: " + JSON.stringify(result.response));
            }, function(err) {
                $log.error("ERROR: " + JSON.stringify(err));
            }, function (progress) {
                // constant progress updates
                $log.log("PROGESS:", progress);
            });
        });
        $timeout(function(){
            $location.path('#/app/news');
        },2500);
    };

});
