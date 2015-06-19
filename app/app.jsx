import React, { Component } from 'react';
import Article from './components/article.jsx';

require('./app.scss');

export default class App extends Component {

  render() {
    return(
      <div className="app">
        <Article />
      </div>
    );
  }

}