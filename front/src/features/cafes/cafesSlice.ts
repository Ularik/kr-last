import type { GlobalError, ValidationError, Cafe } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import { fetchCafes, createCafe } from "./cafesThunks";


interface CafeState {
  cafes: Cafe[];
  isLoading: boolean;
  fetchError: GlobalError | null;
  createError: ValidationError | GlobalError | null
}

const initialState: CafeState = {
  cafes: [],
  isLoading: false,
  fetchError: null,
  createError: null,
};

export const cafesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCafes.pending, (state) => {
      state.isLoading = true;
      state.fetchError = null;
    });
    builder.addCase(fetchCafes.fulfilled, (state, { payload: data }) => {
      state.isLoading = false;
      state.cafes = data;
    });
    builder.addCase(fetchCafes.rejected, (state, { payload: error }) => {
      state.isLoading = false;
      state.fetchError = error || null;
    });

    builder.addCase(createCafe.pending, (state) => {
      state.isLoading = true;
      state.fetchError = null;
    });
    builder.addCase(createCafe.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createCafe.rejected, (state, { payload: error }) => {
      state.isLoading = false;
      state.createError = error || null;
    });
  },
});

export const cafesReducer = cafesSlice.reducer;
