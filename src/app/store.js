import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "../features/jobs/jobSlice";

const store = configureStore({
  reducer: {
    jobs: jobReducer,
    // Add other reducers here as your application grows
  },
});

export default store;
