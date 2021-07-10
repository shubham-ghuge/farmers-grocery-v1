import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const API_URL = "https://farmers-grocery-v2.herokuapp.com/orders";

export const fetchOrders = createAsyncThunk('order/fetchOrders', async () => {
    const { data } = await axios.get(API_URL);
    console.log(data);
    return data;
});
export const placeOrder = createAsyncThunk('order/placeOrder', async (products) => {
    const { data } = await axios.post(API_URL);
    return data;
})

const initialState = {
    orderedItems: [],
    orderLoading: false,
    message: null
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {

    },
    extraReducers: {
        [fetchOrders.pending]: (state) => {
            state.orderLoading = true;
        },
        [fetchOrders.fulfilled]: (state, action) => {
            const { success, products, message } = action.payload;
            if (success) {
                state.orderedItems = products
            } else {
                state.message = message
            }
            state.orderLoading = false;
        },
        [fetchOrders.rejected]: (state) => {
            state.message = "error while fetching orders,check your internet connection";
            state.orderLoading = false;
        },
        [placeOrder.pending]: (state) => {
            state.orderLoading = true;
        },
        [placeOrder.fulfilled]: (state, action) => {
            state.message = action.payload.message;
            state.orderLoading = false;
        },
        [placeOrder.rejected]: (state) => {
            state.message = "error while placing an order,check your internet connection";
            state.orderLoading = false;
        },
    }
})
export default orderSlice.reducer;