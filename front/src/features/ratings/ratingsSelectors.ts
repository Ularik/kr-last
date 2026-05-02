import type {RootState} from "../../app/store.ts";

export const selectRatings = (state: RootState) => state.ratings.ratings;
export const selectRatingsLoading = (state: RootState) => state.ratings.isLoading;
export const selectRatingsError = (state: RootState) => state.ratings.fetchError;
export const selectRatingsCreateError = (state: RootState) => state.ratings.createError;
