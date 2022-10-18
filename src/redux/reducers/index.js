import { combineReducers } from "redux";
import recordsReducer from "./recordsReducer";
import alertReducer from "./alertReducer";
import userReducer from "./userReducer";

const index = combineReducers({
    records: recordsReducer,
    alert: alertReducer,
    user:userReducer
});

export default index;