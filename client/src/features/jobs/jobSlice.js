import { createSlice } from "@reduxjs/toolkit";
import {
  applyForJob,
  editJob,
  fetchJobById,
  fetchJobs,
  postNewJob,
  removeJob,
  toggleSavedJob,
} from "./jobActions";

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [], // Keeping it as an array
    loading: false,
    error: null,
    successMessage: null,
    filters: {
      title: "",
      location: "",
      employmentTypes: [],
      salaryRange: { min: null, max: null },
    },
    selectedTab: 0,
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postNewJob.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(postNewJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs.push(action.payload);
        state.successMessage = "Job posted successfully!";
      })
      .addCase(postNewJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.jobs = action.payload;
        state.loading = false;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch jobs";
      })
      // Handle fetchJobById
      .addCase(fetchJobById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.loading = false;
        const jobIndex = state.jobs.findIndex(
          (job) => job._id === action.payload._id
        );

        if (jobIndex >= 0) {
          // Update the existing job, ensuring state immutability
          state.jobs[jobIndex] = {
            ...state.jobs[jobIndex],
            ...action.payload,
          };
        } else {
          // Push the new job into the array
          state.jobs = [...state.jobs, action.payload];
        }
      })

      .addCase(fetchJobById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch job";
      })

      .addCase(editJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(editJob.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(editJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle removeJob
      .addCase(removeJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = state.jobs.filter((job) => job._id !== action.meta.arg);
      })
      .addCase(removeJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete job";
      })
      // Handle applyForJob
      .addCase(applyForJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyForJob.fulfilled, (state, action) => {
        state.loading = false;
        const jobIndex = state.jobs.findIndex(
          (job) => job._id === action.meta.arg
        );
        if (jobIndex >= 0) {
          state.jobs[jobIndex].applied = true; // Update applied status
        }
      })
      .addCase(applyForJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to apply for job";
      })
      // Handle toggleSavedJob
      .addCase(toggleSavedJob.fulfilled, (state, action) => {
        const { jobId, saved } = action.payload;
        const jobIndex = state.jobs.findIndex((job) => job._id === jobId);
        if (jobIndex >= 0) {
          state.jobs[jobIndex].saved = saved;
        }
      })
      .addCase(toggleSavedJob.rejected, (state, action) => {
        state.error = action.payload || "Failed to toggle job save status";
      });
  },
});

export const { setFilters, setSelectedTab } = jobSlice.actions;

export const selectJobs = (state) => state.jobs.jobs;
export const selectJobById = (state, jobId) =>
  state.jobs.jobs.find((job) => job._id === jobId);
export const selectLoading = (state) => state.jobs.loading;
export const selectError = (state) => state.jobs.error;
export const { clearSuccessMessage } = jobSlice.actions;
export const selectFilters = (state) => state.jobs.filters;
export const selectSelectedTab = (state) => state.jobs.selectedTab;

export default jobSlice.reducer;
