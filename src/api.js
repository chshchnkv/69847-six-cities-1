import axios from "axios";
import history from "./history";

const onSuccess = (response) => response;
const onFail = (err) => {
  if (err.response.status === 403) {
    history.push(`/login`);
  }
};

export const configureAPI = () => axios.create({
  baseURL: `https://es31-server.appspot.com/six-cities`,
  timeout: 5000,
  withCredentials: true
});

export const attachInterceptors = (apiInstance) => apiInstance.interceptors.response.use(onSuccess, onFail);
export const ejectInterceptors = (apiInstance) => apiInstance.interceptors.response.eject(onSuccess, onFail);
