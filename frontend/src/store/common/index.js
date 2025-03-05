import { addFeaturedImage, getFeaturedImage } from "../../services/FeatureApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  featureImageList: [],
};

export const fetchFeatureImageList = createAsyncThunk(
  "feature/fetchFeatureImageList",
  async () => {
    const response = await getFeaturedImage();
    return response.data;
  }
);

export const addFeatureImage = createAsyncThunk(
  "feature/addFeatureImage",
  async (image) => {
    const response = await addFeaturedImage(image);
    return response.data;
  }
);

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeatureImageList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFeatureImageList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(fetchFeatureImageList.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      });
  },
});

export default commonSlice.reducer;
