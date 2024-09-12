// src/store/actions/discussAction.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../../Api/axiosConfig";

// Helper function to handle errors
const handleThunkError = (error, rejectWithValue) => {
    const message = error.response?.data?.message || "An error occurred";
    toast.error(message); // Show error notification
    return rejectWithValue(message); // Return the error message to be handled in the slice
};

// Fetch discussions
export const fetchDiscussions = createAsyncThunk(
    "discussions/fetchDiscussions",
    async ({ page, limit, sortBy, order, searchTerm }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/api/discuss", {
                params: { page, limit, sortBy, order, searchTerm },
            });
            return response.data; // Return fetched discussions
        } catch (error) {
            return handleThunkError(error, rejectWithValue); // Handle error
        }
    }
);

// Get discussion by ID
export const getDiscussById = createAsyncThunk(
    "discussions/getDiscussById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/api/discuss/${id}`);
            return response.data; // Return discussion data
        } catch (error) {
            return handleThunkError(error, rejectWithValue); // Handle error
        }
    }
);


// post createDiscuss 
export const createDiscuss = createAsyncThunk(
    "discussions/createDiscuss",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/api/discuss", data);
            return response.data.newTopic; // Return created discussion
        } catch (error) {
            return handleThunkError(error, rejectWithValue); // Handle error
        }
    }
);
// delete deleteDiscussById
export const deleteDiscussById = createAsyncThunk(
    "discussions/deleteDiscussById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(`/api/discuss/${id}`);
            const data = response.data
            data.deletedTopic = id;
            return data; // Return deleted discussion
        } catch (error) {
            return handleThunkError(error, rejectWithValue); // Handle error
        }
    }
);

// update updateDiscussById
export const updateDiscussById = createAsyncThunk(
    "discussions/updateDiscussById",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/api/discuss/${id}`, data);
            return response.data.topic;
            // Return updated discussion
        } catch (error) {
            return handleThunkError(error, rejectWithValue); // Handle error
        }
    }
);
