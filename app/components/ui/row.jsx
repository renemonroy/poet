import React from 'react';
import lodash from 'lodash';
import InlineStyles from 'react-style';
import UIDraggable from './draggable';

const inlineStyles = InlineStyles.create({
  ISRow : {
    display : 'flex',
    flexDirection : 'row'
  },
  ISColumn : {
    flex : 1
  },
  ISResizer : {
    flex : '0 1 5px',
    cursor : 'col-resize',
    borderLeft : '1px solid #d1d1d1',
    borderRight : '1px solid #d1d1d1',
    backgroundColor : 'red'
  }
});

export default class UIRow extends React.Component {

  constructor(props) {
    super(props);
    this.onResizerDrag = this.onResizerDrag.bind(this);
  }

  onResizerDrag(e, ui) {
    console.log('Splitter Event:', ui.position);
  }

  addColumn(id, width, comp) {
    let { ISColumn } = inlineStyles,
      flexStyle = width ? { flex : '0 1 ' + width + 'px' } : width,
      styl = lodash.assign({}, ISColumn, flexStyle);
    return (
      <div key={id} ref={id} style={styl}>
        { comp }
      </div>
    );
  }

  addResizer(id) {
    let { ISResizer } = inlineStyles;
    return (
      <UIDraggable key={id} axis="x" onDrag={this.onResizerDrag}>
        <div style={ISResizer}></div>
      </UIDraggable>
    );
  }

  renderContent(comps) {
    let row = this,
      cols = [],
      colName = row.props.id + '-col-';
    lodash.forEach(comps, (comp, i) => {
      let { ISResizer } = inlineStyles,
        colId = colName + i,
        resizerId = colId + '-handler',
        colWidth = comp.props.colWidth || null;
      if ( (i > 0) && row.props.resizable === 'true' ) {
        cols.push(row.addResizer(resizerId));
      }
      cols.push(row.addColumn(colId, colWidth, comp));
    });
    return cols;
  }

  render() {
    let ps = this.props,
      comps = ps.children,
      { ISRow } = inlineStyles;
    return (
      <div {...ps} className="ui-row" style={ISRow}>
        { comps.length > 0 ? this.renderContent(comps) : null }
      </div>
    );
  }

};

// require('./row.scss');
//
// import React from 'react';
// import Draggable from 'react-draggable';
//
// /**
//  * Column is used by Row to build containers around immediate children
//  * components of a row. This will be automatically adjusted in size to fit
//  * the entire row. Columns can have fixed width only if its has a prop
//  * colWidth set.
//  */
// let Column = React.createClass({
//   displayName : 'Column',
//
//   /**
//    * Props can't be updated from a owner component, but state can be. The
//    * state is changed by Row component only on those columns that need it.
//    * These 2 columns will re render themselves with these states.
//    */
//   getInitialState() {
//     var ps = this.props;
//     return { colWidth : ps.colWidth ? parseInt(ps.colWidth) : null }
//   },
//
//   /**
//    * Just renders the column wrapper of each element inside a container, if
//    * the width of the col is not setup or equals to 0 the flex width will
//    * be 1 without any width in pixels.
//    */
//   render() {
//     var st = this.state,
//       flex = st.colWidth && (st.colWidth > 0) ? '0 1 ' + st.colWidth + 'px' : '1',
//       styles = { flex : flex };
//     return (
//       <div {...this.props} style={styles} className="column">
//         { this.props.children }
//       </div>
//     );
//   }
// });
//
//
// /**
//  * Row wraps children into columns to control layouts with the help of flex
//  * styles. Each column can be fixed but by default will be elastic.
//  */
// let Row = React.createClass({
//   displayName : 'Row',
//
//   /**
//    * Sets initial variables, which is only 'resizable' for now.
//    */
//   getDefaultProps() {
//     return { rowName : null, resizable : false };
//   },
//
//   /**
//    * Builds columns with cached widths and possible draggables if configured
//    * as true via props.
//    */
//   renderColumns(comps) {
//     var row = this, cols = [],
//       rowName = row.props.rowName ? row.props.rowName + '-' : '';
//     comps.forEach( (comp, i) => {
//       var colName = rowName + 'col-' + i,
//         cachedWidth = localStorage.getItem(colName),
//         colWidth = (cachedWidth !== null) ? parseInt(cachedWidth, 10) : (comp.props.colWidth || null);
//       if ( (i > 0) && row.props.resizable === 'true' ) {
//         cols.push(
//           <Draggable key={ colName + 'handler-' + i } axis='x' zIndex={1} start={{ x : 0, y: 0 }} onDrag={row._onHandlerDrag.bind(row, i)}>
//             <div><div className="handler-icon"></div></div>
//           </Draggable>
//         );
//       }
//       cols.push(
//         <Column key={ colName } ref={ colName } colWidth={ colWidth } >
//           { comp }
//         </Column>
//       );
//     });
//     return cols;
//   },
//
//   /**
//    * When the draggable is handled to resize, it gets the current and previous
//    * columns involved data to change its dimensions.
//    */
//   _onHandlerDrag(i, e, ui) {
//     var rfs = this.refs, ps = this.props,
//       rowName = ps.rowName ? ps.rowName + '-' : '',
//       rColName = rowName + 'col-' + i,
//       lColName = rowName + 'col-' + (i - 1),
//       rCol = rfs[rColName],
//       lCol = rfs[lColName],
//       rColW = (rCol.state.colWidth || parseInt(rCol.getDOMNode().offsetWidth)) - e.movementX,
//       lColW = (lCol.state.colWidth || parseInt(lCol.getDOMNode().offsetWidth)) + e.movementX;
//
//     rCol.setState({ colWidth : rColW });
//     lCol.setState({ colWidth : lColW });
//
//     if ( ps.rowName && rCol.state.colWidth ) localStorage.setItem(rColName, rColW.toString());
//     if ( ps.rowName && lCol.state.colWidth ) localStorage.setItem(lColName, lColW.toString());
//   },
//
//   /**
//    * Renders the row element into a owner component. If it doesn't get any
//    * child it will be an simple empty container.
//    */
//   render() {
//     var comps = this.props.children;
//     return (
//       <div {...this.props} className="row">
//         { comps.length > 0 ? this.renderColumns(comps) : null }
//       </div>
//     );
//   }
// });
//
// export default Row;