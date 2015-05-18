// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', [
    'ionic',
    'ngCordova'
]);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('home', {
        url: '/',
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
    })
    // Private
    .state('private', {
        url: '/private',
        templateUrl: 'templates/private.html',
        controller: 'PrivateCtrl'
    })
    .state('create', {
        url: '/private/create',
        templateUrl: 'templates/private/create.html',
        controller: 'CreateCtrl'
    })

    // Public
    .state('public', {
        url: '/public',
        templateUrl: 'templates/public.html',
        controller: 'PublicCtrl'
    })


    // Authentication
    .state('signup', {
        url: '/signup',
        templateUrl: 'templates/authentication/signup.html',
        controller: 'SignupCtrl'
    })
    .state('login', {
        url: '/login',
        templateUrl: 'templates/authentication/login.html',
        controller: 'LoginCtrl'
    })

    $urlRouterProvider.otherwise('/');
});


app.controller('AppCtrl', function ($scope) {


});
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
app.controller('HomeCtrl', function ($scope, LocationService) {

	$scope.getLocation = function() {
		LocationService.getPosition().then(function(data){
			$scope.location = data;
		});
	}

});
app.controller('LoginCtrl', function ($scope) {


});
app.controller('PrivateCtrl', function ($scope) {


});
app.controller('PublicCtrl', function ($scope) {


});
app.controller('SignupCtrl', function ($scope) {


});
app.service('AuthService', function ($q, $http, $cordovaOauth) {

    var AuthService = this;

    var LOCAL_TOKEN_KEY = 'yourTokenKey';
    var username = '';
    var isAuthenticated = false;
    var role = '';
    var authToken;
    var facebook;
 
    function loadUserCredentials() {
        var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
        
        if (token) {
            useCredentials(token);
        }
    }
 
    function storeUserCredentials(token) {
        window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
        useCredentials(token);
    }
 
    function useCredentials(token) {
        username = token.split('.')[0];
        isAuthenticated = true;
        authToken = token;
 
        // if (username == 'admin') {
        //     role = USER_ROLES.admin;
        // }
        // if (username == 'user') {
        //     role = USER_ROLES.public;
        // } else {
        //     role = USER_ROLES.public;
        // }
 
        // Set the token as header for your requests!
        $http.defaults.headers.common['X-Auth-Token'] = token;
    }
 
    function destroyUserCredentials() {
        authToken = undefined;
        username = '';
        isAuthenticated = false;
        $http.defaults.headers.common['X-Auth-Token'] = undefined;
        window.localStorage.removeItem(LOCAL_TOKEN_KEY);
    }

    AuthService.login = function(oauth, name, pw) {
        var defer = $q.defer();

        if(oauth) {
            console.log('Facebook login');

            $cordovaOauth.facebook('902314686547924', ['email', 'id']).then(function(result){

                storeUserCredentials(result.access_token);
                facebook = true;
                defer.resolve('Login success');

            }, function(err) {
                defer.reject('Login Failed');
            });
        } else {
            console.log('Regular login');

            if ((name == 'admin' && pw == '1') || (name == 'user' && pw == '1')) {

                // Make a request and receive your auth token from your server
                storeUserCredentials(name + '.yourServerToken');
                facebook = false;
                defer.resolve('Login success.');

            } else {
                defer.reject('Login Failed.');
            }
        }

        return defer.promise;
    };

    AuthService.getProfile = function() {
        var defer = $q.defer();

        if(facebook) {
            $http.get('https://graph.facebook.com/v2.2/me', { 
                    params: { 
                        access_token: window.localStorage.getItem(LOCAL_TOKEN_KEY),
                        fields: "id,name,gender,location,website,picture,relationship_status", 
                        format: "json" 
                    }
            }).success(function(response) {

                defer.resolve(response);

            }).error(function(err, status){

                console.log("Something went wrong", err, status);
                defer.reject(err);

            });
        } else {
            alert('Not logged in with Facebook');
        }

        return defer.promise;
    };

    AuthService.isFacebook = function() {
        return facebook;
    };
 
    AuthService.logout = function() {
        destroyUserCredentials();
    };
 
    AuthService.isAuthorized = function(authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
        }
        return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
    };

    AuthService.isAuthenticated = function() {
        return isAuthenticated;
    };

    AuthService.username = function() {
        return username;
    };

    AuthService.role = function() {
        return role;
    };
 
    loadUserCredentials();
 
    return AuthService;
});

app.factory('AuthInterceptor', function ($rootScope, $q) {

    return {
        responseError: function (response) {
            $rootScope.$broadcast({
                //401: AUTH_EVENTS.notAuthenticated,
                //403: AUTH_EVENTS.notAuthorized
            }[response.status], response);
            return $q.reject(response);
        }
    };

});
 
app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
});
app.factory('LocationService', function ($q){

    var location = null;

    var getPosition = function(refresh) {
        
        var deferred = $q.defer();
        
        if( location === null || refresh ) {
        
            navigator.geolocation.getCurrentPosition(function(position) {
                var lat = position.coords.latitude;
                var long = position.coords.latitude;

                location = { 'lat' : lat, 'long' : long };

                deferred.resolve(location);

            }, function(error) {
                console.log('Got error!', error);
                location = null;
                
                deferred.reject('Failed to get Latitude and Longitude');
            });
            
        } else {
            deferred.resolve(location);
        }
        
        return deferred.promise;

    };      
    
    return {
        getPosition : getPosition
    };
});
//# sourceMappingURL=app.js.map