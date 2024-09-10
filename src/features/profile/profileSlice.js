import { createSlice } from "@reduxjs/toolkit";
import { fetchUserProfile, addSkill, deleteSkill } from "./profileActions";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    userProfile: null,
    loading: false,
    error: null,
  },
  reducers: {},
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
      })
      .addCase(addSkill.fulfilled, (state, action) => {
        state.userProfile.skills = action.payload;
      })
      .addCase(addSkill.rejected, (state, action) => {
        state.error = action.payload || "Failed to add skill";
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        if (state.userProfile) {
          state.userProfile.skills = state.userProfile.skills.filter(
            (skill) => skill._id !== action.payload
          );
        }
      })
      .addCase(deleteSkill.rejected, (state, action) => {
        state.error = action.payload || "Failed to delete skill";
      });
  },
});

export const selectUserProfile = (state) => state.profile.userProfile;
export const selectProfileLoading = (state) => state.profile.loading;
export const selectProfileError = (state) => state.profile.error;
export const selectSkills = (state) => state.profile.userProfile?.skills || [];

export default profileSlice.reducer;
