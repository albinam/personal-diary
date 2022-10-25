import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import RecordForm from '../../components/RecordForm/RecordForm';
import Arrow from '../../assets/images/arrow.svg';
import './RecordFromPage.scss';
import { getRecord } from '../../utils/api';
import Loader from '../../components/Loader/Loader';
import { setEditingPageLoading, setRecordId } from '../../redux/actions/actions';

function RecordFormPage() {
  const editMode = useSelector((state) => state.editRecord);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    if (params?.id) {
      dispatch(setEditingPageLoading(true));
      dispatch(setRecordId(params.id));
      dispatch(getRecord(params.id));
    }
  }, [params?.id]);

  if (editMode.editingPageLoadingStatus) {
    return (
      <Loader />
    );
  }
  return (
    <div className="record-form-page">
      <Header />
      <div className="record-form-page__header">
        <a href="/" className="record-form-page__header__back">
          <img className="record-form-page__header__back__icon" src={Arrow} alt="arrow" />
          <div className="record-form-page__header__back__label">Назад</div>
        </a>
        {editMode.recordId ? <div className="record-form-page__header__title">Редактирование записи</div>
          : <div className="record-form-page__header__title">Новая запись</div>}
      </div>
      <RecordForm />
    </div>
  );
}

export default RecordFormPage;
