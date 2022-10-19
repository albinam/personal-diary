import React, {useEffect, useRef, useState} from 'react';
import Header from "../../components/Header/Header";
import "./RecordsList.scss";
import FilterBar from "../../components/FilterBar/FilterBar";
import SortBar from "../../components/SortBar/SortBar";
import Record from "../../components/Record/Record";
import {useDispatch, useSelector} from "react-redux";
import {getRecords} from "../../utils/api";
import Pagination from "../../components/Pagination/Pagination";
import {setCurrentPage, setRecordsLoadingStatus} from "../../redux/actions/actions";
import Loader from "../../components/Loader/Loader";
import moment from "moment";

function RecordsList() {
    const dispatch = useDispatch();
    const records = useSelector(state => state.records.records);
    const loading = useSelector(state => state.records.recordsLoadingStatus);
    const currentPage = useSelector(state => state.records.currentPage);
    const limit = useSelector(state => state.records.limit);
    const totalRecordsCount = useSelector(state => state.records.totalRecordsCount);
    const titleSearchValue = useSelector(state => state.records.titleSearchValue);
    const dateSearchValue = useSelector(state => state.records.dateSearchValue);
    const sortByDate = useSelector(state => state.records.sortByDate);
    const sortByTitle = useSelector(state => state.records.sortByTitle);

    useEffect(() => {
        if (loading) {
            dispatch(getRecords(currentPage, limit, titleSearchValue, dateSearchValue, sortByTitle, sortByDate));
        }
    }, [loading])

    useEffect(() => {
        if (!loading) {
            dispatch(setRecordsLoadingStatus(true));
        }
    }, [titleSearchValue, dateSearchValue, sortByTitle, sortByDate])

    if (loading) {
        return (
            <Loader/>
        )
    } else {
        return (
            <div className="records-list-page">
                <Header/>
                <FilterBar/>
                <SortBar/>
                {records?.map(record => {
                    return (
                        <Record props={record} key={record.id}/>
                    )
                })}
                <Pagination
                    className="records-list-page__pagination"
                    currentPage={currentPage}
                    totalCount={totalRecordsCount}
                    pageSize={limit}
                    onPageChange={page => {
                        dispatch(setCurrentPage(page));
                        dispatch(setRecordsLoadingStatus(true));
                    }}
                />
            </div>
        );
    }
}

export default RecordsList;