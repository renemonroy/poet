import React, { Component } from 'react';
import Combokeys from 'combokeys';
import Article from './components/article.jsx';
import articleActions from './actions/article.jsx';

require('./app.scss');

let str = '',
  articleFile = localStorage.getItem('article');
if ( articleFile == null || articleFile == '' ) {
  localStorage.setItem('article', '# Header');
}
str = localStorage.getItem('article');

export default class App extends Component {

  constructor(props) {
    super(props);
    this.combokeys = new Combokeys(document.documentElement);
    this.onEdit = this.onEdit.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDone = this.onDone.bind(this);
  }

  componentDidMount() {
    this.combokeys.bind('option+e', this.onEdit);
    this.combokeys.bind('option+s', this.onSave);
    this.combokeys.bind('option+d', this.onDone);
    articleActions.load(str);
  }

  onEdit() {
    articleActions.edit();
  }
  onSave() {
    articleActions.save(React.findDOMNode(this.refs.article).innerText);
  }
  onDone() {
    articleActions.done(React.findDOMNode(this.refs.article).innerText);
  }

  render() {
    return(
      <div className="app">
        <Article ref="article" />
      </div>
    );
  }

}