app.directive('horizontalScroller',[function() {
  return {
    restrict:'E',
    scope:{
      content: '= data'
    },
    templateUrl: 'views/templates/horizontalScroller.html',
    link: function (scope, element) {

  //get a reference to the child ion-scroll
  var self = scope.scrollView;

  // I had to copy a couple functions from ion-scroll locally in order 
  // to make the new touch start function work
  function getPointerCoordinates(event) {
    // This method can get coordinates for both a mouse click
    // or a touch depending on the given event
    var c = { x:0, y:0 };
    if(event) {
      var touches = event.touches && event.touches.length ? event.touches : [event];
      var e = (event.changedTouches && event.changedTouches[0]) || touches[0];
      if(e) {
        c.x = e.clientX || e.pageX || 0;
        c.y = e.clientY || e.pageY || 0;
      }
    }
    return c;
  }

 //This was copied too
 function getEventTouches(e) {
  return e.touches && e.touches.length ? e.touches : [{
    pageX: e.pageX,
    pageY: e.pageY
  }];
}

  // new touchstart function, only real difference is the 
  //call to e.preventDefault() is omitted
  var my_touchStart = function(e) {
    self.startCoordinates = getPointerCoordinates(e);
    if ( ionic.tap.ignoreScrollStart(e) ) {
      return;
    }

    self.__isDown = true;

    if( ionic.tap.containsOrIsTextInput(e.target) || e.target.tagName === 'SELECT' ) {
      // do not start if the target is a text input
      // if there is a touchmove on this input, then we can start the scroll
      self.__hasStarted = false;
      return;
    }

    self.__isSelectable = true;
    self.__enableScrollY = true;
    self.__hasStarted = true;
    self.doTouchStart(getEventTouches(e), e.timeStamp);

    //NOT GOING TO DO THIS!!!!
    //e.preventDefault();

    return false;
  };

   //replace ionic's touchstart with one of our own
   self.__container.removeEventListener("touchstart",scope.scrollView.touchStart);
   self.__container.addEventListener("touchstart",my_touchStart,false);
 }
}
}]);