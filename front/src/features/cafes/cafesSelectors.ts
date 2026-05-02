import type {RootState} from "../../app/store.ts";

export const selectCafes = (state: RootState) => state.cafes.cafes;
export const selectCafesLoading = (state: RootState) => state.cafes.isLoading;

export const selectCafesError = (state: RootState) => state.cafes.fetchError;
export const selectCafesCreateError = (state: RootState) => state.cafes.createError;
