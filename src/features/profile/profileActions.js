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

export const addSkill = createAsyncThunk(
  "profile/addSkill",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/users/profile/addSkill",
        data
      );
      return response?.data?.skills;
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);

export const deleteSkill = createAsyncThunk(
  "profile/deleteSkill",
  async (skillId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/users/profile/deleteSkill/${skillId}`);
      return skillId;
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);

export const personalInformationUpdate = createAsyncThunk(
  "profile/personalInformationUpdate",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        "/api/users/profile/personalInformation",
        data
      );
      toast.success(response?.data?.message);
      return response?.data?.personalInformation?.profile;

    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);

//add experience api

export const addExperience = createAsyncThunk(
    "profile/addExperience",
    async (data, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post(
          "/api/users/profile/addExperience",
          data
        );
        toast.success(response?.data?.message);
        return response?.data?.experience;
      } catch (error) {
        return handleThunkError(error, rejectWithValue);
      }
    }
  );
