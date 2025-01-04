const RESPONSE = {
  SUCCESS: {
    STATUS: 200,
    MESSAGE: "Success",
    LOGIN: "log out successfully!",
  },
  BAD_REQUEST: {
    STATUS: 400,
    MESSAGE: "Bad Request",
    INVALID_EMAIL: "Email is invalid",
    REQUIRED_LOGIN: "Email and Password are required",
    SELF_WISH: "You can't wish yourself",
  },
  UNAUTHORIZED: {
    STATUS: 401,
    MESSAGE: "Unauthorized",
    REQUIRED_AUTHENTICATION: "You're not connected, please authenticate",
    RETRY_LOGIN: "Something went wrong, please log in again",
  },
  FORBIDDEN: {
    STATUS: 403,
    MESSAGE: "Forbidden",
  },
  NOT_FOUND: {
    STATUS: 404,
    MESSAGE: "Not Found",
  },
  INTERNAL_SERVER_ERROR: {
    STATUS: 500,
    MESSAGE: "Internal Server Error",
  },
  RECORED_CREATED: {
    STATUS: 201,
    MESSAGE: "Created record successfully",
  },
};

export default RESPONSE;
