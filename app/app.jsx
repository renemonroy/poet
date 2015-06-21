import React from 'react';
import InlineStyles from 'react-style';
import Article from './components/article';

let getArticleState = function() {
  return {
    article : JSON.parse(localStorage.getItem('article'))
  };
};

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = getArticleState();
  }

  renderArticle() {
    let { article } = this.state;
    return (
      <Article id={article.id} name={article.name} content={article.content} />
    );
  }

  render() {
    let { article } = this.state;
    return(
      <div className="app">
        { article ? this.renderArticle() : null }
      </div>
    );
  }

}