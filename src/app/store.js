import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "../features/jobs/jobSlice"
import discussReducer from "../features/discuss/discussSlice"
import profileReducer from "../features/profile/profileSlice";
import problemReducer from "../features/problems/problemSlice";


const store = configureStore({
  reducer: {
    jobs: jobReducer,
    profile: profileReducer,
    // Add other reducers here as your application grows
    discussions: discussReducer,
    problems: problemReducer,
  },
});

export default store;
