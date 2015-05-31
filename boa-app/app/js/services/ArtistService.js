app.service('ArtistService', function($q, $http, $log, lodash, DatabaseService) {

    var ArtistService = this;

    var artists = null;

    var refresh = false;

    function requestArtists() {
        var defer = $q.defer();

        if(!window.localStorage['artists'] || refresh) {
            $http.get("data/artists.xml").success(function(data) {
                var x2js = new X2JS();
                var json = x2js.xml_str2json(data);

                artists = json.artists;
                DatabaseService.post(artists, 'artists');

                defer.resolve(artists);
            }).error(function(err){
                defer.reject('Error: ', err);
            });
        } else {
            DatabaseService.get(window.localStorage['artists'])
            .then(function(result){
                defer.resolve(result);
            })
            .catch(function(error){
                defer.reject('Error: ', error);
            });
        }
        
        return defer.promise;
    }

    ArtistService.getArtists = function() {

        var defer = $q.defer();

        requestArtists().then(function(data){
            defer.resolve(data);
        });

        return defer.promise;

    };

    ArtistService.getArtist = function(id) {

        var defer = $q.defer();

        requestArtists().then(function(data){
            lodash.findIndex(data.artist, function(artist) {
                
                if (artist._id == id) {
                    defer.resolve(artist);
                }
            });

        });

        return defer.promise;
    };

    ArtistService.favorite = function(id) {
        DatabaseService.put(id, 'favorites');
    };

    return ArtistService;

});