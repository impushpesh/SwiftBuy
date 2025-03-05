import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToCart,
  fetchCartItems,
  updateCartItemQty,
  deleteCartItem,
} from "../../../services/CartApi";
import { toast } from "react-hot-toast";

const initialState = {
  cartItems: [],
  isLoading: false,
};

export const addCartItem = createAsyncThunk(
  "cart/addItem",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await addToCart({ userId, productId, quantity });
      toast.success("Item added to cart successfully!");
      return response;
    } catch (error) {
      toast.error(error.message || "Item add failed!");
      return rejectWithValue(error.message || "Item add failed!");
    }
  }
);

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetchCartItems(userId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch cart items!");
    }
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await updateCartItemQty({ userId, productId, quantity });
      toast.success("Cart updated");
      return response;
    } catch (error) {
      toast.error(error.message || "Cart update failed!");
      return rejectWithValue(error.message || "Cart update failed!");
    }
  }
);

export const deleteCart = createAsyncThunk(
  "cart/deleteCart",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const response = await deleteCartItem({ userId, productId });
      toast.success("Item removed");
      return response;
    } catch (error) {
      toast.error(error.message || "Item remove failed!");
      return rejectWithValue(error.message || "Item remove failed!");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builders)=>{
    builders.addCase(addCartItem.pending, (state)=>{
      state.isLoading = true;
    });
    builders.addCase(addCartItem.fulfilled, (state, action)=>{
      state.isLoading = false;
      state.cartItems = action.payload.data.items;
    });
    builders.addCase(addCartItem.rejected, (state)=>{
      state.isLoading = false;
      state.cartItems = [];
    });

    builders.addCase(fetchCart.pending, (state)=>{
      state.isLoading = true;
    });
    builders.addCase(fetchCart.fulfilled, (state, action)=>{
      state.isLoading = false;
      state.cartItems = action.payload.items;
    });
    builders.addCase(fetchCart.rejected, (state)=>{
      state.isLoading = false;
      state.cartItems = [];
    });

    builders.addCase(updateCart.pending, (state)=>{
      state.isLoading = true;
    });
    builders.addCase(updateCart.fulfilled, (state, action)=>{
      state.isLoading = false;
      state.cartItems = action.payload.data.items;
    });
    builders.addCase(updateCart.rejected, (state)=>{
      state.isLoading = false;
      state.cartItems = [];
    });

    builders.addCase(deleteCart.pending, (state)=>{
      state.isLoading = true;
    });
    builders.addCase(deleteCart.fulfilled, (state, action)=>{
      state.isLoading = false;
      state.cartItems = action.payload.data.items;
    });
    builders.addCase(deleteCart.rejected, (state)=>{
      state.isLoading = false;
      state.cartItems = [];
    });
  }
});

export default cartSlice.reducer;