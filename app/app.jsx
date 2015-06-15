import React from 'react';
import InlineStyles from 'react-style';
import UIRow from './components/ui/row.jsx';
import UIEditor from './components/ui/editor';

require('brace/mode/markdown');
require('brace/theme/github');

const inlineStyles = InlineStyles.create({
  ISColContainer : {
    padding : '20px'
  }
});

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
    let { ISColContainer } = inlineStyles;
    return(
      <div {...this.props} className="app">
        <p>App</p>
        <UIRow id="row-editor" resizable="true">
          <div style={ISColContainer}>
            <UIEditor
              id="poet-editor"
              mode="markdown"
              theme="github"
              width="100%"
              onEdit={this.onEditorChange}
            />
          </div>
          <div style={ISColContainer}>
            <div id="poet-previewer">
              <p>Here goes the preview!</p>
            </div>
          </div>
        </UIRow>
      </div>
    );
  }

}