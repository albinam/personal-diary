const initialState = {
    titleSearchValue:"",
    dateSearchValue:{
        dateFrom:"",
        dateTo:""
    },
    sortByDate:"",
    sortByTitle:""
}
export default function filtersReducer(state = initialState, action) {
    switch (action.type) {
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