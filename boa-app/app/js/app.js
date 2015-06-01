var app = angular.module('starter', [
    'ionic',
    'ngCordova',
    'ngResource',
    'cb.x2js',
    'ngLodash',
    'pouchdb'
]);

app.run(function($ionicPlatform, $rootScope, $log) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
        if (typeof analytics !== 'undefined') {
            $log.debug('starting analytics');
            analytics.startTrackerWithId("UA-16476871-20");
        } else {
            $log.warn('Analytics API not available...');
        }

        // //set up and init image caching
        // // write log to console
        // ImgCache.options.debug = true;

        // // increase allocated space on Chrome to 50MB, default was 10MB
        // ImgCache.options.chromeQuota = 50*1024*1024;
        // ImgCache.init(function(){
        //     //small hack to dispatch an event when imgCache is 
        //     //full initialized.
        //     $rootScope.$broadcast('ImgCacheReady');
        // }, function(){
        //     alert('ImgCache init: error! Check the log for errors');
        // });

    });
});

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.news', {
        url: '/news',
        views: {
            "menuContent": {
                templateUrl: 'templates/news.html',
                controller: 'NewsCtrl'
            }
        }
    })
    .state('app.artists', {
        url: '/artists',
        views: {
            "menuContent": {
                templateUrl:  'templates/artists.html',
                controller: 'ArtistsCtrl'
            }
        }
    })
    .state('app.artists.artist', {
        url: '/artists/:id',
        controller: 'ArtistCtrl',
        templateUrl: 'templates/artist.html'
    })
    .state('app.info', {
        url: '/info',
        views: {
            "menuContent": {
                templateUrl:  'templates/info.html',
                controller: 'InfoCtrl'
            }
        }
    })
    .state('app.schedule', {
        url: '/schedule',
        views: {
            "menuContent": {
                templateUrl:  'templates/schedule.html',
                controller: 'ScheduleCtrl'
            }
        }
    })
    .state('app.map', {
        url: '/map',
        views: {
            "menuContent": {
                templateUrl:  'templates/map.html',
                controller: 'MapCtrl'
            }
        }
    })
    .state('app.favorites', {
        url: '/favorites',
        views: {
            "menuContent": {
                templateUrl:  'templates/favorites.html',
                controller: 'FavoritesCtrl'
            }
        }
    })
    .state('app.xomemories', {
        url: '/xomemories',
        views: {
            "menuContent": {
                templateUrl:  'templates/xomemories.html',
                controller: 'XOmemoriesCtrl'
            }
        }
    });

    $urlRouterProvider.otherwise('/app/news');
});

