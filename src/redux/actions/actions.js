export function setCurrentPage(currentPage) {
    return {
        type: 'SET_CURRENT_PAGE',
        payload: currentPage
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