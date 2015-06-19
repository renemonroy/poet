import marked from 'marked';
import hljs from 'highlight.js';
import alt from '../alt.jsx';
import ArticleActions from '../actions/article.jsx';

marked.setOptions({
  sanitize : true,
  highlight : (code) => hljs.highlightAuto(code).value
});

const state = { editable : true, markdown : '# Header', html : '' };

class ArticleStore {

  constructor() {
    this.bindActions(ArticleActions);
    for ( let key in state ) { this[key] = state[key]; }
  }

  onLoadArticle() {
    this.setState({ html : marked(this.markdown) });
  }

  onEditArticle(status) {
    this.setState({ editable : status });
  }

  onSaveArticleEditing(md) {
    this.setState({ markdown : md, html : marked(md) });
  }

  onCloseArticleEditing(md) {
    this.setState({ editable : true,  markdown : md, html : marked(md) });
  }

}

export default alt.createStore(ArticleStore);