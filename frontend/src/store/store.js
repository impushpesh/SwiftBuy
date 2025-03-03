import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/index.js";
import productSlice from "./admin/productSlice/index.js";
import shopCartSlice from './shopSlice/cartSlice/index.js'
import shopProductsSlice from './shopSlice/productSlice/index.js'
import shopReviewSlice from './shopSlice/reviewSlice/index.js'

const store = configureStore({
  reducer: {
    auth: authReducer,

    adminProducts: productSlice,

    shopProducts: shopProductsSlice,
    shopCart: shopCartSlice,
    shopReview: shopReviewSlice,
  },
});

export default store;
