import React from 'react';
import "./FilterBar.scss";
import SearchIcon from "../../assets/images/search.svg";
import CalendarIcon from "../../assets/images/calendar.svg";

function FilterBar() {

    return (
        <div className="filter-bar">
            <div className="filter-bar__search">
                <img className="filter-bar__search__icon" src={SearchIcon} alt="search icon"/>
                <input className="filter-bar__search__input" type="text" placeholder="Введите название..."/>
                <img className="filter-bar__search__icon" src={CalendarIcon} alt="search icon"/>
                <input className="filter-bar__search__input" type="date"/>
                <button className="filter-bar__search__button">Поиск</button>
                <button className="button-clear">Сбросить</button>
            </div>
        </div>
    );
}

export default FilterBar;