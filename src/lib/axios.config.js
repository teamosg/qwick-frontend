import axios from "axios";
import { toast } from "sonner";

// Base URL from Postman collection: https://qwick.softvencealpha.com/api
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://darrenchua.softvencealpha.com/api";

const axiosPublic = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 20000,
});

const axiosPrivate = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 20000,
});

axiosPrivate.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    // config.headers.Authorization = `${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosPrivate.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // window.location.href = "/sign-in";
    if (error?.response?.status === 401) {
      // toast.error("Session expired. Please sign in again.");
      localStorage.removeItem("token");

      setTimeout(() => {
        window.location.href = "/sign-in";
      }, [1500]);
    }

    return Promise.reject(error);
  }
);

export { axiosPrivate, axiosPublic };
