app.service('TrackingService', function($log){

	var TrackingService = this;

	TrackingService.trackView = function(viewTitle) {
		if (typeof analytics !== 'undefined') {
			$log.debug('Tracking', viewTitle)
			analytics.trackView(viewTitle)
		}
	}

	return TrackingService;

});