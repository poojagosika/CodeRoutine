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

// export const editReply = async (id, data) => {
//     return await axiosInstance.put(`/api/discuss/replies/${id}/edit`, data);
//   };

export const editReply = createAsyncThunk(
  "comments/editReply",
  async ({ topicId, commentId, replyId, content }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/api/discuss/replies/${replyId}/edit`,
        { content }
      );
      toast.success(response.data.message);
      return { topicId, commentId, replyId, content };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteReply = createAsyncThunk(
  "comments/deleteReply",
  async ({ topicId, commentId, replyId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/api/discuss/replies/${commentId}/${replyId}/delete`
      );
      return { replyId, topicId, commentId };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
