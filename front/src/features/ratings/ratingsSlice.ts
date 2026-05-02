import type { GlobalError, ValidationError, Rating } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import { fetchRatings, createRatings } from "./ratingsThunks";


interface RatingsState {
  ratings: Rating[];
  isLoading: boolean;
  fetchError: GlobalError | null;
  createError: GlobalError | null;
}

const initialState: RatingsState = {
  ratings: [],
  isLoading: false,
  fetchError: null,
  createError: null,
};

export const ratingsSlice = createSlice({
  name: "ratings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRatings.pending, (state) => {
      state.isLoading = true;
      state.fetchError = null;
    });
    builder.addCase(fetchRatings.fulfilled, (state, { payload: data }) => {
      state.isLoading = false;
      state.ratings = data;
    });
    builder.addCase(fetchRatings.rejected, (state, { payload: error }) => {
      state.isLoading = false;
      state.fetchError = error || null;
    });

    builder.addCase(createRatings.pending, (state) => {
      state.isLoading = true;
      state.fetchError = null;
    });
    builder.addCase(createRatings.fulfilled, (state) => {
      state.isLoading = false;
      state.createError = null;

    });
    builder.addCase(createRatings.rejected, (state, { payload: error }) => {
      state.isLoading = false;
      state.createError = error || null;
    });
  },
});

export const ratingsReducer = ratingsSlice.reducer;
