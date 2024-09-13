import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUserProfile,
  addSkill,
  deleteSkill,
  personalInformationUpdate,
  addExperience,
  updateExperience,
  deleteExperience,
  addEducation,
  updateEducation,
  deleteEducation,
  addTraining,
  updateTraining,
  deleteTraining,
  addProject,
  deleteProject,
  updateProject,
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
      })
      .addCase(deleteExperience.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExperience.fulfilled, (state, action) => {
        state.userProfile.experience = state.userProfile.experience.filter(
          (experience) => experience._id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteExperience.rejected, (state, action) => {
        state.error = action.payload || "Failed to delete experience";
      })
      .addCase(addEducation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addEducation.fulfilled, (state, action) => {
        state.userProfile.education = action.payload;
        state.loading = false;
      })
      .addCase(addEducation.rejected, (state, action) => {
        state.error = action.payload || "Failed to add education";
      })
      .addCase(updateEducation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEducation.fulfilled, (state, action) => {
        state.userProfile.education = action.payload;
        state.loading = false;
      })
      .addCase(updateEducation.rejected, (state, action) => {
        state.error = action.payload || "Failed to update education";
      })
      .addCase(deleteEducation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEducation.fulfilled, (state, action) => {
        state.userProfile.education = state.userProfile.education.filter(
          (education) => education._id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteEducation.rejected, (state, action) => {
        state.error = action.payload || "Failed to delete education";
      })
      .addCase(addTraining.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTraining.fulfilled, (state, action) => {
        state.userProfile.training = action.payload;
        state.loading = false;
      })
      .addCase(addTraining.rejected, (state, action) => {
        state.error = action.payload || "Failed to add training";
      })
      .addCase(updateTraining.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTraining.fulfilled, (state, action) => {
        state.userProfile.training = action.payload;
        state.loading = false;
      })
      .addCase(updateTraining.rejected, (state, action) => {
        state.error = action.payload || "Failed to update training";
      })
      .addCase(deleteTraining.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTraining.fulfilled, (state, action) => {
        state.userProfile.training = state.userProfile.training.filter(
          (training) => training._id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteTraining.rejected, (state, action) => {
        state.error = action.payload || "Failed to delete training";
      })
      .addCase(addProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.userProfile.project = action.payload;
        state.loading = false;
      })
      .addCase(addProject.rejected, (state, action) => {
        state.error = action.payload || "Failed to add project";
      })
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.userProfile.project = action.payload;
        state.loading = false;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.error = action.payload || "Failed to update project";
      })
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.userProfile.project = state.userProfile.project.filter(
          (projects) => projects._id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.error = action.payload || "Failed to delete project";
      });
  },
});

export const selectUserProfile = (state) => state.profile.userProfile;
export const selectProfileLoading = (state) => state.profile.loading;
export const selectProfileError = (state) => state.profile.error;
export const selectSkills = (state) => state.profile.userProfile?.skills || [];

export default profileSlice.reducer;
