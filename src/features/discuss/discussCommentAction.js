import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../../Api/axiosConfig";

const handleThunkError = (error, rejectWithValue) => {
    const message = error.response?.data?.message || "An error occurred";
    toast.error(message); // Show error notification
    return rejectWithValue(message); // Return the error message to be handled in the slice
};


export const addCommentToTopic = createAsyncThunk(
    "discussions/addCommentToTopic",

    async ({ id, content }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(
                `/api/discuss/topics/${id}/comments`,
                { content }
            )
            const data = response.data.comment;
            data.topic_id = id;
            return data;

        } catch (error) {
            return handleThunkError(error, rejectWithValue); // Handle error
        }
    }
);


export const deleteComment = createAsyncThunk(
    'comments/deleteComment',
    async ({ topicId, commentId }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(
                `/api/discuss/comments/${topicId}/${commentId}/delete`
            );
            return { topicId, commentId }; // Return the IDs to update the state
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);