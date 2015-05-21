// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

// Project ID: extrema-2015-develop 
// Project Number: 481678743314
// Project number = GCM sender ID
// Server API key = AIzaSyDt1PyDPLZKiIjqqwZ-SV90Fg0efDoRwgg

angular.module('starter', ['ionic'])

.run(function($ionicPlatform, $log) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    var isIOS = ionic.Platform.isIOS() || ionic.Platform.isIPad();
    var isAndroid = ionic.Platform.isAndroid();

    var gcmAppID = "extrema-2015-develop";

    if(window.cordova && window.plugins.pushNotification) {
      var pushNotification = window.plugins.pushNotification;

      function registerId() {
        if(isAndroid) {
          $log.info('Registering Android device');
          pushNotification.register(
            successHandler, errorHandler, {
              "senderID": gcmAppID,
              "ecb": "onNotificationGCM"
            }
          );
        } else if (isIOS) {
          $log.info('Registering Apple device');
          pushNotification.register(
            successHandler, errorHandler, {
              "badge":"true",
              "sound":"true",
              "alert":"true",
              "ecb":"onNotificationAPN"
            }
          );
        }
      }

      registerId();

      function successHandler(result) {
        $log.info('Pushnotification.register succeeded');
      }
      function errorHandler(error) {
        $log.error('Pushnotification.register Failed', error);
      }
      function unregister() {
        $log.info('Pushnotification unregister');
        if (pushNotification) {
          pushNotification.unregister(function() {
            $log.info('Pushnotification unregister success')
          })
        }
      } 
    }

    function onNotificationGCM(e) {
      $log.info("Event received: " + e.event + '');

      switch( e.event ) {

        case 'registed' {
          $log.info('EVENT -> Registered');
          break;
        }
        case 'message' {
          $log.info('EVENT -> Message');
          break;
        }
        case 'error' {
          $log.error('EVENT -> Error');
          break;
        }
        default {
          $log.error('EVENT -> Unknown, an event was received and we do not know what it is');
          break;
        }
      }
    }
  
  });
})
