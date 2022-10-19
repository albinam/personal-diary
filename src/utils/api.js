import axios from "axios";
import {setAlert, setRecords, setRecordsLoadingStatus, setTotalRecordCount} from "../redux/actions/actions";

const myAxios = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
        'Content-Type': 'application/json'
    }
});
export const getRecords = (page,limit,title,date,sortByTitle,sortByDate) => {
    return (dispatch) => {
        setRecordsLoadingStatus(true);
        setRecords(null);
        let url=`/record?_embed=comments&_page=${page}&_limit=${limit}`;
        if(date.dateFrom && date.dateTo){
            url=url+`&date_gte=${date.dateFrom}&date_lte=${date.dateTo}`;
        }
        if(title){
            url=url+`&title=${title}`;
        }
        if(sortByDate && sortByTitle){
            console.log(1)
            url=url+`&_sort=title,date&_order=${sortByTitle},${sortByDate}`;
        }
        if (sortByDate && sortByTitle===""){
            console.log(2)
            url=url+`&_sort=date&_order=${sortByDate}`;
        }
        if (sortByTitle && sortByDate===""){
            console.log(3)
            url=url+`&_sort=title&_order=${sortByTitle}`;
        }
        console.log(url)
        myAxios.get(url)
            .then((resp) => {
                dispatch(setRecords(resp.data));
                dispatch(setTotalRecordCount(resp.headers.get('X-Total-Count')))
            })
            .then(() => dispatch(setRecordsLoadingStatus(false)))
    }
}

export const postComment = (data) => {
    return async (dispatch) => {
        const result = await myAxios.post(`/comments`, data);
        console.log(result)
        if (result.status === 201) {

            dispatch(setAlert({
                message: 'Комментарий добавлен',
                type: "SUCCESS",
            }));
            dispatch(setRecordsLoadingStatus(true));
        } else {
            dispatch(setAlert({
                message: 'Что-то пошло не так',
                type: "ERROR",
            }));
        }
    }
}

export const postRecord = (data) => {
    return async (dispatch) => {
        const result = await myAxios.post(`/record`, data);
        console.log(result)
        if (result.status === 201) {
            dispatch(setAlert({
                message: 'Запись добавлена',
                type: "SUCCESS",
            }));
            dispatch(setRecordsLoadingStatus(true));
        } else {
            dispatch(setAlert({
                message: 'Что-то пошло не так',
                type: "ERROR",
            }));
        }
    }
}

export const deleteComment = (id) => {
    return async (dispatch) => {
        const result = await myAxios.delete(`/comments/${id}`);
        if (result.status === 200) {
            dispatch(getRecords());
            dispatch(setAlert({
                message: 'Комментарий удален',
                type: "SUCCESS"
            }));
            dispatch(setRecordsLoadingStatus(true));
        } else {
            dispatch(setAlert({
                message: 'Что-то пошло не так',
                type: "ERROR"
            }));
        }
   }
}