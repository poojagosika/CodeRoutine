import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "../features/jobs/jobSlice"
import discussReducer from "../features/discuss/discussSlice"
import profileReducer from "../features/profile/profileSlice";


const store = configureStore({
  reducer: {
    jobs: jobReducer,
    profile: profileReducer,
    // Add other reducers here as your application grows
    discussions: discussReducer,
  },
});

export default store;
