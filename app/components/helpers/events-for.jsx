/**
 * This handles events naming to support for touch and mouse actions.
 */
export default function eventsFor() {
  return {

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
    
  }
};