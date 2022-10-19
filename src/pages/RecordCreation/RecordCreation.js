import React from 'react';
import Header from "../../components/Header/Header";
import AddRecord from "../../components/AddRecord/AddRecord";
import Arrow from "../../assets/images/arrow.svg";
import "./RecordCreation.scss";

function RecordCreation() {

    return (
        <div className="record-creation">
            <Header/>
            <div className="record-creation__header">
                <a href="/" className="record-creation__header__back">
                    <img className="record-creation__header__back__icon" src={Arrow} alt="arrow"/>
                    <div className="record-creation__header__back__label">Назад</div>
                </a>
                <div className="record-creation__header__title">Новая запись</div>
            </div>
            <AddRecord/>
        </div>
    );
}

export default RecordCreation;