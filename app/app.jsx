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
    this.combokeys.bind('command+s', this.onSave);
    this.combokeys.bind('command+d', this.onDone);
    articleActions.load(str);
  }

  onEdit() {
    articleActions.edit();
  }
  onSave(e) {
    console.log('eeeeee');
    e.preventDefault();
    articleActions.save(React.findDOMNode(this.refs.article).innerText);
  }
  onDone() {
    e.preventDefault();
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