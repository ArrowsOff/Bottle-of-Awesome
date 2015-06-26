app.service("AreaService", function($log, $q, $http){

	var AreaService = this;

	var stages = null;

	// Get all areas
	AreaService.getAreas = function() {
		var defer = $q.defer();

		//$http.get("http://xofestival.nl/xml/stages.xml").success(function(data) {
		$http.get(window.baseconfig.api + "stages.xml").success(function(data) {
            var x2js = new X2JS();
            var json = x2js.xml_str2json(data);
            stages = json.stages;

            // remove empty stage
            angular.forEach(stages.stage, function(stage, key) {
                if (stage.title.__cdata == "Ruby Village") {
                    stages.stage.splice(key);
                };
            });


            defer.resolve(stages);
        }).error(function(err){
            defer.reject('Error: ', err);
        });

		return defer.promise;
	};

	// get area for artists
	AreaService.getArea = function(id) {

		var defer = $q.defer();

		return defer.promise;

	};

	return AreaService;

});
