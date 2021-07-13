import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import productReducer from "../features/productSlice";
import orderReducer from "../features/orderSlice";
import addressReducer from "../features/addressSlice";

export default configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        order: orderReducer,
        address: addressReducer
    }
});