import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "../features/jobs/jobSlice";
import discussReducer from "../features/discuss/discussSlice"
const store = configureStore({
  reducer: {
    jobs: jobReducer,
    // Add other reducers here as your application grows
    discussions: discussReducer,
  },
});

export default store;
