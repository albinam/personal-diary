import React, {useState} from 'react';
import "./FilterBar.scss";
import SearchIcon from "../../assets/images/search.svg";
import CalendarIcon from "../../assets/images/calendar.svg";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentPage, setDateSearchValue, setTitleSearchValue} from "../../redux/actions/actions";
import moment from "moment";
import {timestampToDatetimeInputString} from "../../utils/utils";

function FilterBar() {
    const dispatch = useDispatch();
    const titleSearchValue = useSelector(state => state.records.titleSearchValue);
    const dateSearchValue = useSelector(state => state.records.dateSearchValue);
    const [error, setError] = useState();

    function handleSubmit(e) {
        e.preventDefault();
        const {title, dateFrom, dateTo} = e.target.elements;
        dispatch(setTitleSearchValue(title.value.toString()));
        if (dateFrom.value !== "" && dateTo.value === "") {
            setError("Необходимо выбрать конец периода");
            return;
        }
        if (dateFrom.value === "" && dateTo.value !== "") {
            setError("Необходимо выбрать начало периода");
            return;
        } else if (dateFrom.value !== "" && dateTo.value !== "") {
            if (dateFrom.value > dateTo.value) {
                setError("Дата начала периода больше даты конца");
            } else {
                dispatch(setDateSearchValue({
                    dateFrom: moment(dateFrom.value).utc().toISOString(),
                    dateTo: moment(dateTo.value).utc().toISOString()
                }));
            }
        } else {
            dispatch(setDateSearchValue({dateFrom: "", dateTo: ""}));
        }
        dispatch(setCurrentPage(1));
    }

    function handleReset() {
        dispatch(setTitleSearchValue(""));
        dispatch(setDateSearchValue({dateFrom: "", dateTo: ""}));
        dispatch(setCurrentPage(1));
    }


    return (
        <form className="filter-bar" onSubmit={handleSubmit}>
            <img className="filter-bar__icon" src={SearchIcon} alt="search icon"/>
            <input className="filter-bar__input" defaultValue={titleSearchValue} name="title" type="text"
                   placeholder="Введите название..."/>
            <img className="filter-bar__icon" src={CalendarIcon} alt="search icon"/>
            <input className="filter-bar__input"
                   defaultValue={moment(dateSearchValue.dateFrom).format("yyyy-MM-DD HH:mm")}
                   max={timestampToDatetimeInputString(Date.now())} name="dateFrom"
                   type="datetime-local"/>
            <div className="filter-bar__date-separator">--</div>
            <input className="filter-bar__input"
                   defaultValue={moment(dateSearchValue.dateTo).format("yyyy-MM-DD HH:mm")}
                   max={timestampToDatetimeInputString(Date.now())} name="dateTo"
                   type="datetime-local"/>
            <button className="filter-bar__button" type="submit">Поиск</button>
            <button className="button-clear" onClick={handleReset} type="reset">Сбросить</button>
            {error && (
                <div className="filter-bar__error">{error}</div>
            )}
        </form>
    );
}

export default FilterBar;