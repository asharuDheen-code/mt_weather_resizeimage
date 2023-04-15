import axios from "axios";
// require('dotenv').config();
// import dotenv from 'dotenv';

const api = axios.create({
  // baseURL: 'http://localhost:8080/api/v1',
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (res) => res
  // (err) => {
  //   if (err.response.status === 401) {
  //     store.dispatch({ type: ADMIN_LOGOUT });cd pro
  //   }
  //   return Promise.reject(err);
  // }
);

export default api;
