import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import type {
  GlobalError,
  CafePost,
  Cafe,
  ValidationError,
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



export const createCafe = createAsyncThunk<
  Cafe,
  CafePost,
  { rejectValue: ValidationError | GlobalError }
>("cafes/createCafe", async (cafeData, { rejectWithValue }) => {
  const formData = new FormData();

  const keys = Object.keys(cafeData) as (keyof CafePost)[];

  keys.forEach((key) => {
    const value = cafeData[key];

    if (key === "images" && value !== null && Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        formData.append(key, value[i]);
      }
    } else {
      if (value !== null) formData.append(key, value.toString());
    }
  });

  try {
    const response = await axiosApi.post<Cafe>("/cafes/", formData);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }

    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as GlobalError);
    }
    throw e;
  }
});

