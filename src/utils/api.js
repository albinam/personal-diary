import axios from "axios";
import {setAlert, setRecords, setRecordsLoadingStatus} from "../redux/actions/actions";

const myAxios = axios.create({
    baseURL: 'https://6347bd6ddb76843976b11534.mockapi.io/api/v1/',
    headers: {
        'Content-Type': 'application/json'
    }
});
export const getRecords = () => {
    return (dispatch) => {
        setRecordsLoadingStatus(true);
        setRecords(null)
        myAxios.get("/record")
            .then((resp) => {
                dispatch(setRecords(resp.data));
            })
            .then(() => dispatch(setRecordsLoadingStatus(false)))
    }
}

export const putComment = (recordId, data) => {
    return async (dispatch) => {
        const result = await myAxios.post(`/record/${recordId}/comment`, data);
        console.log(result)
        if (result.status === 201) {
            dispatch(getRecords());
            dispatch(setAlert({
                message: 'Комментарий добавлен',
                type: "SUCCESS",
            }));
        } else {
            dispatch(setAlert({
                message: 'Что-то пошло не так',
                type: "ERROR",
            }));
        }
    }
}
export const deleteComment = (recordId, id) => {
    return async (dispatch) => {
        const result = await myAxios.delete(`/record/${recordId}/comment/${id}`);
        if (result.status === 200) {
            dispatch(getRecords());
            dispatch(setAlert({
                message: 'Комментарий удален',
                type: "SUCCESS"
            }));
        } else {
            dispatch(setAlert({
                message: 'Что-то пошло не так',
                type: "ERROR"
            }));
        }
   }
}