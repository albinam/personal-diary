import React, {useEffect} from 'react';
import Header from "../../components/Header/Header";
import "./RecordsList.scss";
import FilterBar from "../../components/FilterBar/FilterBar";
import SortBar from "../../components/SortBar/SortBar";
import Record from "../../components/Record/Record";
import {useDispatch, useSelector} from "react-redux";
import {getRecords} from "../../utils/api";

function RecordsList() {
    const dispatch = useDispatch();
    const records = useSelector(state => state.records.records);
    const loading = useSelector(state => state.records.recordsLoadingStatus);

    useEffect(() => {
        if(loading) {
            dispatch(getRecords());
        }
    }, [loading])
    if (loading) {
        return (
           <div>loading</div>
        )
    }
    else {
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
            </div>
        );
    }
}

export default RecordsList;