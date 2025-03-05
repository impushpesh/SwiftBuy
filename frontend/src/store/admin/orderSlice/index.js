import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "../../../services/AdminOrderApi";
import { toast } from "react-hot-toast";
const initialState = {
  orderList: [],
  orderDetails: null,
};

export const fetchAllOrdersOfAllUsers = createAsyncThunk(
  "adminOrder/fetchAllOrdersOfAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllOrdersOfAllUsers();
      return response;
    } catch (error) {
      toast.error(error.message || "Failed to fetch orders!");
      return rejectWithValue(error.message || "Failed to fetch orders!");
    }
  }
);

export const fetchOrderDetailsForAdmin = createAsyncThunk(
  "adminOrder/fetchOrderDetailsForAdmin",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await getOrderDetailsForAdmin(orderId);
      return response;
    } catch (error) {
      toast.error(error.message || "Failed to fetch order details!");
      return rejectWithValue(error.message || "Failed to fetch order details!");
    }
  }
);

export const updateOrderStatusForAdmin = createAsyncThunk(
  "adminOrder/updateOrderStatusForAdmin",
  async ({ id, orderStatus }, { rejectWithValue }) => {
    try {
      const response = await updateOrderStatus(id, orderStatus);
      toast.success("Order status updated successfully!");
      return response;
    } catch (error) {
      toast.error(error.message || "Failed to update order status!");
      return rejectWithValue(error.message || "Failed to update order status!");
    }
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      console.log("resetOrderDetails");

      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrdersOfAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllOrdersOfAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(fetchAllOrdersOfAllUsers.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(fetchOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(fetchOrderDetailsForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails } = adminOrderSlice.actions;

export default adminOrderSlice.reducer;
