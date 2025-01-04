const LOG_MESSAGES = {
  AUTH: {
    SIGNUP_SUCCESS: "Employee signed up successfully",
    SIGNUP_FAILED: "Signup failed",
    SUCCSESSFUL_SIGNUP: "Signup successful",
    SUCCSESSFUL_LOGIN: "Login successful",
    LOGIN_SUCCESS: "Employee logged in successfully",
    LOGIN_FAILED: "Login failed",
    LOGOUT_SUCCESS: "Employee logged out successfully",
    LOGOUT_FAILED: "Logout failed",
    UNAUTHORIZED_ACCESS: "Unauthorized access attempt detected",
    MISSING_AUTH_TOKEN: "Authorization token is missing",
    LOGOUT_ALL_DEVICES: "Employee logged out from all devices successfully",
    LOGOUT_ALL_DEVICES_FAILED: "Error during log out from all devices",
    UNAUTHORIZED_ATTEMPT: "Unauthorized attempt detected",
    SUCCSESSFUL_LOGOUT: "Employee logged out successfully",
  },
  EMPLOYEES: {
    LOAD_SUCCESS: "Successfully loaded all employees",
    BIRTHDAYS_LOADED: "Loaded employees with birthdays successfully",
    BIRTHDAY_WISH_LOGGED: "Birthday wish logged successfully",
    LOAD_BIRTHDAYS_FAILED: "Error loading employees with birthdays",
    LOAD_WISHES_FAILED: "Error loading employees with wishes",
    LOAD_EMPLOYEES_WITH_WISHES: "Loaded employees with wishes successfully",
    CONVERTED_BIRTH_DATE: "Converted birth date to client's timezone",
    FETCH_WITH_BIRTHDAYS: "Fetching employees with birthdays today",
    BIRTHDAY_TODAY: "Retrieved employees that has birthdays today",
    FETCH_WITH_BIRTHDAYS_FAILED:
      "Error fetching employees with birthdays today",
    LOADING_WITH_ATLEAST_ONE_WISH: "Loading employees with at least one wish",
    SUCCESSFUL_WITH_ATLEAST_ONE_WISH:
      "Retrieved employees with at least one wish",
    LOAD_WITH_ATLEAST_ONE_WISH_FAILED:
      "Error loading employees with at least one wish",
  },
  WISHS: {
    SUCCESSFUL_WISH: "Birthday wish logged successfully",
    SELF_WISH: "Can't wish happy birthday to logged in employee",
    LOGGING: "Logging birthday wish",
    WISH_LOG_FAILED: "Error logging birthday wish",
    SUCCESSFUL_WISH_RETRIEVAL: "Successfully retrieved birthday wishes",
    SUCCESSFUL_LOG: "Birthday wish logged successfully",
    LOGGING_FAILED: "Error logging birthday wish",
  },
};

export default LOG_MESSAGES;
