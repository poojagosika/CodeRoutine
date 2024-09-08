// src/store/slices/discussSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchDiscussions } from "./discussAction";

const initialState = {
    discussions: [],
    loading: false,
    error: null,
    totalPages: 0,
};

const discussSlice = createSlice({
    name: "discussions",
    initialState,
    reducers: {
        // Add other local reducers if needed
    },
    extraReducers: (builder) => {
        builder
            // Handle the fetch discussions
            .addCase(fetchDiscussions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDiscussions.fulfilled, (state, action) => {
                state.loading = false;
                state.discussions = action.payload.topics || [];
                state.totalPages = action.payload.pages || 0;
            })
            .addCase(fetchDiscussions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default discussSlice.reducer;
