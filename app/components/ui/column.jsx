import React from 'react';
import InlineStyles from 'react-style';
import lodash from 'lodash';

/**
 * Main styles for the UIColumn component. Its visibility relies in
 * Flex usage because its flexibility to align elements.
 */
const inlineStyles = InlineStyles.create({
  ISColumn : {
    flex : 1
  }
});

/**
 * Main class for the UIColumn component. This is mainly used by the
 * UIRow component to show children into columns.
 */
export default class UIColumn extends React.Component {

  /**
   * Initializes the state of the column to change its width but the
   * width is manipulated by the UIRow in reality.
   */
  constructor(props) {
    super(props);
    this.state = { colWidth : props.colWidth ? parseInt(props.colWidth) : null };
  }

  /**
   * Renders a wrapper div that works as a column element. All
   * children passed on props will be renderend inside this wrapper.
   */
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