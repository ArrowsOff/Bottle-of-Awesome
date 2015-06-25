app.service('TrackingService', function($log){

	var TrackingService = this;

	TrackingService.trackView = function(viewTitle) {
		if (typeof analytics !== 'undefined') {
			$log.debug('Tracking', viewTitle);
			analytics.trackView(viewTitle);
		}
	};

	TrackingService.trackEvent = function(event, type) {
		if (typeof analytics !== 'undefined') {
			$log.debug('Tracking', event, type);
			analytics.trackEvent(type, event);
		}
	};

	return TrackingService;

});
