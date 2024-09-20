import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/authSlice";
import jobReducer from "../features/jobs/jobSlice";
import discussReducer from "../features/discuss/discussSlice";
import profileReducer from "../features/profile/profileSlice";

const store = configureStore({
  reducer: {
    // auth: authReducer,
    jobs: jobReducer,
    profile: profileReducer,
    discussions: discussReducer,
  },
});

export default store;
