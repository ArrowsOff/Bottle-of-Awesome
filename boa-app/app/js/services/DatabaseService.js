app.service('DatabaseService', function($log, pouchDB) {
    var DatabaseService = this;

    // var db = pouchDB('database');

    var artists     = pouchDB('artists');
    // var areas       = pouchDB('areas');

    // Post artists to database
    DatabaseService.post = function(doc) {
        angular.forEach(doc.artist, function(key, value){
            key.favourited = false;
        });

        doc._id = guid();

        $log.debug("POST function:", doc);

        artists.put(doc).then(function(data){
            $log.info("Successfully put in artist database", data);
            window.localStorage.artists = doc._id;
            $log.debug("From DatabaseService,", window.localStorage.artists);
        }).catch(function(err){
            $log.error(err);
        });
    };

    // Use this to favorite an ID
    DatabaseService.update = function(id, doc){
        angular.forEach(doc.artist, function(key, value){
            if(key._id == id){
                key.favourited = !key.favourited;
            }
        });

        artists.put(doc).then(function(response){
            
        }).catch(function(err){
            $log.error(err);
        });
    };

    // Get the artists database
    DatabaseService.get = function(id) {
        return artists.get(id);
    };

    DatabaseService.remove = function() {
        artists.get(window.localStorage.artists).then(function (doc) {
            $log.debug("Removing:", doc);

            localStorage.removeItem('artists');
            return artists.remove(doc);
        });
    };

    // Create unique key
    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    return DatabaseService;
});

// }
//     _id: "310dcbbf4cce62f762a2aaa148d556bd"
//     biography: Object
//     end_time: "2014-07-12 :00"
//     facebook: Object
//     image: Object
//     language: "en"
//     lastfm: Object
//     myspace: Object
//     name: Object
//     soundcloud: Object
//     stage_id: "1f0e3dad99908345f7439f8ffabdffc4"
//     start_time: "2014-07-12 5:00"
//     summary: ""
//     twitter: Object
//     url: Object
//     website: Object
//     youtube: Object
//     favorited: false
// {