import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../services/client";

interface EmployeeState {
  employees: unknown;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: EmployeeState = {
  employees: null,
  status: "idle",
  error: null,
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmployees.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(fetchEmployees.rejected, (state) => {
        state.status = "failed";
        // state.error = action.error.message;
      });
  },
});

export const fetchEmployees = createAsyncThunk(
  "employee/fetchEmployees",
  async () => {
    // console.log("employees", data);
    try {
      const client = axiosInstance();
      await client.get(`/`);
      const response = await client.get("employee/loadEmployees");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching movie with :`, error);
    }
  }
);

export const actions = employeeSlice.actions;

export default employeeSlice.reducer;
