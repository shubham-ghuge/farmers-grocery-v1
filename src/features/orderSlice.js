import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const API_URL = "https://farmers-grocery-v2.herokuapp.com/orders";
// const API_URL = "http://localhost:3000/orders";

export const fetchOrders = createAsyncThunk('order/fetchOrders', async () => {
    const { data } = await axios.get(API_URL);
    return data;
});
export const placeOrder = createAsyncThunk('order/placeOrder', async (addressId) => {
    const { data } = await axios.post(API_URL, { addressId });
    return data;
})

const initialState = {
    orders: [],
    orderLoading: false,
    message: null
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload
        }
    },
    extraReducers: {
        [fetchOrders.pending]: (state) => {
            state.orderLoading = true;
        },
        [fetchOrders.fulfilled]: (state, action) => {
            const { success, response } = action.payload;
            if (success) {
                state.orders = response.map(({ products, addressId }) => {
                    return { products, address: `${addressId.address} ${addressId.pincode}` }
                });
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
export const { setMessage } = orderSlice.actions;
export default orderSlice.reducer;