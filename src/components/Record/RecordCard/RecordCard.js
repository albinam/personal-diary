import React from 'react';
import './RecordCard.scss';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function RecordCard({ recordId }) {
  const record = useSelector((state) => state.records.records)
    .filter((r) => r.id === recordId)[0];

  return (
    <div className="record-card">
      <div className="record-card__text">
        <div className="record-card__title">{record.title}</div>
        <div className="record-card__date">{moment(record.date).format('DD/MM/YYYY HH:mm')}</div>
        <Link
          className="record-card__edit-button"
          to={`/edit-record/${record.id}`}
        >
          Редактировать
        </Link>
        <div className="record-card__body">
          {record.text}
        </div>
      </div>
      <img
        className="record-card__image"
        src={record.image?.path}
        alt="card"
      />
    </div>
  );
}

RecordCard.propTypes = {
  recordId: PropTypes.number.isRequired,
};

export default RecordCard;
