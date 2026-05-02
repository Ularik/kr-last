import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import type {
  GlobalError,
  Rating,
  RatingPost,
} from "../../types";
import { isAxiosError } from "axios";


export const fetchRatings = createAsyncThunk<
  Rating[],
  string,
  { rejectValue: GlobalError }
>("ratings/fetchRatings", async (cafeId, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get<Rating[]>(`/ratings/${cafeId}`);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});


export const createRatings = createAsyncThunk<
  Rating,
  { cafeId: string; rating: RatingPost },
  { rejectValue: GlobalError }
>("ratings/createRating", async ({ cafeId, rating }, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<Rating>(`/ratings/${cafeId}`, rating);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

