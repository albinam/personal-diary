import { combineReducers } from "redux";
import recordsReducer from "./recordsReducer";

const index = combineReducers({
    records: recordsReducer,
});

export default index;