app.controller('ArtistCtrl', function ($scope, $stateParams, ArtistService, $http, x2js) {

	// ArtistService.getArtist('1').then(function(data){
	// 	$scope.artist = data;
	// });

	// $scope.artist = ArtistService.get().get(1);

	$scope.artist = ArtistService.get().get({user: $stateParams.id});

	$http.get("/data/appdata.xml").success(function (data) {
      	var x2js = new X2JS();
      	var jsonData = x2js.xml_str2json(data);

      	console.log(jsonData.note)
  	});


	// Add to favorites
	// $scope.addToFavorites = ArtistService.addToFavorites($stateParams.id);
});