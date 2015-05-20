app.service('ArtistService', function ($q, $http, $resource, lodash) {

    var ArtistService = this;

    var artists = null;

    var refresh = false;

    function requestArtists() {

        var defer = $q.defer();

        if( artists === null || refresh ) {

            $http.get("/data/artists.xml").success(function (data) {
                var x2js = new X2JS();
                var jsonData = x2js.xml_str2json(data);

                artists = jsonData.artists;

                defer.resolve(jsonData.artists);

            }).error(function(err){

                defer.reject('Error: ', err)

            })
        } else {
            defer.resolve(artists);
        }

        return defer.promise;
    }


    ArtistService.getArtists = function() {

        var defer = $q.defer();

        requestArtists().then(function(data){
            defer.resolve(data);
        })

        return defer.promise;

    }

    ArtistService.getArtist = function(id) {

        var defer = $q.defer();

        requestArtists().then(function(data){
            lodash.findIndex(data.artist, function(artist) {
                
                if (artist._id == id) {
                    defer.resolve(artist)
                }
            });

        });

        return defer.promise;
    }

    return ArtistService;

});