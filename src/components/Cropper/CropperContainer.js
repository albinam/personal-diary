import React, { useRef, useState } from 'react';
import Cropper from 'react-cropper';
import './CropperContainer.scss';
import 'cropperjs/dist/cropper.css';
import PropTypes from 'prop-types';
import Loader from '../Loader/Loader';

function CropperContainer({ src, getCroppedFile }) {
  const cropperRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const handleClick = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    const img = cropper.getCroppedCanvas().toDataURL();
    getCroppedFile(img);
  };
  const rotate = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    cropper.rotate(90);
  };

  return (
    <>
      {loading && (<Loader />)}
      <div className="cropper">
        <button type="button" className="cropper__button button-main" onClick={rotate}>Повернуть</button>
        <Cropper
          src={src}
          className="cropper__body"
          initialAspectRatio={16 / 9}
          guides={false}
          ready={() => {
            setLoading(false);
          }}
          ref={cropperRef}
        />
        <button type="button" className="cropper__button-crop button-main" onClick={handleClick}>Обрезать</button>
      </div>
    </>
  );
}

CropperContainer.propTypes = {
  src: PropTypes.string.isRequired,
  getCroppedFile: PropTypes.func.isRequired,
};

export default CropperContainer;
