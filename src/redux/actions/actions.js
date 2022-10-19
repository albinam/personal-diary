export function setCurrentPage(currentPage) {
    return {
        type: 'SET_CURRENT_PAGE',
        payload: currentPage
    }
}

export function setTotalRecordCount(count) {
    return {
        type: 'SET_TOTAL_RECORDS_COUNT',
        payload: count
    }
}

export function setRecords(records) {
    return {
        type: 'SET_RECORDS',
        payload: records
    }
}

export function setRecordsLoadingStatus(status) {
    return {
        type: 'SET_RECORDS_LOADING_STATUS',
        payload: status
    }
}
export function setTitleSearchValue(value) {
    return {
        type: 'SET_TITLE_SEARCH_VALUE',
        payload: value
    }
}

export function setDateSearchValue(value) {
    console.log(value)
    return {
        type: 'SET_DATE_SEARCH_VALUE',
        payload: value
    }
}

export function setAlert(alert) {
    return {
        type: 'SET_ALERT',
        payload:alert
    }
}

export function closeAlert() {
    return {
        type: 'SET_CLOSE_ALERT'
    }
}
export function setAlertResponse(response) {
    return {
        type: 'SET_ALERT_RESPONSE',
        payload:response
    }
}
export function setSortByDate(type) {
    return {
        type: 'SET_SORT_BY_DATE',
        payload:type
    }
}
export function setSortByTitle(type) {
    return {
        type: 'SET_SORT_BY_TITLE',
        payload:type
    }
}