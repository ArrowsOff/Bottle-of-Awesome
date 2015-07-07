app.controller('XOmemoriesCtrl', function($scope, $http, $log){
    $http.get("http://jsonplaceholder.typicode.com/photos").success(function(result){
        $scope.imageFeed = result;
    });
});
