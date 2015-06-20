import marked from 'marked';
import hljs from 'highlight.js';
import alt from '../alt.jsx';
import ArticleActions from '../actions/article.jsx';

marked.setOptions({
  sanitize : true,
  highlight : (code) => hljs.highlightAuto(code).value
});

const state = { editable : false, markdown : '', html : '' };

class ArticleStore {

  constructor() {
    this.bindActions(ArticleActions);
    for ( let key in state ) { this[key] = state[key]; }
  }

  dirtyMd(md) {
    return md.replace(/\n/ig,'<br>');
  }

  updateFile(md, editable) {
    let sanitized = md.replace(/<br>/ig,'\n');
    localStorage.setItem("article", sanitized);
    this.setState({
      editable : editable || false,
      markdown : this.dirtyMd(md),
      html : marked(md)
    });
  }

  onLoad(md) {
    this.setState({ markdown : this.dirtyMd(md), html : marked(md) });
  }

  onEdit() {
    this.setState({ editable : true });
  }

  onSave(md) {
    this.updateFile(md, true);
  }

  onDone(md) {
    this.updateFile(md, false);
  }

}

export default alt.createStore(ArticleStore);