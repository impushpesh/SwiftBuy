import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/index.js";
import productSlice from "./productSlice/index.js";


const store = configureStore({
    reducer: {
        auth: authReducer,
        
        adminProducts: productSlice
    }
})

export default store