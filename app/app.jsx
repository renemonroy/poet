import React from 'react';
import InlineStyles from 'react-style';
import marked from 'marked';
import UIRow from './components/ui/row.jsx';
import UIEditor from './components/ui/editor';

require('brace/mode/markdown');
require('brace/theme/github');

const inlineStyles = InlineStyles.create({
  ISColContainer : {
    padding : '20px'
  }
});

marked.setOptions({
  sanitize : true
});

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { markdown : '' };
    this.onEditorChange = this.onEditorChange.bind(this);
  }

  onEditorChange(e) {
    this.setState({ markdown : e });
  }

  render() {
    let st = this.state,
      { ISColContainer } = inlineStyles,
      previewHtml = { __html : marked(st.markdown) };
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
            <div
              id="poet-previewer"
              dangerouslySetInnerHTML={previewHtml}
            />
          </div>
        </UIRow>
      </div>
    );
  }

}