require('medium-editor/dist/css/medium-editor.css');
require('medium-editor/dist/css/themes/default.css');

import React from 'react';
import lodash from 'lodash';
import MediumEditor from 'medium-editor';

const defaultProps = { tag : 'div' };

export default class Medium extends React.Component {

  constructor(props) {
    super(props);
    this.state = { text : props.text };
    this.change = this.change.bind(this);
  }

  componentDidMount() {
    let dom = React.findDOMNode(this),
      editableEl = React.findDOMNode(this.refs.editable),
      options = lodash.assign({ elementsContainer : dom }, this.props.options);
    this.medium = new MediumEditor(editableEl, options);
    this.medium.subscribe('editableInput', (e) => {
      this._updated = true;
      this.change(dom.innerHTML);
    });
  }

  componentWillUnmount() {
    this.medium.destroy();
  }

  componentWillReceiveProps(nextProps) {
    if ( nextProps.text !== this.state.text && !this._updated ) {
      this.setState({ text : nextProps.text });
    }
    if ( this._updated ) this._updated = false;
  }

  change(text) {
    if ( this.props.onChange ) this.props.onChange(text);
  }

  render() {
    let { tag, className } = this.props,
      { text } = this.state;
    return (
      <section>
        <div
          ref="editable"
          className={className}
          contentEditable={true}
          dangerouslySetInnerHTML={{ __html : text }}
        />
      </section>
    );
  }

}

Medium.defaultProps = defaultProps;