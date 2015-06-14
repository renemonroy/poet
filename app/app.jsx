import React from 'react/addons';
import Editor from './components/editor';

require('brace/mode/markdown');
require('brace/theme/github');

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.onEditorChange = this.onEditorChange.bind(this);
  }

  onEditorChange(e) {
    console.group('Editor Changes');
    console.log(e);
    console.groupEnd();
  }

  render() {
    return(
      <div {...this.props} className="app">
        <p>App</p>
        <Editor
          id="poet-editor"
          mode="markdown"
          theme="github"
          width="100%"
          onEdit={this.onEditorChange}
          />
      </div>
    );
  }

}