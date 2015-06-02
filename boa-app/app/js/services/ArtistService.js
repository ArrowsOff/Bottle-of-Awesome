app.service('ArtistService', function($rootScope, $q, $http, $log, lodash, DatabaseService) {

    var ArtistService = this;

    var artists = null;

    var refresh = false;

    function requestArtists() {
        var defer = $q.defer();

        if(!(window.localStorage.artists) || refresh) {
            $http.get("data/artists.xml").success(function(data) {
                var x2js = new X2JS();
                var json = x2js.xml_str2json(data);

                artists = json.artists;

                DatabaseService.post(artists);   

                defer.resolve(artists);
            }).error(function(err){
                defer.reject('Error: ', err);
            });
        } else {
            DatabaseService.get(window.localStorage.artists).then(function(data){
                $log.debug("ArtistService calling get form database:", data);
                defer.resolve(data);
            }).catch(function(err){
                defer.reject('requestArtists Err:', err);
            });            
        }

        return defer.promise;
    }

    ArtistService.getArtists = function() {
        var defer = $q.defer();

        requestArtists().then(function(data){
            defer.resolve(data);
        }).catch(function(err){
            $log.error("getArtists Error:", err);
        });

        return defer.promise;
    };

    ArtistService.getArtist = function(id) {
        var defer = $q.defer();

        requestArtists().then(function(data){
            $log.debug("GetArtist for ID: ", data);

            lodash.findIndex(data.artist, function(artist) {
                if (artist._id == id) {
                    defer.resolve(artist);
                }
            });

        });

        return defer.promise;
    };

    ArtistService.favorite = function(id) {
        requestArtists().then(function(data){
            DatabaseService.update(id, data);
        }).catch(function(err){
            $log.error(err);
        });
    };

    return ArtistService;
});