import React, {useEffect} from 'react';
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
import "./RecordsList.scss";

function RecordsList() {
    const dispatch = useDispatch();
    const records = useSelector(state => state.records);
    const filters = useSelector(state => state.filters);

    useEffect(() => {
        if (records.recordsLoadingStatus) {
            dispatch(getRecords(records.currentPage, records.limit, filters.titleSearchValue, filters.dateSearchValue, filters.sortByTitle, filters.sortByDate));
        }
    }, [records.recordsLoadingStatus])

    useEffect(() => {
        if (!records.recordsLoadingStatus) {
            dispatch(setRecordsLoadingStatus(true));
        }
    }, [filters.titleSearchValue, filters.dateSearchValue, filters.sortByTitle, filters.sortByDate])

    if (records.recordsLoadingStatus) {
        return (
            <Loader/>
        )
    } else {
        return (
            <div className="records-list-page">
                <Header/>
                <div className="records-list-page__filters">
                    <FilterBar/>
                    <SortBar/>
                </div>
                {records.records?.map(record => {
                    return (
                        <Record props={record} key={record.id}/>
                    )
                })}
                <Pagination
                    className="records-list-page__pagination"
                    currentPage={records.currentPage}
                    totalCount={records.totalRecordsCount}
                    pageSize={records.limit}
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