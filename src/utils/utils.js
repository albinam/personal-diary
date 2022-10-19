
export function timestampToDatetimeInputString(timestamp) {
    const date = new Date((timestamp + _getTimeZoneOffsetInMs()));
    return date.toISOString().slice(0, 19);
}

export function _getTimeZoneOffsetInMs() {
    return new Date().getTimezoneOffset() * -60 * 1000;
}