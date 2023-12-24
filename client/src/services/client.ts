import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

const getAuthorizationHeader = () => {
  const token = Cookies.get("accessToken");
  return token ? `Bearer ${token}` : "";
};

const baseURL = "http://localhost:5000";

const client: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: getAuthorizationHeader(),
  },
});

client.interceptors.request.use((config) => {
  config.headers.Authorization = getAuthorizationHeader();
  return config;
});

export default client;
