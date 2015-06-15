import React from 'react';
import lodash from 'lodash';
import InlineStyles from 'react-style';
import UIColumn from './column';
import UIDraggable from './draggable';

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

export default class UIRow extends React.Component {

  constructor(props) {
    super(props);
  }

  addColumn(id, width, comp) {
    return (
      <UIColumn key={id} ref={id} colWidth={width}>
        { comp }
      </UIColumn>
    );
  }

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

  onResizerDrag(react, ctx, e, ui) {
    let rfs = this.refs,
      lCol = rfs[ctx.lCol],
      rCol = rfs[ctx.rCol],
      lColWidth = parseInt(react.findDOMNode(lCol).offsetWidth, 10) + e.movementX,
      rColWidth = parseInt(react.findDOMNode(rCol).offsetWidth, 10) - e.movementX;
    lCol.setState({ colWidth : lColWidth });
    rCol.setState({ colWidth : rColWidth });
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
        cols.push(row.addResizer(resizerId, colName, i));
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