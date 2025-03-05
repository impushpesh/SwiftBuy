import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/index.js";
import productSlice from "./admin/productSlice/index.js";
import shopCartSlice from './shopSlice/cartSlice/index.js'
import shopProductsSlice from './shopSlice/productSlice/index.js'
import shopReviewSlice from './shopSlice/reviewSlice/index.js'
import shopAddressSlice from './shopSlice/addressSlice/index.js'
import shopOrderSlice from './shopSlice/orderSlice/index.js'

const store = configureStore({
  reducer: {
    auth: authReducer,

    adminProducts: productSlice,

    shopProducts: shopProductsSlice,
    shopCart: shopCartSlice,
    shopReview: shopReviewSlice,
    shopAddress: shopAddressSlice,
    shopOrder: shopOrderSlice,
  },
});

export default store;
