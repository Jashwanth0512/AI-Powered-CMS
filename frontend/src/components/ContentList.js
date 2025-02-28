import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../styles/content-list.css';

const ContentList = ({ contents }) => {
  return (
    <div className="content-list">
      {contents.map((content) => (
        <div 
          key={content.id} 
          className="content-item"
          data-status={content.status || 'draft'}
        >
          <div className="content-meta">
            <span className="content-date">
              {new Date(content.createdAt).toLocaleDateString()}
            </span>
            <span className="content-status">{content.status}</span>
          </div>
          
          <h3 className="content-title">{content.title}</h3>
          
          <p className="content-excerpt">
            {content.body.substring(0, 100)}{content.body.length > 100 && '...'}
          </p>

          <div className="content-actions">
            <Link 
              to={`/edit/${content.id}`} 
              className="content-button content-button--primary"
            >
              Edit
            </Link>
            <Link
              to={`/content/${content.id}`}
              className="content-button content-button--secondary"
            >
              Preview
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

ContentList.propTypes = {
  contents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['draft', 'published', 'archived']),
      createdAt: PropTypes.string.isRequired
    })
  ).isRequired
};

export default ContentList;