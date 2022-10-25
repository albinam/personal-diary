import { combineReducers } from 'redux';
import recordsReducer from './recordsReducer';
import alertReducer from './alertReducer';
import userReducer from './userReducer';
import filtersReducer from './filtersReducer';
import editReducer from './editReducer';

const index = combineReducers({
  records: recordsReducer,
  alert: alertReducer,
  user: userReducer,
  filters: filtersReducer,
  editRecord: editReducer,
});

export default index;
