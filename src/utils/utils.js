export function getTimeZoneOffsetInMs() {
  return new Date().getTimezoneOffset() * -60 * 1000;
}

export function timestampToDatetimeInputString(timestamp) {
  const date = new Date((timestamp + getTimeZoneOffsetInMs()));
  return date.toISOString().slice(0, 19);
}

export function convertBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
