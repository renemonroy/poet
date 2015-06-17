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

  render() {
    let st = this.state,
      { ISColContainer } = inlineStyles;
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