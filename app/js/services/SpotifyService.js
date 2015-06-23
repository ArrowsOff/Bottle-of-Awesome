app.service('SpotifyService', function($rootScope, $http, $log, $q) {

	var SpotifyService = this;

	var url;
	var authorized = false;

	SpotifyService.get = function(artist) {
		var defer = $q.defer();

		$log.log("Seaching Spotify for", artist);

		$http.get('https://api.spotify.com/v1/search?q=' + artist + '&type=artist').then(function(data) {
			// $log.log("Getting first artist from Spotify search results");

			if(!!data.data.artists.items[0]) {
				$http.get('https://api.spotify.com/v1/artists/'+data.data.artists.items[0].id+'/top-tracks?country=US').success(function(data) {
					// $log.log("Getting first track to preview");

					if(!!data.tracks[0]) {
						defer.resolve(data.tracks[0]);
					} else {
						defer.reject('No tracks to preview');
					}					
				}).error(function(err) {
					defer.reject("Error getting top tracks from", artist, err);
				});
			} else {
				defer.reject("No artist found in Spotify API");
			}
		}).catch(function(err) {
			defer.reject("Error getting artist from Spotify API", err);
		});

		return defer.promise;
	};

	// This will create a playlist from your favourited artists
	SpotifyService.createPlaylist = function() {
		var deferred = $q.defer();
		var favourites = [];
		var ids = [];
		var tracks = [];
		var favouritesPromise;
		var artistIdPromise = $q.defer();

		angular.forEach($rootScope.artists.artist, function(artist) {
			if(artist.favourited) {
				favourites.push(artist);
			}
		});

		favouritesPromise = favourites.map(function(favourite) {
			var defer = $q.defer(); 

			getArtistId(favourite.name.__cdata).then(function(data) {
				if(!!data) {
					ids.push(data);
					defer.resolve(data);
				}
			}).catch(function(err){
				defer.resolve();
			});

			return defer.promise;
		})


		$q.all(favouritesPromise).then(function(data) {
			artistIdPromise = data.map(function(artist_id) {

				if(!!artist_id) {
					var defer = $q.defer();

					getFirstTrack(artist_id).then(function(track) {
						tracks.push(track);
						defer.resolve(track);
					}).catch(function(err){
						defer.resolve();
					})

					return defer.promise;
				}
			});

			$q.all(artistIdPromise).then(function(data) {
				deferred.resolve(tracks);
			});
		});
		return deferred.promise;
	}

	function getArtistId(artist_name) {
		var defer = $q.defer();

		$http.get('https://api.spotify.com/v1/search?q=' + artist_name + '&type=artist').then(function(data) {
			if(!!data.data.artists.items[0]) {
				defer.resolve(data.data.artists.items[0].id);
			} else {
				defer.reject("No artist in spotify with that name")
			}
		}).catch(function(err) {
			defer.reject("Error getting artist from Spotify API", err);
		});

		return defer.promise;
	}

	function getFirstTrack(artist_id) {
		var defer = $q.defer();

		$http.get('https://api.spotify.com/v1/artists/'+artist_id+'/top-tracks?country=NL').success(function(data) {
			if(!!data.tracks[0]) {
				defer.resolve(data.tracks[0]);
			} else {
				defer.reject('No tracks to preview');
			}					
		}).error(function(err) {
			defer.reject("Error getting top tracks from", artist, err);
		});

		return defer.promise;
	}

	return SpotifyService;
});