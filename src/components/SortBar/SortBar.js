import React from 'react';
import "./SortBar.scss";
import AscendingIcon from "../../assets/images/AscendingIcon.svg";
import DescendingIcon from "../../assets/images/DescendingIcon.svg";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentPage, setSortByDate, setSortByTitle} from "../../redux/actions/actions";

function SortBar() {
    const sortByDate = useSelector(state => state.records.sortByDate);
    const sortByTitle = useSelector(state => state.records.sortByTitle);
    const dispatch = useDispatch();

    function reset (){
        dispatch(setCurrentPage(1));
        dispatch(setSortByDate(""));
        dispatch(setSortByTitle(""));
    }

    return (
        <div className="sort-bar">
            <div className="sort-bar__container">
                <div className="sort-bar__label">Сортировка по названию</div>
                <div className="sort-bar__icons">
                    <div className="sort-bar__ascending">
                        <img className={sortByTitle === "asc" ? "sort-bar__icon active" : "sort-bar__icon"}
                             onClick={() => {
                                 dispatch(setSortByTitle("asc"));
                                 dispatch(setCurrentPage(1))
                             }} src={AscendingIcon} alt="ascending icon"/>
                    </div>
                    <div className="sort-bar__descending">
                        <img className={sortByTitle === "desc" ? "sort-bar__icon active" : "sort-bar__icon"}
                             onClick={() => {
                                 dispatch(setSortByTitle("desc"));
                                 dispatch(setCurrentPage(1))
                             }} src={DescendingIcon} alt="descending icon"/>
                    </div>
                </div>
            </div>
            <div className="sort-bar__container">
                <div className="sort-bar__label">Сортировка по дате</div>
                <div className="sort-bar__icons">
                    <div className="sort-bar__ascending">
                        <img className={sortByDate === "asc" ? "sort-bar__icon active" : "sort-bar__icon"}
                             onClick={() => {
                                 dispatch(setSortByDate("asc"));
                                 dispatch(setCurrentPage(1))
                             }} src={AscendingIcon} alt="ascending icon"/>
                    </div>
                    <div className="sort-bar__descending">
                        <img className={sortByDate === "desc" ? "sort-bar__icon active" : "sort-bar__icon"}
                             onClick={() => {
                                 dispatch(setSortByDate("desc"));
                                 dispatch(setCurrentPage(1))
                             }} src={DescendingIcon} alt="descending icon"/>
                    </div>
                </div>
            </div>
            <button onClick={()=>reset()} className="button-clear">Сбросить</button>
        </div>
    );
}

export default SortBar;