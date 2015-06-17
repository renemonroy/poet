import React from 'react';
import marked from 'marked';
import hljs from 'highlight.js';

require('highlight.js/styles/github.css');
require('./article.scss');

marked.setOptions({
  sanitize : true,
  highlight : (code) => hljs.highlightAuto(code).value
});

export default class Article extends React.Component {

  render() {
    let ps = this.props,
      previewHtml = { __html : marked(ps.content) };
    return (
      <article
        id={ps.id}
        dangerouslySetInnerHTML={previewHtml}>
      </article>
    );
  }

};

Article.defaultProps = {
  id : 'poet-article',
  previewHtml : ''
};