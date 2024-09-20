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
      toast.success(response?.data?.message);
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
      toast.success("Skill deleted successfully");
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

export const updateExperience = createAsyncThunk(
  "profile/updateExperience",
  async ({ experienceId, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/api/users/profile/updateExperience/${experienceId}`,
        data
      );
      toast.success(response?.data?.message);
      return response?.data?.experience;
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);

export const deleteExperience = createAsyncThunk(
  "profile/deleteExperience",
  async (experienceId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(
        `/api/users/profile/deleteExperience/${experienceId}`
      );
      toast.success("Experience deleted successfully");
      return experienceId;
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);

export const addEducation = createAsyncThunk(
  "profile/addEducation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/users/profile/addEducation",
        data
      );
      toast.success(response?.data?.message);
      return response?.data?.education;
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);

export const updateEducation = createAsyncThunk(
  "profile/updateEducation",
  async ({ educationId, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/api/users/profile/updateEducation/${educationId}`,
        data
      );
      toast.success(response?.data?.message);
      return response?.data?.education;
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);

export const deleteEducation = createAsyncThunk(
  "profile/deleteEducation",
  async (educationId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(
        `/api/users/profile/deleteEducation/${educationId}`
      );
      toast.success("Education deleted successfully");
      return educationId;
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);

export const addTraining = createAsyncThunk(
  "profile/addTraining",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/users/profile/addTraining",
        data
      );
      toast.success(response?.data?.message);
      return response?.data?.training;
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);

export const updateTraining = createAsyncThunk(
  "profile/updateTraining",
  async ({ trainingId, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/api/users/profile/updateTraining/${trainingId}`,
        data
      );
      toast.success(response?.data?.message);
      return response?.data?.training;
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);

export const deleteTraining = createAsyncThunk(
  "profile/deleteTraining",
  async (trainingId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(
        `/api/users/profile/deleteTraining/${trainingId}`
      );
      toast.success("Training deleted successfully");
      return trainingId;
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);

export const addProject = createAsyncThunk(
  "profile/addProject",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/users/profile/addProject",
        data
      );
      toast.success(response?.data?.message);
      return response?.data?.project;
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);

export const updateProject = createAsyncThunk(
  "profile/updateProject",
  async ({ projectId, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/api/users/profile/updateProject/${projectId}`,
        data
      );
      toast.success(response?.data?.message);
      return response?.data?.project;
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);

export const deleteProject = createAsyncThunk(
  "profile/deleteProject",
  async (projectId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(
        `/api/users/profile/deleteProject/${projectId}`
      );
      toast.success("Project deleted successfully");
      return projectId;
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);

export const addOrUpdateSocialLinks = createAsyncThunk(
  "profile/addOrUpdateSocialLinks",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        "/api/users/profile/addOrUpdateSocialLinks",
        data
      );
      toast.success(response?.data?.message);
      return response?.data?.socialLinks;
    } catch (error) {
      return handleThunkError(error, rejectWithValue);
    }
  }
);
