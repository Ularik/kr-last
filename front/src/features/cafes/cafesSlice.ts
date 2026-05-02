import type { GlobalError, ValidationError, Cafe } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import { fetchCafes, createCafe, fetchOneCafes, sendImages, deleteCafe } from "./cafesThunks";


interface CafeState {
  cafes: Cafe[];
  cafeDetail: Cafe | null;
  isLoading: boolean;
  fetchError: GlobalError | null;
  createError: ValidationError | GlobalError | null
}

const initialState: CafeState = {
  cafes: [],
  cafeDetail: null,
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

    builder.addCase(fetchOneCafes.pending, (state) => {
      state.isLoading = true;
      state.fetchError = null;
    });
    builder.addCase(fetchOneCafes.fulfilled, (state, { payload: data }) => {
      state.isLoading = false;
      state.cafeDetail = data;
    });
    builder.addCase(fetchOneCafes.rejected, (state, { payload: error }) => {
      state.isLoading = false;
      state.fetchError = error || null;
    });

    builder.addCase(createCafe.pending, (state) => {
      state.isLoading = true;
      state.createError = null;
    });
    builder.addCase(createCafe.fulfilled, (state) => {
      state.isLoading = false;
      state.createError = null;
    });
    builder.addCase(createCafe.rejected, (state, { payload: error }) => {
      state.isLoading = false;
      state.createError = error || null;
    });

        builder.addCase(sendImages.pending, (state) => {
          state.isLoading = true;
          state.createError = null;
        });
        builder.addCase(sendImages.fulfilled, (state, { payload: data }) => {
          state.isLoading = false;
          state.cafeDetail = data;
        });
        builder.addCase(sendImages.rejected, (state, { payload: error }) => {
          state.isLoading = false;
          state.createError = error || null;
        });

         builder.addCase(deleteCafe.pending, (state) => {
           state.isLoading = true;
           state.fetchError = null;
         });
         builder.addCase(deleteCafe.fulfilled, (state) => {
           state.isLoading = false;
         });
         builder.addCase(deleteCafe.rejected, (state, { payload: error }) => {
           state.isLoading = false;
           state.fetchError = error || null;
         });
  },
});

export const cafesReducer = cafesSlice.reducer;
