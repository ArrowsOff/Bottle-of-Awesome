var app = angular.module('starter', [
    'ionic',
    'ngCordova',
    'ngResource'
]);

app.run(function($ionicPlatform, $rootScope) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }

        //set up and init image caching
        // write log to console
        ImgCache.options.debug = true;

        // increase allocated space on Chrome to 50MB, default was 10MB
        ImgCache.options.chromeQuota = 50*1024*1024;
        ImgCache.init(function(){
          //small hack to dispatch an event when imgCache is 
          //full initialized.
          $rootScope.$broadcast('ImgCacheReady');
        }, function(){
            alert('ImgCache init: error! Check the log for errors');
        });

    });
});

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('home', {
        url: '/',
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
    })

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

    .state('public', {
        url: '/public',
        templateUrl: 'templates/public.html',
        controller: 'PublicCtrl'
    })
    .state('host',{
        url:'/artist/:id',
        controller:'ArtistCtrl',
        templateUrl:'templates/artist.html',
    });

    $urlRouterProvider.otherwise('/');
});


app.controller('AppCtrl', function ($scope) {


});
app.controller('ArtistCtrl', function ($scope, $stateParams, ArtistService) {

	// ArtistService.getArtist('1').then(function(data){
	// 	$scope.artist = data;
	// });

	// $scope.artist = ArtistService.get().get(1);

	$scope.artist = ArtistService.get().get({user: $stateParams.id});


	// Add to favorites
	// $scope.addToFavorites = ArtistService.addToFavorites($stateParams.id);
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
	};

});
app.controller('PrivateCtrl', function ($scope) {


});
app.controller('PublicCtrl', function ($scope, $http, ArtistService) {

	// ArtistService.getAllArtists().then(function(data){
	// 	$scope.artists = data;
	// });

	// ArtistService.getArtist('1').then(function(data){
	// 	$scope.artist = data;
	// });


	$scope.artists = ArtistService.get().query();
});
app.directive('imgCache', function ($document) {
    return {
        link: function (scope, ele, attrs) {
            var target = (ele);
            //waits for the event to be triggered,
            //before executing d call back
            scope.$on('ImgCacheReady', function () {
                //this checks if we have a cached copy.
                ImgCache.isCached(attrs.src, function(path, success){
                    if(success){
                        // already cached
                        ImgCache.useCachedFile(target);
                    } else {
                        // not there, need to cache the image
                        ImgCache.cacheFile(attrs.src, function(){
                            ImgCache.useCachedFile(target);
                        });
                    }
                });
            }, false);
        }
    };
}); 
app.service('ArtistService', function ($q, $http, $resource) {

    var ArtistService = this;

    var artists = null;

    var id;

    ArtistService.getArtist = function(id) {
        var defer = $q.defer();

        console.log(id);

        ArtistService.getAllArtists().then(function(data){
            for (var i =  0; i <= artists.length; i++) {

                // console.log(artists[i]._id);
                id = artists[i].index;

                if (id === parseInt(id)) {

                    defer.resolve(artists[i]);

                } else {

                    defer.reject('Failed to receive artist');

                }
            }
        }, function(err){
            defer.reject('Failed to receive artists.json');
        });

        return defer.promise;
    };

    ArtistService.get = function(){
        return $resource('http://jsonplaceholder.typicode.com/users/:user', {user: '@user'});
    };

    ArtistService.getAllArtists = function() {
        var defer = $q.defer();

        if( artists === null || refresh ) {

            $http.get('http://localhost:8100/data/artists.json')
            .success(function(data, status, headers, config){
                console.log('Received artists.json');
            })
            .error(function(data, status, headers, config){
                defer.reject('Failed to receive artists.json');
            })
            .then(function(result){
                artists = result.data;
                defer.resolve(artists);
            });

        } else {
            deferred.resolve(artists);
        }

        return defer.promise;
    };

    return ArtistService;

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