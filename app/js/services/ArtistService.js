app.service('ArtistService', function($rootScope, $q, $http, $log, lodash, DatabaseService, AreaService) {

    var ArtistService = this;

    function requestArtists(refresh) {
        var defer = $q.defer();

        if(!(window.localStorage.artists) || refresh) {
            $http.get("data/artists.xml").success(function(data) {
                var x2js = new X2JS();
                var json = x2js.xml_str2json(data);

                DatabaseService.post(json.artists);   

                defer.resolve(json.artists);
            }).error(function(err){
                defer.reject('Error: ', err);
            });
        } else {
            $log.debug("Database call for artist(s)");
            DatabaseService.get(window.localStorage.artists, 'artists').then(function(data){  
                defer.resolve(data);
            }).catch(function(err){
                defer.reject('requestArtists Err:', err);
            });                   
        }

        return defer.promise;
    }

    ArtistService.getArtists = function(refresh) {
        var defer = $q.defer();

        if(!refresh) { refresh = false; }

        requestArtists(refresh).then(function(data){
            defer.resolve(data);
        }).catch(function(err){
            $log.error("getArtists Error:", err);
        });

        return defer.promise;
    };

    ArtistService.getArtist = function(id) {
        var defer = $q.defer();

        requestArtists().then(function(data) {
            lodash.findIndex(data.artist, function(artist) {
                if (artist._id == id) {
                    defer.resolve(artist);
                }
            });

        });

        return defer.promise;
    };

    ArtistService.favorite = function(id) {
        $log.debug("Database call for favorite");
        DatabaseService.favorite(id);
    };

    ArtistService.getFavourites = function() {
        var defer = $q.defer();

        DatabaseService.get(window.localStorage.favourites, 'favourites').then(function(data){
            defer.resolve(data);
        }).catch(function(err){
            $log.error(err);
        });

        return defer.promise;
    };

    return ArtistService;
});