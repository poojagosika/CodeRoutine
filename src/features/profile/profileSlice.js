import { createSlice } from "@reduxjs/toolkit";
import { fetchUserProfile } from "./profileActions";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    userProfile: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearProfile(state) {
      state.userProfile = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch user profile";
      });
  },
});

export const { clearProfile } = profileSlice.actions;

export const selectUserProfile = (state) => state.profile.userProfile;
export const selectProfileLoading = (state) => state.profile.loading;
export const selectProfileError = (state) => state.profile.error;

export default profileSlice.reducer;
