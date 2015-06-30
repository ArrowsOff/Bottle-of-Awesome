app.service('PushService', function($log, $http, $cordovaDevice, $window){
    var PushService = this;

    $window.onNotificationAPN = function(e) {
        $log.log("Apple onNotificationAPN", e);

        if ( event.alert ) {
            navigator.notification.alert(event.alert);
        }

        if ( event.sound ) {
            var snd = new Media(event.sound);
            snd.play();
        }

        if ( event.badge ) {
            pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
        }
    };

    $window.onNotificationGCM = function(e) {
        switch( e.event ) {
            case 'registered':
                if ( e.regid.length > 0 ) {
                    userDevice.device.token = e.regid;
                    storeToken();
                }
            break;

            case 'message':
              // this is the actual push notification. its format depends on the data model from the push server
              $log.log('message = '+e.message+' msgcnt = '+e.msgcnt);
            break;

            case 'error':
              $log.error('GCM error = '+e.msg);
            break;

            default:
              $log.log('An unknown GCM event has occurred');
              break;
        }
    };

    function successHandler(result) {
        $log.log(ionic.Platform.platform(), "push success!");

        userDevice = {
            device: {
                deviceId: $cordovaDevice.getUUID(),
                platform: ionic.Platform.platform(),
                token: result
            }
        };

        if (ionic.Platform.isIOS()) {
            storeToken();
        }
    }
    function errorHandler(error) {
        $log.error(ionic.Platform.platform(), "error:", error);
    }

    function storeToken() {
        $http.post('http://app.xofestival.nl/api/register/' + ionic.Platform.platform() + '.php', userDevice).success(function(data){
            $log.log("token:", data);
            if(!!data) {
                localStorage.pushToken = data;
            }
        });
    }

    PushService.register = function() {

        var config = null;

        if (ionic.Platform.isAndroid()) {
            config = {
                "senderID": "481678743314",
                "ecb": "onNotificationGCM"
            };
        } else if (ionic.Platform.isIOS()) {
            config = {
                "badge": "true",
                "sound": "true",
                "alert": "true",
                "ecb":"onNotificationAPN"
            };
        }

        window.plugins.pushNotification.register(successHandler, errorHandler, config);
    };

    return PushService;
});
