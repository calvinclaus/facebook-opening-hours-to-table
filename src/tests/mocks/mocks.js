import hours from "./hours.mock.json";
export const hoursRequester = (token, appURL, callback) => {
  setTimeout(() => {
    callback(hours);
  }, 5);
}
