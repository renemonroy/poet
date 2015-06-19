import React, { Component } from 'react';
import ArticleStore from '../stores/article.jsx';
import ArticleActions from '../actions/article.jsx';

require('highlight.js/styles/github.css');
require('./article.scss');

let getArticleState = () => ArticleStore.getState();

export default class Article extends Component {

  constructor(props) {
    super(props);
    this.state = getArticleState();
    this.onBlur = this.onBlur.bind(this);
    this.onArticleStoreChange = this.onArticleStoreChange.bind(this);
  }

  componentWillMount() {
    ArticleStore.listen(this.onArticleStoreChange);
  }

  componentWillUnmount() {
    ArticleStore.unlisten(this.onArticleStoreChange);
  }

  componentDidMount() {
    ArticleActions.loadArticle();
  }

  onArticleStoreChange() {
    this.setState(getArticleState());
  }

  onBlur(e) {
    ArticleActions.saveArticle(e.target.innerText);
  }

  render() {
    let { editable, markdown, html } = this.state,
      content = editable ? markdown : html;
    return (
      <article
        contentEditable={editable}
        dangerouslySetInnerHTML={{ __html : content}}
        onBlur={this.onBlur}
      />
    );
  }

};