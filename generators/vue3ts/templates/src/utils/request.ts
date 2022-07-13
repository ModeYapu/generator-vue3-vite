import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { Dialog } from "vant";

// 默认请求连接
axios.defaults.baseURL =
import.meta.env.VITE_MODE_NAME === "development" ? "/api" : "" ;
// 超时时间（ms）
axios.defaults.timeout = 2000 * 1000;
// axios请求开启cookie，支持跨域请求携带cookie
axios.defaults.withCredentials = true;
// axios 请求头
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.post["Content-Type"] = "application/json";

// 请求拦截
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 可在这里做一些数据的校验。
    // session的校验等。
    return config;
  },
  (error: AxiosError) => {
    return error;
  }
);

// 响应拦截
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    return res;
  },
  (err: AxiosError) => {
    Dialog.alert({
      title: "提示",
      message: err.message,
    }).then(() => {
      // on close
    });
    // 返回数据前做了什么
    return Promise.reject(err);
  }
);
export default axios;
