import React from 'react';
import PropTypes from 'prop-types';
import CropperContainer from '../CropperContainer';
import './Popup.scss';

function Popup({ image, handleClose, getCroppedFile }) {
  return (
    <div className="popup-container">
      <div className="popup-body">
        <CropperContainer
          src={image}
          getCroppedFile={getCroppedFile}
        />
        <button type="button" className="button-clear button-popup" onClick={handleClose}>Закрыть</button>
      </div>
    </div>
  );
}

Popup.propTypes = {
  image: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  getCroppedFile: PropTypes.func.isRequired,
};

export default Popup;
