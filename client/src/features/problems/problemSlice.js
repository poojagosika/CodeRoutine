import { createSlice } from "@reduxjs/toolkit";
import { fetchProblemById, fetchProblems } from "./problemActions";

const problemSlice = createSlice({
  name: "problems",
  initialState: {
    problems: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProblems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProblems.fulfilled, (state, action) => {
        state.loading = false;
        state.problems = action.payload;
      })
      .addCase(fetchProblems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProblemById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProblemById.fulfilled, (state, action) => {
        state.loading = false;
        const existingProblemIndex = state.problems.findIndex(
          (problem) => problem._id === action.payload._id
        );
        if (existingProblemIndex !== -1) {
          state.problems[existingProblemIndex] = action.payload;
        } else {
          state.problems.push(action.payload);
        }
      })
      .addCase(fetchProblemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default problemSlice.reducer;
