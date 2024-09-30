import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../../Api/axiosConfig";

const handleThunkError = (error, rejectWithValue) => {
    const message = error.response?.data?.message || "An error occurred";
    toast.error(message); // Show error notification
    return rejectWithValue(message); // Return the error message to be handled in the slice
};

export const addLikeOrRemoveLikeReply = createAsyncThunk(
    "comments/addLikeOrRemoveLikeReply",
    async ({ replyId, topicId, commentId }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(
                `/api/discuss/replies/${replyId}/like`
            );
            //   toast.success(response.data.message);
            return { replyId, topicId, commentId };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


// export const addReplyToComment = async (id, data) => {
//     return await axiosInstance.post(`/api/discuss/comments/${id}/replies`, data);
//   };



export const addReplyToComment = createAsyncThunk(
    "comments/addReplyToComment",
    async ({ topicId, commentId, content }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(
                `/api/discuss/comments/${commentId}/replies`,
                { content }
            );
            const data = response.data;
            data.topicId = topicId;
            data.commentId = commentId;
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
