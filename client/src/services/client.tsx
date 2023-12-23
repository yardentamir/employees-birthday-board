import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("accessToken");

const baseURL = "http://localhost:5000";

const client: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  },
});

export default client;
