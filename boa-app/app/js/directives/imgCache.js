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