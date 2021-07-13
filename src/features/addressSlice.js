import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

// const API_URL = "http://localhost:3000";
const API_URL = "https://farmers-grocery-v2.herokuapp.com";


export const fetchAddress = createAsyncThunk('address/fetchAddress', async () => {
    const { data } = await axios.get(`${API_URL}/address`);
    return data;
})

export const addAddress = createAsyncThunk('address/addAddress', async (addressData) => {
    const { data } = await axios.post(`${API_URL}/address`, addressData);
    return data;
})

const initialState = {
    loading: false,
    address: [],
    message: null
}
export const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        updateAddress: (state, action) => {
            state.address.push(action.payload)
        }
    },
    extraReducers: {
        [addAddress.pending]: (state) => {
            state.loading = true;
        },
        [fetchAddress.pending]: (state) => {
            state.loading = true;
        },
        [addAddress.fulfilled]: (state, action) => {
            state.address.push(action.payload.response);
            state.message = action.payload.message;
            state.loading = false;
        },
        [fetchAddress.fulfilled]: (state, action) => {
            state.address = action.payload.response;
            state.loading = false;
        },
        [addAddress.rejected]: (state) => {
            state.loading = true;
        },
        [fetchAddress.rejected]: (state) => {
            state.loading = true;
        },
    }
});
export const { updateAddress } = addressSlice.actions;
export default addressSlice.reducer;