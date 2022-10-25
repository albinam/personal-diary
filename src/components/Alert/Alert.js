import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeAlert, setAlertResponse } from '../../redux/actions/actions';
import CloseIcon from '../../assets/images/cancel.svg';
import './Alert.scss';

function Alert() {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);

  const closeHandler = () => {
    dispatch(closeAlert());
  };
  const responseYes = () => {
    dispatch(setAlertResponse('yes'));
  };
  const responseNo = () => {
    dispatch(setAlertResponse('no'));
    dispatch(closeAlert());
  };

  useEffect(() => {
    if (alert?.isShown) {
      setTimeout(() => {
        dispatch(closeAlert());
      }, 2000);
    }
  }, [alert?.isShown]);

  if (alert.type === 'SUCCESS') {
    return (
      <div className={alert?.isShown ? 'alert__visible' : 'alert'}>
        <div className="alert__success">
          <div className="alert__text">
            {alert.message}
          </div>
          <button type="button" className="alert__icon-container" onClick={closeHandler}>
            <img className="alert__icon" src={CloseIcon} alt="close icon" />
          </button>
        </div>
      </div>
    );
  }
  if (alert.type === 'QUESTION') {
    return (
      <div className={alert?.isShown ? 'alert__visible' : 'alert'}>
        <div className="alert__question">
          <div className="alert__text">
            {alert.message}
          </div>
          <div className="alert__buttons">
            <button type="button" onClick={responseYes} className="alert__button">Да</button>
            <button type="button" onClick={responseNo} className="alert__button">Нет</button>
          </div>
        </div>
      </div>
    );
  }
  if (alert.type === 'ERROR') {
    return (
      <div className={alert?.isShown ? 'alert__visible' : 'alert'}>
        <div className="alert__error">
          <div className="alert__text">
            {alert.message}
          </div>
          <button type="button" className="alert__icon-container" onClick={closeHandler}>
            <img className="alert__icon" src={CloseIcon} alt="close icon" />
          </button>
        </div>
      </div>
    );
  }
}

export default Alert;
