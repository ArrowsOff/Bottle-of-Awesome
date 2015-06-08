app.service('DatabaseService', function($rootScope, $log, pouchDB) {
    var DatabaseService = this;

    var artists     = pouchDB('artists');
    var favouritesDB  = pouchDB('favourites');
    // var areas       = pouchDB('areas');
    
    var favourites = {};

    // Post artists to database
    DatabaseService.post = function(doc) {
        doc._id = guid();

        artists.put(doc).then(function(){
            window.localStorage.artists = doc._id;
        }).catch(function(err){
            $log.error(err);
        });
    };

    // Use this to favorite an ID
    DatabaseService.favorite = function(id) {
        if(!window.localStorage.favourites) {
            var favouritesObject = {
                _id : guid(),
                artists: [id]
            };

            favouritesDB.put(favouritesObject).then(function() {
                $rootScope.$broadcast("favourited");
                window.localStorage.favourites = favouritesObject._id;
            });
        } else {
            favouritesDB.get(window.localStorage.favourites).then(function(doc) {
                if(doc.artists.indexOf(id) == -1) {
                    doc.artists.push(id);
                    $log.debug(id, 'favourited');
                } else {
                    doc.artists.splice(doc.artists.indexOf(id));
                    $log.debug(id, 'unfavourited');
                }

                favouritesDB.put(doc).then(function(res) {
                    $log.debug(id, 'broadcast favourited');
                    $rootScope.$broadcast("favourited");
                }).catch(function(err){
                    $log.error(err);
                });
            });
        }
    };

    // Get the artists database
    DatabaseService.get = function(id, database) {
        if(database === 'artists') {
            return artists.get(id);
        } else if (database === 'favourites') {
            return favouritesDB.get(id);
        }
       
    };

    // Removing document from database
    DatabaseService.remove = function() {

        // artists.allDocs().then(function(data){
        //     $log.info(data.rows);
        //     angular.forEach(data.rows, function(id) {
                artists.get("AA16DE97-8A2A-83CF-94F4-D8C4D23BE992").then(function (doc) {
                    localStorage.removeItem('artists');
                    artists.remove(doc);
                }).catch(function(err){
                    $log.error("Error removing database:", window.localStorage.artists, err);
                });
        //     })

            
        // })

        // favouritesDB.allDocs().then(function(data){
        //     $log.info(data.rows);

        //     angular.forEach(data.rows, function(id) {
        //         favouritesDB.get(id.toString()).then(function (doc) {
        //             localStorage.removeItem('artists');
        //             favouritesDB.remove(doc);
        //         }).catch(function(err){
        //             $log.error("Error removing database:", window.localStorage.artists, err);
        //         });
        //     })
        // })
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