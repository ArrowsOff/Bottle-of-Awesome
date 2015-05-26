var app = angular.module('starter', [
    'ionic',
    'ngCordova',
    'ngResource',
    'cb.x2js'
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

