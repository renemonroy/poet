import React from 'react';
import InlineStyles from 'react-style';
import UIRow from './components/ui/row.jsx';
import UIEditor from './components/ui/editor';
import UIArticle from './components/ui/article';

const inlineStyles = InlineStyles.create({
  ISColContainer : {
    padding : '20px'
  }
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

  getElWidth(el) {
    return window.getComputedStyle(React.findDOMNode(el)).width;
  }

  render() {
    let st = this.state,
      { ISColContainer } = inlineStyles,
      editorWidth = this.refs.editorWrapper ?
        this.getElWidth(this.refs.editorWrapper) : '100%';
    return(
      <div {...this.props} className="app">
        <p>App</p>
        <UIRow id="row-editor" resizable="true">
          <div ref="editorWrapper" style={ISColContainer}>
            <UIEditor
              id="poet-editor"
              mode="markdown"
              theme="github"
              width={editorWidth}
              showGutter={false}
              highlightActiveLine={false}
              onEdit={this.onEditorChange}
            />
          </div>
          <div ref="articleWrapper" style={ISColContainer}>
            <UIArticle
              id="poet-previewer"
              content={st.markdown}
            />
          </div>
        </UIRow>
      </div>
    );
  }

}