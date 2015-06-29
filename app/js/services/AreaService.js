app.service("AreaService", function($log, $q, $http, DatabaseService){

	var AreaService = this;

	var stages = null;

	function requestAreas(refresh) {
        var defer = $q.defer();

        if(!(window.localStorage.areas) || refresh) {
            // $http.get("http://xofestival.nl/xml/artists.xml").success(function(data) {
            $http.get(window.baseconfig.api + "stages.xml").success(function(data) {
                var x2js = new X2JS();
                var json = x2js.xml_str2json(data);

				// Remove empty stage
	            angular.forEach(json.stages.stage, function(stage, key) {
	                if (stage.title.__cdata == "Ruby Village") {
	                    json.stages.stage.splice(key);
	                }
	            });

				DatabaseService.postAreas(json.stages);

                $log.log("Request areas from URL");

                defer.resolve(json.stages);
            }).error(function(err){
                defer.reject("Error requesting areas", err);
            });
        } else {
            $log.log("Request areas from database");

            DatabaseService.get('areas').then(function(data){
                defer.resolve(data);
            }).catch(function(err){
                defer.reject("Error requesting areas", err);
            });
        }

        return defer.promise;
    }

	// Get all areas
	AreaService.getAreas = function(refresh) {
		var defer = $q.defer();

		if(!refresh) { refresh = false; }

		requestAreas(refresh).then(function(data){
	        defer.resolve(data);
	    }).catch(function(err){
	        $log.error("Error getting areas:", err);
	    });

		return defer.promise;
	};

	return AreaService;

});
