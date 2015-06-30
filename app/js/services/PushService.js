app.service('PushService', function($log, $http, $cordovaDevice, $window){
    var PushService = this;

    $window.onNotificationAPN = function(e) {
        $log.log("Apple onNotificationAPN", e);
    };

    $window.onNotificationGCM = function(e) {
        $log.log("Google onNotificationGCM", e);
        if('registered' === e.event) {
            userDevice.device.token = e.regid;
            $log.log(userDevice);

            storeToken();
        }
    };

    function successHandler(result) {
        $log.log(ionic.Platform.platform(), "success!");
        $log.log(result);

        userDevice = {
            device: {
                deviceId: $cordovaDevice.getUUID(),
                platform: ionic.Platform.platform(),
                token: result
            }
        };

        if (ionic.Platform.isIOS()) {
            $log.log('Registering iOS device');
            localStorage.token = result;
            storeToken();
        }
    }
    function errorHandler(error) {
        $log.error(ionic.Platform.platform(), "error!!");
        $log.error(error);
    }

    function storeToken() {
        $http.post('http://app.xofestival.nl/api/register/' + ionic.Platform.platform() + '.php', userDevice).success(function(data){
            $log.log(data);
        });
    }

    PushService.register = function() {
        $log.log('Registering device');

        var config = null;

        if (ionic.Platform.isAndroid()) {
            $log.log('Android device');
            config = {
                "senderID": "481678743314",
                "ecb": "onNotificationGCM"
            };
        }
        else if (ionic.Platform.isIOS()) {
            $log.log('IOS device');
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
