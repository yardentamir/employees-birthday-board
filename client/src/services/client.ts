import axios, { AxiosInstance, isAxiosError } from "axios";
import Cookies from "js-cookie";

const getAuthorizationHeader = () => {
  const token = Cookies.get("accessToken");
  return token ? `Bearer ${token}` : "";
};
console.log(import.meta.env.MODE);

const client: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: getAuthorizationHeader(),
  },
});

client.interceptors.request.use((config) => {
  config.headers.Authorization = getAuthorizationHeader();
  return config;
});

export class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BadRequestError";
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class ConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConflictError";
  }
}

export class TooManyRequestsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TooManyRequestsError";
  }
}

export class InternalServerError extends Error {
  constructor() {
    super("Internal Server Error");
    this.name = "InternalServerError";
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
          throw new TooManyRequestsError(errorMessage);
        case 500:
          throw new InternalServerError();
        default:
          throw error;
      }
    }
    throw error;
  }
);

export default client;
