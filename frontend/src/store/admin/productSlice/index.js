import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProduct,
  editProduct,
  getAllProducts,
  deleteProduct,
} from "../../../services/AdminApi";
import { toast } from "react-hot-toast";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "product/add",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await createProduct(formData);
      toast.success("Product added successfully!");
      return response;
    } catch (error) {
      toast.error(error.message || "Product add failed!");
      return rejectWithValue(error.message || "Product add failed!");
    }
  }
);

export const fetchAllProducts = createAsyncThunk(
  "product/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllProducts();
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Error fetching products");
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await editProduct({ id, formData });
      toast.success("Product updated successfully!");
      return response;
    } catch (error) {
      toast.error(error.message || "Product update failed!");
      return rejectWithValue(error.message || "Product update failed!");
    }
  }
);

export const removeProduct = createAsyncThunk(
  "product/remove",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteProduct(id);
      toast.success("Product removed successfully!");
      return response;
    } catch (error) {
      toast.error(error.message || "Product remove failed!");
      return rejectWithValue(error.message || "Product remove failed!");
    }
  }
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      console.log("action.payload.data", action.payload.data);
      state.isLoading = false;
      state.productList = action.payload.data;
    });
    builder.addCase(fetchAllProducts.rejected, (state) => {
      state.isLoading = false;
      state.productList = [];
    });
  },
});

export default AdminProductsSlice.reducer;
