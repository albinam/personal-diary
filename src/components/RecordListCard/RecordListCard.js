import React from 'react';
import "./RecordListCard.scss";
import ArrowIcon from "../../assets/images/arrow.svg";

function RecordListCard() {

    return (
        <div className="record-list-card">
            <div className="record-list-card__description">
                <div className="record-list-card__description__date">13/10/22</div>
                <div className="record-list-card__description__title">Идеальная ширина столбца для веба</div>
            </div>
            <a href="/"> <img className="record-list-card__arrow-button" src={ArrowIcon} alt="arrow"/></a>
        </div>
    );

}

export default RecordListCard;