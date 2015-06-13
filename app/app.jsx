import React from 'react/addons';
import Editor from './components/editor';

export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div {...this.props} className="app">
        <p>App</p>
        <Editor keyName="poet" />
      </div>
    );
  }

}