// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', [
    'ionic',

    'starter.controllers.AppCtrl',
    'starter.controllers.HomeCtrl'

])

.run(function($ionicPlatform) {
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
})

.config(function ($stateProvider, $urlRouterProvider) {
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
        controller: 'privateCtrl'
    })
    .state('create', {
        url: '/private/create',
        templateUrl: 'templates/private/create.html',
        controller: 'createCtrl'
    })

    // Public
    .state('public', {
        url: '/public',
        templateUrl: 'templates/public.html',
        controller: 'publicCtrl'
    })


    // Authentication
    .state('signup', {
        url: '/signup',
        templateUrl: 'templates/authentication/signup.html',
        controller: 'signupCtrl'
    })
    .state('login', {
        url: '/login',
        templateUrl: 'templates/authentication/login.html',
        controller: 'LoginCtrl'
    })

    

    $urlRouterProvider.otherwise('/');
})

