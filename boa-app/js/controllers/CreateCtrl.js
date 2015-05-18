app.controller('CreateCtrl', function ($scope, $ionicPopup) {

	$scope.addMedia = function() {

		// popup
		var popup = $ionicPopup.show({
    		title: 'Choose source',
    		subTitle: 'Select the source of the content you want to upload',
    		buttons: [
      			{ text: '<i class="icon ion-close"></i>' },
      			{ text: '<i class="icon ion-earth"></i>' },
      			{ text: '<i class="icon ion-images"></i>'}
    		]
  		});
  		popup.then(function(res) {
    		console.log('Tapped!', res);
  		});

 	};

});