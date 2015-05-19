app.service('ArtistService', function ($q, $http, $resource) {

    var ArtistService = this;

    var artists = null;

    var id;

    ArtistService.getArtist = function(id) {
        var defer = $q.defer();

        console.log(id);

        ArtistService.getAllArtists().then(function(data){
            for (var i =  0; i <= artists.length; i++) {

                // console.log(artists[i]._id);
                id = artists[i].index;

                if (id === parseInt(id)) {

                    defer.resolve(artists[i]);

                } else {

                    defer.reject('Failed to receive artist');

                }
            }
        }, function(err){
            defer.reject('Failed to receive artists.json');
        });

        return defer.promise;
    };

    ArtistService.get = function(){
        return $resource('http://jsonplaceholder.typicode.com/users/:user', {user: '@user'});
    };

    ArtistService.getAllArtists = function() {
        var defer = $q.defer();

        if( artists === null || refresh ) {

            $http.get('http://localhost:8100/data/artists.json')
            .success(function(data, status, headers, config){
                console.log('Received artists.json');
            })
            .error(function(data, status, headers, config){
                defer.reject('Failed to receive artists.json');
            })
            .then(function(result){
                artists = result.data;
                defer.resolve(artists);
            });

        } else {
            deferred.resolve(artists);
        }

        return defer.promise;
    };

    return ArtistService;

});