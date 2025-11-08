import axios from "axios";

// Base URL from Postman collection: https://qwick.softvencealpha.com/api
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://1135d23930ce.ngrok-free.app/api";

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

export { axiosPrivate, axiosPublic };
