import axios from "axios";
import {setRecords, setRecordsLoadingStatus} from "../redux/actions/actions";

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

export const putComment =  async (recordId, data) => {
    const result = await myAxios.post(`/record/${recordId}/comment`, data);
    if (result.status===201){
        return true;
    }
    else{
        alert("Ошибочка")
    }
}
export const deleteComment =  async (recordId, id) => {
    const result = await myAxios.delete(`/record/${recordId}/comment/${id}`);
   console.log(result)
}