import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/index.js";


const store = configureStore({
    reducer: {
        auth: authReducer
    }
})

export default store