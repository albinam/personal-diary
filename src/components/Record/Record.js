import React from 'react';
import "./Record.scss";
import RecordCard from "../RecordCard/RecordCard";
import Comments from "../Comments/Comments";


function Record({props}) {

    return (
        <div className="record">
            <RecordCard props={props}/>
            <Comments props={props}/>
        </div>
    );

}

export default Record;