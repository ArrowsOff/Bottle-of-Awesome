app.controller('FavoritesCtrl', function($scope, $rootScope, $log, SpotifyService) {

	SpotifyService.createPlaylist().then(function(data) {
		$scope.playlist = data;
	});
});