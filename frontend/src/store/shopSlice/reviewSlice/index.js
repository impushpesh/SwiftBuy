import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { addReview, getProductReviews } from "../../../services/ReviewApi";
import { toast } from "react-hot-toast";
const initialState = {
  isLoading: false,
  reviews: [],
};

export const fetchProductReviews = createAsyncThunk(
  "review/fetchProductReviews",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await getProductReviews(productId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addProductReview = createAsyncThunk(
  "review/addProductReview",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await addReview(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductReviews.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProductReviews.fulfilled, (state, action) => {
      state.isLoading = false;
      state.reviews = action.payload.data;
    });
    builder.addCase(fetchProductReviews.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default reviewSlice.reducer;