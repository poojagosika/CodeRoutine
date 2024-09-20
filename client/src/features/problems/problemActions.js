import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../../Api/axiosConfig";

// Helper function to handle errors
const handleThunkError = (error, rejectWithValue) => {
  const message = error.response?.data?.message || "An error occurred";
  toast.error(message);
  return rejectWithValue(message);
};

export const fetchProblems = createAsyncThunk(
  "problem/fetchProblems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/problem");
      return response?.data?.problemsData;
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);

export const fetchProblemById = createAsyncThunk(
  "problem/fetchProblemById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/problem/${id}`);
      return response?.data?.problem;
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);
