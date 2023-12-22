import axios, { AxiosInstance } from "axios";

const baseURL = "http://localhost:5000";

const axiosInstance = (token?: string | undefined): AxiosInstance =>
  axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  });

export default axiosInstance;
