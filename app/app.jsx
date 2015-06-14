import React from 'react/addons';
// import UIRow from './components/ui/row.jsx';
import UIEditor from './components/ui/editor';
import UIDraggable from './components/ui/draggable.jsx';

require('brace/mode/markdown');
require('brace/theme/github');

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.onEditorChange = this.onEditorChange.bind(this);
    this.onDraggableStart = this.onDraggableStart.bind(this);
  }

  onEditorChange(e) {
    console.group('Editor Changes');
    console.log(e);
    console.groupEnd();
  }

  onDraggableStart(e, ui) {
    console.log('Draggable event', e);
    console.log('Draggable position', ui.position);
  }

  render() {
    return(
      <div {...this.props} className="app">
        <p>App</p>
        <UIDraggable axis="x" onStart={this.onDraggableStart}>
          <div style={{ height : '100px' }}>
            <p>Draggable</p>
          </div>
        </UIDraggable>
      </div>
    );
  }

}