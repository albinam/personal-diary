const initialState = {
    records: [],
    recordsLoadingStatus:true,
    recordsCount:21,
    limit: 3,
    currentPage: 1,
    totalRecordsCount:0,
    titleSearchValue:"",
    dateSearchValue:"",
    sortByDate:"",
    sortByTitle:""
}
export default function recordsReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_RECORDS':
            return {
                ...state,
                records: action.payload
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
        case 'SET_TOTAL_RECORDS_COUNT':
            return {
                ...state,
                totalRecordsCount: action.payload
            };
        case 'SET_TITLE_SEARCH_VALUE':
            return {
                ...state,
                titleSearchValue: action.payload
            };
        case 'SET_DATE_SEARCH_VALUE':
            return {
                ...state,
                dateSearchValue: action.payload
            };
        case 'SET_SORT_BY_DATE':
            return {
                ...state,
                sortByDate: action.payload
            };
        case 'SET_SORT_BY_TITLE':
            return {
                ...state,
                sortByTitle: action.payload
            };
        default:
            return state;
    }
}