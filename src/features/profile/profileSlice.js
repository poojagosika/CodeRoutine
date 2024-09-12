import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUserProfile,
  addSkill,
  deleteSkill,
  personalInformationUpdate,
  addExperience,
  updateExperience,
} from "./profileActions";

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
      .addCase(addSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSkill.fulfilled, (state, action) => {
        state.userProfile.skills = action.payload;
        state.loading = false;
      })
      .addCase(addSkill.rejected, (state, action) => {
        state.error = action.payload || "Failed to add skill";
      })
      .addCase(deleteSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        if (state.userProfile) {
          state.userProfile.skills = state.userProfile.skills.filter(
            (skill) => skill._id !== action.payload
          );
          state.loading = false;
        }
      })
      .addCase(deleteSkill.rejected, (state, action) => {
        state.error = action.payload || "Failed to delete skill";
      })
      .addCase(personalInformationUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(personalInformationUpdate.fulfilled, (state, action) => {
        state.userProfile.profile = action.payload;
        state.loading = false;
      })
      .addCase(personalInformationUpdate.rejected, (state, action) => {
        state.error = action.payload || "Failed to update personal information";
      })
      .addCase(addExperience.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addExperience.fulfilled, (state, action) => {
        state.userProfile.experience = action.payload;
        state.loading = false;
      })
      .addCase(addExperience.rejected, (state, action) => {
        state.error = action.payload || "Failed to add experience";
      })
      .addCase(updateExperience.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExperience.fulfilled, (state, action) => {
        state.userProfile.experience = action.payload;
        state.loading = false;
      })
      .addCase(updateExperience.rejected, (state, action) => {
        state.error = action.payload || "Failed to update experience";
      });
  },
});

export const selectUserProfile = (state) => state.profile.userProfile;
export const selectProfileLoading = (state) => state.profile.loading;
export const selectProfileError = (state) => state.profile.error;
export const selectSkills = (state) => state.profile.userProfile?.skills || [];

export default profileSlice.reducer;
