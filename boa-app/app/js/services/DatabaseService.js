app.service('DatabaseService', function(pouchDB, $log) {
    var DatabaseService = this;

    var db = pouchDB('database');

    var artists     = pouchDB('artists');
    var areas       = pouchDB('areas');
    var favorited   = pouchDB('favorites');

    var test = pouchDB('test');

    function store(doc, database) {
        // Databases: Artists / Favorites / Areas
        angular.forEach(doc.artist, function(key, value){
            key.favorited = false;
        });

        test.put(doc).then(function(res){
            $log.info(res);
        }).catch(function(err){
            $log.error(err);
        })

    }

    function update(doc, database) {
        test.get(doc._id).then(function(doc){
            $log.debug(doc);

            var object = {
                _id: doc._id,
                _rev: doc._rev,
                artist: doc.artist
            }

            $log.debug(object);

            return test.put(object);
        }).then(function(res){
            $log.info("Response:", res);
        }).catch(function(err){
            $log.error(err);
        })
    }

    function remove(doc, database) {
        $log.debug(doc);
        test.remove(doc).then(function(data){
            $log.info(data);
        })
    }

    DatabaseService.postArtists = function(doc, database) {
        // $log.debug(doc);
        store(doc, database);


        // test.destroy().then(function () {
        //   // success
        // }).catch(function (error) {
        //   console.log(error);
        // });
    }

    DatabaseService.post = function(doc, dataName){
        db.post(doc)
        .then(function(res){
            if(!res.ok) {
                return error(res);
            }
            
            window.localStorage[dataName] = res.id;
            return db.get(res.id);
        })
        .catch(function(error){
            $log.error(error);
        });
    };

    DatabaseService.get = function(id) {
        return db.get(id);
    };

    DatabaseService.put = function(id, dataName) {
        var favorite = false;
        
        db.get(id)
        .then(function(res){
            favorite = true;
            $log.debug('Unfavoriting', id);

            db.remove(res).then(function(q){
                $log.info(q);
            }).catch(function(err){
                $log.error(err);
            });
        })
        .catch(function(error){
            $log.debug('Favoriting', id);
            db.put({
                _id: id,
                favorited: true
            }).then(function(res){
                $log.info(res);
            });
        });
    };

    DatabaseService.destroy = function() {
        db.destroy();

        $log.warn('Destroyed database');
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