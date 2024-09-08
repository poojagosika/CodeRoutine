import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../../Api/axiosConfig";

// Helper function to handle errors
const handleThunkError = (error, rejectWithValue) => {
  const message = error.response?.data?.message || "An error occurred";
  toast.error(message);
  return rejectWithValue(message);
};

export const fetchUserProfile = createAsyncThunk(
  "profile/fetchUserProfile",
  async (userName, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/users/${userName}`);
      return response?.data?.user;
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);
