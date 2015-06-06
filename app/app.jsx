import React from 'react/addons';

export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div {...this.props} className="app">
        <p>App</p>
      </div>
    );
  }

}