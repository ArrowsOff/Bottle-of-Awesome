app.service('SpotifyService', function($http, $log, $q) {

	var SpotifyService = this;

	var url;

	SpotifyService.get = function(artist) {
		var defer = $q.defer();

		$log.log("Seaching Spotify for", artist);

		$http.get('https://api.spotify.com/v1/search?q=' + artist + '&type=artist').then(function(data) {
			$log.log("Getting first artist from Spotify search results");

			if(!!data.data.artists.items[0]) {
				$http.get('https://api.spotify.com/v1/artists/'+data.data.artists.items[0].id+'/top-tracks?country=NL').success(function(data) {
					$log.log("Getting first track to preview");

					if(!!data.tracks[0]) {
						defer.resolve(data.tracks[0]);
					} else {
						defer.reject('No tracks to preview');
					}					
				}).error(function(err) {
					defer.reject("Error getting top tracks from", artist, err);
				});
			} else {
				$log.log("No artist found in Spotify API");
			}
		}).catch(function(err) {
			defer.reject("Error getting artist from Spotify API", err);
		});

		return defer.promise;
	};

	return SpotifyService;
});