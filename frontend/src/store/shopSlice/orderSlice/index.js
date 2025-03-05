import {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
} from "../../../services/OrderApi";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null,
};

export const createNewOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await createOrder(orderData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Order creation failed!");
    }
  }
);

export const captureOrderPayment = createAsyncThunk(
  "order/capturePayment",
  async ({ paymentId, payerId, orderId }, { rejectWithValue }) => {
    try {
      const response = await capturePayment({ paymentId, payerId, orderId });
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Payment capture failed!");
    }
  }
);

export const fetchAllOrders = createAsyncThunk(
  "order/fetchAllOrders",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getAllOrdersByUser(userId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch orders!");
    }
  }
);

export const fetchOrderDetails = createAsyncThunk(
  "order/fetchOrderDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getOrderDetails(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch order details!");
    }
  }
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
      })
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByUserId.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails } = shoppingOrderSlice.actions;

export default shoppingOrderSlice.reducer;
