const initialState = {
    records: [],
    recordsLoadingStatus:true,
    recordsCount:'',
    limit: 5,
    currentPage: 0
}
export default function recordsReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_RECORDS':
            return {
                ...state,
                records: action.payload,
                recordsCount: action.payload.count
            };
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.payload
            };
        case 'SET_RECORDS_LOADING_STATUS':
            return {
                ...state,
                recordsLoadingStatus: action.payload
            };
        default:
            return state;
    }
}