import React from 'react';
import "./SortBar.scss";
import AscendingIcon from "../../assets/images/AscendingIcon.svg";
import DescendingIcon from "../../assets/images/DescendingIcon.svg";

function SortBar() {

    return (
        <div className="sort-bar">
            <div className="sort-bar__container">
                <div className="sort-bar__label">Сортировка по названию</div>
                <div className="sort-bar__icons">
                    <div className="sort-bar__ascending">
                        <img className="sort-bar__icon" src={AscendingIcon} alt="ascending icon"/>
                    </div>
                    <div className="sort-bar__descending">
                        <img className="sort-bar__icon" src={DescendingIcon} alt="descending icon"/>
                    </div>
                </div>
            </div>
            <div className="sort-bar__container">
                <div className="sort-bar__label">Сортировка по дате</div>
                <div className="sort-bar__icons">
                    <div className="sort-bar__ascending">
                        <img className="sort-bar__icon" src={AscendingIcon} alt="ascending icon"/>
                    </div>
                    <div className="sort-bar__descending">
                        <img className="sort-bar__icon" src={DescendingIcon} alt="descending icon"/>
                    </div>
                </div>
            </div>
            <button className="button-clear">Сбросить</button>
        </div>
    );
}

export default SortBar;