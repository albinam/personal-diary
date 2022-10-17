import React from 'react';
import "./FilterBar.scss";
import SearchIcon from "../../assets/images/search.svg";
import CalendarIcon from "../../assets/images/calendar.svg";

function FilterBar() {

    return (
        <div className="filter-bar">
            <img className="filter-bar__icon" src={SearchIcon} alt="search icon"/>
            <input className="filter-bar__input" type="text" placeholder="Введите название..."/>
            <img className="filter-bar__icon" src={CalendarIcon} alt="search icon"/>
            <input className="filter-bar__input" type="date"/>
            <button className="filter-bar__button">Поиск</button>
            <button className="button-clear">Сбросить</button>
        </div>
    );
}

export default FilterBar;