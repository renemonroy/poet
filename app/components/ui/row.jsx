import React from 'react';
import lodash from 'lodash';
import InlineStyles from 'react-style';
import UIColumn from './column';
import UIDraggable from './draggable';

/**
 * Inline Styles used for components inside Row and the Row itself.
 */
const inlineStyles = InlineStyles.create({
  ISRow : {
    display : 'flex',
    flexDirection : 'row'
  },
  ISResizer : {
    width : '5px',
    cursor : 'col-resize',
    borderLeft : '1px solid #d1d1d1',
    borderRight : '1px solid #d1d1d1',
    backgroundColor : 'red'
  }
});

/**
 * Main class for UIRow component. This tries to simplify the creation
 * of UI layouts that depends on columns and rows.
 */
export default class UIRow extends React.Component {

  constructor(props) {
    super(props);
  }

  /**
   * Returns a Column component by setting its width once its resizer
   * gets dragged in x.
   */
  addColumn(id, width, comp) {
    return (
      <UIColumn key={id} ref={id} colWidth={width}>
        { comp }
      </UIColumn>
    );
  }

  /**
   * Returns a Draggable component which will modify the size of its
   * siblings components, which are columns.
   */
  addResizer(id, colName, i) {
    let { ISResizer } = inlineStyles,
      leftColId = colName + (i-1),
      rightColId = colName + i,
      ctx = { index : i, lCol : leftColId, rCol : rightColId };
    return (
      <UIDraggable
        key={id}
        axis="x"
        onDrag={this.onResizerDrag.bind(this, React, ctx)}>
        <div style={ISResizer}></div>
      </UIDraggable>
    );
  }

  /**
   * Event executed the does necessary calculations to change the
   * width of columns involved.
   */
  onResizerDrag(Re, ctx, e, ui) {
    let rfs = this.refs,
      lCol = rfs[ctx.lCol],
      rCol = rfs[ctx.rCol],
      lColWidth = lCol.state.colWidth || parseInt(Re.findDOMNode(lCol).offsetWidth, 10),
      rColWidth = rCol.state.colWidth || parseInt(Re.findDOMNode(rCol).offsetWidth, 10);
    lCol.setState({ colWidth : lColWidth + e.movementX });
    rCol.setState({ colWidth : rColWidth - e.movementX });
  }

  /**
   * This handles the components needed to be rendered inside the
   * row component.
   */
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
        cols.push(row.addResizer(resizerId, colName, i));
      }
      cols.push(row.addColumn(colId, colWidth, comp));
    });
    return cols;
  }

  /**
   * Renders the row component and the children wrapped into columns
   * that can be resized.
   */
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