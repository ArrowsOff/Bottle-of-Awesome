app.service("AreaService", function($log, $q, $http){
	
	var AreaService = this;

	var areas = null;

	// Get all areas
	AreaService.getAreas = function() {
		var defer = $q.defer();

		$http.get("data/areas.xml").success(function(data) {
            var x2js = new X2JS();
            var json = x2js.xml_str2json(data);
            areas = json.areas; 

            defer.resolve(areas);
        }).error(function(err){
        	$log.error('haha')
            defer.reject('Error: ', err);
        });

		return defer.promise;

	}

	// get area for artists
	AreaService.getArea = function(id) {

		var defer = $q.defer();

		return defer.promise;
		
	}

	return AreaService;

});