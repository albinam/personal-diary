import React from 'react';
import "./FilterBar.scss";
import SearchIcon from "../../assets/images/search.svg";
import CalendarIcon from "../../assets/images/calendar.svg";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentPage, setDateSearchValue, setTitleSearchValue} from "../../redux/actions/actions";
import moment from "moment";

function FilterBar() {
    const dispatch = useDispatch();
    const titleSearchValue = useSelector(state => state.records.titleSearchValue);
    const dateSearchValue = useSelector(state => state.records.dateSearchValue);

    function handleSubmit (e){
        e.preventDefault();
        const {title, date} = e.target.elements;
        dispatch(setTitleSearchValue(title.value.toString()));
        if(date.value!=="") {
            dispatch(setDateSearchValue(moment(date.value).format("YYYY-MM-DD").toString()));
        }
        else{
            dispatch(setDateSearchValue(""));
        }
        dispatch(setCurrentPage(1));
    }

    function handleReset(){
        dispatch(setTitleSearchValue(""));
        dispatch(setDateSearchValue(""));
        dispatch(setCurrentPage(1));
    }

    return (
        <form className="filter-bar" onSubmit={handleSubmit}>
            <img className="filter-bar__icon"  src={SearchIcon} alt="search icon"/>
            <input className="filter-bar__input" defaultValue={titleSearchValue} name="title" type="text" placeholder="Введите название..."/>
            <img className="filter-bar__icon" src ={CalendarIcon} alt="search icon"/>
            <input className="filter-bar__input" defaultValue={moment(dateSearchValue).format("yyyy-MM-DD")} name ="date" type="date"/>
            <button className="filter-bar__button" type ="submit">Поиск</button>
            <button className="button-clear" onClick={handleReset} type="reset">Сбросить</button>
        </form>
    );
}

export default FilterBar;