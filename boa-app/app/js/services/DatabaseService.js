app.service('DatabaseService', function($rootScope, $log, pouchDB) {
    var DatabaseService = this;

    var artists     = pouchDB('artists');
    // var areas       = pouchDB('areas');

    // Post artists to database
    DatabaseService.post = function(doc) {
        angular.forEach(doc.artist, function(key, value){
            key.favourited = false;
        });

        doc._id = guid();

        artists.put(doc).then(function(){
            window.localStorage.artists = doc._id;
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
            $rootScope.$broadcast("favourited");
        }).catch(function(err){
            $log.error(err);
        });
    };

    // Get the artists database
    DatabaseService.get = function(id) {
        return artists.get(id);
    };

    // Removing document from database
    DatabaseService.remove = function() {
        artists.get(window.localStorage.artists).then(function (doc) {
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