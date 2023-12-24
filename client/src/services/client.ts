import axios, { AxiosInstance, isAxiosError } from "axios";

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

class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BadRequestError";
  }
}

class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
  }
}

class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

class ConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConflictError";
  }
}

class TooManyRequestsError extends Error {
  constructor() {
    super("Too Many Requests");
    this.name = "TooManyRequestsError";
  }
}

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError(error)) {
      const errorMessage = error.response?.data?.error;

      switch (error.response?.status) {
        case 400:
          throw new BadRequestError(errorMessage);
        case 401:
          throw new UnauthorizedError(errorMessage);
        case 404:
          throw new NotFoundError(errorMessage);
        case 409:
          throw new ConflictError(errorMessage);
        case 429:
          throw new TooManyRequestsError();
        default:
          throw error;
      }
    }
    throw error;
  }
);

export default client;
