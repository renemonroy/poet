import alt from '../alt';

class ArticleActions {
  constructor() {
    this.generateActions(
      'load',
      'edit',
      'save',
      'done'
    );
  }
}

export default alt.createActions(ArticleActions);