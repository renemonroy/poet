import alt from '../alt';

class ArticleActions {
  constructor() {
    this.generateActions(
      'loadArticle',
      'editArticle',
      'saveArticleEditing',
      'closeArticleEditing'
    );
  }
}

export default alt.createActions(ArticleActions);