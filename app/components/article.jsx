import React from 'react';

const displayName = 'Article';
const defaultProps = {
  id : null,
  name : '',
  content : {}
};

export default class Article extends React.Component {

  constructor(props) {
    super(props);
  }

  renderColumns(columns) {
    return columns.map( function(column) {
      let content = { __html : column.content || '' };
      return (
        <div className="column" key={'column-' + column.id}>
          <div className="content" dangerouslySetInnerHTML={content} />
        </div>
      );
    });
  }

  renderRows(rows) {
    let article = this;
    return rows.map( function(row) {
      return (
        <div className="row" key={'row-' + row.id}>
          { row.columns ? article.renderColumns(row.columns) : null }
        </div>
      );
    });
  }

  render() {
    let { content } = this.props;
    return (
      <article>
        { content.rows ? this.renderRows(content.rows) : null }
      </article>
    );
  }

};

Article.displayName = displayName;
Article.defaultProps = defaultProps;