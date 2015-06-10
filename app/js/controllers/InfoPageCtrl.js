app.controller('InfoPageCtrl', function ($scope, $stateParams, $log, $http) {
	$http.get("data/pages.xml").success(function(data) {
        var x2js = new X2JS();
        var json = x2js.xml_str2json(data);
        $scope.pages = json.pages;

        angular.forEach(json.pages, function(page) {

        });
    });   
});