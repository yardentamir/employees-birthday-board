import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import employeeReducer from "./features/employeeSlice";

const store = configureStore({
  reducer: {
    employee: employeeReducer,
    counter: counterReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
