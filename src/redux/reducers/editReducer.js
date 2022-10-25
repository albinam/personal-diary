const initialState = {
  editingPageLoadingStatus: false,
  recordId: null,
  record: {},

};
export default function editReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_EDITING_PAGE_LOADING':
      return {
        ...state,
        editingPageLoadingStatus: action.payload,
      };
    case 'SET_RECORD_ID':
      return {
        ...state,
        recordId: action.payload,
      };
    case 'SET_RECORD':
      return {
        ...state,
        record: action.payload,
      };
    default:
      return state;
  }
}
