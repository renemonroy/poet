import React from 'react';
import InlineStyles from 'react-style';
import Medium from './ui/medium.jsx';

const displayName = 'Article',
  defaultProps = {
    id : null,
    name : '',
    content : {}
  },
  inlineStyles = InlineStyles.create({
    ISRow : {
      display : 'flex',
      flexDirection : 'row'
    },
    ISColumn : {
      flex : 1
    }
  });

export default class Article extends React.Component {

  constructor(props) {
    super(props);
    this.state = { content : props.content };
  }

  renderColumns(columns) {
    let article = this;
    return columns.map( function(column) {
      const { ISColumn } = inlineStyles;
      let content = { __html : column.content || '' };
      return (
        <div className="column" key={'column-' + column.id} style={ISColumn}>
          <Medium text={column.content} />
        </div>
      );
    });
  }

  renderRows(rows) {
    let article = this;
    return rows.map( function(row) {
      const { ISRow } = inlineStyles;
      return (
        <div className="row" key={'row-' + row.id} style={ISRow}>
          { row.columns ? article.renderColumns(row.columns) : null }
        </div>
      );
    });
  }

  render() {
    let { content } = this.state,
      { id } = this.props;
    return (
      <article id={'article-' + id}>
        { content.rows ? this.renderRows(content.rows) : null }
      </article>
    );
  }

};

Article.displayName = displayName;
Article.defaultProps = defaultProps;