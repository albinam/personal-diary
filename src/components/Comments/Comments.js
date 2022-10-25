import React, { useState } from 'react';
import './Comments.scss';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Arrow from '../../assets/images/arrow.svg';
import Comment from './Comment/Comment';
import AddComment from './AddComment/AddComment';

function Comments({ recordId }) {
  const [displayComments, setDisplayComments] = useState(false);
  const record = useSelector((state) => state.records.records)
    .filter((r) => r.id === recordId)[0];

  return (
    <div className="record__comments">
      <div className="record__comments__title">
        Комментарии:
        {record.comments?.length}
      </div>
      {displayComments ? (
        <div className="record__comments__controls">
          <button
            type="button"
            onClick={() => setDisplayComments(false)}
            className="record__comments__button"
          >
            <img
              className="record__comments__icon-hide"
              src={Arrow}
              alt="arrow"
            />
          </button>
          <button
            type="button"
            onClick={() => setDisplayComments(false)}
            className="record__comments__button"
          >
            Скрыть
          </button>
        </div>
      ) : (
        <div className="record__comments__controls">
          <button
            type="button"
            onClick={() => setDisplayComments(false)}
            className="record__comments__button"
          >
            <img
              className="record__comments__icon-reveal"
              src={Arrow}
              alt="arrow"
            />
          </button>
          <button
            type="button"
            onClick={() => setDisplayComments(true)}
            className="record__comments__button"
          >
            Показать
          </button>
        </div>
      )}
      {displayComments && (
        <>
          <AddComment id={record.id} />
          {/* eslint-disable-next-line max-len */}
          {record.comments.sort((comment1, comment2) => new Date(comment1.date).getTime() - new Date(comment2.date).getTime())
            .reverse()
            .map((comment) => (
              <Comment
                key={comment.id}
                avatar={comment.avatar}
                date={comment.date}
                fullName={comment.fullName}
                id={comment.id}
                role={comment.role}
                text={comment.text}
                userId={comment.userId}
              />
            ))}
        </>
      )}
    </div>
  );
}

Comments.propTypes = {
  recordId: PropTypes.number.isRequired,
};

export default Comments;
