/**
 * Component hihgly inspired on the react-draggable found in npm. The
 * main differences are that this relies on ES6 and don't uses the
 * packages 'object-assign' and 'classnames' but only packages that are
 * already used in the application.
 */

import React from 'react';
import lodash from 'lodash';
import EventsFor from '../helpers/events-for';
import UxHacks from '../helpers/ux-hacks';

/**
 * Use mouse naming for mouse events by default. This will be changed
 * automatically when a touch is detected. The empty function is Just
 * a placeholder for methods that can be overwritten.
 */
let eventsFor = EventsFor(),
  uxHacks = UxHacks(),
  dragEventFor = eventsFor['mouse'],
  emptyFn = () => {};

/**
 * Main class for the Draggable component which will render the component
 * added as children which needs to be only 1 component.
 */
export default class UIDraggable extends React.Component {

  /**
   * Sets up the initial configuration for state. It also attaches the
   * necessary events to scope correctly.
   */
  constructor(props) {
    super(props);
    this.state = {
      dragging : false,
      offsetX : 0,
      offsetY : 0,
      clientX : props.start.x,
      clientY : props.start.y
    };
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDrag = this.onDrag.bind(this);
  }

  /**
   * Returns data of the current Draggable Component. This is requested
   * on each of the dragging events.
   */
  getData() {
    let st = this._pendingState || this.state;
    return {
      element : React.findDOMNode(this),
      position : {
        top : st.clientY,
        left : st.clientX
      }
    };
  }

  /**
   * Returns the position of the component element taking data from the
   * current event.
   */
  getPosition(e) {
    let pos = ( e.touches && e.touches[0] ) || e;
    return {
      clientX : pos.clientX,
      clientY : pos.clientY
    };
  }

  /**
   * Check if the element can be draggable on X. This is set from the
   * props.axis of the component.
   */
  canDragOnX() {
    return this.props.axis === 'xy' || this.props.axis === 'x';
  }

  /**
   * Check if the element can be draggable on Y.  This is set from the
   * props.axis of the component.
   */
  canDragOnY() {
    return this.props.axis === 'xy' || this.props.axis === 'y';
  }

  /**
   * Execute onDragStart function after preventing 'ghost click'. The
   * same method is used in onTouchStart to do this a bit more modular.
   */
  onMouseDown(e) {
    if ( dragEventFor == eventsFor['touch'] ) return e.preventDefault();
    return this.onDragStart.apply(this, arguments);
  }

  /**
   * Use touch events when a touch is detected. This will change the
   * default for 'eventsFor' to start using 'touch' events naming.
   */
  onTouchStart(e) {
    dragEventFor = eventsFor['touch'];
    return this.onDragStart.apply(this, arguments);
  }

  /**
   * Method called when the component element starts on drag. This is
   * executed either by touch or mouse events.
   */
  onDragStart(e) {
    let ps = this.props,
      shouldStart = ps.onStart(e, this.getData()),
      dragPoint = this.getPosition(e);
    if ( shouldStart === false ) return;
    if ( ps.enableUserSelect ) uxHacks.addUserSelectStyles();
    this.setState({
      dragging : true,
      offsetX : dragPoint.clientX - this.state.clientX,
      offsetY : dragPoint.clientY - this.state.clientY
    });
    document.addEventListener(dragEventFor['move'], this.onDrag, true);
    document.addEventListener(dragEventFor['end'], this.onDragEnd, true);
  }

  /**
   * Method executed during dragging. It returns the data modified on
   * the props.onDrag handler.
   */
  onDrag(e) {
    let ps = this.props, st = this.state,
      dragPoint = this.getPosition(e),
      clientX = dragPoint.clientX - st.offsetX,
      clientY = dragPoint.clientY - st.offsetY,
      shouldUpdate = ps.onDrag(e, this.getData());
    if ( shouldUpdate === false ) return this.onDragEnd();
    this.setState({
      clientX : clientX,
      clientY : clientY
    });
  }

  /**
   * Method called when the component element stops dragging. This is
   * executed either by touch or mouse events.
   */
  onDragEnd(e) {
    let ps = this.props;
    if ( !this.state.dragging ) return;
    if ( ps.enableUserSelect ) uxHacks.removeUserSelectStyles();
    this.setState({ dragging : false });
    ps.onStop(e, this.getData());
    document.removeEventListener(dragEventFor['move'], this.onDrag, true);
    document.removeEventListener(dragEventFor['end'], this.onDragEnd, true);
  }

  /**
   * Renders the child component directly while handling the events for
   * dragging, no matter if these come from mouse or touches.
   */
  render() {
    let ps = this.props,
      st = this.state,
      childStyle = ps.children.props.style || {},
      x = this.canDragOnX() ? st.clientX : 0,
      y = this.canDragOnY() ? st.clientY : 0,
      transformStyle = { left : x + 'px', top : y + 'px' },
      // transformStyle = { transform : 'translate(' + x + 'px, ' + y + 'px)' },
      styl = lodash.assign({}, childStyle, transformStyle);
    return React.cloneElement( React.Children.only(ps.children), {
      className : 'ui-draggable',
      style : styl,
      onMouseDown : this.onMouseDown,
      onTouchStart : this.onTouchStart,
      onMouseUp : this.onDragEnd,
      onTouchEnd : this.onDragEnd
    });
  }

};

/**
 * This object is the default options for properties of the Draggable
 * component. This configuration follows ES6 standard.
 */
UIDraggable.defaultProps = {
  axis : 'xy',
  bounds : false,
  handle : null,
  cancel : null,
  grid : null,
  moveOnStartChange : false,
  start : { x : 0, y : 0 },
  zIndex : NaN,
  enableUserSelect : true,
  onStart : emptyFn,
  onDrag : emptyFn,
  onStop : emptyFn,
  onMouseDown : emptyFn
};