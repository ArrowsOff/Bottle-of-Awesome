var app = angular.module('starter', [
    'ionic',
    'ngCordova',
    'ngResource'
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

