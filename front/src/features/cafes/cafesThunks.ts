import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import type {
  GlobalError,
  CafePost,
  Cafe,
} from "../../types";
import { isAxiosError } from "axios";


export const fetchCafes = createAsyncThunk<
  Cafe[],
  void,
  { rejectValue: GlobalError }
>("cafes/fetchCafes", async (_, { rejectWithValue }) => {

  try {
    const response = await axiosApi.get<Cafe[]>("/cafes/");
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});
