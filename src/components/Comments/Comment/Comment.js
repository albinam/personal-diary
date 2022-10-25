import React, { useState, useEffect } from 'react';
import './Comment.scss';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import Delete from '../../../assets/images/close.svg';
import { deleteComment } from '../../../utils/api';
import { closeAlert, setAlert } from '../../../redux/actions/actions';

function Comment({
  userId, avatar, fullName, role, date, text, id,
}) {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);
  const [deletionId, setDeletionId] = useState();
  const user = useSelector((state) => state.user);

  function handleClickDelete(recordId) {
    setDeletionId(recordId);
    dispatch(setAlert({
      message: 'Удалить комментарий?',
      type: 'QUESTION',
      isShown: true,
    }));
  }

  useEffect(() => {
    if (alert.response === 'yes' && alert.type === 'QUESTION' && deletionId) {
      dispatch(deleteComment(deletionId));
      dispatch(closeAlert());
      setDeletionId(null);
    }
  }, [deletionId, alert.response]);

  return (
    <div className={user.id === userId ? 'comment__author' : 'comment'}>
      <img className="comment__avatar" src={avatar} alt="avatar" />
      <div className="comment__text">
        <div className="comment__user-name">{fullName}</div>
        <div className="comment__user-role">{role}</div>
        <div className="comment__user-date">
          {moment(date)
            .format('DD/MM/YYYY HH:mm')}
        </div>
        <div className="comment__body">
          {text}
        </div>
      </div>
      <button type="button" className="comment__delete-button" onClick={() => handleClickDelete(id)}>
        <img
          className="comment__delete"
          src={Delete}
          alt="delete"
        />
      </button>
    </div>
  );
}

Comment.propTypes = {
  id: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  avatar: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default Comment;
