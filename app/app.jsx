import React from 'react/addons';
import UIRow from './components/ui/row.jsx';
import UIEditor from './components/ui/editor';

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
        <UIRow id="row-editor" resizable="true">
          <UIEditor
            id="poet-editor"
            mode="markdown"
            theme="github"
            width="100%"
            onEdit={this.onEditorChange}
          />
          <div id="poet-previewer">
            <p>Here goes the preview!</p>
          </div>
        </UIRow>
      </div>
    );
  }

}