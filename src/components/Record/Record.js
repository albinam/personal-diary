import React from 'react';
import './Record.scss';
import PropTypes from 'prop-types';
import RecordCard from './RecordCard/RecordCard';
import Comments from '../Comments/Comments';

function Record({ recordId }) {
  return (
    <div className="record">
      <RecordCard recordId={recordId} />
      <Comments recordId={recordId} />
    </div>
  );
}

Record.propTypes = {
  recordId: PropTypes.number.isRequired,
};

export default Record;
