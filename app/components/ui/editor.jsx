import React from 'react';
import Brace from 'brace';

require('brace/mode/markdown');
require('brace/theme/github');

require('./editor.scss');

export default class Editor extends React.Component {

  constructor(props) {
    super(props);
    this.onEdit = this.onEdit.bind(this);
  }

  componentDidMount() {
    let ps = this.props,
      editor = ace.edit(ps.id);
    editor.getSession().setMode('ace/mode/' + ps.mode);
    editor.setTheme('ace/theme/' + ps.theme);
    // editor.setFontSize(ps.fontSize);
    editor.on('change', this.onEdit);
    editor.setValue(ps.value);
    editor.renderer.setShowGutter(ps.showGutter);
    editor.setOptions({
      maxLines : ps.maxLines,
      readOnly : ps.readOnly,
      highlightActiveLine : ps.highlightActiveLine,
      highlightSelectedWord : ps.highlightSelectedWord,
      wrap : ps.wrap,
      tabSize : ps.tabSize,
      fontFamily : ps.fontFamily,
      fontSize : ps.fontSize
    });
    editor.setShowPrintMargin(ps.setShowPrintMargin);
    if (ps.onLoad) ps.onLoad(editor);
    this.editor = editor;
  }

  onEdit() {
    var ps = this.props, val = this.editor.getValue();
    if ( ps.onEdit ) ps.onEdit(val);
  }

  render() {
    let ps = this.props,
      stylDim = { width : ps.width, height : ps.height };
    return (
      <div
        id={ps.id}
        className="ui-editor"
        styles={stylDim}>
      </div>
    );
  }

}

Editor.defaultProps = {
  id : 'editor',
  mode : '',
  theme : '',
  height : '500px',
  width : '500px',
  value : '',
  fontSize : 14,
  showGutter : true,
  onEdit : null,
  onLoad : null,
  readOnly : false,
  highlightActiveLine : true,
  highlightSelectedWord : false,
  showPrintMargin : true,
  wrap : true,
  tabSize : 2,
  fontFamily : "'Source Code Pro', typewriter, monospace"
};