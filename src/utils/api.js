import axios from 'axios';
import {
  setAlert, setEditingPageLoading, setRecord,
  setRecordId,
  setRecords,
  setRecordsLoadingStatus,
  setTotalRecordCount,
} from '../redux/actions/actions';

const myAxios = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
  },
});
export const getRecords = (page, limit, title, date, sortByTitle, sortByDate) => (dispatch) => {
  setRecordsLoadingStatus(true);
  setRecords(null);
  let url = `/record?_embed=comments&_page=${page}&_limit=${limit}`;
  if (date?.dateFrom && date?.dateTo) {
    url += `&date_gte=${date.dateFrom}&date_lte=${date.dateTo}`;
  }
  if (title) {
    url += `&title=${title}`;
  }
  if (sortByDate && sortByTitle) {
    url += `&_sort=title,date&_order=${sortByTitle},${sortByDate}`;
  }
  if (sortByDate && sortByTitle === '') {
    url += `&_sort=date&_order=${sortByDate}`;
  }
  if (sortByTitle && sortByDate === '') {
    url += `&_sort=title&_order=${sortByTitle}`;
  }
  myAxios.get(url)
    .then((resp) => {
      dispatch(setRecords(resp.data));
      dispatch(setTotalRecordCount(resp.headers.get('X-Total-Count')));
    })
    .then(() => dispatch(setRecordsLoadingStatus(false)));
};

export const postComment = (data) => async (dispatch) => {
  const result = await myAxios.post('/comments', data);
  if (result.status === 201) {
    dispatch(setAlert({
      message: 'Комментарий добавлен',
      type: 'SUCCESS',
    }));
    dispatch(setRecordsLoadingStatus(true));
  } else {
    dispatch(setAlert({
      message: 'Что-то пошло не так',
      type: 'ERROR',
    }));
  }
};

export const postRecord = (data) => async (dispatch) => {
  const result = await myAxios.post('/record', data);
  if (result.status === 201) {
    dispatch(setAlert({
      message: 'Запись добавлена',
      type: 'SUCCESS',
    }));
    dispatch(setRecordsLoadingStatus(true));
  } else {
    dispatch(setAlert({
      message: 'Что-то пошло не так',
      type: 'ERROR',
    }));
  }
};

export const deleteComment = (id) => async (dispatch) => {
  const result = await myAxios.delete(`/comments/${id}`);
  if (result.status === 200) {
    dispatch(getRecords());
    dispatch(setAlert({
      message: 'Комментарий удален',
      type: 'SUCCESS',
    }));
    dispatch(setRecordsLoadingStatus(true));
  } else {
    dispatch(setAlert({
      message: 'Что-то пошло не так',
      type: 'ERROR',
    }));
  }
};

export const getRecord = (id) => async (dispatch) => {
  const result = await myAxios.get(`/record/${id}`);
  if (result.status === 200) {
    dispatch(setEditingPageLoading(false));
    dispatch(setRecord(result.data));
  } else {
    dispatch(setAlert({
      message: 'Что-то пошло не так',
      type: 'ERROR',
    }));
  }
};

export const putRecord = (data) => async (dispatch) => {
  const result = await myAxios.put(`/record/${data.id}`, data);
  if (result.status === 200) {
    dispatch(setAlert({
      message: 'Запись отредактирована',
      type: 'SUCCESS',
    }));
    dispatch(setRecordsLoadingStatus(true));
    dispatch(setRecordId(null));
    dispatch(setRecord({}));
  } else {
    dispatch(setAlert({
      message: 'Что-то пошло не так',
      type: 'ERROR',
    }));
  }
};
