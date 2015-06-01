app.controller('AppCtrl', function($scope, $http, $ionicNavBarDelegate, $timeout, $log, ArtistService, TrackingService) {

	var url;
	var audio = null;

	$scope.addToFavorites = function(id) {
		ArtistService.favorite(id);
	};

	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    	$timeout(function(){
	      	TrackingService.trackView($ionicNavBarDelegate.title());
	    },500);
  	});


	// $scope.getSpotify = function(artist) {
	// 	$http.get('https://api.spotify.com/v1/search?q=' + artist + '&type=artist').then(function(data){
	// 		console.log(data.data.artists.items[0]);
	// 	})
	// };

	// $scope.getTopTracks = function() {
	// 	$http.get('https://api.spotify.com/v1/artists/2o5jDhtHVPhrJdv3cEQ99Z/top-tracks?country=NL')
	// 	.success(function(data){
	// 		url = data.tracks[0].preview_url;
	// 		alert(url);
	// 	})
	// 	.error(function(err){
	// 		alert(err);
	// 	})
	// }

	// $scope.play = function() {
	// 	// audioObject = new Audio(url);
	// 	// console.log(audioObject)
		
	// 	// audioObject.play();
	// 	if(!url) {
	// 		$scope.getTopTracks();
	// 		alert('no url')
	// 		// $scope.play();
	// 	} else {
	// 		url = url + '.mp3';
	// 		alert(url);
	// 		var media = $cordovaMedia.newMedia(url)
	// 		.then(function() {
	// 		    // success
	// 		    alert('success')
	// 		  }, function () {
	// 		    // error
	// 		    alert('fail')
	// 		  });

	// 		media.play();
			
	// 	}
	// }

	// function playStream() {
 //  		try {
 //    		var myaudio = new Audio(url);
 //    		myaudio.id = 'playerMyAudio';
 //    		myaudio.play();

 //    		$scope.audio = myaudio;
 //  		} catch (e) {
 //    		alert('no audio support!');
 //  		} 
	// }

	
	
});