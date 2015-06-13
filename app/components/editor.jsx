require('brace/mode/markdown');
require('brace/theme/github');

import React from 'react/addons';
import AceEditor from 'react-ace';

export default class Editor extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    console.log('>>> Event change:', e);
  }

  render() {
    let { keyName } = this.props;
    return (
      <div {...this.props}>
      <AceEditor
        mode="markdown"
        theme="github"
        onChange={this.onChange}
        width="100%"
        name={keyName}
      />
      </div>
    );
  }

}