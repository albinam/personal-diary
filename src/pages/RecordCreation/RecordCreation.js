import React, {useEffect} from 'react';
import Header from "../../components/Header/Header";
import AddRecord from "../../components/AddRecord/AddRecord";
import Arrow from "../../assets/images/arrow.svg";
import "./RecordCreation.scss";
import {useDispatch, useSelector} from "react-redux";
import {getRecord} from "../../utils/api";
import Loader from "../../components/Loader/Loader";
import {useParams} from "react-router-dom";
import {setEditingPageLoading, setRecord, setRecordId, setRecordsLoadingStatus} from "../../redux/actions/actions";

function RecordCreation() {
    const editMode = useSelector(state => state.editRecord);
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        if(params?.id){
            dispatch(setEditingPageLoading(true));
            dispatch(setRecordId(params.id))
            dispatch(getRecord(params.id));
        }
    }, [params?.id])

    if (editMode.editingPageLoadingStatus) {
        return (
            <Loader/>
        )
    } else {
        return (
            <div className="record-creation">
                <Header/>
                <div className="record-creation__header">
                    <a href="/" className="record-creation__header__back">
                        <img className="record-creation__header__back__icon" src={Arrow} alt="arrow"/>
                        <div className="record-creation__header__back__label">Назад</div>
                    </a>
                    {editMode.recordId ? <div className="record-creation__header__title">Редактирование записи</div> :
                        <div className="record-creation__header__title">Новая запись</div>}
                </div>
                <AddRecord/>
            </div>
        );
    }
}

export default RecordCreation;