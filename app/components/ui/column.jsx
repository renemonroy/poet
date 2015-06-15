import React from 'react';
import InlineStyles from 'react-style';
import lodash from 'lodash';

const inlineStyles = InlineStyles.create({
  ISColumn : {
    flex : 1
  }
});

export default class UIColumn extends React.Component {

  constructor(props) {
    super(props);
    this.state = { colWidth : props.colWidth ? parseInt(props.colWidth) : null };
  }

  render() {
    let ps = this.props,
      st = this.state,
      { ISColumn } = inlineStyles,
      flexStyle = st.colWidth ?
        { flex : '0 1 ' + st.colWidth + 'px' } : st.colWidth,
      styl = lodash.assign({}, ISColumn, flexStyle);
    return (
      <div {...ps} style={styl} className="ui-column">
        {ps.children}
      </div>
    );
  }

};