import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {closeAlert, setAlertResponse} from "../../redux/actions/actions";
import CloseIcon from "../../assets/images/cancel.svg";
import "./Alert.scss";

function Alert() {

    const dispatch = useDispatch();
    const alert = useSelector(state => state.alert);

    const closeHandler = () => {
        dispatch(closeAlert());
    }
    const responseYes = () => {
        dispatch(setAlertResponse("yes"));
        console.log(alert)
    }
    const responseNo = () => {
        dispatch(setAlertResponse("no"));
        dispatch(closeAlert());
        console.log(alert)
    }

    if (alert.type === "SUCCESS") {
        console.log(alert)
        return (<div className={alert?.isShown ? "alert__visible" : "alert"}>
                <div className="alert__success">
                    <div className="alert__text">
                        {alert.message}
                    </div>
                    <img className="alert__icon" src={CloseIcon} alt="close icon" onClick={closeHandler}/>
                </div>
            </div>
        )
    } else if (alert.type === "QUESTION") {
        return (<div className={alert?.isShown ? "alert__visible" : "alert"}>
                <div className="alert__question">
                    <div className="alert__text">
                        {alert.message}
                    </div>
                    <div className="alert__buttons">
                        <button onClick={responseYes} className="alert__buttons__button">Да</button>
                        <button onClick={responseNo} className="alert__buttons__button">Нет</button>
                    </div>
                </div>
            </div>
        )
    } else if (alert.type === "ERROR") {
        return (<div className={alert?.isShown ? "alert__visible" : "alert"}>
                <div className="alert__error">
                    <div className="alert__text">
                        {alert.message}
                    </div>
                    <img className="alert__icon" src={CloseIcon} alt="close icon" onClick={closeHandler}/>
                </div>
            </div>
        )
    }
}

export default Alert;