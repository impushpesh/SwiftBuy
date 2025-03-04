import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getProductDetails,
  getFilteredProducts,
} from "../../../services/ProductApi";
import { toast } from "react-hot-toast";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
};

export const fetchProductDetails = createAsyncThunk(
  "product/fetchProductDetails",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await getProductDetails(productId);
      return response;
    } catch (error) {
      toast.error(error.message || "Failed to fetch product details!");
      return rejectWithValue(
        error.message || "Failed to fetch product details!"
      );
    }
  }
);

export const fetchAllFilteredProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async ({ filterParams, sortParams }, { rejectWithValue }) => {
    try {
      const data = await getFilteredProducts(filterParams, sortParams);
      return data;
    } catch (error) {
      toast.error(error.error || "Failed to fetch products!");
      return rejectWithValue(error.error || "Failed to fetch products!");
    }
  }
);

const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builders)=>{
    builders.addCase(fetchProductDetails.pending, (state)=>{
        state.isLoading = true;
        }
    );
    builders.addCase(fetchProductDetails.fulfilled, (state, action)=>{
        state.isLoading = false;
        console.log(action.payload.data);
        state.productDetails = action.payload.data;
        }
    );
    builders.addCase(fetchProductDetails.rejected, (state)=>{
        state.isLoading = false;
        state.productDetails=null;
        }
    );
    builders.addCase(fetchAllFilteredProducts.pending, (state)=>{
        state.isLoading = true;
        }
    );
    builders.addCase(fetchAllFilteredProducts.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.productList = action.payload.data;
        }
    );
    builders.addCase(fetchAllFilteredProducts.rejected, (state)=>{
        state.isLoading = false;
        state.productList=[];
        }
    );


  }
});

export const { setProductDetails } = shoppingProductSlice.actions;
export default shoppingProductSlice.reducer;