import React from 'react';
import Header from "../../components/Header/Header";
import "./RecordsList.scss";
import FilterBar from "../../components/FilterBar/FilterBar";
import RecordListCard from "../../components/RecordListCard/RecordListCard";
import SortBar from "../../components/SortBar/SortBar";

function RecordsList() {

    return (
        <div className="records-list-page">
            <Header/>
            <FilterBar/>
            <SortBar/>
            <RecordListCard/>
            <RecordListCard/>
            <RecordListCard/>
            <RecordListCard/>
        </div>
    );
}

export default RecordsList;