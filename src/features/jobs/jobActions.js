import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../../Api/axiosConfig";

// Helper function to handle errors
const handleThunkError = (error, rejectWithValue) => {
  const message = error.response?.data?.message || "An error occurred";
  toast.error(message);
  return rejectWithValue(message);
};

// Async Thunk to post a new job
export const postNewJob = createAsyncThunk(
  "jobs/postNewJob",
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/job", jobData);
      toast.success(response.data.message);
      return response.data.job;
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);

// Async Thunk to fetch all jobs
export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/job");
      return response.data;
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);

// Async Thunk to fetch a job by ID
export const fetchJobById = createAsyncThunk(
  "jobs/fetchJobById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/job/${id}`);
      return response.data;
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);

// Async Thunk to edit a job
export const editJob = createAsyncThunk(
  "jobs/editJob",
  async ({ id, job }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/job/${id}`, job);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);

// Async Thunk to delete a job
export const removeJob = createAsyncThunk(
  "jobs/removeJob",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/api/job/${id}`);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);

// Async Thunk to apply for a job
export const applyForJob = createAsyncThunk(
  "jobs/applyForJob",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/job/apply/${id}`);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);

// Async Thunk to toggle saved job status
export const toggleSavedJob = createAsyncThunk(
  "jobs/toggleSavedJob",
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/job/saved/${jobId}`);
      toast.success(response.data.message);
      return { jobId, saved: response.data.saved };
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);
