import type { GlobalError, Cafe } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import { fetchCafes } from "./cafesThunks";


interface CafeState {
  cafes: Cafe[];
  fetchLoading: boolean;
  fetchError: GlobalError | null;
}

const initialState: CafeState = {
  cafes: [],
  fetchLoading: false,
  fetchError: null,
};

export const cafesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCafes.pending, (state) => {
      state.fetchLoading = true;
      state.fetchError = null;
    });
    builder.addCase(fetchCafes.fulfilled, (state, { payload: data }) => {
      state.fetchLoading = false;
      state.cafes = data;
    });
    builder.addCase(fetchCafes.rejected, (state, { payload: error }) => {
      state.fetchLoading = false;
      state.fetchError = error || null;
    });
  },
});

export const cafesReducer = cafesSlice.reducer;
