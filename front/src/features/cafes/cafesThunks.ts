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

export const fetchOneCafes = createAsyncThunk<
  Cafe,
  string,
  { rejectValue: GlobalError }
>("cafes/fetchOneCafe", async (cafeId, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get<Cafe>(`/cafes/${cafeId}`);
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
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});


export const deleteCafe = createAsyncThunk<
  void,
  string
>("cafes/deleteCafe", async (cafeId) => {

  try {
    await axiosApi.delete(`cafes/${cafeId}`);
  } catch(e) {
    console.log(e);
  }

});


export const sendImages = createAsyncThunk<
  Cafe,
  {cafeId: string, images: File[]},
  { rejectValue: GlobalError }
>("cafes/uploadImages", async ({cafeId, images}, { rejectWithValue }) => {
  const formData = new FormData();
  images.forEach((image) => {
    formData.append('images', image);
  });

  try {
    const response = await axiosApi.patch<Cafe>(`/cafes/${cafeId}`, formData);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});


