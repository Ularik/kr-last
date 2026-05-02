import type {RootState} from "../../app/store.ts";

export const selectCafes = (state: RootState) => state.cafes.cafes;

export const selectCafesLoading = (state: RootState) => state.cafes.fetchLoading;
export const selectCafesError = (state: RootState) => state.cafes.fetchError;
