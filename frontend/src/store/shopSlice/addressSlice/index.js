import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAddresses,
  updateAddress,
  addAddress,
  removeAddress,
} from "../../../services/AddressApi";

import { toast } from "react-hot-toast";

const initialState = {
  isLoading: false,
  addressList: [],
};

export const addNewAddress = createAsyncThunk(
  "/addresses/addNewAddress",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await addAddress(formData);
      return response;
    } catch (error) {
      toast.error("Failed to add address");
      return rejectWithValue(error.message || "Failed");
    }
  }
);

export const fetchAllAddresses = createAsyncThunk(
  "/addresses/fetchAllAddresses",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetchAddresses(userId);
      return response;
    } catch (error) {
      toast.error("Failed to fetch addresses");
      return rejectWithValue(error.message || "Failed");
    }
  }
);

export const editaAddress = createAsyncThunk(
  "/addresses/editAddress",
  async ({ userId, addressId, formData }, { rejectWithValue }) => {
    try {
      const response = await updateAddress(userId, addressId, formData);
      return response;
    } catch (error) {
      toast.error("Failed to update address");
      return rejectWithValue(error.message || "Failed");
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "/addresses/deleteAddress",
  async ({ userId, addressId }, { rejectWithValue }) => {
    try {
      const response = await removeAddress(userId, addressId);
      return response;
    } catch (error) {
      toast.error("Failed to delete address");
      return rejectWithValue(error.message || "Failed");
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAllAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAllAddresses.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      });
  },
});

export default addressSlice.reducer;
