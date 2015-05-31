app.service('DatabaseService', function(pouchDB, $log) {
    var DatabaseService = this;

    var db = pouchDB('database');

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
            console.error(error);
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
                console.log(q);
            }).catch(function(err){
                console.error(err);
            });
        })
        .catch(function(error){
            $log.debug('Favoriting', id);
            db.put({
                _id: id,
                favorited: true
            }).then(function(res){
                console.log(res);
            });
        });
    };

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