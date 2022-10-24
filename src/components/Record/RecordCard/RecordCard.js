import React from 'react';
import "./RecordCard.scss";
import moment from "moment";
import {Link} from "react-router-dom";

function RecordCard({props}) {

    return (
        <div className="record-card">
            <div className="record-card__text">
                <div className="record-card__title">{props.title}</div>
                <div className="record-card__date">{moment(props.date).format("DD/MM/YYYY HH:mm")}</div>
                <Link className="record-card__edit-button"
                      to={`/edit-record/${props.id}`}>Редактировать</Link>
                <div className="record-card__body">
                    {props.text}
                </div>
            </div>
            <img className="record-card__image" src={props.image.path}
                 alt="image"/>
        </div>
    );

}

export default RecordCard;