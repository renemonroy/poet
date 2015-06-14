/**
 * This handles events naming to support for touch and mouse actions.
 */
const eventsFor = {

  touch : {
    start : 'touchstart',
    move : 'touchmove',
    end : 'touchend'
  },

  mouse : {
    start : 'mousedown',
    move : 'mousemove',
    end : 'mouseup'
  }

};

module.exports eventsFor;