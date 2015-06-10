app.directive("infoCard", function($log) {
	return{
		restrict: 'A',
		scope: {
			title: "=",
			content: "="
		},
		templateUrl: "templates/directive-templates/info-card.html",
		controller: function($scope) {

		}
	};
});