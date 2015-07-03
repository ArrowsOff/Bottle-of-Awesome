
app.controller('XOmemoriesCtrl', function($scope, $log, $cordovaImagePicker){
    var calcHeight = (document.getElementById('memories').offsetHeight) -100;
    $scope.memoryHeight = calcHeight;
    $scope.uploadCheck = false;
    $scope.itemHeight = ((calcHeight / 2) -20);

    // $scope.ready = true;
    $scope.images = [];
    $scope.media = [];



    $scope.slcImg = function() {
        var options={maximumImagesCount: 10};
        // $log.log($cordovaImagePicker);
        $cordovaImagePicker.getPictures(options)
        .then (function (results){
            $scope.results = results;
            var count = 1;
            angular.forEach(results,function(result){
                document.getElementById('image'+ count).style.backgroundImage = "url('"+ result +"')";
                // document.getElementById('image'+ count).style.backgroundSize = "130px 100px";

                count++;    $scope.uploadCheck = true;
                if ($scope.uploadCheck === true) {
                    $scope.itemHeight = ((calcHeight / 2) -50);
                }
                // if(count == 7){
                //     count = 1;
                // }
            });
            $log.log(results);
            switch (count) {
                case 1: document.getElementsByClassName('divBack').style.backgroundSize = "390px 200px";
                break;
                case 2: document.getElementsByClassName('divBack').style.backgroundSize = "195px 200px";
                break;
                case 3: document.getElementsByClassName('divBack').style.backgroundSize = "130px 200px";
                break;
                case 4: document.getElementsByClassName('divBack').style.backgroundSize = "195px 100px";
                break;
                case 5: var backdiv = document.getElementsByClassName("divBack");
                var len = backdiv.length;

                for (var i = 0; i < len; i++) {
                    backdiv[i].style.backgroundSize="130px 100px";
                }

                var backdivBottom = document.getElementsByClassName("divBackBottom");
                var len2 = backdivBottom.length;

                for (var i = 0; i < len2; i++) {
                    backdivBottom[i].style.backgroundSize="195px 100px";
                }


                // document.getElementsByClassName('divBack').style.backgroundSize = "130px 100px"; document.getElementsByClassName('divBackBottom').style.backgroundSize = "195px 100px";
                break;
                default: document.getElementsByClassName('divBack').style.backgroundSize = "130px 100px";
            }

            return(results);


        });
    };

});
//
// $cordovaImagePicker.getPictures(
//     function(results) {
//         for (var i = 0; i < results.length; i++) {
//             $log.log('Image URI: ' + results[i]);
//         }
//     }, function (error) {
//         $log.log('Error: ' + error);
//     }, {
//         maximumImagesCount: 10,
//         width: 800
//     }
// );
