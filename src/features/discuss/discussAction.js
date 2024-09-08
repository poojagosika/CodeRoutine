// src/store/actions/discussAction.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../../Api/axiosConfig";

// Helper function to handle errors
const handleThunkError = (error, rejectWithValue) => {
    const message = error.response?.data?.message || "An error occurred";
    toast.error(message);
    return rejectWithValue(message);
};

// Fetch discussions
export const fetchDiscussions = createAsyncThunk(
    "discussions/fetchDiscussions",
    async ({ page, limit, sortBy, order, searchTerm }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/api/discuss", {
                params: { page, limit, sortBy, order, searchTerm },
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            return handleThunkError(error, rejectWithValue);
        }
    }
);

