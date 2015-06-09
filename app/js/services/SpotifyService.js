app.service('SpotifyService', function($http, $log, $q) {

	var SpotifyService = this;

	var url;

	SpotifyService.get = function(artist) {
		var defer = $q.defer();

		$http.get('https://api.spotify.com/v1/search?q=' + artist + '&type=artist').then(function(data) {
			$log.debug(data.data.artists)
			$http.get('https://api.spotify.com/v1/artists/'+data.data.artists.items[0].id+'/top-tracks?country=NL').success(function(data) {
				url = data.tracks[0].preview_url;
				$log.debug(data)
				defer.resolve(url);
			}).error(function(err) {
				defer.reject(err);
			})
		})

		return defer.promise;
	}

	return SpotifyService;
	// 	var url;
	// var audio = null;

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